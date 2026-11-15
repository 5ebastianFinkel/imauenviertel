import { useState, type FormEvent } from "react";
import { Button } from "./ui/Button";

// Submissions are handled by Netlify Forms. Netlify only detects forms in
// static HTML, so public/__forms.html declares this form for it: keep the
// field names of both files in sync, Netlify drops fields it does not know.
// Submissions only arrive on Netlify; locally nothing is sent (see CLAUDE.md).
const FORM_NAME = "kontakt";
const ENDPOINT = "/__forms.html";

type Result = { message: string; tone?: "success" | "error" };

// Styles: styles/components/contact-form.css
export function ContactForm() {
  const [validated, setValidated] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (!form.checkValidity()) {
      form.querySelector<HTMLElement>(":invalid")?.focus();
      return;
    }

    setResult({ message: "Wird gesendet..." });

    try {
      // Netlify Forms takes URL-encoded data only, not JSON
      const fields = [...new FormData(form)].map(([key, value]) => [key, String(value)]);
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields).toString(),
      });
      if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
    } catch (error) {
      // Keep the message so it can be sent again
      console.error(error);
      setResult({
        message:
          "Leider ist etwas schief gelaufen! Bitte versuchen Sie es später erneut oder schreiben Sie an mail@imauenviertel.de.",
        tone: "error",
      });
      return;
    }

    setResult({ message: "Erfolgreich versendet. Danke für Ihre Nachricht", tone: "success" });
    form.reset();
    setValidated(false);
    setTimeout(() => setResult(null), 5000);
  };

  const resultTone = result?.tone === "success" ? "text-leaf" : result?.tone === "error" ? "text-accent" : "";

  return (
    <form
      name={FORM_NAME}
      // Without JavaScript the browser posts the form and Netlify shows its own confirmation page
      action={ENDPOINT}
      method="POST"
      className={validated ? "contact-form was-validated" : "contact-form"}
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="subject" value="Neue Nachricht über das Kontaktformular" />
      {/* Honeypot: Netlify discards submissions that fill it in */}
      <div hidden aria-hidden="true">
        <label>
          Nicht ausfüllen: <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="mb-5">
        <label htmlFor="contact_name" className="sr-only">
          Vollständiger Name
        </label>
        <input
          id="contact_name"
          type="text"
          placeholder="Vollständiger Name"
          required
          className="field"
          name="name"
        />
        <div className="empty-feedback invalid-feedback text-accent text-sm mt-1">
          Bitte geben Sie Ihren vollständigen Namen an.
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="email_address" className="sr-only">
          Email Adresse
        </label>
        <input
          id="email_address"
          type="email"
          placeholder="Email Adresse"
          name="email"
          required
          className="field"
        />
        <div className="empty-feedback text-accent text-sm mt-1">Bitte geben Sie ihre Email Adresse an.</div>
        <div className="invalid-feedback text-accent text-sm mt-1">
          Bitte geben sie eine gültige Email Adresse an.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="contact_message" className="sr-only">
          Ihre Nachricht
        </label>
        <textarea
          id="contact_message"
          name="message"
          required
          placeholder="Ihre Nachricht"
          className="field h-36"
        ></textarea>
        <div className="empty-feedback invalid-feedback text-accent text-sm mt-1">
          Bitte geben Sie ihre Nachricht ein.
        </div>
      </div>
      <Button type="submit" size="lg" block>
        Nachricht senden
      </Button>
      <div className={`mt-3 text-center font-medium ${resultTone}`} role="status">
        {result?.message}
      </div>
    </form>
  );
}
