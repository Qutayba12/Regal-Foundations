/**
 * A barely-there film-grain layer over the whole page. Pure CSS (the noise is
 * an inlined SVG in globals.css), non-interactive, and disabled for
 * reduced-motion visitors. Gives the dark palette a tactile, cinematic finish.
 */
export default function GrainOverlay() {
  return <div aria-hidden className="grain-overlay" />;
}
