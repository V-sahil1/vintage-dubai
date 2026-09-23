type Props = {
  kicker: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  rule?: boolean;
  className?: string;
  as?: "h1" | "h2";
};

export default function SectionHeading({ kicker, title, text, align = "left", rule, className = "", as = "h2" }: Props) {
  const Tag = as;
  return (
    <div className={`${align === "center" ? "flex flex-col items-center text-center mx-auto" : ""} ${className}`}>
      <span className="font-label-badge text-label-badge uppercase tracking-[0.25em] text-primary block mb-2">{kicker}</span>
      <Tag className="font-headline-lg text-headline-md-mobile md:text-headline-lg-mobile lg:text-headline-lg uppercase text-on-surface tracking-tight">
        {title}
      </Tag>
      {rule && <div className="w-16 h-0.5 bg-primary mt-3 mb-2" />}
      {text && <p className="font-body-md text-body-sm md:text-body-md text-secondary mt-1 md:mt-2">{text}</p>}
    </div>
  );
}
