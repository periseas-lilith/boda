// components/SectionSeparatorFancy.jsx
import React from "react";

/**
 * Separador decorativo entre secciones.
 * Props:
 * - nextBg (string): color/gradiente del siguiente bloque (ej. "#ffffff")
 * - height (number): alto total en px (ej. 160)
 * - overlap (number): cuánto se mete hacia arriba (margin-top negativo)
 * - variant ("ribbon" | "floral"): lazo o ramita floral
 * - accent (string): color del trazo decorativo (ej. "#A879A3" o "#7c3aed")
 */
export default function SectionSeparatorFancy({
    nextBg = "#ffffff",
    height = 160,
    overlap = 90,
    variant = "ribbon",
    accent = "#7c3aed",
}) {
    const wrap = {
        position: "relative",
        width: "100%",
        height: `${height}px`,
        marginTop: `-${overlap}px`,
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
    };

    return (
        <div aria-hidden style={wrap}>
            <svg
                viewBox="0 0 1440 160"
                preserveAspectRatio="none"
                style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" }}
            >
                {/* Fondo que se funde con el siguiente bloque */}
                <defs>
                    <linearGradient id="fadeNext" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="100%" stopColor={nextBg} />
                    </linearGradient>
                    <filter id="shadowSoft" x="-20%" y="-50%" width="140%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.25" />
                    </filter>
                </defs>

                {/* Ola base */}
                <path
                    d="M0,70 C220,120 420,20 720,70 C1020,120 1220,60 1440,90 L1440,160 L0,160 Z"
                    fill="url(#fadeNext)"
                />

                {/* Motivo decorativo */}
                {variant === "ribbon" ? (
                    // Lazo suave con sombra
                    <path
                        d="M-20,95 C180,60 340,120 560,95 C740,75 920,60 1140,80 C1260,90 1350,105 1460,95"
                        fill="none"
                        stroke={accent}
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#shadowSoft)"
                        opacity="0.9"
                    />
                ) : (
                    // Ramita floral (línea + hojitas)
                    <>
                        <path
                            d="M-20,105 C200,85 380,120 600,100 C820,80 1020,110 1240,95 C1340,88 1400,90 1460,100"
                            fill="none"
                            stroke={accent}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            filter="url(#shadowSoft)"
                            opacity="0.9"
                        />
                        {/* Hojas simples */}
                        <g fill={accent} opacity="0.95">
                            <path d="M320,96 q10 -10 22 0 q-12 10 -22 0Z" />
                            <path d="M880,92 q10 -10 22 0 q-12 10 -22 0Z" />
                            <path d="M1120,98 q8 -9 18 0 q-10 9 -18 0Z" />
                            <path d="M520,104 q8 -9 18 0 q-10 9 -18 0Z" />
                        </g>
                    </>
                )}
            </svg>
        </div>
    );
}
