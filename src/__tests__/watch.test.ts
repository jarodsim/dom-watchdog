import { describe, it, expect, vi, beforeEach } from 'vitest';
import { watch } from '../index';

describe('DOM Watchdog', () => {
  let container: HTMLElement;
  let el: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = `<div id="root"></div>`;
    container = document.getElementById('root')!;
    el = document.createElement('p');
  });

  it('triggers onAdd when element is added', async () => {
    const onAdd = vi.fn();
    const stop = watch('#root', { onAdd });

    container.appendChild(el);
    await new Promise((r) => setTimeout(r, 50));
    expect(onAdd).toHaveBeenCalledWith(el);
    stop();
  });

  it('triggers onRemove when element is removed', async () => {
    const onRemove = vi.fn();
    container.appendChild(el);

    const stop = watch('#root', { onRemove });
    container.removeChild(el);

    await new Promise((r) => setTimeout(r, 50));
    expect(onRemove).toHaveBeenCalledWith(el);
    stop();
  });

  describe('onChange triggers', () => {
    it('when element attributes change', async () => {
      const onChange = vi.fn();
      container.appendChild(el);

      const stop = watch('#root', { onChange });
      el.style.width = '100%';

      await new Promise((r) => setTimeout(r, 50));
      expect(onChange).toHaveBeenCalledWith(el);
      stop();
    });

    it('when element textContent changes', async () => {
      const onChange = vi.fn();

      const textNode = document.createTextNode('original');
      el.appendChild(textNode);
      container.appendChild(el);

      const stop = watch(
        '#root',
        { onChange },
        {
          characterData: true,
          subtree: true,
        }
      );

      textNode.textContent = 'alterado';

      await new Promise((r) => setTimeout(r, 50));
      expect(onChange).toHaveBeenCalledWith(el);
      stop();
    });

    it('when text node content changes with characterData enabled', async () => {
      const onChange = vi.fn();
      const textNode = document.createTextNode('original');
      el.appendChild(textNode);
      container.appendChild(el);

      const stop = watch(
        '#root',
        { onChange },
        { characterData: true, subtree: true }
      );
      textNode.textContent = 'modified';

      await new Promise((r) => setTimeout(r, 20));
      expect(onChange).toHaveBeenCalledWith(el);
      stop();
    });
  });
});
