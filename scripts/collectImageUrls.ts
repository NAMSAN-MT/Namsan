// scripts/collectImageUrls.ts
//
// Single source of truth for the remote-image manifest consumed by
// next-image-export-optimizer (see ../remoteOptimizedImages.js).
//
// CRITICAL: the strings returned here must be BYTE-IDENTICAL to the `src`
// strings <ExportedImage> receives in JSX, or the optimizer silently falls back
// to the un-optimized remote original. We guarantee that by reusing the EXACT
// same buildData functions the page getStaticProps call (getAll* + imageUrl,
// which both resolve through getFileFromStorage -> getDownloadURL). Storage
// download tokens are stable per object, so the URLs match.
//
// Rendered image sources collected (mirrors each page's getStaticProps):
//   - member.image     <- member.imagePath   (buildMembers.ts)
//   - member.bgImage   <- member.bgImagePath  (buildMembers.ts)
//   - work backgroundImage <- work.imagePath  (work/[id].tsx)
//   - news newsImageData   <- news.imagePath  (news/[id].tsx)
// Empty strings ('' for paths with no Storage object, e.g. bg2/bg3) are dropped
// — components guard those and no <ExportedImage> is rendered for them.
import { getAllMembers, getAllNews, getAllWork, imageUrl } from '@Server/buildData';

export async function collectImageUrls(): Promise<string[]> {
  const [members, work, news] = await Promise.all([
    getAllMembers(),
    getAllWork(),
    getAllNews(),
  ]);

  const urls = await Promise.all([
    ...members.map(m => imageUrl(m.imagePath)),
    ...members.map(m => imageUrl(m.bgImagePath)),
    ...work.map(w => imageUrl(w.imagePath ?? '')),
    ...news.map(n => imageUrl(n.imagePath ?? '')),
  ]);

  return Array.from(new Set(urls.filter(Boolean)));
}
