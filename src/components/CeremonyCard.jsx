import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/**
 * cfg props:
 * {
 *   date?: string,
 *   time?: string,
 *   coverUrl?: string,
 *   mapsUrl?: string,      // opcional: link para "Abrir en Google Maps"
 *   embedUrl?: string,     // opcional: src de "Insertar un mapa" (pb=...)
 *   placeUrl?: string      // opcional: URL tipo /maps/place/...@lat,long,zoom
 * }
 */

function makeIcsUrl() {
  const dtStart = '20251206T120000'
  const dtEnd = '20251206T133000'
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitacion React//ES', 'BEGIN:VEVENT',
    'UID:boda-civil-aidali-jorge', 'SUMMARY:Boda civil — Aidali y Jorge',
    'DTSTART:' + dtStart, 'DTEND:' + dtEnd, 'DESCRIPTION:Boda civil y recepción', 'LOCATION:Nuestra casa', 'END:VEVENT', 'END:VCALENDAR'
  ].join('\n')
  return URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
}

export default function CeremonyParallax({ cfg = {} }) {
  // Texto solicitado:
  const addressText =
    "Tierra Blanca 4C, Bello Horizonte, 72735 Heroica Puebla de Zaragoza, Pue., México";

  // Si no proporcionas coverUrl, uso una de stock
  const coverUrl =
    cfg.coverUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop";
  // Botón "Abrir en Google Maps": usa tu placeUrl si la pasas; si no, busca por texto
  const mapsLink = useMemo(() => {
    if (cfg.mapsUrl) return cfg.mapsUrl;
    if (cfg.placeUrl) return cfg.placeUrl;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressText)}`;
  }, [cfg.mapsUrl, cfg.placeUrl]);

  // Extrae coordenadas de una URL tipo .../@LAT,LNG,ZOOM... o ...3dLAT!4dLNG...
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

  const coords = useMemo(() => parseLatLngFromPlaceUrl(cfg.placeUrl), [cfg.placeUrl]);

  // Prioridad del src:
  // 1) cfg.embedUrl (desde "Insertar un mapa") -> precisión máxima
  // 2) Si hay coords, uso ll= y q=lat,lng con zoom alto
  // 3) Fallback: q=addressText
  const mapEmbedSrc = useMemo(() => {
    if (cfg.embedUrl) return cfg.embedUrl;
    if (coords?.lat && coords?.lng) {
      const z = coords.z || 19;
      return `https://www.google.com/maps?hl=es&region=MX&ll=${coords.lat},${coords.lng}&q=${coords.lat},${coords.lng}&z=${z}&output=embed`;
    }
    return `https://www.google.com/maps?hl=es&region=MX&q=${encodeURIComponent(addressText)}&z=19&output=embed`;
  }, [cfg.embedUrl, coords, addressText]);

  // WhatsApp confirmación
  const whatsappUrl = useMemo(() => {
    const msg =
      `Hola, quiero confirmar mi asistencia a la ceremonia civil.` +
      `\nFecha: ${cfg?.date || ""}` +
      `\nHora: 12:30 PM` +
      `\nDirección: ${addressText}` +
      `\n\nNombre: ` +
      `\nAcompañantes: `;
    return `https://wa.me/522229995285?text=${encodeURIComponent(msg)}`;
  }, [cfg?.date, cfg?.time]);

  return (
    <section id="ceremonia" style={{ margin: 0, padding: 0 }}>
      {/* estilos locales */}
      <style>{`
        :where(html, body, #root, #app){ margin:0; padding:0; }
        #ceremonia { margin:0; padding:0; }

        .hero {
          margin:0;
          background-image:
            radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,.25), transparent 60%),
            radial-gradient(1000px 500px at 110% 10%, rgba(255,255,255,.16), transparent 60%),
            url('${coverUrl}');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        .hero::after {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(17,17,23,.35), rgba(17,17,23,.55));
          pointer-events: none;
        }
        .glass {
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.25);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0,0,0,.25);
        }
        .shine { position: relative; overflow: hidden; }
        .shine::before {
          content: "";
          position: absolute; top: -120%; left: -120%;
          width: 240%; height: 240%;
          transform: rotate(25deg);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.15) 50%, rgba(255,255,255,0) 100%);
          animation: sweep 7s linear infinite;
        }
        @keyframes sweep {
          0%   { transform: translateX(-20%) rotate(25deg); opacity:.0; }
          40%  { opacity:.5; }
          60%  { opacity:.0; }
          100% { transform: translateX(20%) rotate(25deg); }
        }
        @media (max-width: 900px) {
          .hero { background-attachment: scroll; }
        }
      `}</style>

      {/* TEXTO y CTAs */}
      <Box
        className="hero"
        sx={{
          minHeight: { xs: 520, md: 640 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 0,
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          className="glass shine"
          sx={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 1120,
            p: { xs: 2.5, sm: 4, md: 5 },
            mx: "auto",
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Tooltip title="¡Qué emoción!">
                  <IconButton color="inherit" size="small" sx={{ color: "white" }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="overline"
                  sx={{ letterSpacing: 2, color: "rgba(255,255,255,.9)" }}
                >
                  Ceremonia civil
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontFamily: "serif",
                  color: "white",
                  textShadow: "0 2px 18px rgba(0,0,0,.35)",
                  fontWeight: 600,
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                Detalles de la ceremonia
              </Typography>

              <Box sx={{ display: "grid", gap: 1.25, color: "rgba(255,255,255,.95)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CalendarMonthIcon fontSize="small" />
                  <Typography component="strong" sx={{ fontWeight: 700 }}>
                    {cfg?.date || "—"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTimeIcon fontSize="small" />
                  <Typography component="strong" sx={{ fontWeight: 700 }}>
                    {cfg?.time || "—"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <PlaceIcon fontSize="small" />
                  <Typography sx={{ maxWidth: 720 }}>
                    <strong>Dirección:</strong> {addressText}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 3 }}>
                <Button
                  href={mapsLink}
                  target="_blank"
                  variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,.6)",
                    color: "white",
                    "&:hover": { borderColor: "white", background: "rgba(255,255,255,.08)" },
                  }}
                >
                  Abrir en Google Maps
                </Button>
                <Button href={makeIcsUrl()} download variant="outlined"
                  sx={{
                    borderColor: "rgba(255,255,255,.6)",
                    color: "white",
                    "&:hover": { borderColor: "white", background: "rgba(255,255,255,.08)" },
                  }}
                >Agregar al calendario</Button>
                <Button
                  href={whatsappUrl}
                  target="_blank"
                  variant="contained"
                  sx={{
                    background: "linear-gradient(90deg, #25D366, #128C7E)",
                    boxShadow: "0 10px 30px rgba(18,140,126,.35)",
                    "&:hover": { filter: "brightness(1.05)" },
                  }}
                >
                  Confirmar por WhatsApp
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* MAPA FULL-WIDTH CENTRADO EN LA DIRECCIÓN */}
      <Box sx={{ width: "100%", height: { xs: "65vh", md: "75vh" }, position: "relative" }}>
        <Box
          component="iframe"
          title="Mapa de la ceremonia"
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      </Box>
    </section>
  );
}
