import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://clinicaaurasa.com.br'),
  title: 'Clínica Aura | Estética avançada em Santo André',
  description: 'Clínica de estética em Santo André com foco em naturalidade, segurança e cuidado em cada detalhe. Conheça os tratamentos e agende sua avaliação.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Clínica Aura | Estética avançada em Santo André', description: 'Naturalidade e cuidado em cada detalhe.', url: 'https://clinicaaurasa.com.br', type: 'website', locale: 'pt_BR' },
  robots: { index: true, follow: true }
};
const gtm = process.env.NEXT_PUBLIC_GTM_ID;
const ga = process.env.NEXT_PUBLIC_GA4_ID;
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="pt-BR"><body>
    {gtm && <><Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}</Script><noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{display:'none',visibility:'hidden'}} title="Google Tag Manager" /></noscript></>}
    {ga && !gtm && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive"/><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}</Script></>}
    {children}
  </body></html>;
}
