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
import { IMember } from '@Interface/api.interface';
import { getAllMembers, getAllWork, resolveImage } from '@Server/buildData';

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

        // Real intrinsic dimensions (gatsby used sharp); see resolveImage.
        const [image, bgImage] = await Promise.all([
          resolveImage(node.imagePath),
          resolveImage(node.bgImagePath),
        ]);

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
