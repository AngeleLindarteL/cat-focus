import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const FILE_PATTERN = /^(?<layer>.+?)\s*-\s*(?<frame>\d+)\.png$/i;

function slugifyLayerName(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
    .replace(/[^a-z0-9_]/g, "")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseFrameFile(fileName, fullPath) {
  const match = fileName.match(FILE_PATTERN);
  if (!match?.groups) {
    return null;
  }

  const layerRaw = match.groups.layer.trim();
  const frame = Number(match.groups.frame);

  return {
    layerRaw,
    layerSlug: slugifyLayerName(layerRaw),
    frame,
    path: fullPath,
    fileName,
  };
}

async function collectFrames(inputDir) {
  const entries = await fs.readdir(inputDir, { withFileTypes: true });
  const grouped = {};

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.toLowerCase().endsWith(".png")) continue;

    const fullPath = path.join(inputDir, entry.name);
    const parsed = parseFrameFile(entry.name, fullPath);

    if (!parsed) {
      console.warn(`[skip] Nombre no reconocido: ${entry.name}`);
      continue;
    }

    grouped[parsed.layerSlug] ??= [];
    grouped[parsed.layerSlug].push(parsed);
  }

  if (Object.keys(grouped).length === 0) {
    throw new Error(`No se encontraron PNGs válidos en: ${inputDir}`);
  }

  for (const layer of Object.keys(grouped)) {
    grouped[layer].sort((a, b) => a.frame - b.frame);

    const frames = grouped[layer].map((item) => item.frame);
    const expected = Array.from({ length: frames.length }, (_, i) => frames[0] + i);

    const isConsecutive =
      frames.length === expected.length &&
      frames.every((value, index) => value === expected[index]);

    if (!isConsecutive) {
      console.warn(
        `[warn] La capa "${layer}" no tiene frames consecutivos. Encontrados: ${frames.join(", ")}`
      );
    }
  }

  return grouped;
}

async function getPngSize(filePath) {
  const metadata = await sharp(filePath).metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`No se pudo leer el tamaño de: ${filePath}`);
  }

  return {
    width: metadata.width,
    height: metadata.height,
  };
}

async function validateSameSize(frames) {
  if (frames.length === 0) {
    throw new Error("No hay frames para validar.");
  }

  const firstSize = await getPngSize(frames[0].path);

  for (const frame of frames.slice(1)) {
    const currentSize = await getPngSize(frame.path);

    if (currentSize.width !== firstSize.width || currentSize.height !== firstSize.height) {
      throw new Error(
        `La capa "${frames[0].layerSlug}" tiene frames con tamaños distintos. ` +
          `Esperado ${firstSize.width}x${firstSize.height}, ` +
          `encontrado ${currentSize.width}x${currentSize.height} en ${frame.fileName}`
      );
    }
  }

  return firstSize;
}

async function buildHorizontalSpritesheet(
  frames,
  outputPath
) {
  const { width: frameWidth, height: frameHeight } = await validateSameSize(frames);
  const frameCount = frames.length;

  const composites = await Promise.all(
    frames.map(async (frame, index) => ({
      input: await fs.readFile(frame.path),
      left: index * frameWidth,
      top: 0,
    }))
  );

  await sharp({
    create: {
      width: frameWidth * frameCount,
      height: frameHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toFile(outputPath);

  const manifestFrames = frames.map((frame, index) => ({
    index,
    sourceFrame: frame.frame,
    x: index * frameWidth,
    y: 0,
    w: frameWidth,
    h: frameHeight,
    file: frame.fileName,
  }));

  return {
    layer: frames[0].layerSlug,
    sourceLayerName: frames[0].layerRaw,
    image: path.basename(outputPath),
    frameWidth,
    frameHeight,
    frameCount,
    frames: manifestFrames,
  };
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function main() {
  const inputDir = process.argv[2];
  if (!inputDir) {
    throw new Error(
      "Uso: tsx build-spritesheets.ts <inputDir> [--output-dir <dir>] [--manifest-name <name>]"
    );
  }

  const resolvedInputDir = path.resolve(inputDir);
  const customOutputDir = getArgValue("--output-dir");
  const manifestName = getArgValue("--manifest-name") ?? "manifest.json";

  const resolvedOutputDir = customOutputDir
    ? path.resolve(customOutputDir)
    : path.join(path.dirname(resolvedInputDir), `${path.basename(resolvedInputDir)}_spritesheets`);

  await ensureDir(resolvedOutputDir);

  const grouped = await collectFrames(resolvedInputDir);

  const manifest = {
    inputDir: resolvedInputDir,
    outputDir: resolvedOutputDir,
    layers: {},
  };

  for (const [layerSlug, frames] of Object.entries(grouped)) {
    const outputPath = path.join(resolvedOutputDir, `${layerSlug}.png`);
    const info = await buildHorizontalSpritesheet(frames, outputPath);
    manifest.layers[layerSlug] = info;

    console.log(`[ok] Generado: ${path.basename(outputPath)} (${info.frameCount} frames)`);
  }

  const manifestPath = path.join(resolvedOutputDir, manifestName);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf-8");

  console.log(`[ok] Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error("[error]", error instanceof Error ? error.message : error);
  process.exit(1);
});
