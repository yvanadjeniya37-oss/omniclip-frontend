import { useState, useRef, useEffect } from "react";

const T = {
  fr: {
    nav: { login:"Connexion", trial:"Essai gratuit" },
    hero: { badge:"🚀 3 vidéos gratuites — sans carte bancaire", t1:"1 vidéo.", t2:"12 formats.", t3:"2 minutes.", sub:"Arrête de perdre 3h/jour en montage. OmniClip génère automatiquement tous tes formats pour TikTok, Reels, YouTube Shorts et 9 autres plateformes.", cta1:"Commencer gratuitement →", cta2:"Voir la démo", plabel:"12 formats générés automatiquement" },
    how: { label:"Comment ça marche", title:"Simple comme 1-2-3", steps:[{n:"01",title:"Upload ta vidéo",desc:"MP4 ou MOV, jusqu'à 10 minutes. Depuis ton téléphone ou ton PC."},{n:"02",title:"L'IA travaille",desc:"Whisper transcrit, Hook Detector identifie les meilleurs moments, FFmpeg découpe et recadre."},{n:"03",title:"Télécharge tes 12 vidéos",desc:"Toutes prêtes à poster. Sous-titres brûlés, logo ajouté, formats optimisés."}] },
    pricing: { label:"Tarifs", title:"Une pelle à 29€/mois", cta:"Démarrer maintenant →", plans:[{id:"trial",label:"Gratuit",price:"0€",period:"pour toujours",features:["3 vidéos offertes","Tous les formats","Sans CB"],badge:null},{id:"monthly",label:"Mensuel",price:"29€",period:"/mois",features:["Vidéos illimitées","Hook Detector IA","Sous-titres + Logo","Support prioritaire"],badge:null},{id:"annual",label:"Annuel",price:"249€",period:"/an",features:["Tout le plan Mensuel","Garantie 30 jours","Économise 99€/an","Accès bêta prioritaire"],badge:"2 mois offerts"}] },
    auth: { wb:"Bon retour 👋", ca:"Créer un compte", ls:"Connecte-toi à ton espace OmniClip", ss:"3 vidéos gratuites — sans CB", em:"EMAIL", pw:"MOT DE PASSE", ep:"toi@exemple.com", pp:"••••••••", lb:"Se connecter →", sb:"Créer mon compte →", na:"Pas encore de compte ? ", ha:"Déjà inscrit ? ", su:"S'inscrire", si:"Se connecter" },
    dash: { nv:"Nouvelle vidéo", mv:"Mes vidéos", st:"Paramètres", fp:"PLAN GRATUIT", vl:"2 vidéos restantes", title:"Nouvelle vidéo", sub:"Upload ta vidéo et génère 12 formats en 2 minutes", dh:"Glisse ta vidéo ici", ds:"ou clique pour parcourir · MP4 / MOV · max 10 min", ready:"Prête à traiter", lt:"Logo personnalisé", lsub:"PNG transparent recommandé", lb:"Choisir mon logo", wt:"Sous-titres Whisper", ws:"Transcription FR automatique", fl:"Formats générés", gen:"⚡ Générer mes 12 vidéos →", uf:"Upload une vidéo d'abord" },
    proc: { title:"OmniClip travaille…", sub:"Ne ferme pas cette page", steps:[{label:"Transcription Whisper AI",detail:"Détection de la parole"},{label:"Analyse Hook Detector",detail:"Identification des moments viraux"},{label:"Recadrage intelligent",detail:"16:9 → 9:16 sans couper les têtes"},{label:"Sous-titres brûlés",detail:"Texte incrusté dans la vidéo"},{label:"Overlay logo",detail:"Logo positionné en bas à droite"},{label:"Export multi-formats",detail:"Génération des 12 vidéos finales"}] },
    res: { title:"Tes 12 vidéos sont prêtes !", sub:"Sous-titres brûlés · Logo intégré · Formats optimisés", da:"⬇ Tout télécharger (.zip)", nv:"+ Nouvelle vidéo", done:"✓ Téléchargé", dl:"⬇ Télécharger" },
    pay: { title:"Mode de paiement", sub:"Choisis la méthode qui te convient", back:"← Retour", methods:{card:{label:"Carte bancaire",desc:"Visa · Mastercard · CB"},mm:{label:"Mobile Money",desc:"MTN · Orange Money"},moov:{label:"Moov Money",desc:"Flooz — Bénin & Togo"},crypto:{label:"USDT TRC20",desc:"Crypto · Réseau TRON"}}, cn:"Numéro de carte", exp:"Expiration", cvv:"CVV", nm:"Nom sur la carte", ph:"Numéro de téléphone", wa:"Adresse wallet USDT TRC20", wn:"Envoie exactement 29 USDT à cette adresse puis envoie ta preuve de paiement à support@omniclip.ai", cp:"Copier", cpd:"Copié !", pay:"Payer maintenant →", sms:"📲 Tu recevras un message de confirmation. Valide le paiement de 29€ sur ton téléphone." },
  },
  en: {
    nav: { login:"Log in", trial:"Free trial" },
    hero: { badge:"🚀 3 free videos — no credit card needed", t1:"1 video.", t2:"12 formats.", t3:"2 minutes.", sub:"Stop wasting 3 hours a day editing. OmniClip automatically generates all your formats for TikTok, Reels, YouTube Shorts and 9 more platforms.", cta1:"Start for free →", cta2:"Watch demo", plabel:"12 formats generated automatically" },
    how: { label:"How it works", title:"As easy as 1-2-3", steps:[{n:"01",title:"Upload your video",desc:"MP4 or MOV, up to 10 minutes. From your phone or PC."},{n:"02",title:"AI does the work",desc:"Whisper transcribes, Hook Detector finds viral moments, FFmpeg clips and reframes."},{n:"03",title:"Download your 12 videos",desc:"All ready to post. Burned subtitles, logo added, optimised formats."}] },
    pricing: { label:"Pricing", title:"A shovel for €29/month", cta:"Get started now →", plans:[{id:"trial",label:"Free",price:"€0",period:"forever",features:["3 free videos","All formats","No credit card"],badge:null},{id:"monthly",label:"Monthly",price:"€29",period:"/month",features:["Unlimited videos","AI Hook Detector","Subtitles + Logo","Priority support"],badge:null},{id:"annual",label:"Annual",price:"€249",period:"/year",features:["Everything in Monthly","30-day guarantee","Save €99/year","Beta priority access"],badge:"2 months free"}] },
    auth: { wb:"Welcome back 👋", ca:"Create an account", ls:"Log in to your OmniClip workspace", ss:"3 free videos — no credit card", em:"EMAIL", pw:"PASSWORD", ep:"you@example.com", pp:"••••••••", lb:"Log in →", sb:"Create my account →", na:"No account yet? ", ha:"Already registered? ", su:"Sign up", si:"Sign in" },
    dash: { nv:"New video", mv:"My videos", st:"Settings", fp:"FREE PLAN", vl:"2 videos remaining", title:"New video", sub:"Upload your video and generate 12 formats in 2 minutes", dh:"Drop your video here", ds:"or click to browse · MP4 / MOV · max 10 min", ready:"Ready to process", lt:"Custom logo", lsub:"Transparent PNG recommended", lb:"Choose my logo", wt:"Whisper subtitles", ws:"Automatic transcription", fl:"Generated formats", gen:"⚡ Generate my 12 videos →", uf:"Upload a video first" },
    proc: { title:"OmniClip is working…", sub:"Don't close this page", steps:[{label:"Whisper AI transcription",detail:"Speech detection"},{label:"Hook Detector analysis",detail:"Identifying viral moments"},{label:"Smart reframing",detail:"16:9 → 9:16 without cutting heads"},{label:"Burned subtitles",detail:"Text embedded in video"},{label:"Logo overlay",detail:"Logo placed bottom-right"},{label:"Multi-format export",detail:"Generating 12 final videos"}] },
    res: { title:"Your 12 videos are ready!", sub:"Burned subtitles · Logo integrated · Optimised formats", da:"⬇ Download all (.zip)", nv:"+ New video", done:"✓ Downloaded", dl:"⬇ Download" },
    pay: { title:"Payment method", sub:"Choose the method that works for you", back:"← Back", methods:{card:{label:"Credit / Debit Card",desc:"Visa · Mastercard"},mm:{label:"Mobile Money",desc:"MTN · Orange Money"},moov:{label:"Moov Money",desc:"Flooz — Benin & Togo"},crypto:{label:"USDT TRC20",desc:"Crypto · TRON network"}}, cn:"Card number", exp:"Expiry", cvv:"CVV", nm:"Name on card", ph:"Phone number", wa:"USDT TRC20 wallet address", wn:"Send exactly 29 USDT to this address then email your proof of payment to support@omniclip.ai", cp:"Copy", cpd:"Copied!", pay:"Pay now →", sms:"📲 You will receive a confirmation message. Validate the €29 payment on your phone." },
  },
};

const PLATFORMS = [
  {id:"tiktok",name:"TikTok",icon:"♪",format:"9:16",color:"#ff0050"},
  {id:"yt-short",name:"YouTube Short",icon:"▶",format:"9:16",color:"#ff0000"},
  {id:"yt-feed",name:"YouTube Feed",icon:"▶",format:"16:9",color:"#ff0000"},
  {id:"ig-reels",name:"Instagram Reels",icon:"◈",format:"9:16",color:"#e1306c"},
  {id:"ig-feed",name:"Instagram Feed",icon:"◈",format:"1:1",color:"#e1306c"},
  {id:"fb-feed",name:"Facebook Feed",icon:"f",format:"16:9",color:"#1877f2"},
  {id:"fb-story",name:"Facebook Story",icon:"f",format:"9:16",color:"#1877f2"},
  {id:"linkedin",name:"LinkedIn Feed",icon:"in",format:"16:9",color:"#0a66c2"},
  {id:"snapchat",name:"Snapchat Spotlight",icon:"👻",format:"9:16",color:"#f7c900"},
  {id:"snap-story",name:"Snapchat Story",icon:"👻",format:"9:16",color:"#f7c900"},
  {id:"whatsapp",name:"WhatsApp Status",icon:"◉",format:"9:16",color:"#25d366"},
  {id:"pinterest",name:"Pinterest Idea",icon:"P",format:"2:3",color:"#e60023"},
];

const LANGS = [{code:"fr",flag:"🇫🇷",label:"FR"},{code:"en",flag:"🇬🇧",label:"EN"}];
const WALLET = "TXomniclipWalletUSDTRC20Example";

export default function App() {
  const [lang, setLang] = useState("fr");
  const [dark, setDark] = useState(true);
  const [screen, setScreen] = useState("landing");
  const [authMode, setAuthMode] = useState("login");
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [drag, setDrag] = useState(false);
  const [step, setStep] = useState(0);
  const [prog, setProg] = useState(0);
  const [payScreen, setPayScreen] = useState(false);
  const fileRef = useRef();
  const logoRef = useRef();
  const t = T[lang];

  const bg    = dark ? "#0b0b10" : "#f4f4f8";
  const surf  = dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)";
  const brd   = dark ? "rgba(255,255,255,.09)" : "rgba(0,0,0,.11)";
  const txt   = dark ? "#f0f0f5" : "#0a0a10";
  const muted = dark ? "rgba(240,240,245,.42)" : "rgba(10,10,20,.42)";
  const inp   = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)";

  useEffect(()=>{
    if(screen!=="processing") return;
    let s=0,p=0;
    setStep(0); setProg(0);
    const iv = setInterval(()=>{
      p+=2; setProg(p);
      if(p%17===0 && s<5){s++;setStep(s);}
      if(p>=100){clearInterval(iv);setTimeout(()=>setScreen("results"),500);}
    },80);
    return ()=>clearInterval(iv);
  },[screen]);

  const handleFile = f => {
    if(f&&(f.type.includes("video")||f.name.endsWith(".mp4")||f.name.endsWith(".mov"))) setFile(f);
  };

  const LangThemeBar = ({justify="flex-end"}) => (
    <div style={{display:"flex",justifyContent:justify,alignItems:"center",gap:8,flexWrap:"wrap"}}>
      <div style={{display:"flex",background:surf,borderRadius:10,padding:3,border:`1px solid ${brd}`}}>
        {LANGS.map(l=>(
          <button key={l.code} onClick={()=>setLang(l.code)}
            style={{padding:"6px 14px",background:lang===l.code?"linear-gradient(135deg,#8b5cf6,#ec4899)":"transparent",border:"none",borderRadius:8,color:lang===l.code?"#fff":muted,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:700,transition:"all .15s",display:"flex",alignItems:"center",gap:5}}>
            {l.flag} {l.label}
          </button>
        ))}
      </div>
      <button onClick={()=>setDark(!dark)}
        style={{padding:"7px 13px",background:surf,border:`1px solid ${brd}`,borderRadius:10,color:txt,cursor:"pointer",fontFamily:"inherit",fontSize:17,lineHeight:1}}>
        {dark?"☀️":"🌙"}
      </button>
    </div>
  );

  const Nav = () => (
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 36px",borderBottom:`1px solid ${brd}`,background:bg,position:"sticky",top:0,zIndex:99,flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>{setScreen("landing");setPayScreen(false);}}>
        <div style={{width:30,height:30,background:"linear-gradient(135deg,#8b5cf6,#ec4899)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15}}>⚡</div>
        <span style={{fontWeight:800,fontSize:18,color:txt,letterSpacing:"-0.4px"}}>OmniClip <span style={{color:"#8b5cf6"}}>AI</span></span>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
        <LangThemeBar justify="flex-end"/>
        <button onClick={()=>{setAuthMode("login");setScreen("auth");}}
          style={{padding:"9px 18px",background:"transparent",border:`1px solid ${brd}`,borderRadius:10,color:txt,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:14}}>
          {t.nav.login}
        </button>
        <button onClick={()=>{setAuthMode("signup");setScreen("auth");}}
          style={{padding:"9px 18px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:10,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:14}}>
          {t.nav.trial}
        </button>
      </div>
    </nav>
  );

  if(payScreen) return <PayPage t={t} Nav={Nav} dark={dark} bg={bg} surf={surf} brd={brd} txt={txt} muted={muted} inp={inp} onBack={()=>setPayScreen(false)}/>;

  // ── LANDING ──────────────────────────────────────────────────────────────────
  if(screen==="landing") return (
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`.hov{transition:all .2s}.hov:hover{transform:translateY(-2px)}.ch{transition:all .2s}.ch:hover{transform:translateY(-3px);border-color:rgba(139,92,246,.45)!important}`}</style>
      <Nav/>
      {/* HERO */}
      <section style={{textAlign:"center",padding:"80px 24px 56px",position:"relative"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 70% 50% at 50% 0%,rgba(139,92,246,.13),transparent)",pointerEvents:"none"}}/>
        <div style={{display:"inline-block",background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.28)",borderRadius:999,padding:"6px 18px",fontSize:13,color:"#a78bfa",marginBottom:28,fontWeight:600}}>
          {t.hero.badge}
        </div>
        <h1 style={{fontSize:"clamp(36px,6vw,76px)",fontWeight:800,lineHeight:1.06,letterSpacing:"-2px",margin:"0 0 22px",color:txt}}>
          {t.hero.t1}<br/>
          <span style={{background:"linear-gradient(135deg,#8b5cf6,#ec4899,#f59e0b)",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent"}}>{t.hero.t2}</span><br/>
          {t.hero.t3}
        </h1>
        <p style={{fontSize:18,color:muted,maxWidth:500,margin:"0 auto 38px",lineHeight:1.65}}>{t.hero.sub}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="hov" onClick={()=>{setAuthMode("signup");setScreen("auth");}}
            style={{padding:"15px 36px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:17,boxShadow:"0 8px 40px rgba(139,92,246,.35)"}}>
            {t.hero.cta1}
          </button>
          <button className="hov" onClick={()=>setScreen("dashboard")}
            style={{padding:"15px 36px",background:surf,border:`1px solid ${brd}`,borderRadius:14,color:txt,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:17}}>
            {t.hero.cta2}
          </button>
        </div>
      </section>

      {/* PLATFORMS */}
      <section style={{maxWidth:880,margin:"0 auto",padding:"0 20px 72px"}}>
        <p style={{textAlign:"center",color:muted,fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:20}}>{t.hero.plabel}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(126px,1fr))",gap:9}}>
          {PLATFORMS.map(p=>(
            <div key={p.id} className="ch" style={{background:surf,border:`1px solid ${brd}`,borderRadius:14,padding:"15px 10px",textAlign:"center"}}>
              <div style={{fontSize:19,marginBottom:6}}>{p.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:txt}}>{p.name}</div>
              <div style={{fontSize:10,color:muted,marginTop:3}}>{p.format}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:dark?"rgba(255,255,255,.02)":"rgba(0,0,0,.02)",borderTop:`1px solid ${brd}`,borderBottom:`1px solid ${brd}`,padding:"68px 24px"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <p style={{textAlign:"center",color:muted,fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>{t.how.label}</p>
          <h2 style={{textAlign:"center",fontSize:"clamp(26px,4vw,46px)",fontWeight:800,letterSpacing:"-1px",marginBottom:50,color:txt}}>{t.how.title}</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:20}}>
            {t.how.steps.map(s=>(
              <div key={s.n} style={{background:surf,border:`1px solid ${brd}`,borderRadius:20,padding:28}}>
                <div style={{fontSize:42,fontWeight:800,color:"rgba(139,92,246,.22)",lineHeight:1,marginBottom:13}}>{s.n}</div>
                <div style={{fontWeight:700,fontSize:16,marginBottom:8,color:txt}}>{s.title}</div>
                <div style={{color:muted,lineHeight:1.6,fontSize:14}}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{maxWidth:820,margin:"0 auto",padding:"68px 24px"}}>
        <p style={{textAlign:"center",color:muted,fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:12}}>{t.pricing.label}</p>
        <h2 style={{textAlign:"center",fontSize:"clamp(26px,4vw,46px)",fontWeight:800,letterSpacing:"-1px",marginBottom:42,color:txt}}>{t.pricing.title}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
          {t.pricing.plans.map(p=>(
            <div key={p.id} className="ch" style={{background:p.id==="annual"?(dark?"linear-gradient(135deg,rgba(139,92,246,.13),rgba(236,72,153,.07))":"rgba(139,92,246,.05)"):surf,border:`1px solid ${p.id==="annual"?"rgba(139,92,246,.4)":brd}`,borderRadius:20,padding:26,position:"relative"}}>
              {p.badge&&<div style={{position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",borderRadius:999,padding:"4px 14px",fontSize:11,fontWeight:700,color:"#fff",whiteSpace:"nowrap"}}>{p.badge}</div>}
              <div style={{fontWeight:700,fontSize:11,color:muted,marginBottom:6,textTransform:"uppercase",letterSpacing:1}}>{p.label}</div>
              <div style={{fontSize:36,fontWeight:800,letterSpacing:"-1px",marginBottom:2,color:txt}}>{p.price}</div>
              <div style={{fontSize:12,color:muted,marginBottom:16}}>{p.period}</div>
              {p.features.map(f=>(
                <div key={f} style={{display:"flex",gap:7,alignItems:"center",marginBottom:8,fontSize:13,color:dark?"rgba(240,240,245,.7)":"rgba(10,10,20,.65)"}}>
                  <span style={{color:"#8b5cf6",fontWeight:700}}>✓</span>{f}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginTop:28}}>
          <button className="hov" onClick={()=>setPayScreen(true)}
            style={{padding:"15px 42px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:17,boxShadow:"0 8px 36px rgba(139,92,246,.35)"}}>
            {t.pricing.cta}
          </button>
        </div>
      </section>
    </div>
  );

  // ── AUTH ─────────────────────────────────────────────────────────────────────
  if(screen==="auth") return (
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <Nav/>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 24px"}}>
        <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:24,padding:"36px 32px",width:"100%",maxWidth:400}}>
          <h2 style={{fontSize:26,fontWeight:800,letterSpacing:"-0.5px",marginBottom:6,color:txt}}>{authMode==="login"?t.auth.wb:t.auth.ca}</h2>
          <p style={{color:muted,marginBottom:28,fontSize:14}}>{authMode==="login"?t.auth.ls:t.auth.ss}</p>
          <div style={{marginBottom:14}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:muted,marginBottom:6}}>{t.auth.em}</label>
            <input type="email" placeholder={t.auth.ep} style={{width:"100%",padding:"12px 14px",background:inp,border:`1px solid ${brd}`,borderRadius:11,color:txt,fontFamily:"inherit",fontSize:15,boxSizing:"border-box",outline:"none"}}/>
          </div>
          <div style={{marginBottom:22}}>
            <label style={{display:"block",fontSize:11,fontWeight:700,color:muted,marginBottom:6}}>{t.auth.pw}</label>
            <input type="password" placeholder={t.auth.pp} style={{width:"100%",padding:"12px 14px",background:inp,border:`1px solid ${brd}`,borderRadius:11,color:txt,fontFamily:"inherit",fontSize:15,boxSizing:"border-box",outline:"none"}}/>
          </div>
          <button onClick={()=>setScreen("dashboard")}
            style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:16,marginBottom:14}}>
            {authMode==="login"?t.auth.lb:t.auth.sb}
          </button>
          <div style={{textAlign:"center",fontSize:13,color:muted}}>
            {authMode==="login"?t.auth.na:t.auth.ha}
            <span onClick={()=>setAuthMode(authMode==="login"?"signup":"login")} style={{color:"#8b5cf6",cursor:"pointer",fontWeight:700}}>
              {authMode==="login"?t.auth.su:t.auth.si}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // ── DASHBOARD ────────────────────────────────────────────────────────────────
  if(screen==="dashboard") return (
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`.hov{transition:all .2s}.hov:hover{transform:translateY(-2px)}`}</style>
      <div style={{display:"flex",minHeight:"100vh"}}>
        {/* SIDEBAR */}
        <aside style={{width:200,background:dark?"rgba(255,255,255,.025)":"rgba(0,0,0,.025)",borderRight:`1px solid ${brd}`,padding:"22px 14px",flexShrink:0,position:"relative"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:32,paddingLeft:6,cursor:"pointer"}} onClick={()=>setScreen("landing")}>
            <div style={{width:26,height:26,background:"linear-gradient(135deg,#8b5cf6,#ec4899)",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>⚡</div>
            <span style={{fontWeight:800,fontSize:15,color:txt}}>OmniClip</span>
          </div>
          {[{icon:"⬆",key:"nv",active:true},{icon:"📁",key:"mv",active:false},{icon:"⚙",key:"st",active:false}].map(i=>(
            <div key={i.key} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 10px",borderRadius:10,marginBottom:3,background:i.active?"rgba(139,92,246,.12)":"transparent",color:i.active?"#a78bfa":muted,cursor:"pointer",fontWeight:i.active?700:400}}>
              <span style={{fontSize:14}}>{i.icon}</span>
              <span style={{fontSize:13}}>{t.dash[i.key]}</span>
            </div>
          ))}
          <div style={{position:"absolute",bottom:18,left:12,right:12}}>
            <div style={{background:"rgba(139,92,246,.09)",border:"1px solid rgba(139,92,246,.2)",borderRadius:12,padding:"12px 10px"}}>
              <div style={{fontSize:10,color:"#a78bfa",fontWeight:700,marginBottom:2}}>{t.dash.fp}</div>
              <div style={{fontSize:12,color:muted}}>{t.dash.vl}</div>
              <div style={{marginTop:7,height:3,background:dark?"rgba(255,255,255,.07)":"rgba(0,0,0,.08)",borderRadius:99}}>
                <div style={{width:"33%",height:"100%",background:"linear-gradient(90deg,#8b5cf6,#ec4899)",borderRadius:99}}/>
              </div>
            </div>
          </div>
        </aside>
        {/* MAIN */}
        <main style={{flex:1,padding:"36px 40px",overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"flex-end",marginBottom:26}}>
            <LangThemeBar/>
          </div>
          <h1 style={{fontSize:28,fontWeight:800,letterSpacing:"-1px",marginBottom:4,color:txt}}>{t.dash.title}</h1>
          <p style={{color:muted,marginBottom:32,fontSize:14}}>{t.dash.sub}</p>
          {/* DROP ZONE */}
          <div onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)}
            onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0]);}}
            onClick={()=>fileRef.current.click()}
            style={{border:`2px dashed ${drag||file?"#8b5cf6":"rgba(139,92,246,.22)"}`,borderRadius:18,padding:"52px 32px",textAlign:"center",cursor:"pointer",background:file?"rgba(139,92,246,.05)":surf,transition:"all .2s",marginBottom:22}}>
            <input ref={fileRef} type="file" accept="video/mp4,video/mov,.mp4,.mov" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
            {file
              ?<><div style={{fontSize:42,marginBottom:8}}>✅</div><div style={{fontWeight:700,fontSize:16,color:txt}}>{file.name}</div><div style={{color:muted,fontSize:12,marginTop:4}}>{(file.size/1024/1024).toFixed(1)} MB · {t.dash.ready}</div></>
              :<><div style={{fontSize:42,marginBottom:12,opacity:.3}}>🎬</div><div style={{fontWeight:700,fontSize:16,color:txt}}>{t.dash.dh}</div><div style={{color:muted,fontSize:12,marginTop:5}}>{t.dash.ds}</div></>
            }
          </div>
          {/* OPTIONS */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:24}}>
            <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:14,padding:20}}>
              <div style={{fontWeight:700,marginBottom:4,color:txt,fontSize:14}}>{t.dash.lt}</div>
              <div style={{color:muted,fontSize:12,marginBottom:11}}>{t.dash.lsub}</div>
              <button onClick={()=>logoRef.current.click()} style={{padding:"8px 16px",background:logo?"rgba(139,92,246,.18)":surf,border:`1px solid ${logo?"rgba(139,92,246,.4)":brd}`,borderRadius:9,color:logo?"#a78bfa":muted,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:13}}>
                {logo?`✓ ${logo.name}`:t.dash.lb}
              </button>
              <input ref={logoRef} type="file" accept="image/png" style={{display:"none"}} onChange={e=>setLogo(e.target.files[0])}/>
            </div>
            <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:14,padding:20}}>
              <div style={{fontWeight:700,marginBottom:4,color:txt,fontSize:14}}>{t.dash.wt}</div>
              <div style={{color:muted,fontSize:12,marginBottom:11}}>{t.dash.ws}</div>
              <div style={{display:"flex",gap:6}}>
                {["Auto","Gros","Discret"].map((s,i)=>(
                  <button key={s} style={{padding:"7px 12px",background:i===0?"rgba(139,92,246,.18)":surf,border:`1px solid ${i===0?"rgba(139,92,246,.4)":brd}`,borderRadius:8,color:i===0?"#a78bfa":muted,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600}}>{s}</button>
                ))}
              </div>
            </div>
          </div>
          {/* FORMATS */}
          <div style={{marginBottom:26}}>
            <div style={{fontWeight:700,marginBottom:11,color:txt,fontSize:14}}>{t.dash.fl} <span style={{color:"#8b5cf6"}}>({PLATFORMS.length})</span></div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
              {PLATFORMS.map(p=>(
                <div key={p.id} style={{display:"flex",alignItems:"center",gap:5,background:surf,border:`1px solid ${brd}`,borderRadius:999,padding:"5px 12px",fontSize:12}}>
                  <span>{p.icon}</span><span style={{fontWeight:600,color:txt}}>{p.name}</span><span style={{color:muted,fontSize:10}}>{p.format}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="hov" onClick={()=>file&&setScreen("processing")}
            style={{padding:"16px 42px",background:file?"linear-gradient(135deg,#8b5cf6,#ec4899)":surf,border:`1px solid ${file?"transparent":brd}`,borderRadius:14,color:file?"#fff":muted,cursor:file?"pointer":"not-allowed",fontFamily:"inherit",fontWeight:700,fontSize:17,boxShadow:file?"0 8px 36px rgba(139,92,246,.32)":"none"}}>
            {file?t.dash.gen:t.dash.uf}
          </button>
        </main>
      </div>
    </div>
  );

  // ── PROCESSING ───────────────────────────────────────────────────────────────
  if(screen==="processing") return (
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{width:54,height:54,border:"3px solid rgba(139,92,246,.18)",borderTop:"3px solid #8b5cf6",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:32}}/>
      <h2 style={{fontSize:28,fontWeight:800,letterSpacing:"-1px",marginBottom:8,textAlign:"center",color:txt}}>{t.proc.title}</h2>
      <p style={{color:muted,marginBottom:42,textAlign:"center",fontSize:14}}>{t.proc.sub}</p>
      <div style={{width:"100%",maxWidth:460,marginBottom:34}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:13,color:muted}}>{t.proc.steps[step]?.label}</span>
          <span style={{fontSize:13,fontWeight:700,color:"#8b5cf6"}}>{prog}%</span>
        </div>
        <div style={{height:5,background:dark?"rgba(255,255,255,.07)":"rgba(0,0,0,.07)",borderRadius:99}}>
          <div style={{width:`${prog}%`,height:"100%",background:"linear-gradient(90deg,#8b5cf6,#ec4899)",borderRadius:99,transition:"width .1s ease"}}/>
        </div>
      </div>
      <div style={{width:"100%",maxWidth:460}}>
        {t.proc.steps.map((s,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:`1px solid ${brd}`}}>
            <div style={{width:24,height:24,borderRadius:"50%",background:i<step?"rgba(139,92,246,.18)":"transparent",border:`1px solid ${i<=step?"#8b5cf6":brd}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11,color:i<step?"#a78bfa":muted}}>
              {i<step?"✓":i+1}
            </div>
            <div>
              <div style={{fontSize:13,fontWeight:i<=step?700:400,color:i<=step?txt:muted}}>{s.label}</div>
              <div style={{fontSize:11,color:muted}}>{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── RESULTS ──────────────────────────────────────────────────────────────────
  if(screen==="results") return (
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:880,margin:"0 auto",padding:"48px 20px"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{fontSize:50,marginBottom:12}}>🎉</div>
          <h1 style={{fontSize:36,fontWeight:800,letterSpacing:"-1px",marginBottom:10,color:txt}}>{t.res.title}</h1>
          <p style={{color:muted,fontSize:15}}>{t.res.sub}</p>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:40,flexWrap:"wrap"}}>
          <button style={{padding:"13px 28px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:15}}>{t.res.da}</button>
          <button onClick={()=>setScreen("dashboard")} style={{padding:"13px 28px",background:surf,border:`1px solid ${brd}`,borderRadius:12,color:txt,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:15}}>{t.res.nv}</button>
        </div>
        <ResultsGrid t={t} surf={surf} brd={brd} txt={txt} muted={muted}/>
      </div>
    </div>
  );

  return null;
}

function ResultsGrid({t,surf,brd,txt,muted}){
  const [done,setDone]=useState([]);
  const tog=id=>setDone(d=>d.includes(id)?d.filter(x=>x!==id):[...d,id]);
  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(188px,1fr))",gap:12}}>
      {PLATFORMS.map(p=>(
        <div key={p.id} style={{background:surf,border:`1px solid ${done.includes(p.id)?"rgba(139,92,246,.4)":brd}`,borderRadius:14,overflow:"hidden"}}>
          <div style={{aspectRatio:p.format==="9:16"?"9/16":p.format==="1:1"?"1/1":p.format==="2:3"?"2/3":"16/9",background:`linear-gradient(135deg,${p.color}33,rgba(0,0,0,.55))`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,maxHeight:130,overflow:"hidden"}}>{p.icon}</div>
          <div style={{padding:12}}>
            <div style={{fontWeight:700,fontSize:12,color:txt}}>{p.name}</div>
            <div style={{color:muted,fontSize:10,marginBottom:9}}>{p.format}</div>
            <button onClick={()=>tog(p.id)} style={{width:"100%",padding:"7px",background:done.includes(p.id)?"rgba(139,92,246,.18)":surf,border:`1px solid ${done.includes(p.id)?"rgba(139,92,246,.38)":brd}`,borderRadius:8,color:done.includes(p.id)?"#a78bfa":muted,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:12}}>
              {done.includes(p.id)?t.res.done:t.res.dl}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function PayPage({t,Nav,dark,bg,surf,brd,txt,muted,inp,onBack}){
  const [method,setMethod]=useState(null);
  const [copied,setCopied]=useState(false);
  const pt=t.pay;

  const METHODS=[
    {id:"card",icon:"💳"},
    {id:"mm",icon:"📱"},
    {id:"moov",icon:"🟠"},
    {id:"crypto",icon:"₮"},
  ];

  const copy=()=>{
    navigator.clipboard.writeText(WALLET).catch(()=>{});
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };

  const Field=({label,placeholder,type="text"})=>(
    <div style={{marginBottom:14}}>
      <label style={{display:"block",fontSize:11,fontWeight:700,color:muted,marginBottom:6}}>{label}</label>
      <input type={type} placeholder={placeholder} style={{width:"100%",padding:"12px 14px",background:inp,border:`1px solid ${brd}`,borderRadius:11,color:txt,fontFamily:"inherit",fontSize:15,boxSizing:"border-box",outline:"none"}}/>
    </div>
  );

  return(
    <div style={{fontFamily:"'Syne',sans-serif",background:bg,minHeight:"100vh",color:txt}}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet"/>
      <Nav/>
      <div style={{maxWidth:600,margin:"0 auto",padding:"48px 24px"}}>
        <button onClick={onBack} style={{background:"transparent",border:"none",color:muted,cursor:"pointer",fontFamily:"inherit",fontWeight:600,fontSize:14,padding:0,marginBottom:24}}>{pt.back}</button>
        <h1 style={{fontSize:28,fontWeight:800,letterSpacing:"-1px",marginBottom:7,color:txt}}>{pt.title}</h1>
        <p style={{color:muted,marginBottom:32,fontSize:14}}>{pt.sub}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:28}}>
          {METHODS.map(m=>(
            <div key={m.id} onClick={()=>setMethod(m.id)}
              style={{background:method===m.id?"rgba(139,92,246,.11)":surf,border:`1px solid ${method===m.id?"rgba(139,92,246,.5)":brd}`,borderRadius:16,padding:"18px 16px",cursor:"pointer",transition:"all .18s"}}>
              <div style={{fontSize:26,marginBottom:9}}>{m.icon}</div>
              <div style={{fontWeight:700,fontSize:14,color:txt}}>{pt.methods[m.id].label}</div>
              <div style={{fontSize:12,color:muted,marginTop:3}}>{pt.methods[m.id].desc}</div>
            </div>
          ))}
        </div>
        {method==="card"&&(
          <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:18,padding:26}}>
            <Field label={pt.cn} placeholder="1234 5678 9012 3456"/>
            <Field label={pt.nm} placeholder="Jean Dupont"/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <Field label={pt.exp} placeholder="MM/AA"/>
              <Field label={pt.cvv} placeholder="123"/>
            </div>
            <button style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:16,marginTop:6}}>{pt.pay}</button>
          </div>
        )}
        {(method==="mm"||method==="moov")&&(
          <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:18,padding:26}}>
            <Field label={pt.ph} placeholder="+229 XX XX XX XX" type="tel"/>
            <div style={{background:"rgba(139,92,246,.07)",border:"1px solid rgba(139,92,246,.18)",borderRadius:12,padding:"14px 15px",marginBottom:20,fontSize:13,color:muted,lineHeight:1.65}}>{pt.sms}</div>
            <button style={{width:"100%",padding:"14px",background:"linear-gradient(135deg,#8b5cf6,#ec4899)",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:16}}>{pt.pay}</button>
          </div>
        )}
        {method==="crypto"&&(
          <div style={{background:surf,border:`1px solid ${brd}`,borderRadius:18,padding:26}}>
            <div style={{marginBottom:18}}>
              <label style={{display:"block",fontSize:11,fontWeight:700,color:muted,marginBottom:7}}>{pt.wa}</label>
              <div style={{display:"flex",gap:9,alignItems:"stretch"}}>
                <div style={{flex:1,padding:"12px 14px",background:inp,border:`1px solid ${brd}`,borderRadius:11,color:txt,fontSize:12,fontFamily:"monospace",wordBreak:"break-all",lineHeight:1.5}}>{WALLET}</div>
                <button onClick={copy} style={{padding:"12px 16px",background:copied?"rgba(139,92,246,.18)":surf,border:`1px solid ${copied?"rgba(139,92,246,.4)":brd}`,borderRadius:11,color:copied?"#a78bfa":muted,cursor:"pointer",fontFamily:"inherit",fontWeight:700,fontSize:13,flexShrink:0,whiteSpace:"nowrap"}}>
                  {copied?pt.cpd:pt.cp}
                </button>
              </div>
            </div>
            <div style={{background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.22)",borderRadius:12,padding:"14px 15px",fontSize:13,color:dark?"rgba(245,158,11,.88)":"rgba(110,70,0,.85)",lineHeight:1.65}}>
              ⚠️ {pt.wn}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}