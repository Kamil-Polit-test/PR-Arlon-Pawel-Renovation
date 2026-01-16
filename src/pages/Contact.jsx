import { useState } from "react";

const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;
const FORMSPREE_ENDPOINT = `https://formspree.io/${FORMSPREE_FORM_ID}`;

const CONTACT_EMAIL = "pawelrenovation1@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    _gotcha: ""
  });
  const [sending, setSending] = useState(false);

  const updateField = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    try {
      if (!form.name || !form.email || !form.message) {
        alert("Proszę wypełnić wszystkie pola.");
        setSending(false);
        return;
      }

      if (form._gotcha && form._gotcha.trim() !== "") {
        console.warn("Honeypot triggered — possible spam.");
        setSending(false);
        return;
      }

      const payload = {
        name: form.name,
        email: form.email,
        message: form.message,
        _replyto: form.email,
        _subject: `Nowa wiadomość z formularza — ${form.name}`
      };

      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(data.error || data.message || "Błąd wysyłki");
      }

      alert("Wiadomość wysłana. Dziękujemy!");
      setForm({ name: "", email: "", message: "", _gotcha: "" });
    } catch (err) {
      console.error(err);
      alert("Nie udało się wysłać wiadomości: " + (err.message || err));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4">
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 bg-white rounded-2xl shadow-lg overflow-hidden">
        <section className="p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Contactez-nous</h1>
          <p className="mb-6 text-gray-600">Vous avez une question ou un projet? Écrivez-nous.</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <input
              type="text"
              name="_gotcha"
              value={form._gotcha}
              onChange={updateField}
              tabIndex="-1"
              autoComplete="off"
              style={{ display: "none" }}
            />

            <Input name="name" placeholder="Votre nom" value={form.name} onChange={updateField} />
            <Input type="email" name="email" placeholder="Votre email" value={form.email} onChange={updateField} />
            <textarea
              name="message"
              rows="5"
              placeholder="Votre message"
              value={form.message}
              onChange={updateField}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 min-h-[5rem]"
            />
            <button
              type="submit"
              disabled={sending}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 disabled:opacity-60"
            >
              {sending ? "Envoi..." : "Envoyer"}
            </button>
          </form>

          <div className="mt-8 text-gray-700">
            <p><strong>Email:</strong> {CONTACT_EMAIL}</p>
            <p><strong>Téléphone:</strong> +32 487 707 680 </p>
            <p><strong>Adresse:</strong> Arlon, Belgique</p>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" className="underline hover:text-gray-700">Privacy Policy</a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" className="underline hover:text-gray-700">Terms of Service</a>{" "}
            apply.
          </p>
        </section>

        <div className="hidden lg:block">
          <img src="/images/3.jpg" alt="Chantier - P&R Arlon" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function Input({ type = "text", ...props }) {
  return (
    <input
      type={type}
      required
      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
      {...props}
    />
  );
}
