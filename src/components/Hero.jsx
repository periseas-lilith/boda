// components/Hero.jsx
import React, { useEffect, useMemo, useRef } from "react";
import Button from "@mui/material/Button";

/** @typedef {{ heroImage:string, couple:string, date:string, time:string }} Cfg */

export default function Hero({ cfg, countdown, targetId = "ceremonia" }) {
  const bgRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.25;
      if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.05)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleGo = () => {
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const d = useMemo(() => countdown || { days: 0, hours: 0, minutes: 0 }, [countdown]);

  return (
    <section className="hero">
      <style>{`
        .hero{
          position: relative;
          z-index: 2;                /* por encima del separador */
          min-height: 72vh;
          display: grid;
          place-items: center;
          padding: clamp(24px, 6vw, 56px) 16px 0 16px;
          
          --countdown-top: clamp(625px, 18vh, 220px); 
          overflow: visible;
          isolation: isolate;
        }
        .hero .bg{
          position: absolute; inset: -8% 0 0 0;
          width: 100%; height: 120%; object-fit: cover;
          will-change: transform; transform: scale(1.05);
          filter: saturate(1.08) contrast(1.05) brightness(.98);
          z-index: -2;
        }
        .hero .veil{
          position: absolute; inset: 0; z-index: -1;
          background:
            radial-gradient(1000px 400px at 15% 15%, rgba(255,255,255,.18), transparent 60%),
            radial-gradient(900px 360px at 85% 25%, rgba(255,255,255,.10), transparent 60%),
            linear-gradient(180deg, rgba(12,12,18,.20), rgba(12,12,18,.55));
        }
        .hero-headline{
          text-align:center; color:#fff; text-shadow:0 2px 18px rgba(0,0,0,.35);
          margin-top: clamp(24px, 6vh, 64px);
        }
        .h-names{ font-size: clamp(40px, 6vw, 84px); line-height: 1.05; margin: 0 0 8px; }
        .h-sub  { font-size: clamp(16px, 2.4vw, 22px); opacity: .95; margin: 0 0 4px; }
        .h-date { font-size: clamp(14px, 2vw, 18px); opacity: .9; margin: 0; }

        .hero-countdown{
          position: absolute;
          top: var(--countdown-top);  /* controla la altura desde el TOP del hero */
          left: 50%;
          transform: translateX(-50%); /* centrado horizontal */
          z-index: 3;

          display: flex; 
          gap: clamp(12px,4vw,24px);
          color: #fff;
          padding: 12px 16px;
          border-radius: 16px;
          backdrop-filter: blur(8px) saturate(120%);
          -webkit-backdrop-filter: blur(8px) saturate(120%);
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.25);
        }

        .counter{ text-align:center; min-width:72px; }
        .counter .n{ font-weight:800; font-size:clamp(22px,4vw,34px); line-height:1; }
        .counter .l{ font-size:12px; letter-spacing:.12em; text-transform:uppercase; opacity:.9 }

        /* ↑ Subimos MÁS el botón “Ver detalles” (más separación del borde inferior) */
        .scroll-cta{
          position:absolute; left:50%; transform:translateX(-50%);
          bottom: 72px;                /* antes: 28px */
          display:grid; gap:10px; place-items:center;
          z-index: 3;
        }
        .scroll-cue{
          width:2px; height:42px; 
          border-radius:2px; position:relative; overflow:hidden;
        }
        .scroll-cue::after{
          content:""; position:absolute; left:0; right:0; height:14px; top:-14px;
          border-radius:2px; animation: drip 2.8s ease-in-out infinite;
        }
        @keyframes drip{
          0%{ top:-14px; opacity:0 } 20%{ opacity:1 } 70%{ top:42px; opacity:.6 } 100%{ top:42px; opacity:0 }
        }
/* --- CTA PILL BONITA --- */
.cta-pill{
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  border-radius: 9999px;
  font-weight: 700;
  letter-spacing: .2px;
  cursor: pointer;
  color: #ffffff;
  /* doble fondo: vidrio + borde degradado */
  background:
    linear-gradient( to right, rgba(255,255,255,.18), rgba(255,255,255,.14) ) padding-box,
    linear-gradient(90deg, #A879A3, #7c3aed, #3b82f6) border-box;
  border: 2px solid transparent;
  backdrop-filter: blur(8px) saturate(120%);
  -webkit-backdrop-filter: blur(8px) saturate(120%);
  box-shadow: 0 10px 28px rgba(60, 35, 120, .32);
  transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
.cta-pill:hover{
  transform: translateY(-2px);
  box-shadow: 0 14px 36px rgba(60, 35, 120, .42);
}
.cta-pill:active{
  transform: translateY(0);
  box-shadow: 0 8px 22px rgba(60, 35, 120, .35);
}
.cta-label{ position: relative; z-index: 1; }

/* brillo en barrido */
.cta-pill::before{
  content:"";
  position: absolute; inset: -2px;
  border-radius: 9999px;
  background: linear-gradient(120deg, rgba(255,255,255,.0) 0%, rgba(255,255,255,.55) 40%, rgba(255,255,255,.0) 80%);
  filter: blur(10px);
  opacity: 0;
  transform: translateX(-40%);
  transition: opacity .25s ease;
  pointer-events: none;
}
.cta-pill:hover::before{
  opacity: .35;
  animation: cta-shine 1.2s ease forwards;
}
@keyframes cta-shine{
  0%   { transform: translateX(-40%); opacity: .0; }
  35%  { opacity: .35; }
  100% { transform: translateX(40%); opacity: .0; }
}

/* chevrons animados */
.cta-chev{
  opacity: .95;
  transform: translateY(0);
  transition: transform .25s ease, opacity .25s ease;
}
.chev-2{
  position: relative;
  margin-left: -6px; /* solapa un poquito */
  opacity: .65;
  transform: translateY(-2px);
}
.cta-pill:hover .cta-chev{ transform: translateY(2px); }
.cta-pill:hover .chev-2{ transform: translateY(6px); opacity: .85; }

/* opcional: tamaño responsivo */
@media (max-width: 420px){
  .cta-pill{ padding: 11px 18px; }
}
/* --- CTA fantasma (transparente con borde blanco) --- */
.cta-ghost{
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 9999px;
  font-weight: 700;
  letter-spacing: .2px;
  cursor: pointer;
  color: #ffffff;
  background: transparent;                /* fondo transparente */
  border: 2px solid rgba(255,255,255,.95);/* borde blanco */
  backdrop-filter: blur(6px) saturate(120%);
  -webkit-backdrop-filter: blur(6px) saturate(120%);
  transition: transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
  box-shadow: 0 10px 28px rgba(0,0,0,.20);
}
.cta-ghost:hover{
  transform: translateY(-2px);
  background: rgba(255,255,255,.12);      /* leve velo al hover */
  border-color: #ffffff;
  box-shadow: 0 14px 36px rgba(0,0,0,.28);
}
.cta-ghost:active{ transform: translateY(0); }

.mouse-ico{
  display:block;
  color: #fff; 
  opacity: .95;
}
.mouse-ico .wheel{
  animation: wheel-down 1.8s ease-in-out infinite;
  transform-origin: 11px 9px;
}
@keyframes wheel-down{
  0%   { transform: translateY(0);    opacity: 1; }
  60%  { transform: translateY(8px);  opacity: .25; }
  100% { transform: translateY(0);    opacity: 1; }
}

/* opcional: tamaño responsivo */
@media (max-width: 420px){
  .cta-ghost{ padding: 11px 16px; }
}

      `}</style>

      {/* Fondo (TU FOTO) */}
      <img ref={bgRef} className="bg" src={cfg.heroImage} alt="" />

      {/* Velo/luces */}
      <div className="veil" />

      {/* Contenido principal */}
      <div className="hero-headline">
        <h1 className="script h-names">{cfg.couple}</h1>
        <p className="serif h-sub">Nuestra boda civil</p>
        <p className="serif h-date">{cfg.date} • {cfg.time}</p>
      </div>

      {/* Contador */}
      <div className="hero-countdown">
        <div className="counter"><div className="n">{d.days}</div><div className="l">días</div></div>
        <div className="counter"><div className="n">{d.hours}</div><div className="l">hrs</div></div>
        <div className="counter"><div className="n">{d.minutes}</div><div className="l">min</div></div>
      </div>

      {/* CTA */}
      <div className="scroll-cta">
        <button className="cta-ghost" onClick={handleGo} aria-label="Ver detalles de la ceremonia">
          <svg className="mouse-ico" width="22" height="32" viewBox="0 0 22 32" fill="none" aria-hidden>
            <rect x="1.5" y="1.5" rx="10" width="19" height="29" stroke="currentColor" strokeWidth="3" />
            <circle className="wheel" cx="11" cy="9" r="2" fill="currentColor" />
          </svg>
          <span className="cta-label">Ver detalles</span>
        </button>
        <div className="scroll-cue" />
      </div>


    </section>
  );
}
