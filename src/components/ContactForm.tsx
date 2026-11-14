import { useState, type FormEvent } from "react";
import { Button } from "./ui/Button";

const ENDPOINT = "https://api.web3forms.com/submit";

type Result = { message: string; tone?: "success" | "error" };

// To make this contact form work, create your free access key from https://web3forms.com/
// Then you will get all form submissions in your email inbox.
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

    const json = JSON.stringify(Object.fromEntries(new FormData(form)));
    setResult({ message: "Wird gesendet..." });

    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const body: { message?: string } = await response.json();
      if (response.status === 200) {
        setResult({ message: "Erfolgreich versendet. Danke für Ihre Nachricht", tone: "success" });
      } else {
        console.log(response);
        setResult({ message: body.message ?? "Leider ist etwas schief gelaufen!", tone: "error" });
      }
    } catch (error) {
      console.log(error);
      setResult({ message: "Leider ist etwas schief gelaufen!" });
    }

    form.reset();
    setValidated(false);
    setTimeout(() => setResult(null), 5000);
  };

  const resultTone = result?.tone === "success" ? "text-leaf" : result?.tone === "error" ? "text-accent" : "";

  return (
    <form
      action={ENDPOINT}
      method="POST"
      className={validated ? "contact-form was-validated" : "contact-form"}
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="subject" value="" />
      <input type="hidden" name="access_key" value="c6632c04-f25d-4a80-bb47-ec9146cd5476" />
      <input type="checkbox" className="hidden" style={{ display: "none" }} name="botcheck" />
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
