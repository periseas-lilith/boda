// components/GalleryShowcasePro.jsx
import React, { useMemo, useState, useEffect, useCallback, useRef } from "react";

/**
 * Props:
 * - images: Array<{ src: string, alt?: string, caption?: string }>
 * - video?: { src: string, poster?: string, caption?: string }
 * - layout?: "auto" | "collage5" | "video3" | "focus"
 * - accent?: string   // color de acento (css color), p.ej "#7c3aed"
 * - rounded?: number  // radio de borde en px (default 14)
 * - showFilmstrip?: boolean // miniaturas en lightbox (default true)
 * - backdrop?: "none" | "bokeh" | "petals" | "confetti"  // ✨ nuevo
 * - bgImage?: string  // ✨ nuevo: imagen grande desenfocada detrás
 */
export default function GalleryShowcasePro({
  images = [],
  video,
  layout = "auto",
  accent = "#7c3aed",
  rounded = 14,
  showFilmstrip = true,
  backdrop = "bokeh",
  bgImage,
}) {
  const hasVideo = Boolean(video?.src);
  const resolvedLayout =
    layout === "auto" ? (hasVideo ? "video3" : "collage5") : layout;

  const pics = useMemo(() => {
    if (resolvedLayout === "video3") return images.slice(0, 3);
    if (resolvedLayout === "collage5") return images.slice(0, 5);
    return images.slice(0, 5);
  }, [images, resolvedLayout]);

  // ---- LIGHTBOX ----
  const itemsLB = useMemo(() => {
    if (resolvedLayout === "video3" && hasVideo) {
      return [
        { type: "video", src: video.src, poster: video.poster, caption: video.caption },
        ...pics.map((it) => ({ type: "img", ...it })),
      ];
    }
    return pics.map((it) => ({ type: "img", ...it }));
  }, [resolvedLayout, hasVideo, video, pics]);

  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const openAt = (i) => { setCursor(i); setOpen(true); };
  const closeLB = () => setOpen(false);
  const total = itemsLB.length;
  const next = useCallback(() => setCursor((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCursor((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  // Swipe en lightbox
  const lbRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const el = lbRef.current;
    if (!el) return;
    let sx = 0, sy = 0, touching = false;
    const start = (x, y) => { touching = true; sx = x; sy = y; };
    const end = (x, y) => {
      if (!touching) return;
      const dx = x - sx, dy = y - sy; touching = false;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 32) (dx < 0 ? next() : prev());
    };
    const onTS = (e) => { const t = e.touches[0]; start(t.clientX, t.clientY); };
    const onTE = (e) => { const t = e.changedTouches[0]; end(t.clientX, t.clientY); };
    const onMD = (e) => start(e.clientX, e.clientY);
    const onMU = (e) => end(e.clientX, e.clientY);
    el.addEventListener("touchstart", onTS, { passive: true });
    el.addEventListener("touchend", onTE);
    el.addEventListener("mousedown", onMD);
    el.addEventListener("mouseup", onMU);
    return () => {
      el.removeEventListener("touchstart", onTS);
      el.removeEventListener("touchend", onTE);
      el.removeEventListener("mousedown", onMD);
      el.removeEventListener("mouseup", onMU);
    };
  }, [open, next, prev]);

  // ---------- UI ----------
  return (
    <section className={`reveal gal-stage ${backdrop}`} style={{ margin: 0 }}>
      <style>{`
        :root { --acc:${accent}; }
        .gal-stage{
          position: relative;
          padding: 28px 0;
          /* fondo base: radiales suaves */
          background:
            radial-gradient(900px 500px at 10% -10%, rgba(124,58,237,.10), transparent 60%),
            radial-gradient(800px 480px at 110% 0%, rgba(59,130,246,.10), transparent 60%),
            linear-gradient(180deg, #0b0b10, #0b0b10);
          overflow: hidden;
        }
        /* Imagen de fondo desenfocada */
        .gal-stage .bg-image{
          position:absolute; inset:-6vh -2vw; z-index:0;
          background-size: cover; background-position: center;
          filter: blur(18px) saturate(1.05) brightness(.85);
          opacity:.55;
          transform: scale(1.05);
        }
        .gal-stage .vignette{
          position:absolute; inset:0; z-index:1;
          background: radial-gradient(120% 100% at 50% 10%, rgba(0,0,0,0), rgba(0,0,0,.45));
          pointer-events:none;
        }

        /* Partículas (según backdrop) */
        .gal-stage.bokeh::before,
        .gal-stage.bokeh::after{
          content:""; position:absolute; inset:-10% -10%; z-index:1; pointer-events:none;
          background:
            radial-gradient(12px 12px at 20% 30%, rgba(255,255,255,.12), transparent 60%),
            radial-gradient(18px 18px at 60% 20%, rgba(255,255,255,.10), transparent 60%),
            radial-gradient(14px 14px at 35% 70%, rgba(255,255,255,.08), transparent 60%),
            radial-gradient(12px 12px at 80% 60%, rgba(255,255,255,.10), transparent 60%);
          animation: floatA 26s linear infinite;
        }
        .gal-stage.bokeh::after{ animation-duration: 34s; opacity:.7; }

        .gal-stage.petals::before{
          content:""; position:absolute; inset:-10% -10%; z-index:1; pointer-events:none;
          background-image:
            radial-gradient(6px 10px at 10% 0%, rgba(255,192,203,.35), transparent 60%),
            radial-gradient(6px 10px at 80% 20%, rgba(255,182,193,.30), transparent 60%),
            radial-gradient(6px 10px at 30% 80%, rgba(255,192,203,.28), transparent 60%),
            radial-gradient(6px 10px at 70% 60%, rgba(255,182,193,.32), transparent 60%);
          background-repeat:no-repeat;
          animation: drift 28s linear infinite;
        }

        .gal-stage.confetti::before{
          content:""; position:absolute; inset:-10% -10%; z-index:1; pointer-events:none;
          background:
            radial-gradient(4px 4px at 12% 8%, rgba(255,99,132,.7), transparent 60%),
            radial-gradient(4px 4px at 22% 16%, rgba(54,162,235,.7), transparent 60%),
            radial-gradient(4px 4px at 32% 12%, rgba(255,206,86,.8), transparent 60%),
            radial-gradient(4px 4px at 72% 24%, rgba(75,192,192,.8), transparent 60%),
            radial-gradient(4px 4px at 82% 14%, rgba(153,102,255,.8), transparent 60%),
            radial-gradient(4px 4px at 68% 72%, rgba(255,159,64,.8), transparent 60%);
          animation: floatA 22s linear infinite;
        }

        @keyframes floatA {
          0% { transform: translateY(0px) }
          50% { transform: translateY(10px) }
          100% { transform: translateY(0px) }
        }
        @keyframes drift {
          0% { transform: translate3d(0,0,0) }
          50% { transform: translate3d(0,10px,0) }
          100% { transform: translate3d(0,0,0) }
        }

        .gal {
          --r:${rounded}px;
          position:relative; z-index:2;
          display:grid; gap:12px;
          max-width: 1120px; margin: 0 auto; padding: 0 16px;
        }

        /* Cards */
        .tile {
          position:relative; border-radius:var(--r); overflow:hidden;
          background: #0b0b0f;
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 12px 32px rgba(0,0,0,.22);
          cursor: zoom-in; isolation:isolate;
        }
        .tile::before{
          content:""; position:absolute; inset:0; border-radius:calc(var(--r) + 1px);
          padding:1px; background: linear-gradient(120deg, rgba(255,255,255,.10), rgba(255,255,255,0), rgba(255,255,255,.08));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events:none; z-index:1;
        }
        .tile img, .tile video {
          width:100%; height:100%; display:block; object-fit:cover;
          transform: scale(1.02); transition: transform .5s ease, filter .35s ease;
          filter: saturate(1.03);
        }
        .tile:hover img, .tile:hover video { transform: scale(1.06); filter: saturate(1.1); }
        .shade {
          position:absolute; inset:0;
          background: linear-gradient(180deg, rgba(0,0,0,.00), rgba(0,0,0,.15) 55%, rgba(0,0,0,.45));
          z-index:2;
        }
        .badge {
          position:absolute; left:10px; top:10px; z-index:3;
          background: rgba(0,0,0,.45);
          border:1px solid rgba(255,255,255,.2);
          color:#fff; font-size:12px; padding:4px 8px; border-radius:9999px;
          backdrop-filter: blur(6px);
        }
        .caption {
          position:absolute; left:12px; right:12px; bottom:10px; z-index:3;
          color:#fff; font-size:13px; line-height:1.35; text-shadow: 0 1px 18px rgba(0,0,0,.55);
        }

        /* Layouts */
        .g-collage5 { grid-template-columns: repeat(6, 1fr); grid-auto-rows: 120px; }
        .g5-a { grid-column: 1 / span 4; grid-row: 1 / span 4; }
        .g5-b { grid-column: 5 / span 2; grid-row: 1 / span 2; }
        .g5-c { grid-column: 5 / span 2; grid-row: 3 / span 2; }
        .g5-d { grid-column: 1 / span 3; grid-row: 5 / span 2; }
        .g5-e { grid-column: 4 / span 3; grid-row: 5 / span 2; }

        .g-video3 { grid-template-columns: repeat(6, 1fr); grid-auto-rows: 120px; }
        .gv-video { grid-column: 1 / span 6; grid-row: 1 / span 4; }
        .gv-b { grid-column: 1 / span 2; grid-row: 5 / span 2; }
        .gv-c { grid-column: 3 / span 2; grid-row: 5 / span 2; }
        .gv-d { grid-column: 5 / span 2; grid-row: 5 / span 2; }

        .g-focus { grid-template-columns: 1fr; grid-auto-rows: minmax(300px, 58vh); }

        /* Lightbox */
        .lb-wrap { position:fixed; inset:0; z-index:60; display:grid; place-items:center;
          background: radial-gradient(1200px 800px at 10% -10%, rgba(255,255,255,.08), transparent 60%), rgba(0,0,0,.85);
          animation: fadeIn .18s ease;
        }
        .lb-frame { position:relative; max-width:min(92vw, 1200px); max-height:86vh; width:100%;
          border-radius: calc(var(--r) + 2px); overflow:hidden; background:#000;
          box-shadow: 0 22px 70px rgba(0,0,0,.55);
        }
        .lb-media { width:100%; height:100%; object-fit:contain; display:block; background:#000; }
        .lb-top { position:absolute; left:12px; right:12px; top:10px; z-index:3; display:flex; justify-content:space-between; gap:8px; }
        .lb-chip { background: rgba(0,0,0,.45); color:#fff; font-size:12px; padding:4px 8px; border-radius:9999px; border: 1px solid rgba(255,255,255,.2); backdrop-filter: blur(6px); }
        .lb-actions { position:absolute; left:50%; transform:translateX(-50%); bottom: 14px; z-index:3; display:flex; gap:10px; align-items:center;
          background: rgba(0,0,0,.35); border:1px solid rgba(255,255,255,.2); border-radius:9999px; padding:6px 10px; backdrop-filter: blur(6px); }
        .lb-btn { appearance:none; border:1px solid rgba(255,255,255,.25); background: rgba(0,0,0,.45); color:#fff; width:40px; height:40px; border-radius:9999px; display:grid; place-items:center; cursor:pointer; transition: filter .12s ease, transform .12s ease; }
        .lb-btn:hover{ filter:brightness(1.1); transform: translateY(-1px); }
        .filmstrip { position:absolute; bottom:64px; left:50%; transform:translateX(-50%); display:flex; gap:8px; max-width:min(92vw, 1080px); overflow:auto; padding:6px 8px; border-radius:12px; background: rgba(0,0,0,.25); border:1px solid rgba(255,255,255,.12); backdrop-filter: blur(6px); }
        .thumb { flex:0 0 auto; width:66px; height:66px; border-radius:10px; overflow:hidden; border:1px solid rgba(255,255,255,.18); opacity:.75; cursor:pointer; }
        .thumb.active { outline:2px solid var(--acc); opacity:1; }
        .thumb img, .thumb video { width:100%; height:100%; object-fit:cover; display:block; }

        @media (max-width: 820px){ .g-collage5, .g-video3 { grid-auto-rows: 100px; } }
        @media (max-width: 560px){
          .g-collage5, .g-video3 { grid-template-columns: repeat(4, 1fr); grid-auto-rows: 90px; }
          .g5-a { grid-column: 1 / span 4; grid-row: 1 / span 4; }
          .g5-b { grid-column: 1 / span 2; grid-row: 5 / span 2; }
          .g5-c { grid-column: 3 / span 2; grid-row: 5 / span 2; }
          .g5-d { grid-column: 1 / span 2; grid-row: 7 / span 2; }
          .g5-e { grid-column: 3 / span 2; grid-row: 7 / span 2; }
          .gv-video { grid-column: 1 / span 4; grid-row: 1 / span 4; }
          .gv-b { grid-column: 1 / span 2; grid-row: 5 / span 2; }
          .gv-c { grid-column: 3 / span 2; grid-row: 5 / span 2; }
          .gv-d { grid-column: 1 / span 4; grid-row: 7 / span 2; }
        }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>

      {/* fondo opcional (imagen blur) */}
      {bgImage && (
        <div
          className="bg-image"
          style={{ backgroundImage: `url('${bgImage}')` }}
          aria-hidden
        />
      )}
      <div className="vignette" aria-hidden />

      {/* GRID */}
      <div className={`gal ${resolvedLayout === "video3" ? "g-video3" : resolvedLayout === "focus" ? "g-focus" : "g-collage5"}`}>
        {resolvedLayout === "video3" && hasVideo && (
          <figure className="tile gv-video" onClick={() => openAt(0)} role="button" aria-label="Abrir video">
            <video src={video.src} poster={video.poster} muted playsInline preload="metadata" />
            <div className="shade" />
            <figcaption className="badge">Video</figcaption>
            {video.caption && <div className="caption">{video.caption}</div>}
          </figure>
        )}

        {(resolvedLayout === "collage5" ? pics : pics).map((it, i) => {
          const area =
            resolvedLayout === "collage5"
              ? ["g5-a", "g5-b", "g5-c", "g5-d", "g5-e"][i] || "g5-e"
              : ["gv-b", "gv-c", "gv-d"][i] || "gv-d";
          const index = resolvedLayout === "video3" && hasVideo ? i + 1 : i;
          return (
            <figure key={i} className={`tile ${area}`} onClick={() => openAt(index)} role="button" aria-label={`Abrir imagen ${i + 1}`}>
              <img src={it.src} alt={it.alt || `Foto ${i + 1}`} loading="lazy" />
              <div className="shade" />
              {it.caption && <figcaption className="caption">{it.caption}</figcaption>}
            </figure>
          );
        })}

        {resolvedLayout === "focus" && !hasVideo && pics.length === 1 && (
          <figure className="tile g5-a" onClick={() => openAt(0)} role="button" aria-label="Abrir imagen">
            <img src={pics[0].src} alt={pics[0].alt || "Imagen"} />
            <div className="shade" />
            {pics[0].caption && <figcaption className="caption">{pics[0].caption}</figcaption>}
          </figure>
        )}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div className="lb-wrap" onClick={closeLB} role="dialog" aria-modal="true" ref={lbRef}>
          <div className="lb-frame" onClick={(e) => e.stopPropagation()}>
            <div className="lb-top">
              <div className="lb-chip">{cursor + 1} / {total}</div>
              {itemsLB[cursor]?.caption && <div className="lb-chip" title={itemsLB[cursor].caption}>ⓘ {itemsLB[cursor].caption}</div>}
            </div>

            {itemsLB[cursor].type === "video" ? (
              <video className="lb-media" src={itemsLB[cursor].src} poster={itemsLB[cursor].poster} controls autoPlay />
            ) : (
              <img className="lb-media" src={itemsLB[cursor].src} alt={itemsLB[cursor].alt || `Vista ${cursor + 1}`} />
            )}

            <div className="lb-actions" onClick={(e) => e.stopPropagation()}>
              <button className="lb-btn" aria-label="Anterior" onClick={prev}>❮</button>
              <button className="lb-btn" aria-label="Siguiente" onClick={next}>❯</button>
              <button className="lb-btn" aria-label="Cerrar" onClick={closeLB}>✕</button>
            </div>

            {showFilmstrip && total > 1 && (
              <div className="filmstrip" onClick={(e) => e.stopPropagation()}>
                {itemsLB.map((it, i) => (
                  <div key={i} className={`thumb ${i === cursor ? "active" : ""}`} onClick={() => setCursor(i)} role="button" aria-label={`Ir a ${i + 1}`}>
                    {it.type === "video"
                      ? <video src={it.src} poster={it.poster} muted />
                      : <img src={it.src} alt={it.alt || `Mini ${i + 1}`} />
                    }
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
