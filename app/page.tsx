import LandingPage from '@/components/landing-page';
import { faq } from '@/lib/content';
const structuredData = {
  '@context':'https://schema.org', '@type':'FAQPage', mainEntity:faq.map(item=>({ '@type':'Question', name:item.question, acceptedAnswer:{'@type':'Answer',text:item.answer} }))
};
export default function Home(){ return <><LandingPage/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,'\\u003c')}}/></>; }
