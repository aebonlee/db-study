import { useEffect } from 'react';

const useTableScroller = () => {
  useEffect(() => {
    const createArrow = (direction) => {
      const arrow = document.createElement('button');
      arrow.className = `table-scroll-arrow table-scroll-arrow-${direction}`;
      arrow.setAttribute('aria-label', direction === 'left' ? '왼쪽 스크롤' : '오른쪽 스크롤');
      arrow.textContent = direction === 'left' ? '\u2039' : '\u203A';
      arrow.type = 'button';
      return arrow;
    };

    const addScrollControls = (scrollEl, arrowParent) => {
      if (arrowParent.querySelector('.table-scroll-arrow')) return;

      arrowParent.style.position = 'relative';

      const leftArrow = createArrow('left');
      const rightArrow = createArrow('right');
      arrowParent.appendChild(leftArrow);
      arrowParent.appendChild(rightArrow);

      const update = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
        const canScroll = scrollWidth > clientWidth + 1;
        leftArrow.style.display = canScroll && scrollLeft > 1 ? 'flex' : 'none';
        rightArrow.style.display = canScroll && scrollLeft < scrollWidth - clientWidth - 1 ? 'flex' : 'none';
      };

      leftArrow.addEventListener('click', () => scrollEl.scrollBy({ left: -150, behavior: 'smooth' }));
      rightArrow.addEventListener('click', () => scrollEl.scrollBy({ left: 150, behavior: 'smooth' }));
      scrollEl.addEventListener('scroll', update);

      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver(update);
        ro.observe(scrollEl);
      }

      setTimeout(update, 200);
    };

    const setup = () => {
      document.querySelectorAll('.lesson-table').forEach((table) => {
        if (table.closest('.table-scroll-container')) return;

        const container = document.createElement('div');
        container.className = 'table-scroll-container';

        const inner = document.createElement('div');
        inner.className = 'table-scroll-inner';

        table.parentNode.insertBefore(container, table);
        inner.appendChild(table);
        container.appendChild(inner);

        addScrollControls(inner, container);
      });
    };

    setup();

    const observer = new MutationObserver(setup);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
};

export default useTableScroller;
