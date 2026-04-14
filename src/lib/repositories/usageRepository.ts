import {
  getLocalStorageValues,
  setLocalStorageValues,
} from "@/lib/chrome/storage";
import { USAGE_BLOCK_STORAGE_KEY, type UsageBlock, type UsageBlockDraft } from "@/lib/usage";
import type {
  UsageRepository,
  UsageStorageShape,
} from "@/lib/repositories/usageRepository.interfaces";

export class ChromeStorageUsageRepository implements UsageRepository {
  async findAll(): Promise<UsageBlock[]> {
    const values = await getLocalStorageValues<UsageStorageShape>([
      USAGE_BLOCK_STORAGE_KEY,
    ]);

    return values[USAGE_BLOCK_STORAGE_KEY] ?? [];
  }

  async insertOne(block: UsageBlockDraft): Promise<UsageBlock> {
    const blocks = await this.findAll();
    const createdBlock: UsageBlock = {
      ...block,
      id: crypto.randomUUID(),
    };

    await setLocalStorageValues({
      [USAGE_BLOCK_STORAGE_KEY]: [...blocks, createdBlock],
    });

    return createdBlock;
  }

  async updateOneById(
    id: string,
    block: UsageBlockDraft,
  ): Promise<UsageBlock | null> {
    const blocks = await this.findAll();
    let updatedBlock: UsageBlock | null = null;

    const nextBlocks = blocks.map((currentBlock) => {
      if (currentBlock.id !== id) {
        return currentBlock;
      }

      updatedBlock = { ...block, id };
      return updatedBlock;
    });

    if (!updatedBlock) {
      return null;
    }

    await setLocalStorageValues({
      [USAGE_BLOCK_STORAGE_KEY]: nextBlocks,
    });

    return updatedBlock;
  }

  async deleteOneById(id: string): Promise<void> {
    const blocks = await this.findAll();

    await setLocalStorageValues({
      [USAGE_BLOCK_STORAGE_KEY]: blocks.filter((block) => block.id !== id),
    });
  }
}

export const usageRepository: UsageRepository =
  new ChromeStorageUsageRepository();

export type { UsageRepository, UsageStorageShape } from "@/lib/repositories/usageRepository.interfaces";
