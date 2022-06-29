'use strict';
mermaid.initialize({
   startOnLoad: false,
   theme: 'forest',
});

const mermaids = document.querySelectorAll('.mermaid');

for (const mermaidEl of mermaids) {
   mermaidEl.getElementsByClassName('mermaid-svg')[0].innerHTML =
      mermaid.render(
         `mermaid-${mermaidEl.id}-final`,
         mermaidEl.getElementsByClassName('mermaid-code')[0]?.textContent || ''
      );
   mermaidEl.classList.add('mermaid-rendered');
}
