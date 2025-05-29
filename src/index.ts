type WatchOptions = {
  onAdd?: (el: Element) => void;
  onRemove?: (el: Element) => void;
  onChange?: (el: Element) => void;
};

export function watch(selector: string, options: WatchOptions): () => void {
  const target = document.querySelector(selector);
  if (!target) throw new Error(`Element ${selector} not found`);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && options.onAdd)
            options.onAdd(node as Element);
        });
        mutation.removedNodes.forEach((node) => {
          if (node.nodeType === 1 && options.onRemove)
            options.onRemove(node as Element);
        });
      }
      if (mutation.type === 'attributes' && options.onChange) {
        options.onChange(mutation.target as Element);
      }
    }
  });

  observer.observe(target, {
    childList: true,
    attributes: true,
    subtree: true,
  });

  return () => observer.disconnect();
}
