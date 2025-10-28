// components/ReligiousCard.jsx
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChurchIcon from "@mui/icons-material/Church";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LuggageIcon from "@mui/icons-material/Luggage";
import HotelIcon from "@mui/icons-material/Hotel";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

export default function ReligiousCard({
  link = "#",
  city = "Puerto Escondido, Oaxaca",
  coverUrl = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2069&auto=format&fit=crop",

  // 🔽 NUEVO: datos de ceremonia
  ceremony = {
    date: "Febrero 2027",
    church: "Por confirmar",
    address: "",
    notes: "Boda destino en la costa. Próximamente: horarios y detalles finales.",
  },

  // 🔽 NUEVO: paquetes / precios (rellena price con tus importes)
  packages = [
    { name: "Estándar · 1 cama matrimonial", capacity: "Hasta 2 personas", price: null },
    { name: "Estándar · 2 camas matrimoniales", capacity: "Hasta 4 personas", price: null },
    { name: "Superior · 1 cama King Size", capacity: "Hasta 2 personas", price: null },
    { name: "Superior · 2 camas matrimoniales", capacity: "Hasta 4 personas", price: null },
    { name: "Superior · 3 camas matrimoniales", capacity: "Hasta 6 personas", price: null },
  ],

  // 🔽 NUEVO: transporte (sale de Puebla, puedes ajustar texto/CTA)
  transport = {
    from: "Salida grupal desde Puebla",
    note: "Transporte seguro. Cupo limitado.",
    cta: null, // ej. "https://wa.me/52XXXXXXXXXX?text=Quiero%20transporte"
  },

  // 🔽 NUEVO: amenidades/nota de hotel
  hotelInfo = {
    note:
      "Hotel con TV cable, agua caliente, WiFi, A/A, 2 albercas y chapoteadero. A 10 min de la playa.",
  },
}) {
  return (
    <section id="religiosa" className="reveal" style={{ margin: 0 }}>
      <style>{`
        .rel-hero { position: relative; overflow: hidden; box-shadow: 0 18px 48px rgba(0,0,0,.18); isolation: isolate; }
        .rel-hero::before{ content:""; position:absolute; inset:0;
          background-image:
            radial-gradient(900px 420px at 10% -10%, rgba(255,255,255,.28), transparent 60%),
            radial-gradient(780px 380px at 110% 0%, rgba(255,255,255,.18), transparent 60%),
            url('${coverUrl}');
          background-size: cover; background-position: center;
          filter: saturate(1.03) contrast(1.02) brightness(.98);
          z-index:-2; transform: scale(1.02);
        }
        .rel-veil{ position:absolute; inset:0; z-index:-1; background: linear-gradient(180deg, rgba(10,12,18,.25), rgba(10,12,18,.55)); }
        .rel-glass{ backdrop-filter: blur(10px) saturate(120%); -webkit-backdrop-filter: blur(10px) saturate(120%);
          background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.28); border-radius: 18px; }
        .pill { display:inline-flex; align-items:center; gap:8px; padding: 8px 12px; border-radius: 9999px;
          background: rgba(255,255,255,.14); border: 1px solid rgba(255,255,255,.25); color:#fff; font-weight:600; letter-spacing:.2px; }
        .cta { color:#fff; border-color: rgba(255,255,255,.7); }
        .cta:hover { background: rgba(255,255,255,.10); border-color:#fff; }
        .rel-body { color:#fff; text-shadow: 0 2px 18px rgba(0,0,0,.35); }
        .price-card { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.22); border-radius:14px; padding:14px; color:#fff; }
        .price-name { font-weight: 700; }
        .price-cap { opacity:.9; }
        .price-val { font-weight: 800; font-size: 1.1rem; }
      `}</style>

      <Card elevation={0} className="rel-hero">
        <div className="rel-veil" />

        <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, position: "relative" }}>
          {/* Encabezado */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
            <Tooltip title="¡Delicioso!">
              <IconButton color="inherit" size="small" sx={{ color: "white" }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Tooltip>

            <Typography variant="overline" sx={{ letterSpacing: 2, color: "rgba(255,255,255,.9)" }}>
              Boda religiosa — Destino
            </Typography>

            <span className="pill"><PlaceIcon fontSize="small" /> {city}</span>
            <span className="pill"><LuggageIcon fontSize="small" /> {transport.from}</span>
          </Box>

          {/* Intro */}
          <Box className="rel-body" sx={{ mt: 2 }}>
            <Typography variant="h4" sx={{ fontFamily: "serif", fontWeight: 700, color: "#fff", mb: 0.5 }}>
              Información y viaje
            </Typography>
            <Typography variant="body1" sx={{ opacity: .95 }}>
              {ceremony.notes}
            </Typography>
          </Box>

          {/* Bloques principales */}
          <Box
            className="rel-glass"
            sx={{
              mt: 2.5, p: { xs: 2, sm: 2.5 }, display: "grid", gap: 1.25,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            {/* Fecha */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff" }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Fecha:</strong> {ceremony.date}
              </Typography>
            </Box>

            {/* Iglesia */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff" }}>
              <ChurchIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Iglesia:</strong> {ceremony.church}{ceremony.address ? ` — ${ceremony.address}` : ""}
              </Typography>
            </Box>

            {/* Hospedaje / Nota */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff" }}>
              <HotelIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Hotel:</strong> {hotelInfo.note}
              </Typography>
            </Box>

            {/* Playa / Transporte */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#fff" }}>
              <BeachAccessIcon fontSize="small" />
              <Typography variant="body2">
                <strong>Transporte:</strong> {transport.note}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1.25,
              flexWrap: "wrap",
              marginTop: 3
            }}
          >
            <Button href="#detalles-religiosa" variant="outlined" className="cta">
              Ver información completa
            </Button>
          </Box>


          <Box sx={{ height: 10 }} />
        </Box>
      </Card>
    </section>
  );
}
