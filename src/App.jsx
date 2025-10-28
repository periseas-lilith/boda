import React, { useEffect, useMemo, useState } from 'react'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

import AppBarNav from './components/AppBarNav.jsx'
import Hero from './components/Hero.jsx'
import SectionSeparator from "./components/SectionSeparator";

import CeremonyCard from './components/CeremonyCard.jsx'
import ReceptionCard from './components/ReceptionCard.jsx'
import ReligiousCard from './components/ReligiousCard.jsx'
import GalleryShowcasePro from './components/GalleryGrid.jsx'
import AppFooter from './components/AppFooter.jsx'
import ReligiousDetails from './components/ReligiousDetails.jsx';

import Preloader from './components/Preloader.jsx'
import cfg from './config.js'
import './styles.css'

export default function App() {
  const [now, setNow] = useState(new Date())
  const [loading, setLoading] = useState(true)

  const countdown = useMemo(() => {
    const target = new Date('2025-12-06T12:30:00')
    const diff = Math.max(0, target - now)
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
    }
  }, [now])

  const whatsappUrl = useMemo(() => {
    const msg =
      `Hola, quiero confirmar mi asistencia a la ceremonia civil.` +
      `\nFecha: ${cfg?.date || ""}` +
      `\nHora: 12:30 PM` +
      `\nDirección: Av. 5 de Mayo 201, San Miguel, Centro San Andrés Cholula, 72810 San Andrés Cholula, Pue` +
      `\n\nNombre: ` +
      `\nAcompañantes: `;
    return `https://wa.me/522229995285?text=${encodeURIComponent(msg)}`;
  }, [])

  const shareUrl = useMemo(() => {
    const url = encodeURIComponent(window.location.href)
    const msg = encodeURIComponent('¡Estás invitad@ a nuestra boda civil!')
    return `https://wa.me/?text=${msg}%20${url}`
  }, [])

  useEffect(() => {
    // Reveal al hacer scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
    }, { threshold: .15 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    const t = setInterval(() => setNow(new Date()), 1000 * 30)

    // Pre-carga de imágenes clave; cuando termine, abrimos paneles
    const urls = [cfg.heroImage, ...(cfg.buffetPhotos.slice(0, 2) || [])]
    Promise.all(urls.map(preloadImage)).catch(() => { }).finally(() => {
      // breve pausa para que se vea el efecto de apertura
      setTimeout(() => setLoading(false), 300)
    })
    return () => clearInterval(t)
  }, [])

  const go = (selector) => {
    const el = document.querySelector(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const buffetPhotos = [
    "/img/menu/menu_1.jpg",
    "/img/menu/menu_2.jpg",
    "/img/menu/menu_3.jpg",
    "/img/menu/menu_4.jpg",
    "/img/menu/menu_5.jpg",
    "/img/menu/menu_6.jpg",
    "/img/menu/menu_7.jpg",
    "/img/menu/menu_8.jpg",
    "/img/menu/menu_9.jpg",
  ];
  const target = new Date('2025-12-06T12:00:00-06:00  ')
  const t = setInterval(() => setNow(new Date()), 1000)
  return (
    <>
      {/* Loader de paneles (cubre y abre) */}
      <Preloader loading={loading} minShowMs={2000} />

      {/* Contenido completo siempre renderizado */}
      <Hero
        cfg={{
          heroImage: "./public/foto_1.jpg", // ← tu foto sigue intacta
          couple: "A & J",
          date: "Sábado 6 de diciembre, 2025",
          time: "12:30 PM",
        }}
        countdown={countdown}
        targetId="ceremonia"
      />
      <Container maxWidth="md" sx={{ pb: 6 }}>
        <CeremonyCard cfg={cfg} whatsappUrl={whatsappUrl} />


        <ReceptionCard
          cfg={{
            venueName: "La Casa de Frida — 5 de Mayo",
            addressText: "Av. 5 de Mayo 201, San Miguel, Centro San Andrés Cholula, 72810 San Andrés Cholula, Pue",
            placeUrl: "https://www.google.com/maps/place/La+Casa+de+Frida...@19.0520351,-98.2991849,17z",
            receptionTime: "3:00 PM",
            pricePerPerson: 300,
            depositDeadline: "15 de noviembre",
            coverUrl: "/casa_frida.jpg",
            menuPhotos: buffetPhotos,
          }}
        />
        <ReligiousCard
          ceremony={{
            date: "Febrero 2027",
            church: "Parroquia de la Virgen de la Soledad",
            address: "Fundadores 205, Centro, 71980 Puerto Escondido, Oax.",
            notes: "Boda destino en la costa. Publicaremos horarios y logística completa pronto.",
          }}
          packages={[
            { name: "Estándar · 1 cama matrimonial", capacity: "Hasta 2 personas", price: 0 }, // ← pon $ aquí
            { name: "Estándar · 2 camas matrimoniales", capacity: "Hasta 4 personas", price: 0 },
            { name: "Superior · 1 cama King Size", capacity: "Hasta 2 personas", price: 0 },
            { name: "Superior · 2 camas matrimoniales", capacity: "Hasta 4 personas", price: 0 },
            { name: "Superior · 3 camas matrimoniales", capacity: "Hasta 6 personas", price: 0 },
          ]}
          transport={{
            from: "Salida grupal desde Puebla",
            note: "Transporte seguro. Cupo limitado.",
            cta: null,
          }}
        />

        <ReligiousDetails
          coverUrl="/img/mapa_zicatela.jpg"
          hotelPhotos={[
            "/img/hotel/h1.jpg",
            "/img/hotel/h2.jpg",
            "/img/hotel/h3.jpg",
          ]}
        />
        <GalleryShowcasePro
          video={{ src: "/img/dali/dali_3.mp4", poster: "/img/dali/dali_1.jpg", caption: "" }}
          images={[
            { src: "/img/dali/dali_1.jpg", caption: "" },
            { src: "/img/dali/dali_2.jpg", caption: "" },
            { src: "/img/dali/dali_4.jpg", caption: "" },
            { src: "/img/dali/dali_5.jpg", caption: "" },
            { src: "/img/dali/dali_6.jpg", caption: "" },
          ]}
          bgImage="/img/dali/dali_2.jpg"   // opcional, si tienes una panorámica
          rounded={16}
          backdrop="petals"
          accent="#CD6F83"
        />

      </Container>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed', right: 18, bottom: 18,
          background: '#25D366', color: '#fff',
          width: 56, height: 56, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', fontWeight: 700
        }}
        aria-label="Confirmar por WhatsApp"
      >
        WA
      </a>

      <AppFooter />
    </>
  )
}

/* helpers */
function preloadImage(url) {
  return new Promise((res, rej) => {
    const img = new Image()
    img.onload = res; img.onerror = rej; img.src = url
  })
}
