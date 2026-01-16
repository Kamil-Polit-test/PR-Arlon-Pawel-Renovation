import { Link } from "react-router-dom";

const services = [
  {
    name: "Peinture",
    desc: "Travail professionnel et finitions impeccables pour un rendu durable.",
  },
  {
    name: "Enduis",
    desc: "Application d'enduits de qualité avec finition lisse ou texturée.",
  },
  {
    name: "Tapisserie",
    desc: "Pose de papiers peints et revêtements muraux haut de gamme.",
  },
  {
    name: "Parquets",
    desc: "Installation, rénovation et entretien de parquets en bois massif.",
  },
  {
    name: "Portes intérieures",
    desc: "Remplacement et installation de portes pour moderniser votre intérieur.",
  },
  {
    name: "Finitions",
    desc: "Tous les détails qui font la différence pour un résultat professionnel.",
  },
];

const stats = [
  { stat: "10+", label: "Années d'expérience" },
  { stat: "100+", label: "Projets réalisés" },
  { stat: "100%", label: "Clients satisfaits" },
];

const approach = [
  {
    title: "Qualité premium",
    desc: "Nous utilisons uniquement des matériaux de qualité et respectons les normes les plus strictes.",
  },
  {
    title: "Transparence totale",
    desc: "Devis détaillé, suivi du projet et communication régulière tout au long des travaux.",
  },
  {
    title: "Équipe professionnelle",
    desc: "Notre équipe qualifiée et expérimentée garantit un travail soigné et fiable.",
  },
  {
    title: "Délais respectés",
    desc: "Nous respectons toujours nos engagements concernant les dates et les délais de réalisation.",
  },
];

export default function Home() {
  // phone number
  const phoneNumber = "+32 487 707 680";
  const phoneDisplay = "0487 70 76 80";

  return (
    <section className="space-y-20">
      {/* HERO */}
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Travaux soignés
            <br />
            <span className="text-violet-700">&nbsp;&amp; fiabilité garantie</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Spécialiste en rénovation intérieure à Arlon. Un travail propre, fiable
            et à prix compétitif — nous accompagnons votre projet de A à Z.
          </p>

          <Link
            to="/contact"
            className="inline-block bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold hover:bg-violet-600 transition"
          >
            Demander un devis
          </Link>
        </div>

        <div className="h-80 bg-white rounded-2xl overflow-hidden flex items-center justify-center">
          <img
            src="/images/2.jpg"
            alt="Exemple de réalisation — rénovation intérieure"
            className="w-full h-full object-cover rounded-2xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* SERVICES */}
      <div>
        <h2 className="text-3xl font-bold mb-2 text-center">Nos services</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Nous offrons une gamme complète de services de rénovation intérieure pour transformer votre espace.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <article
              key={service.name}
              className="bg-white rounded-2xl p-8 transition transform hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-violet-700">{service.name}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* STATS / TRUST */}
      <section className="bg-gradient-to-r from-violet-700 to-violet-600 rounded-2xl p-12 text-white">
        <h3 className="text-3xl font-bold mb-12 text-center">Pourquoi nous faire confiance?</h3>

        <div className="grid sm:grid-cols-3 gap-8">
          {stats.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl font-extrabold mb-2">{item.stat}</div>
              <p className="text-violet-100">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <div>
        <h3 className="text-3xl font-bold mb-10 text-center">Notre approche</h3>
        <div className="grid lg:grid-cols-2 gap-12">
          {approach.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl text-violet-700 flex items-start">✓</div>
              <div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-violet-700 to-violet-600 rounded-2xl p-12 text-center text-white">
        <h3 className="text-3xl font-bold mb-4">Prêt à transformer votre espace?</h3>
        <p className="mb-8 text-violet-100 max-w-2xl mx-auto">
          Contactez-nous pour un devis sans engagement. Notre équipe examinera votre projet et vous proposera une solution adaptée.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block bg-white text-violet-700 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
          >
            Demander un devis gratuit
          </Link>

          {/* Call button */}
          <a
            href={`tel:${phoneNumber}`}
            aria-label={`Appeler ${phoneDisplay}`}
            className="inline-flex items-center gap-3 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
          >
            <span className="whitespace-nowrap ">Appeler: <span>{phoneDisplay}</span></span>
          </a>
        </div>
      </section>
    </section>
  );
}
