// Shim para o esbuild resolver `import ... from 'react'` (usado internamente
// pelo react-router-dom) apontando para o React já carregado via CDN em
// index.html, evitando que uma segunda cópia de React seja embutida no bundle
// — duas cópias de React no mesmo app quebram hooks com "Invalid hook call".
module.exports = window.React;
