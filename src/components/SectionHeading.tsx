import Reveal from "./Reveal";
import DisplayHeading from "./DisplayHeading";

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
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${center ? "justify-center" : ""}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <DisplayHeading
        title={title}
        highlight={highlight}
        className="display-title text-4xl text-cream sm:text-5xl"
      />
      {subtitle && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-silver">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
