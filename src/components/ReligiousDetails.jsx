// components/ReligiousDetails.jsx
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// Iconos base azules y de sección
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LuggageIcon from "@mui/icons-material/Luggage";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import ShowerIcon from "@mui/icons-material/Shower";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PoolIcon from "@mui/icons-material/Pool";
import WavesIcon from "@mui/icons-material/Waves";
import GroupIcon from "@mui/icons-material/Group";

const BLUE = "#2563EB";
const BLUE_SOFT = "#DBEAFE";
const BLUE_LINE = "#93C5FD";

const Bullet = () => (
    <CheckCircleOutlineIcon sx={{ fontSize: 18, color: BLUE }} />
);

function peso(n) {
    return n.toLocaleString("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
}

function Section({ title, overline, children }) {
    return (
        <Box sx={{ mb: 3 }}>
            {overline && (
                <Typography variant="overline" sx={{ letterSpacing: 2, color: BLUE }}>
                    {overline}
                </Typography>
            )}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "999px", background: BLUE, boxShadow: `0 0 0 6px ${BLUE_SOFT}` }} />
                <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 800, letterSpacing: .2 }}>
                    {title}
                </Typography>
            </Box>
            {children}
        </Box>
    );
}

export default function ReligiousDetails({
    coverUrl = "/img/mapa_zicatela.png",

    // Intro
    intro = `Querida familia y amigos, nos emociona compartir con ustedes un viaje inolvidable para celebrar nuestra boda en la hermosa playa de Zicatela, Oaxaca. Partiremos juntos desde Puebla, rumbo a unos días llenos de alegría, descanso y momentos únicos. ¡Gracias por ser parte de esta celebración tan especial!`,

    // Fotos del hotel
    hotelPhotos = [
        "/img/hotel/h1.jpg",
        "/img/hotel/h2.jpg",
        "/img/hotel/h3.jpg",
        "/img/hotel/h4.jpg",
    ],

    // DETALLES (antes "features") — ahora estilo amenidades para no cortar lectura
    details = [
        { icon: <BeachAccessIcon />, text: "PARAÍSO TERRENAL · Visitar playas exóticas" },
        { icon: <LuggageIcon />, text: "TRANSPORTE SEGURO · El destino será simplemente mágico" },
        { icon: <LocalDiningIcon />, text: "BANQUETE DE PRIMERA · Relájate, disfruta y celebra" },
    ],

    // Amenidades
    amenities = [
        { icon: <TvIcon />, text: "TV con cable" },
        { icon: <ShowerIcon />, text: "Agua caliente" },
        { icon: <WifiIcon />, text: "Internet inalámbrico / Red WiFi" },
        { icon: <AcUnitIcon />, text: "Aire acondicionado" },
        { icon: <PoolIcon />, text: "2 albercas y chapoteadero" },
        { icon: <WavesIcon />, text: "A 10 min de la playa" },
    ],

    // Habitaciones (dos carruseles)
    rooms = {
        estandar: [
            { name: "Una cama matrimonial", people: 2, img: "/img/rooms/std_1mat.jpg", perNight: 1500, threeNights: 4500 },
            { name: "Dos camas matrimoniales", people: 4, img: "/img/rooms/std_2mat.jpg", perNight: 1700, threeNights: 5100 },
            { name: "Una cama King Size", people: 2, img: "/img/rooms/std_king.jpg", perNight: 1700, threeNights: 5100 },
        ],
        superior: [
            { name: "Una cama King Size", people: 2, img: "/img/rooms/sup_king.jpg", perNight: 2300, threeNights: 6900 },
            { name: "Dos camas matrimoniales", people: 4, img: "/img/rooms/sup_2mat.jpg", perNight: 2100, threeNights: 6300 },
            { name: "Tres camas matrimoniales", people: 6, img: "/img/rooms/sup_3mat.jpg", perNight: 2300, threeNights: 6900 },
        ],
    },

    // Transporte
    transport = {
        price: 2800,
        includes: [
            "Transporte redondo (4 días)",
            "Traslado redondo Puebla – Puerto Escondido",
            "Parada en Oaxaca centro",
            "Traslado ida y regreso en el evento",
        ],
    },

    // Fechas y pagos
    travel = {
        range: "5 – 8 febrero 2027 (4 días, 3 noches)",
        deposits: [
            { title: "Apartado", amount: 500, note: "por persona", deadline: "30 enero 2026" },
            { title: "50% del total", amount: null, note: "", deadline: "30 junio 2026" },
            { title: "Liquidación", amount: null, note: "", deadline: "30 diciembre 2026" },
        ],
    },
}) {
    return (
        <section id="detalles-religiosa" className="reveal" style={{ margin: 0 }}>
            {/* Mostrar solo al hacer clic */}
            <style>{`
        #detalles-religiosa{ display:none; scroll-margin-top:84px; opacity:0; }
        #detalles-religiosa:target{ display:block; animation:fadeIn .35s ease; opacity:1; }
        @keyframes fadeIn{ from{opacity:0; transform: translateY(6px);} to{opacity:1; transform:none;} }

        /* Carruseles horizontales con snap y texto envuelto */
        .h-scroll {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(280px, 80%);
          gap: 14px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-bottom: 6px;
        }
        .h-scroll > * { scroll-snap-align: start; }
        @media (min-width: 900px) {
          .h-scroll { grid-auto-columns: minmax(280px, 42%); }
        }
      `}</style>

            <Card
                elevation={0}
                sx={{
                    overflow: "hidden",
                    borderRadius: 3,
                    background:
                        `linear-gradient(180deg, #ffffff, #ffffff),
             radial-gradient(1200px 400px at -10% -30%, ${BLUE_SOFT} 0%, transparent 60%),
             radial-gradient(1200px 400px at 110% -10%, ${BLUE_SOFT} 0%, transparent 60%)`,
                    backgroundBlendMode: "normal, multiply, multiply",
                    border: `1px solid ${BLUE_LINE}`,
                }}
            >
                {/* Hero con mapa */}
                <Box
                    sx={{
                        position: "relative",
                        aspectRatio: "16/6",
                        backgroundImage: `url(${coverUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "saturate(1.02) contrast(1.02)",
                        borderBottom: `2px solid ${BLUE_LINE}`,
                    }}
                >
                    <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,.20), rgba(0,0,0,.05))" }} />
                </Box>

                <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 } }}>
                    {/* Intro */}
                    <Section overline="Boda religiosa — Zicatela, Oaxaca" title="Información general">
                        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7, borderLeft: `3px solid ${BLUE}`, pl: 2 }}>
                            {intro}
                        </Typography>

                        {/* Detalles clave: formato amenidades (no se corta lectura) */}
                        <Card sx={{ p: 2, border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                            <Grid container spacing={1.5}>
                                {details.map((d, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                                            <Box sx={{ color: BLUE }}>{d.icon}</Box>
                                            <Typography variant="body2">{d.text}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Section>

                    {/* Fechas y plan de pagos */}
                    <Section title="Fechas y pagos">
                        <Grid container spacing={2}>
                            {/* Fechas del viaje */}
                            <Grid item xs={12} md={5}>
                                <Card sx={{ p: 2, border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Typography sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, color: BLUE, fontWeight: 800 }}>
                                        <CalendarMonthIcon /> Viaje
                                    </Typography>
                                    <Typography variant="body1">{travel.range}</Typography>
                                </Card>
                            </Grid>

                            {/* Plan de pagos con columnas fijas en TODAS las filas */}
                            <Grid item xs={12} md={7}>
                                <Card sx={{ p: 1.5, border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Typography sx={{ color: BLUE, fontWeight: 800, mb: 1 }}>
                                        Plan de pagos
                                    </Typography>

                                    <Box
                                        component="table"
                                        sx={{
                                            width: "100%",
                                            borderCollapse: "separate",
                                            borderSpacing: 0,
                                            tableLayout: "fixed",          // ✅ columnas uniformes
                                            "& th, & td": { padding: "10px 8px", borderBottom: "1px solid #eee" },
                                            "& thead th": { fontSize: 13, color: "rgba(0,0,0,.6)", textAlign: "left" },
                                            "& tbody tr:nth-of-type(odd)": { background: "#fafafa" },
                                        }}
                                    >
                                        {/* Distribución de columnas: 50% / 25% / 25% */}
                                        <colgroup>
                                            <col style={{ width: "50%" }} />
                                            <col style={{ width: "50%" }} />
                                        </colgroup>

                                        <thead>
                                            <tr>
                                                <th>Concepto</th>
                                                <th>Fecha límite</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {travel.deposits.map((d, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <Bullet />
                                                        <strong>{d.title}</strong><br />
                                                        <small>{d.amount ? `${peso(d.amount)} ${d.note || ""}` : "—"}</small>
                                                    </td>
                                                    <td>
                                                        <Chip
                                                            size="small"
                                                            label={d.deadline}
                                                            sx={{
                                                                background: BLUE_SOFT,
                                                                border: `1px solid ${BLUE_LINE}`,
                                                                // ✅ permitir múltiples líneas
                                                                height: "auto",
                                                                maxWidth: "100%",
                                                                whiteSpace: "normal",
                                                                alignItems: "flex-start",
                                                                textAlign: "center",
                                                                px: 0.75,

                                                                "& .MuiChip-label": {
                                                                    display: "block",
                                                                    whiteSpace: "normal",
                                                                    lineHeight: 1.2,
                                                                    paddingTop: "2px",
                                                                    paddingBottom: "2px",
                                                                },
                                                            }}
                                                        />

                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Section>

                    <Divider sx={{ my: 2.5 }} />

                    {/* Galería fotos hotel (horizontal, texto no se corta) */}
                    <Section title="Hotel · fotos">
                        <Box className="h-scroll">
                            {hotelPhotos.map((src, i) => (
                                <Card key={i} sx={{ borderRadius: 2, overflow: "hidden", border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Box sx={{ aspectRatio: "16/10", background: `url(${src}) center/cover` }} />
                                </Card>
                            ))}
                        </Box>
                        <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                            Desliza para ver más fotos
                        </Typography>
                    </Section>

                    {/* Amenidades (ya tenían iconos) */}
                    <Section title="Amenidades">
                        <Card sx={{ p: 2, borderRadius: 2, border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                            <Grid container spacing={1.5}>
                                {amenities.map((a, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                                            <Box sx={{ color: BLUE }}>{a.icon}</Box>
                                            <Typography variant="body2">{a.text}</Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Section>

                    {/* ESTÁNDAR — carrusel con iconos (en vez de puntos) */}
                    <Section title="Habitaciones · categoría estándar">
                        <Box className="h-scroll">
                            {rooms.estandar.map((r, i) => (
                                <Card key={`std-${i}`} sx={{ borderRadius: 2, overflow: "hidden", border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Box sx={{ aspectRatio: "4/3", background: `url(${r.img}) center/cover` }} />
                                    <Box sx={{ p: 1.5 }}>
                                        <Typography fontWeight={800} sx={{ mb: .25 }}>{r.name}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                            <GroupIcon sx={{ fontSize: 18, color: BLUE }} />
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                Hasta {r.people} personas
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                            <Chip size="small" label={`Noche: ${peso(r.perNight)}`} sx={{ border: `1px solid ${BLUE_LINE}`, background: "#fff" }} />
                                            <Chip size="small" label={`3 noches: ${peso(r.threeNights)}`} sx={{ background: BLUE_SOFT, border: `1px solid ${BLUE_LINE}` }} />
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                        <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                            Desliza para ver todas las opciones
                        </Typography>
                    </Section>

                    {/* SUPERIOR — carrusel con iconos */}
                    <Section title="Habitaciones · categoría superior">
                        <Box className="h-scroll">
                            {rooms.superior.map((r, i) => (
                                <Card key={`sup-${i}`} sx={{ borderRadius: 2, overflow: "hidden", border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Box sx={{ aspectRatio: "4/3", background: `url(${r.img}) center/cover` }} />
                                    <Box sx={{ p: 1.5 }}>
                                        <Typography fontWeight={800} sx={{ mb: .25 }}>{r.name}</Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                                            <GroupIcon sx={{ fontSize: 18, color: BLUE }} />
                                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                                Hasta {r.people} personas
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                                            <Chip size="small" label={`Noche: ${peso(r.perNight)}`} sx={{ border: `1px solid ${BLUE_LINE}`, background: "#fff" }} />
                                            <Chip size="small" label={`3 noches: ${peso(r.threeNights)}`} sx={{ background: BLUE_SOFT, border: `1px solid ${BLUE_LINE}` }} />
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                        <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                            Desliza para ver todas las opciones
                        </Typography>
                    </Section>

                    <Divider sx={{ my: 2.5 }} />

                    {/* Transporte con iconos en la lista */}
                    <Section title="Transporte">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7}>
                                <Card sx={{ p: 2, border: `1px solid ${BLUE_LINE}`, background: "#fff" }}>
                                    <Typography fontWeight={800} sx={{ mb: 1 }}>
                                        Incluye
                                    </Typography>
                                    <List dense>
                                        {transport.includes.map((t, i) => (
                                            <ListItem key={i} disableGutters sx={{ py: 0.5 }}>
                                                <ListItemIcon sx={{ minWidth: 28 }}>
                                                    <Bullet />
                                                </ListItemIcon>
                                                <ListItemText primary={t} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Card
                                    sx={{
                                        p: 2,
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: `1px solid ${BLUE_LINE}`,
                                        background: BLUE_SOFT,
                                    }}
                                >
                                    <Box sx={{ textAlign: "center" }}>
                                        <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                                            Transporte redondo (4 días)
                                        </Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 900, color: BLUE }}>
                                            {peso(transport.price)}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Section>
                </Box>
            </Card>
        </section>
    );
}
