import ExportedImage from 'next-image-export-optimizer';
import { ComponentProps } from 'react';
// Phase 5: build-time WebP + blur via next-image-export-optimizer with the SAME
// props as the Phase 3 next/image passthrough (no call-site edits needed).
type AppImageProps = ComponentProps<typeof ExportedImage>;
// placeholder="blur" is spread BEFORE {...props} so any call site that sets its
// own placeholder still wins; ExportedImage supplies blurDataURL from the build.
const AppImage = (props: AppImageProps) => (
  <ExportedImage placeholder="blur" {...props} />
);
export default AppImage;
