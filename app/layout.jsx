import './portfolio.css';
import './tracking.css';
import './effects.css';

export const viewport = { themeColor: '#080b10', colorScheme: 'dark' };

export const metadata = {
  title: { default: 'Abner Santos — Engenheiro de IA | AVEN Software', template: '%s | Abner Santos' },
  description: 'Abner Santos: engenheiro de IA e desenvolvedor sênior. Agentes, RAG, MCP, fine-tuning e software que chega à produção. Especialista avançado em Meta Ads e rastreamento de dados.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
