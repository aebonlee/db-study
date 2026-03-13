import { useEffect } from 'react';

const useCodeCopy = () => {
  useEffect(() => {
    const addCopyButtons = () => {
      document.querySelectorAll('.code-block').forEach((block) => {
        if (block.querySelector('.code-copy-btn')) return;

        const pre = block.querySelector('pre');
        if (!pre) return;

        const btn = document.createElement('button');
        btn.className = 'code-copy-btn';
        btn.setAttribute('aria-label', 'Copy code');
        btn.innerHTML =
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<rect x="9" y="9" width="13" height="13" rx="2"/>' +
          '<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>' +
          '</svg>' +
          '<span>Copy</span>';

        btn.addEventListener('click', () => {
          const code = pre.textContent;
          navigator.clipboard.writeText(code).then(() => {
            btn.classList.add('copied');
            btn.querySelector('span').textContent = 'Copied!';
            setTimeout(() => {
              btn.classList.remove('copied');
              btn.querySelector('span').textContent = 'Copy';
            }, 2000);
          });
        });

        const header = block.querySelector('.code-header');
        if (header) {
          header.style.position = 'relative';
          header.appendChild(btn);
        } else {
          block.style.position = 'relative';
          block.appendChild(btn);
        }
      });
    };

    addCopyButtons();

    const observer = new MutationObserver(addCopyButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

export default useCodeCopy;
