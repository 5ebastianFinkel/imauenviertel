import type { ReactNode } from "react";

// Page header: eyebrow, serif title (wrap a word in <em> for the accent
// colour) and an optional lead paragraph. Styles: styles/components/section-head.css
interface Props {
  eyebrow?: string;
  title: ReactNode;
  desc?: ReactNode;
}

export function SectionHead({ eyebrow, title, desc }: Props) {
  return (
    <header className="page-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {desc && <p className="page-head__desc">{desc}</p>}
      <svg className="page-head__leaf" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M10 54C10 28 26 10 56 8c0 30-18 46-46 46Z" />
        <path d="M10 54 40 24" />
      </svg>
    </header>
  );
}
