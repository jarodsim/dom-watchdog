# dom-watchdog

Observe changes in a DOM element with simple callbacks.  
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)  
![DefinitelyTyped](https://img.shields.io/badge/types-included-brightgreen)

## Installation
```bash
npm install dom-watchdog
````

## Usage

```ts
import { watch } from "dom-watchdog";

const stop = watch("#root", {
  onAdd: el => console.log("Added:", el),
  onRemove: el => console.log("Removed:", el),
  onChange: el => console.log("Changed:", el),
});

// To stop:
stop();
```

### React and TypeScript Example

```ts
import React, { useEffect } from "react";
import { watch } from "dom-watchdog";

export function ChatWatcher() {
  useEffect(() => {
    const stop = watch("#chat", {
      onAdd: el => console.log("New message:", el.textContent),
    });

    return () => stop();
  }, []);

  return <div id="chat"></div>;
}
```

## API

```ts
watch(selector: string, options: WatchOptions, observerOptions?: MutationObserverInit): () => void
```

### Parameters

* **`selector`**: `string`
  CSS selector of the parent element to be observed.

* **`options`**: `WatchOptions`
  Object containing optional callbacks:

  * **`onAdd(el: Element)`**: Called when a new child element is added.
  * **`onRemove(el: Element)`**: Called when a child element is removed.
  * **`onChange(el: Element)`**: Called when:

    * an element's attribute is modified,
    * or a node’s text content is changed.

* **`observerOptions`**: [`MutationObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) *(optional)*
  Allows direct configuration of the `MutationObserver` behavior.
  By default, the options `childList`, `attributes`, and `subtree` are set to **true**. To change this, override them using **observerOptions**.

#### Return Value

* A function that, when called, **disconnects** the observer (`MutationObserver`) and stops listening for changes.

## How it works

**dom-watchdog** uses the native browser API [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) to detect changes in the DOM.

This API allows monitoring:

* Addition or removal of elements
* Changes in element attributes
* Changes in text content

---

## Browser Compatibility

`MutationObserver` is supported by most modern browsers (+96%):
[Can I use - MutationObserver](https://caniuse.com/mutationobserver)

## License

MIT © Jarod Cavalcante
[https://jarod.dev](https://jarod.dev)

## Contact

[jarodsim@gmail.com](mailto:jarodsim@gmail.com)
