// src/server/buildMembers.ts
//
// Ports gatsby-node.ts createPages `contextMembers` (lines 136–185):
//   - members ordered by `order` ASC
//   - businessFields `∙` → `·` replacement
//   - categoryIds: each businessField → its work doc `categoryId`
//   - image / bgImage as RemoteImage resolved from Storage paths
//
// Difference from gatsby-node (intentional, same result): gatsby ran one
// `work(categoryInfo:{in:field})` GraphQL query per businessField and matched
// the first work doc whose `categoryInfo` contained the field. We instead build
// a field→categoryId map once over all work docs (first-wins), which reproduces
// the same mapping in O(work) instead of O(members × fields) reads.
//
// gatsby's profile `image` carried `backgroundColor:'#F6F8FA'` (a gatsby-sharp
// placeholder concern) — dropped here; Member.style applies the bg and Phase 5
// `blurDataURL` covers placeholders. image/bgImage carry REAL intrinsic
// width/height (resolveImage probes them) so next/image preserves aspect — the
// member layouts derive one axis from the other by the image's ratio.
//
// Import ONLY from getStaticPaths / getStaticProps.
import bg0 from '@Images/members/bg0.png';
import bg1 from '@Images/members/bg1.png';
import bg2 from '@Images/members/bg2.png';
import bg3 from '@Images/members/bg3.png';
import { IMember } from '@Interface/api.interface';
import { RemoteImage } from '@Interface/image.interface';
import { getAllMembers, getAllWork, resolveImage } from '@Server/buildData';
import type { StaticImageData } from 'next/image';

// gatsby resolved member bgImage from a LOCAL image asset matched by name
// (`file(name: {eq: bgImagePath})`), NOT Firebase Storage. `bgImagePath` holds a
// bare name (`bg0`..`bg3`) → src/assets/imgs/members/bgN.png. The Phase 5 remote
// path (resolveImage → getFileFromStorage) returned '' for these (no Storage
// object), so backgrounds silently vanished. Resolve them as static imports;
// next-image-export-optimizer optimizes static media (.next/static/media) too.
const BG_IMAGES: Record<string, StaticImageData> = { bg0, bg1, bg2, bg3 };
const EMPTY_IMAGE: RemoteImage = { src: '', width: 0, height: 0 };

const resolveBgImage = (name: string): RemoteImage => {
  const img = BG_IMAGES[name];
  if (!img) return EMPTY_IMAGE;
  return {
    src: img.src,
    width: img.width,
    height: img.height,
    blurDataURL: img.blurDataURL,
  };
};

let _contextMembers: Promise<IMember[]> | null = null;

export const buildContextMembers = (): Promise<IMember[]> =>
  (_contextMembers ??= (async () => {
    const members = await getAllMembers(); // already sorted order ASC
    const work = await getAllWork();

    // work(categoryInfo:{in:field}) -> categoryId. Flatten categoryInfo entries
    // to categoryId, first-wins, matching gatsby's first-doc behaviour.
    const fieldToCategoryId: Record<string, string> = {};
    work.forEach(w =>
      (w.categoryInfo ?? []).forEach(info => {
        if (fieldToCategoryId[info] === undefined) {
          fieldToCategoryId[info] = w.categoryId;
        }
      }),
    );

    return Promise.all(
      members.map(async node => {
        const businessFields = (node.businessFields ?? []).map(field =>
          field.replaceAll('∙', '·'),
        );
        const categoryIds = businessFields.map(
          field => fieldToCategoryId[field] ?? '',
        );

        // Profile image: real intrinsic dimensions (gatsby used sharp); see
        // resolveImage. bgImage: local static asset (see resolveBgImage).
        const image = await resolveImage(node.imagePath);
        const bgImage = resolveBgImage(node.bgImagePath);

        return {
          ...node,
          businessFields,
          categoryIds,
          image,
          bgImage,
        } as IMember;
      }),
    );
  })());
