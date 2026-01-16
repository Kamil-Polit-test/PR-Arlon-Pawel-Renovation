import { useEffect, useState } from "react";
import gallery from "../data/gallery.json";
import Lightbox from "../components/gallery/Lightbox";
import GalleryImage from "../components/gallery/GalleryImage";

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section>
      <h2 className="text-4xl font-bold mb-8">Galerie</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[12rem] gap-4 sm:gap-6">
        {gallery.map((item, i) => (
          <GalleryImage
            key={item.id}
            item={item}
            index={i}
            isMobile={isMobile}
            onOpen={() => {
              setStart(i);
              setOpen(true);
            }}
          />
        ))}
      </div>

      {open && (
        <Lightbox
          images={gallery}
          startIndex={start}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
