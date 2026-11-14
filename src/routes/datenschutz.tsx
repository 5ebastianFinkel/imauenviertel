import { createFileRoute } from "@tanstack/react-router";
import { Container } from "@components/Container";
import { SectionHead } from "@components/SectionHead";
import { pageHead } from "@utils/seo";

export const Route = createFileRoute("/datenschutz")({
  head: () => pageHead("Datenschutz", "/datenschutz"),
  component: DatenschutzPage,
});

function DatenschutzPage() {
  return (
    <Container>
      <SectionHead eyebrow="Rechtliches" title="Datenschutz auf einen Blick" />
      <div className="prose prose-lg max-w-3xl legal">
        <article>
          <section>
            <h2>Allgemeine Hinweise</h2>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert,
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
              persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text
              aufgeführten Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2>Datenerfassung auf dieser Website</h2>

            <h3>Wer ist verantwortlich für die Datenerfassung auf
              dieser Website?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h3>Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z. B. durch ein
              Kontaktformular.
              Andere Daten werden beim Besuch der Website automatisch durch die IT-Systeme unseres
              Hosters erfasst.
              Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
              Seitenaufrufs).
            </p>

            <h3>Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten.
              Wir setzen keine Analyse- oder Tracking-Werkzeuge ein und werten Ihr Nutzerverhalten nicht aus.
            </p>

            <h3>Welche Rechte haben Sie bezüglich Ihrer
              Daten?</h3>
            <p>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
              Ihrer gespeicherten personenbezogenen Daten zu erhalten.
              Sie können die Berichtigung, Löschung oder Einschränkung der Verarbeitung verlangen sowie
              der Verarbeitung widersprechen.
              Darüber hinaus steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>
          </section>

          <section>
            <h2>Hosting und Content Delivery Networks (CDN)</h2>

            <h3>Externes Hosting</h3>
            <p>
              Diese Website wird bei Netlify, Inc. (USA) gehostet. Wenn Sie die Website aufrufen,
              verarbeitet Netlify die dafür technisch nötigen Daten in Server-Logfiles: Ihre IP-Adresse,
              Datum und Uhrzeit des Aufrufs, die aufgerufene Seite, die zuvor besuchte Seite (Referrer)
              sowie Angaben zu Browser und Betriebssystem.
            </p>
            <p>
              Außerdem lädt jede Seite ein Skript von Netlify (identity.netlify.com), über das sich
              Vereinsmitglieder mit Redaktionszugang anmelden. Auch dabei wird Ihre IP-Adresse an Netlify
              übermittelt.
            </p>
            <p>
              Der Einsatz des Hosters erfolgt im Interesse einer sicheren und effizienten Bereitstellung
              unserer Website (Art. 6 Abs. 1 lit. f DSGVO). Netlify nimmt nach eigenen Angaben am
              EU-US Data Privacy Framework teil. Weitere Informationen finden Sie in der{" "}
              <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Netlify</a>.
            </p>
            <p>
              Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner
              Leistungspflichten erforderlich ist.
            </p>

            <h3>Auftragsverarbeitung</h3>
            <p>
              Mit Netlify besteht ein Vertrag über Auftragsverarbeitung (Data Processing Agreement), der
              Bestandteil der Nutzungsbedingungen von Netlify ist.
            </p>
          </section>

          <section>
            <h2>Bilder externer Anbieter</h2>
            <p>
              Einige Bilder, vor allem in unseren Neuigkeiten, werden nicht von unserem Hoster, sondern
              direkt von den folgenden Anbietern geladen. Ihr Browser stellt dafür eine Verbindung zu deren
              Servern her und übermittelt dabei Ihre IP-Adresse sowie technische Angaben wie den Browsertyp.
              Rechtsgrundlage ist unser berechtigtes Interesse an einer schnellen, in Größe und Format
              angepassten Auslieferung der Bilder (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <h3>Cloudinary</h3>
            <p>
              Bilder, die wir über unser Redaktionssystem hochladen, speichert und liefert Cloudinary
              (Cloudinary Ltd. und verbundene Unternehmen) aus. Cloudinary nimmt nach eigenen Angaben am
              EU-US Data Privacy Framework teil. Weitere Informationen finden Sie in der{" "}
              <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Cloudinary</a>.
            </p>

            <h3>Unsplash</h3>
            <p>
              Einzelne Beitragsbilder stammen von Unsplash und werden von deren Servern
              (images.unsplash.com) geladen. Weitere Informationen finden Sie in der{" "}
              <a href="https://unsplash.com/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Unsplash</a>.
            </p>
          </section>

          <section>
            <h2>Cookies, Speicherung im Browser und Schriftarten</h2>
            <p>
              Diese Website setzt keine Cookies. Damit beim Zurückblättern die zuletzt angesehene Stelle
              einer Seite wieder erscheint, speichert Ihr Browser die Scrollposition im Sitzungsspeicher
              (sessionStorage). Diese Angabe verlässt Ihr Gerät nicht und wird gelöscht, sobald Sie den Tab
              schließen. Die Speicherung ist für die von Ihnen genutzte Funktion unbedingt erforderlich
              (§ 25 Abs. 2 Nr. 2 TDDDG).
            </p>
            <p>
              Die verwendeten Schriftarten werden von unserem Hoster ausgeliefert. Es besteht dabei keine
              Verbindung zu Servern von Google oder anderen Schriftarten-Anbietern.
            </p>
          </section>

          <section>
            <h2>Allgemeine Hinweise und
              Pflichtinformationen</h2>

            <h3>Datenschutz</h3>
            <p>
              Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Vorschriften. Diese Erklärung erläutert, welche Daten wir erfassen und wie wir sie verwenden.
            </p>
            <p>
              Bitte beachten Sie, dass die Datenübertragung im Internet Sicherheitslücken aufweisen kann.
            </p>

            <h3>Verantwortliche Stelle</h3>
            <address>
              <strong>Kleingärtnerverein „Im Auenviertel“ e.V.</strong><br />
              Holtbeck 43<br />
              48161 Münster<br />
              Vorsitzender: Dr. Christos Moustakis<br />
              E-Mail: <a href="">!! MAIL ADRESSE OBFUSCICATION</a>
            </address>

            <h3>Widerruf Ihrer Einwilligung zur
              Datenverarbeitung</h3>
            <p>
              Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine
              formlose Mitteilung per E-Mail.
            </p>

            <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
            <p>
              Sie haben jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
              Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen.
            </p>

            <h3>Beschwerderecht bei der Aufsichtsbehörde</h3>
            <p>
              Im Falle von Verstößen gegen die DSGVO steht Ihnen ein Beschwerderecht bei der zuständigen
              Aufsichtsbehörde zu. Für uns ist das die{" "}
              <a href="https://www.ldi.nrw.de/" target="_blank" rel="noopener noreferrer">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</a>.
            </p>

            <h3>Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Ihre Daten in einem gängigen, maschinenlesbaren Format an sich oder
              einen Dritten übertragen zu lassen.
            </p>

            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Erkennbar an
              „https://“ und einem Schloss-Symbol.
            </p>

            <h3>Auskunft, Löschung, Berichtigung</h3>
            <p>
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten Daten
              sowie ggf. ein Recht auf Berichtigung oder Löschung.
            </p>

            <h3>Recht auf Einschränkung der Verarbeitung</h3>
            <p>
              In bestimmten Fällen können Sie die Einschränkung der Verarbeitung verlangen (z. B. bei
              strittiger Richtigkeit, Widerspruch, o.ä.).
            </p>

            <h3>Widerspruch gegen Werbe-E-Mails</h3>
            <p>
              Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur
              Übersendung nicht angeforderter Werbung wird widersprochen.
            </p>
          </section>

          <section>
            <h2>Kontaktaufnahme</h2>

            <h3>Kontaktformular</h3>
            <p>
              Die Angaben aus dem Kontaktformular werden zur Bearbeitung Ihrer Anfrage gespeichert. Die
              Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b oder f DSGVO.
            </p>
            <p>
              Für den Versand nutzen wir den Dienst Web3Forms, betrieben von Web3Creative mit Sitz in
              Indien. Ihre Eingaben (Name, E-Mail-Adresse und Nachricht) werden an Web3Forms übermittelt und
              von dort als E-Mail an den Vorstand weitergeleitet. Weitere Informationen finden Sie im{" "}
              <a href="https://web3forms.com/dpa" target="_blank" rel="noopener noreferrer">
                Vertrag zur Auftragsverarbeitung von Web3Forms
              </a>
              .
            </p>

            <h3>Anfragen per E-Mail, Telefon oder Telefax</h3>
            <p>
              Anfragen über diese Kanäle werden inklusive aller Daten zur Bearbeitung gespeichert. Es
              gelten dieselben Rechtsgrundlagen wie beim Kontaktformular.
            </p>
          </section>

          <section>
            <h2>Bewerbung um einen Kleingarten</h2>

            <h3>Bewerbungsbogen und Warteliste</h3>
            <p>
              Wenn Sie uns den Bewerbungsbogen senden, verarbeiten wir Ihre Angaben, um Sie auf unsere
              Warteliste aufzunehmen und Ihnen eine Parzelle anbieten zu können. Rechtsgrundlage ist die
              Anbahnung eines Pacht- und Mitgliedschaftsverhältnisses (Art. 6 Abs. 1 lit. b DSGVO).
            </p>

            <h3>Speicherdauer</h3>
            <p>
              Wir speichern Ihre Angaben, solange Sie auf der Warteliste stehen. Ziehen Sie Ihre Bewerbung
              zurück oder kommt keine Pacht zustande, löschen wir Ihre Daten, sofern keine gesetzlichen
              Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section>
            <h2>Redaktionssystem</h2>
            <p>
              Vereinsmitglieder mit Redaktionszugang pflegen die Inhalte unter /admin/. Dieser Bereich lädt
              das Redaktionssystem Decap CMS über den Dienst unpkg.com und nutzt für die Anmeldung Netlify
              Identity. Für Besucherinnen und Besucher der übrigen Seiten ist er nicht relevant.
            </p>
          </section>

          <p>Stand: November 2026</p>

        </article>
      </div>
    </Container>
  );
}
