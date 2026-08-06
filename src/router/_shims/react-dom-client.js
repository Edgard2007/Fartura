// Shim para `import ... from 'react-dom/client'`: no React 18 UMD (global),
// createRoot já vem dependurado no próprio objeto ReactDOM.
module.exports = window.ReactDOM;
