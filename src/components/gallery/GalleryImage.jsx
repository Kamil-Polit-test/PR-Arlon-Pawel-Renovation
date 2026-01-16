import { memo, useEffect, useRef, useState } from "react";

const spanMap = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-2 row-span-1",
  "1x2": "col-span-1 row-span-2",
  "2x2": "col-span-2 row-span-2",
};

const mobileSpanMap = {
  "1x1": "col-span-1 row-span-1",
  "2x1": "col-span-1 row-span-1",
  "1x2": "col-span-1 row-span-1",
  "2x2": "col-span-1 row-span-1",
};

export default memo(function GalleryImage({ item, index, isMobile, onOpen }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spans = isMobile
    ? mobileSpanMap[item.size]
    : spanMap[item.size] || "col-span-1 row-span-1";

  return (
    <button
      ref={ref}
      onClick={onOpen}
      aria-label={`Open image ${index + 1}`}
      className={`relative overflow-hidden rounded-lg bg-gray-200 group ${spans}`}
    >
      {visible && (
        <img
          src={item.src}
          alt={item.alt || `Image ${index + 1}`}
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </button>
  );
});
