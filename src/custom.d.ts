declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.otf' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

// NOTE: *.png / *.jpg / *.gif are intentionally NOT declared here.
// Next provides them as StaticImageData via next/image-types/global
// (referenced from next-env.d.ts); migrated code uses `img.src`.
