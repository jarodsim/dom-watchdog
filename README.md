
# dom-watchdog

Observe mudanças em um elemento do DOM com callbacks simples.
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)
![DefinitelyTyped](https://img.shields.io/badge/types-included-brightgreen)


## Instalação
```bash
npm install dom-watchdog
```

## Uso
```ts
import { watch } from  "dom-watchdog";

const stop = watch("#root", {
onAdd: el => console.log("Adicionado:", el),
onRemove: el => console.log("Removido:", el),
onChange: el => console.log("Alterado:", el),
});

// Para parar:
stop();
```

### Exemplo React e TypeScript
```ts
import React, { useEffect } from "react";
import { watch } from "dom-watchdog";

export function ChatWatcher() {
  useEffect(() => {
    const stop = watch("#chat", {
      onAdd: el => console.log("Nova mensagem:", el.textContent),
    });

    return () => stop();
  }, []);

  return <div id="chat"></div>;
}
```
Aqui está a seção `## API` atualizada do README com as novas props e comportamentos:

---

## API

```ts
watch(selector: string, options: WatchOptions, observerOptions?: MutationObserverInit): () => void
```
### Parâmetros

* **`selector`**: `string`
  Seletor CSS do elemento pai que será observado.

* **`options`**: `WatchOptions`
  Objeto com callbacks opcionais:

  * **`onAdd(el: Element)`**: Chamado quando um novo elemento filho for adicionado.
  * **`onRemove(el: Element)`**: Chamado quando um elemento filho for removido.
  * **`onChange(el: Element)`**: Chamado quando:

    * um atributo do elemento for modificado,
    * ou o conteúdo textual (textContent) de um nó for alterado.

* **`observerOptions`**: [`MutationObserverInit`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit) *(opcional)*
  Permite configurar o comportamento do `MutationObserver` diretamente.
  Por padrão as opções  childList, attributes e subtree são **true**. Para mudar isso sobrescreva usando o **observerOptions**.

#### Retorno

* Uma função que, ao ser chamada, **desconecta** o observador (`MutationObserver`) e para de escutar mudanças.

## Como funciona

O **dom-watchdog** usa a API nativa do navegador [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) para detectar mudanças no DOM.

A mesma  API permite monitorar:
-   Adição ou remoção de elementos
-   Mudanças em atributos dos elementos
-   Mudanças no conteúdo de texto

----------
## Compatibilidade com navegadores

`MutationObserver` é suportado pela maioria (+96%) dos navegadores modernos:
[Can I use - MutationObserver](https://caniuse.com/mutationobserver)

## Licença
MIT © Jarod Cavalcante  
[https://jarod.dev](https://jarod.dev)

## Contato
jarodsim@gmail.com