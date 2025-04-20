// CODEX: Next.js custom App with LanguageProvider and ThemeProvider
import type { AppProps } from 'next/app';
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  // CODEX: Wrap the entire app with ThemeProvider and LanguageProvider for global theming and multilingual support
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
