import React, { useEffect, useRef, useState } from "react";
import "./preloader-panels.css";

export default function Preloader({ loading, minShowMs = 1500, openAnimMs = 1100 }) {
    const [visible, setVisible] = useState(true);
    const [opening, setOpening] = useState(false);
    const startRef = useRef(Date.now());
    const openT = useRef(null);
    const hideT = useRef(null);

    useEffect(() => {
        if (loading) {
            clearTimeout(openT.current);
            clearTimeout(hideT.current);
            setOpening(false);
            setVisible(true);
            startRef.current = Date.now();
            return;
        }
        const elapsed = Date.now() - startRef.current;
        const delayToOpen = Math.max(0, minShowMs - elapsed);
        openT.current = setTimeout(() => {
            setOpening(true);
            hideT.current = setTimeout(() => setVisible(false), openAnimMs + 80);
        }, delayToOpen);
        return () => {
            clearTimeout(openT.current);
            clearTimeout(hideT.current);
        };
    }, [loading, minShowMs, openAnimMs]);

    if (!visible) return null;

    return (
        <div className={`preloader-panels ${opening ? "opening" : "closed"}`}>
            <div className="panel left">
                <div className="seal" aria-label="Sello A J">
                    <div className="seal-text">A & J</div>
                    <div className="seal-ring" aria-hidden="true" />
                    <div className="seal-emboss" aria-hidden="true" />
                </div>
            </div>
            <div className="panel right" />
            <div className="fade" />
            <div className="loader-text">Abriendo tu invitación…</div>
        </div>
    );
}
