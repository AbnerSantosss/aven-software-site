import './globals.css';
import './refinement.css';
import './covers.css';
import './mobile.css';
import './cards.css';
import './tracking.css';
import './expertise.css';

export const metadata = {
  title: 'AVEN Software — Software, dados e conexões',
  description: 'Abner Santos: desenvolvedor sênior e especialista em tráfego pago e rastreamento. Meta Ads, Google Ads, GA4, servidores próprios e painéis personalizados.',
  icons: { icon: '/icon.svg' },
};

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
