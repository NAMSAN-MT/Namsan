import Image, { ImageProps } from 'next/image';
// Phase 3: passthrough over next/image (unoptimized via next.config.images).
// Phase 5 swaps internals to next-image-export-optimizer with the SAME props.
const AppImage = (props: ImageProps) => <Image {...props} />;
export default AppImage;
