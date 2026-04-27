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
      <h2 className="headline mt-4 text-4xl sm:text-5xl">{title}</h2>
      {description ? <p className="mt-5 text-base leading-8 text-muted">{description}</p> : null}
    </div>
  );
}
