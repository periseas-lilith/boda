// components/ReceptionShowcase.jsx
import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VerifiedIcon from "@mui/icons-material/Verified";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function ReceptionShowcase({ cfg = {} }) {
  const {
    receptionTime = "—",
    pricePerPerson = "—",
    depositDeadline = "—",
    mapReception,
    venueName = "La Casa de Frida, Cholula",
    coverUrl = "/casa_frida.jpg",
    // Pasa aquí tu dirección:
    addressText = "Av. 5 de Mayo 201, San Miguel, Centro San Andrés Cholula, 72810 San Andrés Cholula, Pue.",
    menuPhotos = [],
    placeUrl,   // opcional: URL de Google Maps tipo /maps/place/...@lat,lng,zoom
    embedUrl,   // opcional: iframe “Insertar mapa”
  } = cfg;

  const hasPhotos = Array.isArray(menuPhotos) && menuPhotos.length > 0;

  // ---- Enlace “Abrir en Google Maps” (usa placeUrl si existe; si no, busca por addressText)
  const mapsLink = useMemo(() => {
    if (placeUrl) return placeUrl;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
  }, [placeUrl, addressText]);

  // --- NAV 1×1 ---
  const [idx, setIdx] = useState(0);
  const next = useCallback(() => setIdx((i) => (i + 1) % (menuPhotos.length || 1)), [menuPhotos.length]);
  const prev = useCallback(() => setIdx((i) => (i - 1 + (menuPhotos.length || 1)) % (menuPhotos.length || 1)), [menuPhotos.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!hasPhotos) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasPhotos, next, prev]);

  // Swipe/drag
  const swipeRef = useRef(null);
  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    let startX = 0, startY = 0, touching = false;
    const start = (x, y) => { touching = true; startX = x; startY = y; };
    const end = (x, y) => {
      if (!touching) return;
      const dx = x - startX, dy = y - startY; touching = false;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) (dx < 0 ? next() : prev());
    };
    const onTouchStart = (e) => { const t = e.touches[0]; start(t.clientX, t.clientY); };
    const onTouchEnd = (e) => { const t = e.changedTouches[0]; end(t.clientX, t.clientY); };
    const onMouseDown = (e) => start(e.clientX, e.clientY);
    const onMouseUp = (e) => end(e.clientX, e.clientY);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseup", onMouseUp);
    };
  }, [next, prev]);

  // --- MAPA ---
  const parseLatLngFromPlaceUrl = (url) => {
    try {
      if (!url) return null;
      const at = url.match(/@(-?\d+\.?\d*),\s*(-?\d+\.?\d*),\s*([\d\.]+)z/);
      if (at) {
        const [, lat, lng, z] = at;
        return { lat: parseFloat(lat), lng: parseFloat(lng), z: parseFloat(z) };
      }
      const d3d4d = url.match(/3d(-?\d+\.?\d*).*4d(-?\d+\.?\d*)/);
      if (d3d4d) {
        const [, lat, lng] = d3d4d;
        return { lat: parseFloat(lat), lng: parseFloat(lng), z: 19 };
      }
    } catch { }
    return null;
  };
  const coords = useMemo(() => parseLatLngFromPlaceUrl(placeUrl), [placeUrl]);
  const mapEmbedSrc = useMemo(() => {
    if (embedUrl) return embedUrl;
    if (coords?.lat && coords?.lng) {
      const z = coords.z || 17;
      return `https://www.google.com/maps?hl=es&region=MX&ll=${coords.lat},${coords.lng}&q=${coords.lat},${coords.lng}&z=${z}&output=embed`;
    }
    if (addressText) {
      return `https://www.google.com/maps?hl=es&region=MX&q=${encodeURIComponent(addressText)}&z=17&output=embed`;
    }
    return null;
  }, [embedUrl, coords, addressText]);

  return (
    <section id="recepcion" className="reveal" style={{ margin: 0, padding: 0 }}>
      <style>{`
        .recep-hero{
          position: relative;
          background-image:
            radial-gradient(1000px 500px at 8% -10%, rgba(81, 81, 81, 0.25), transparent 30%),
            radial-gradient(900px 460px at 108% 10%, rgba(85, 85, 85, 0.16), transparent 20%),
            url('${coverUrl}');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          overflow: hidden;
        }
        .recep-hero::after{
          content:"";
          position:absolute; inset:0;
          background: linear-gradient(180deg, rgba(17,17,23,.30), rgba(17,17,23,.55));
        }
        .glass-panel{
          position: relative; z-index: 2;
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,.25);
        }
        .viewer{
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background:
            radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,.06), rgba(255,255,255,0)) ,
            #0b0b0f;
          box-shadow: 0 8px 28px rgba(0,0,0,.25);
          user-select: none;
        }
        .viewer img{
          width:100%; height:100%;
          object-fit: contain;
          display:block;
          background:#000;
        }
        .nav-btn{
          position:absolute; top:50%; transform: translateY(-50%);
          background: rgba(0,0,0,.45); color:#fff;
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 9999px;
          width: 42px; height: 42px;
          display:flex; align-items:center; justify-content:center;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(0,0,0,.35);
          transition: filter .15s ease, transform .15s ease, background .15s ease;
        }
        .nav-btn:hover{ filter: brightness(1.1); transform: translateY(calc(-50% - 1px)); }
        .nav-left { left: 8px; }
        .nav-right{ right: 8px; }

        .dots{
          position:absolute; left:50%; transform: translateX(-50%);
          bottom: 6px; display:flex; gap:8px; padding:6px 10px;
          background: rgba(0,0,0,.35);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 9999px;
          backdrop-filter: blur(6px);
        }
        .dot{
          width: 8px; height: 8px; border-radius: 9999px;
          background: rgba(255,255,255,.5); cursor: pointer;
          transition: transform .15s ease, background .15s ease;
        }
        .dot.active{ background:#fff; transform: scale(1.1); }
      `}</style>

      {/* Cabecera */}
      <Box className="recep-hero" sx={{ px: 0, py: { xs: 6, md: 8 } }}>
        <Box className="glass-panel" sx={{ mx: "auto", maxWidth: 1120, px: { xs: 2.5, sm: 4, md: 5 }, py: { xs: 2.5, sm: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Tooltip title="¡Delicioso!">
                  <IconButton color="inherit" size="small" sx={{ color: "white" }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>

                <Typography variant="overline" sx={{ letterSpacing: 2, color: "rgba(255,255,255,.9)" }}>
                  Recepción — Buffet familiar
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontFamily: "serif", color: "white", textShadow: "0 2px 18px rgba(0,0,0,.35)", fontWeight: 600, lineHeight: 1.15 }}>
                {venueName}
              </Typography>

              <Box sx={{ display: "grid", gap: 1.25, color: "rgba(255,255,255,.95)", mt: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography component="strong" sx={{ fontWeight: 700 }}>{receptionTime}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AttachMoneyIcon fontSize="small" />
                  <Typography>Menú <strong>${pricePerPerson} MXN</strong> por persona</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <VerifiedIcon fontSize="small" />
                  <Typography>Aportación del <strong>50%</strong> antes del <strong>{depositDeadline}</strong>. Pago total 30 de noviembre</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <PlaceIcon fontSize="small" />
                  <Typography sx={{ opacity: .95 }}>{addressText}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 3 }}>
                {/* Botón “Ver ubicación” si ya tienes una URL específica (maps corta o Waze) */}
                {mapReception && (
                  <Button
                    href={mapReception}
                    target="_blank"
                    variant="outlined"
                    sx={{ borderColor: "rgba(255,255,255,.6)", color: "white", "&:hover": { borderColor: "white", background: "rgba(255,255,255,.08)" } }}
                  >
                    Ver ubicación
                  </Button>
                )}

                {/* NUEVO: Botón que siempre arma la búsqueda en Google Maps con la dirección */}
                <Button
                  href={mapsLink}
                  target="_blank"
                  variant="outlined"
                  startIcon={<PlaceIcon />}
                  sx={{ borderColor: "rgba(255,255,255,.6)", color: "white", "&:hover": { borderColor: "white", background: "rgba(255,255,255,.08)" } }}
                >
                  Abrir en Google Maps
                </Button>
              </Box>
            </Grid>

            {/* Derecha: VISOR vertical */}
            <Grid item xs={12} md={5}>
              {hasPhotos ? (
                <Box
                  ref={swipeRef}
                  className="viewer"
                  sx={{
                    position: "relative",
                    aspectRatio: { xs: "9 / 16", sm: "3 / 4" },
                    width: "100%",
                    maxWidth: { xs: 360, sm: 420, md: 480 },
                    mx: { xs: "auto", md: 0 },
                  }}
                  aria-label="Galería del menú (vertical), una imagen a la vez"
                >
                  <img src={menuPhotos[idx]} alt={`Plato ${idx + 1} de ${menuPhotos.length}`} loading="lazy" />
                  {menuPhotos.length > 1 && (
                    <>
                      <button className="nav-btn nav-left" onClick={prev} aria-label="Anterior">
                        <ChevronLeftIcon />
                      </button>
                      <button className="nav-btn nav-right" onClick={next} aria-label="Siguiente">
                        <ChevronRightIcon />
                      </button>
                      <div className="dots" role="tablist" aria-label="Posición de la galería">
                        {menuPhotos.map((_, i) => (
                          <div
                            key={i}
                            className={`dot ${i === idx ? "active" : ""}`}
                            role="tab"
                            aria-selected={i === idx}
                            aria-label={`Ver imagen ${i + 1}`}
                            onClick={() => setIdx(i)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </Box>
              ) : (
                <Box sx={{ opacity: .7, color: "white" }}>Pronto fotos del menú…</Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Mapa full-width */}
      {mapEmbedSrc && (
        <Box sx={{ width: "100%", height: { xs: "55vh", md: "65vh" }, position: "relative" }}>
          <Box
            component="iframe"
            title="Mapa de la recepción"
            src={mapEmbedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        </Box>
      )}

    </section>
  );
}
