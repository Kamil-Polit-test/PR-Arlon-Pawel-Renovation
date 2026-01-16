import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/galerie", label: "Galerie" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#ECEFF1] border-b border-gray-300 shadow-sm">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-4">
          <img
            src="/logo.jpg"
            alt="Pawel Rénovation logo"
            className="h-16 w-auto object-contain rounded-md"
          />

          <div className="h-16 flex flex-col justify-center leading-tight">
            <span className="text-2xl font-bold tracking-tight text-[#646060]">
              Pawel
            </span>
            <span className="text-2xl font-bold tracking-tight text-[#646060]">
              Rénovation
            </span>
          </div>
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-violet-700 font-semibold"
                  : "text-gray-600 hover:text-violet-600 transition"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-gray-600 transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Phone (desktop) */}
        <span className="hidden sm:inline-block bg-yellow-400 hover:bg-yellow-300 transition px-5 py-2 rounded-full font-bold shadow-sm">
          Tél. : 0487 70 76 80
        </span>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-lg transition ${
                  isActive
                    ? "text-violet-700 font-semibold bg-violet-100"
                    : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a
            href="tel:+32487707680"
            className="block py-2 px-4 rounded-lg bg-yellow-400 hover:bg-yellow-300 font-bold text-center transition"
          >
            Tél. : 0487 70 76 80
          </a>
        </nav>
      )}
    </header>
  );
}
