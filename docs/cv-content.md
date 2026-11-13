# CV content inventory

The authoritative detailed experience inventory is now
[cv-experience-points.json](cv-experience-points.json): **20 distinct roles and
60 visible achievement bullets**, with a source reference for each point.
The first mockup's condensed summaries are superseded by Stephen's request to
include the complete substantive experience points.

## Sources and reconciliation

- Current LinkedIn experience page:
  https://www.linkedin.com/in/stephenjoly/details/experience/
- Current LinkedIn volunteering page:
  https://www.linkedin.com/in/stephenjoly/details/volunteering-experiences/
- Supplied six-page LinkedIn PDF: retains fuller earlier research, internship,
  and Phi Gamma Delta achievements and the You're Next Career Network role.
- Supplied one-page redacted résumé: retains detailed delivery, automation,
  workforce planning, and transformation achievements.

Use current LinkedIn for updated titles and event status: the Discover session
was delivered, with 145 registered participants; do not revert to the older
'selected to present' wording. Current LinkedIn also supplies five additional
volunteer roles and the Power BI / Excel / Azure LLM impact-model details.

Use year-level dates where the supplied documents differ. Merge equivalent
claims without dropping methods, deliverables, audiences, quantities, or
outcomes. Keep projected savings and scaling targets distinct from realized
results. On 2026-11-13 Stephen explicitly selected the résumé's **US$41M
forecast including contingencies**. Show this projected reduction in the
Dayforce analysis bullet, alongside its methods and executive presentation.
Omit LinkedIn's alternative numerical amount; keep Agentnoon's reporting-services
achievement qualitative. The user's selection supersedes source-freshness inference.

Private contacts and named clients remain omitted. The local page includes
professional outcome metrics and anonymized client context requested in the
complete-bullets update. No other person's contact details or records appear.

## Rendering contract

Every role in the inventory has one visible entry with its matching ID. Every
point has one visible bullet with its matching ID and complete authored text.
The application server-renders `src/app/cv/page.tsx`; the standalone reference
remains in `mockups/cv/index.html`. Edit the inventory, TSX, and reference HTML
together. `e2e/cv.spec.ts` checks the application against the inventory.
Deloitte's five résumé achievements sit in a shared employer-level list because its résumé
job bands span multiple detailed LinkedIn titles. This avoids inventing a more
specific role attribution. Two title-only roles (You're Next and chemical
engineering mentorship) have no invented responsibilities.

Education, skills, languages, awards, layout, styling, assets, and interactions
retain the approved first mockup. See [cv-review.md](cv-review.md) for the
review script and [cv-content-completeness.md](cv-content-completeness.md) for
coverage and current verification.
