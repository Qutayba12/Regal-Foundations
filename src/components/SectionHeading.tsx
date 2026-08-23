import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        {eyebrow && (
          <span className={`eyebrow ${center ? "justify-center" : ""}`}>
            {eyebrow}
          </span>
        )}
        <h2 className="display-title text-4xl text-cream sm:text-5xl">
          {title} {highlight && <span className="text-gold-gradient">{highlight}</span>}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base leading-relaxed text-silver">{subtitle}</p>
        )}
      </Reveal>
    </div>
  );
}
