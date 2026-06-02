interface NewsWrapperProps extends OuterPadding, InnerWidth {
  children: React.ReactNode;
  title?: string;
}

interface OuterPadding {
  outerPadding: string;
}

interface InnerWidth {
  innerWidth: string;
}

export type { NewsWrapperProps, OuterPadding, InnerWidth };
