// components/Lightbox.jsx
import { useCallback, useEffect, useState } from "react";

function IconPrev(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconNext(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClose(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ANIM = 400;

export default function Lightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [open, setOpen] = useState(false);

  const prev = useCallback((e) => {
    e?.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images]);

  const next = useCallback((e) => {
    e?.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  }, [images]);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(onClose, ANIM);
  }, [onClose]);

  useEffect(() => {
    setIndex(startIndex);
    const t = setTimeout(() => setOpen(true), 20);
    return () => clearTimeout(t);
  }, [startIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
    };
  }, [close, next, prev]);

  if (!images || images.length === 0) return null;

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-[400ms] ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl mx-4 sm:mx-8 p-4 flex flex-col items-center transition-all duration-[400ms] ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-2 sm:top-6 right-2 sm:right-6 z-50 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 sm:p-4 rounded-full transition hover:scale-105"
        >
          <IconClose />
        </button>

        {/* image */}
        <div className="w-full flex items-center justify-center">
          <img
            src={images[index].src}
            alt={images[index].alt || `Image ${index + 1}`}
            className="w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-xl"
          />
        </div>

        {/* index */}
        <div className="text-center text-sm text-gray-100 mt-4 sm:mt-5">
          {index + 1} / {images.length}
        </div>

        {/* MOBILE: arrows below image (no overlap) */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-4">
          <button
            onClick={(e) => prev(e)}
            aria-label="Previous"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition hover:scale-105"
          >
            <IconPrev />
          </button>

          <button
            onClick={(e) => next(e)}
            aria-label="Next"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition hover:scale-105"
          >
            <IconNext />
          </button>
        </div>

        {/* DESKTOP: side arrows (overlay, unchanged) */}
        <div className="hidden md:flex absolute inset-0 pointer-events-none items-center justify-between px-4">
          <button
            onClick={(e) => prev(e)}
            aria-label="Previous"
            className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 sm:p-5 rounded-full transition hover:scale-105"
          >
            <IconPrev />
          </button>

          <button
            onClick={(e) => next(e)}
            aria-label="Next"
            className="pointer-events-auto bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 sm:p-5 rounded-full transition hover:scale-105"
          >
            <IconNext />
          </button>
        </div>
      </div>
    </div>
  );
}
