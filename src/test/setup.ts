import "@testing-library/jest-dom/vitest";

class MockResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = MockResizeObserver as typeof ResizeObserver;
}

if (typeof window.matchMedia === "undefined") {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false;
    },
  })) as typeof window.matchMedia;
}

if (typeof Element.prototype.animate === "undefined") {
  Element.prototype.animate = (() => ({
    addEventListener() {},
    cancel() {},
    commitStyles() {},
    finished: Promise.resolve(),
    pause() {},
    play() {},
    removeEventListener() {},
  })) as typeof Element.prototype.animate;
}
