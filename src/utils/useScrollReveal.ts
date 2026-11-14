import { useEffect } from "react";

// Reveals [data-reveal] elements as they scroll into view (see globals.css).
// Call it in every page component that uses data-reveal. It has to run in the
// page itself: the class is added to the DOM directly, which is only safe once
// React has hydrated that part of the page.
export function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
      else observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
