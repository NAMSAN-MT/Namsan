interface ISeoProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
  siteUrl?: string;
  ogUrl?: string;
  ogImage?: string;
  children?: React.ReactNode;
}

export type { ISeoProps };
