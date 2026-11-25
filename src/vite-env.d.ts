/// <reference types="vite/client" />

declare module 'lozad' {
  interface LozadOptions {
    rootMargin?: string
    threshold?: number | number[]
    load?: (element: Element) => void
    loaded?: (element: Element) => void
  }

  interface LozadObserver {
    observe: () => void
    triggerLoad: (element: Element) => void
  }

  function lozad(selector?: string | Element | NodeListOf<Element>, options?: LozadOptions): LozadObserver
  export default lozad
}
