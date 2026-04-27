type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionIntroProps) {
  const alignmentClass = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-3xl ${alignmentClass}`.trim()}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="headline mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">{description}</p> : null}
    </div>
  );
}
