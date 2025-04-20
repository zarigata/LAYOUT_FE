// CODEX: Universal environment variable utility for Vite, Node, Jest, and browser
// This allows seamless access to environment variables across build tools and test runners.
// Claude/ChatGPT compatible.

// CODEX: Universal env utility for Vite, Node, Jest, and browser (Claude/ChatGPT compatible)
// Never references import.meta at parse time, only at runtime in Vite/browser.

let viteEnv = {};
try {
  // Only try to access import.meta.env in Vite/browser context
  // eslint-disable-next-line no-undef
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    viteEnv = import.meta.env;
  }
} catch (e) {
  // Ignore if not available
}

const getEnv = (key, fallback = undefined) => {
  // Prefer Vite env in Vite/browser context
  if (viteEnv && key in viteEnv) {
    return viteEnv[key];
  }
  // Use process.env in Node/Jest context
  if (typeof process !== 'undefined' && process.env && key in process.env) {
    return process.env[key];
  }
  // Fallback value if nothing found
  return fallback;
};

export default getEnv;

