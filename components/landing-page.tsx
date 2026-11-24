  'use client';

import Image from 'next/image';
import { useEffect, useState, type MouseEvent } from 'react';
import { ArrowRight, CalendarCheck2, Check, ChevronDown, Heart, Instagram, Leaf, MapPin, Menu, MessageCircle, ShieldCheck, Sparkles, Star, X } from 'lucide-react';
import { benefits, faq, journey, staff, treatments } from '@/lib/content';
import { installPhotoPreview } from '@/lib/photo-preview';

declare global { interface Window { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void; } }
const configuredWhatsApp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const whatsapp = /^\d{12,15}$/.test(configuredWhatsApp) ? configuredWhatsApp : '5511969993165';
const clinicAddress = process.env.NEXT_PUBLIC_CLINIC_ADDRESS || '';
const clinicHours = process.env.NEXT_PUBLIC_CLINIC_HOURS || '';
const mapEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || '';

function track(label: string, utmContent: string, params: URLSearchParams) {
  const event = { event: 'whatsapp_click', cta_label: label, cta_utm_content: utmContent, page_location: window.location.href,
    utm_source: params.get('utm_source') || '', utm_medium: params.get('utm_medium') || '', utm_campaign: params.get('utm_campaign') || '' };
  window.dataLayer?.push(event);
  window.gtag?.('event', 'whatsapp_click', event);
}

function whatsappHref(utmContent: string, campaign?: string | null) {
  const message = 'Olá! Vim pelo site da Clínica Aura e gostaria de agendar minha avaliação.' +
    (campaign ? ` Campanha: ${campaign}.` : '');
  const utms = new URLSearchParams({
    utm_source: 'site',
    utm_medium: 'whatsapp',
    utm_campaign: 'agendamento',
    utm_content: utmContent,
  });
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}&${utms}`;
}

function Cta({ children, utmContent, tone = 'dark', className = '' }: {
  children: string;
  utmContent: string;
  tone?: 'dark' | 'light' | 'outline';
  className?: string;
}) {
  function click(event: MouseEvent<HTMLAnchorElement>) {
    const params = new URLSearchParams(window.location.search);
    event.currentTarget.href = whatsappHref(utmContent, params.get('utm_campaign'));
    track(children, utmContent, params);
  }

  return (
    <a href={whatsappHref(utmContent)} className={`cta cta--${tone} ${className}`} target="_blank" rel="noopener noreferrer" onClick={click} aria-label={children}>
      <MessageCircle size={17} aria-hidden="true" />
      <span>{children}</span>
      <ArrowRight size={15} aria-hidden="true" />
    </a>
  );
}

function Photo({
  name,
  className = '',
  image,
}: {
  name: string;
  className?: string;
  image?: string;
}) {
  const [failed, setFailed] = useState(false);
  const photoName = image?.split('/').pop()?.replace(/\.[^.]+$/, '');

  return (
    <div className={`photo ${className}${photoName ? ` photo--${photoName}` : ''}`}>
      {image && !failed ? (
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="photo__image"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="photo__placeholder">
          <span className="photo__arc" aria-hidden="true" />
          <span className="photo__tag">FOTO REAL A INSERIR</span>
          <span className="photo__label">{name}</span>
        </div>
      )}
    </div>
  );
}

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={compact ? 'brand brand--compact' : 'brand'} href="#inicio" aria-label="Clínica Aura, início">
      <Image
        src="/logo/aura_logo_dourado_degrade.png"
        alt=""
        width={2048}
        height={2048}
        className="brand__image"
      />
    </a>
  );
}
const navigation=[['Tratamentos','#tratamentos'],['Sobre a Aura','#sobre'],['Equipe','#equipe'],['Depoimentos','#depoimentos'],['Dúvidas','#duvidas']];

export default function LandingPage(){
 const [mobileOpen,setMobileOpen]=useState(false);
 const [activeFaq,setActiveFaq]=useState<number|null>(null);
 useEffect(() => {
   if (process.env.NODE_ENV === 'development') return installPhotoPreview();
 }, []);
 return <>
 <header className="site-header"><div className="shell header-inner"><Mark/><nav className={`nav ${mobileOpen?'nav--open':''}`} aria-label="Navegação principal">{navigation.map(([t,h])=><a key={h} href={h} onClick={()=>setMobileOpen(false)}>{t}</a>)}</nav><div className="header-actions"><Cta utmContent="cabecalho" className="header-cta">Agendar minha avaliação</Cta><button type="button" className="menu-button" aria-label={mobileOpen?'Fechar menu':'Abrir menu'} aria-expanded={mobileOpen} onClick={()=>setMobileOpen(v=>!v)}>{mobileOpen?<X/>:<Menu/>}</button></div></div></header>
 <main>
 <section id="inicio" className="hero"><div className="hero__grain" aria-hidden="true"/><div className="shell hero__grid"><div className="hero__copy"><span className="eyebrow">ESTÉTICA AVANÇADA · SANTO ANDRÉ</span><h1>Clínica de estética em Santo André com foco em naturalidade e experiência.</h1><p>Rosto, pele e corpo, cuidados por profissionais que priorizam a naturalidade e segurança. Uma experiência pensada nos detalhes, do primeiro contato ao seu retorno.</p><Cta utmContent="inicio">Agendar minha avaliação</Cta></div><Photo name="Iva ou equipe na clínica, com luz natural" className="hero__photo" image="/fotos/hero.jpg"/></div></section>
 <section className="split-section concerns"><Photo name="Paciente real ou detalhe da clínica" className="split-photo" image="/fotos/espelho.jpg"/><div className="split-copy"><div className="section-content"><span className="eyebrow">UM CUIDADO QUE COMEÇA NA ESCUTA</span><h2>Você se olha no espelho e sente que algo mudou?</h2><p>O rosto mais cansado, a pele perdendo o viço, as mudanças do corpo, aquela sensação que você precisa dedicar mais tempo para si mesma.</p><p>Se isso soa familiar, você não está sozinha. Cada queixa tem uma causa diferente. Por isso, na Aura, a gente começa ouvindo você.</p><Cta utmContent="queixas">Quero conversar sobre o meu caso</Cta></div></div></section>
 <section id="sobre" className="split-section about"><Photo name="Iva e equipe na clínica" className="split-photo" image="/fotos/sobre.jpg"/><div className="split-copy"><div className="section-content"><span className="eyebrow">A NOSSA ESSÊNCIA</span><h2>Na Aura, a gente ajuda você a reencontrar a beleza que achou que tinha perdido.</h2><p>"Aura" é aquilo que cada pessoa transmite: sua energia! Para nós significa a sua individualidade, a sua presença, a sua beleza particular. E é disso que a gente cuida aqui na clínica.</p><p>A Aura nasceu do desejo de criar uma clínica que fosse além do procedimento. Um lugar onde você é ouvida, confia em quem cuida de você e sente vontade de voltar, não de passar por aqui uma vez. O desejo é de pertencer.</p><Cta utmContent="sobre">Agendar minha avaliação</Cta></div></div></section>
 <section id="tratamentos" className="section treatments"><div className="shell"><div className="section-intro centered"><span className="eyebrow">CUIDADO PERSONALIZADO</span><h2>Rosto, pele e corpo: cada tratamento começa pela avaliação.</h2><p>Você não precisa escolher sozinha. A indicação é definida depois de ouvir a sua queixa.</p></div><div className="treatment-grid">{treatments.map((group,i)=><article className="treatment-card" key={group.name}><div className="treatment-card__head"><span className="treatment-icon">{i===0?<Sparkles/>:i===1?<Leaf/>:<Heart/>}</span><h3>{group.name}</h3></div><ul>{group.items.map(item=><li key={item.name}><strong>{item.name}.</strong> {item.description}{'authorial' in item && item.authorial && <span className="authorial">Protocolo autoral</span>}</li>)}</ul></article>)}</div><div className="centered treatment-action"><Cta utmContent="tratamentos">Quero saber qual é o melhor tratamento para mim</Cta></div></div></section>
 <section id="diferenciais" className="section differentiators"><div className="shell differentiators__grid"><Photo name="Recepção e detalhes reais da clínica" className="differentiators__photo" image="/fotos/recepcao.jpg"/><div className="differentiators__body"><span className="eyebrow">NOSSO JEITO DE CUIDAR</span><h2>Por que escolher a Aura?</h2><p>Cuidar de si não deveria dar trabalho. Na Aura, a gente se antecipa ao que você vai precisar.</p><div className="benefits-grid">{benefits.map((b,i)=><div className="benefit" key={b.title}>{i===0?<CalendarCheck2/>:i===1?<ShieldCheck/>:i===2?<Heart/>:<Star/>}<h3>{b.title}</h3><p>{b.description}</p></div>)}</div><p className="closing-copy">A forma como pensamos nos detalhes é o que mais ouvimos de quem já passou por aqui. Não é por acaso: a Aura foi pensada assim.</p><Cta utmContent="diferenciais">Agendar minha avaliação</Cta></div></div></section>
 <section id="atendimento" className="section journey"><div className="shell"><div className="journey__intro"><span className="eyebrow">SIMPLES DO INÍCIO AO FIM</span><h2>Do primeiro contato ao seu retorno, você sabe o que vem depois.</h2><p>Muitas das pacientes que chegam até a Aura nunca fizeram nenhum procedimento e chegam com receio.</p><p>Queremos te falar que isso é normal! Por isso, o seu primeiro passo é só uma conversa: você não precisa chegar sabendo o que fazer.</p></div><div className="journey__steps">{journey.map((s,i)=><div className="journey-step" key={s.title}><span className="journey-step__number">{i+1}</span><h3>{s.title}</h3><p>{s.description}</p></div>)}</div><div className="centered"><Cta utmContent="atendimento">Começar pelo primeiro passo</Cta></div></div></section>
 <section id="equipe" className="section team"><div className="shell"><div className="section-intro centered"><span className="eyebrow">QUEM CUIDA DE VOCÊ</span><h2>Três profissionais, um mesmo jeito de cuidar.</h2></div><div className="team-grid">{staff.map(person=><article className="person" key={person.name}><Photo name={`Foto profissional de ${person.name}`} image={person.image} className="person__image"/><div className="person__info"><h3>{person.name}</h3><p className="person__role">{person.title}</p><p>{person.description}</p></div></article>)}</div><div className="centered"><Cta utmContent="equipe">Agendar minha avaliação</Cta></div></div></section>
 <section id="depoimentos" className="section social"><div className="shell social__grid"><div><span className="eyebrow">EXPERIÊNCIAS REAIS</span><h2>Quem já passou pela Aura.</h2><div className="pending-block"><span>Depoimentos reais autorizados</span><p>“Minha experiência na Aura foi maravilhosa! O atendimento é impecável, o ambiente é lindo e cada detalhe demonstra carinho e profissionalismo”</p></div></div><div><span className="eyebrow">NOSSO ESPAÇO</span><h2>Conheça a Aura por dentro.</h2><div className="gallery"><Photo name="Foto da recepção" image="/fotos/galeria-1.jpg"/><Photo name="Foto do ambiente de atendimento" image="/fotos/galeria-2.jpg"/><Photo name="Foto de detalhe da clínica" image="/fotos/galeria-3.jpg"/></div></div></div><div className="centered social__action"><Cta utmContent="depoimentos">Agendar minha avaliação</Cta></div></section>
 <section id="duvidas" className="section faq"><div className="shell faq__grid"><div className="faq__intro"><span className="eyebrow">TIRE SUAS DÚVIDAS</span><h2>Perguntas frequentes sobre a Clínica Aura.</h2><p>Encontre respostas para as dúvidas mais comuns antes de agendar.</p></div><div className="faq__items">{faq.map((q,i)=><div className="faq-item" key={q.question}><button type="button" className="faq-item__question" aria-expanded={activeFaq===i} onClick={()=>setActiveFaq(activeFaq===i?null:i)}><span>{q.question}</span><ChevronDown className={activeFaq===i?'is-rotated':''}/></button>{activeFaq===i&&<div className="faq-item__answer"><p>{q.answer}{i===10&&clinicAddress?` Endereço: ${clinicAddress}.`:''}{i===10&&clinicHours?` Horários: ${clinicHours}.`:''}</p></div>}</div>)}</div></div></section>
 <section id="contato" className="contact"><div className="shell contact__grid"><div><span className="eyebrow eyebrow--light">SEU PRÓXIMO PASSO</span><h2>O primeiro passo é uma conversa.</h2></div><p>Conte para a gente o que te incomoda no espelho hoje. A gente te escuta, avalia o seu caso e cuida do resto.</p><div><Cta utmContent="contato" tone="light">Agendar minha avaliação pelo WhatsApp</Cta></div></div></section>
 <section className="location"><div className="shell location__grid"><div><span className="eyebrow">VENHA NOS CONHECER</span><h2>Clínica Aura · Avenida Martim Francisco, 1054 Sala 06 - Santo André - SP</h2>{clinicAddress?<p>{clinicAddress}</p>:<p className="dev-notice dev-notice--dark">{/*Endereço completo pendente de confirmação.*/}</p>}{clinicHours?<p>{clinicHours}</p>:<p className="dev-notice dev-notice--dark">{/*Dias e horários de atendimento a informar.*/}</p>}<p>{/*Atendemos pacientes de Santo André, São Caetano do Sul e São Paulo.*/}</p></div><div className="map-placeholder">{mapEmbed.startsWith('https://www.google.com/maps/embed')?<iframe title="Mapa da Clínica Aura" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>:<><MapPin size={35}/><strong>Mapa do Google</strong><span>cod</span></>}</div></div></section>
 </main>
 <footer className="footer"><div className="shell footer__grid"><Mark compact/><p>Clínica Aura · Estética avançada em Santo André<br/>Responsável técnica: Iva</p><div className="footer__links"><a href="https://www.instagram.com/aura.santoandre/" target="_blank" rel="noopener noreferrer"><Instagram size={18}/> @aura.santoandre</a><a href="/politica-de-privacidade">Política de privacidade</a></div></div></footer>
 </>;
}
