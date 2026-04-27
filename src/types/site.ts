export type NavigationItem = {
  label: string;
  href: string;
  highlight?: boolean;
};

export type CtaAction = {
  href: string;
  label: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  bullets: string[];
};

export type FeatureItem = {
  title: string;
  description: string;
};

export type PriceItem = {
  title: string;
  price: string;
  description: string;
  bullets: string[];
};

export type ReferenceItem = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};
