# CV production implementation

Stephen approved the complete CV design and its sourced content, then selected
option C (the subtle text link) on 2026-11-13 and requested GitHub publication
and a live deployment. This supersedes the original mockup-only delivery scope.

## Screens and behavior

- Add `/cv` with the heading “Experience” and the approved CV chronology.
- Preserve all 20 roles, 60 substantive experience bullets, two education
  entries, seven awards, three languages, and the skills tiers.
- Keep the shared site header, footer, theme selector, and responsive canvas.
  Add “CV” after Projects in desktop, mobile, and footer navigation.
- Use the approved underlined teal “See all my Deloitte projects” text link,
  with its long arrow and 44px target, to `/projects?tab=consulting`.
- Preserve grouped Deloitte promotions and the acquisition relationship.
  Keep education details keyboard accessible and section navigation useful
  on desktop and mobile. Downloads use the existing redacted résumé.
- Retain the US$41M forecast including contingencies, privacy filtering and
  year-only dates. Exclude the two non-consulting entries from Projects.

## Acceptance checks

Compare production against the approved mockup at desktop and mobile widths
in both themes. Check every experience ID and bullet against
`cv-experience-points.json`, metadata, navigation, section links, disclosure,
résumé download, focus and overflow. Run lint, types, tests and a production
build; obtain independent code/coverage/plan review and passing GitHub CI.
Verify the matching Dokploy deployment, `/health`, and public `/cv` after merge.

## Boundaries and release

No redesign, new career claims, new dependencies, deployment-setting changes,
versioning-policy changes or unrelated cleanup. Implement the approved design
with server-rendered React content and locally scoped CSS. Keep only section
wayfinding interactive. Preserve the standalone mockup as a design reference.

Release through the repository's existing PR/main/Dokploy path described in
the canonical homelab `docs/runbooks/landing-page-release.md`. Roll back an
unhealthy release through an authorized revert or the existing Dokploy rollback.
