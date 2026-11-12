# CV mockup — designer report

Static, editable, responsive HTML mockup of a new **CV** page for
stephenjoly.net. It extends the live site's visual world and doesn't redesign
it. The UI files are frozen for the parent's final screenshots, detector pass,
and finish review.

Parent integration note: final desktop/mobile light/dark captures, interaction
QA, and independent review are complete; final disposition **ship**. See
`docs/cv-review.md` for current evidence. The parent's Playwright viewport API
verified true 390 px mobile layout; the CLI limitation below applies only to
the designer's earlier screenshot method. Parent also darkened inactive theme
labels to zinc-600 after the manual detector flagged their contrast.

## Files

| Path | Purpose |
|---|---|
| `mockups/cv/index.html` | The page. All content is hand-written markup, so it's easy to edit. |
| `mockups/cv/styles.css` | Hand-written CSS that copies the site's Tailwind zinc/teal tokens and type scale. |
| `mockups/cv/theme-init.js` | Runs before first paint and applies light/dark with no flash. |
| `mockups/cv/app.js` | Theme selector, mobile menu, active-section wayfinding, and footer year. |
| `mockups/cv/assets/avatar.png` | Header avatar, downscaled to 160px from `src/images/avatar.jpg`. The source file is PNG data, so it's renamed to match. |
| `mockups/cv/assets/logos/{dayforce,agentnoon,deloitte}.svg` | Copied from `src/images/logos/`. |
| `mockups/cv/assets/files/Stephen-Joly-Resume.pdf` | Copy of the supplied **redacted** résumé (phone and email already redacted). It downloads as `Stephen Joly - Resume.pdf`. |

There are no remote fonts, CDNs, or network dependencies. All asset paths are
relative, so the mockup works from the preview root or straight from `file://`.
Nav and footer links point to the matching live `https://stephenjoly.net/...`
URLs. CV links to `./`.

## Visual choices (inherited, not invented)

- **Frame:** a zinc-50 page (black in dark mode) with a fixed white column
  (zinc-900 in dark mode), capped at `max-w-7xl` with a 1px ring. It matches
  `Layout.tsx`. Container padding and the 42rem / 64rem content widths copy
  `ContainerOuter` and `ContainerInner` exactly.
- **Header:** the small circular avatar in its ring, the pill desktop nav with
  **CV** active (teal text plus the same faded 1px underline), the "Menu" pill
  below 1024px, and the teal-bordered "Contact me" pill on the right. The nav
  order is Home, About, Articles, Projects, CV, Speaking, Uses.
- **Type:** the platform sans stack, same as the site's Tailwind default. The
  sizes come from the site's scale: a 3rem/2rem bold h1 with -0.025em tracking,
  1.5rem semibold section headings, 1.125rem org names, a 1.125rem intro lead,
  and 15px entry body text.
- **Dated rows:** the site's `Section` / Articles pattern. Each section sits on
  a 1px zinc rail from 768px up. Dates are in a 9rem left column with tabular
  numerals, and entries fill the rest. Below 768px, dates sit above each entry.
- **Accents:** teal-700 for actions and links in light mode, teal-400 in dark
  mode. Both clear WCAG AA. Muted text is zinc-500 in light mode and zinc-400 in
  dark mode, because zinc-400 on white fails contrast.
- **Résumé action:** a solid teal button sized like About's "Get in touch". It
  appears three times: under the intro, under the desktop on-this-page nav, and
  in a short closing row before the footer, so it's reachable on mobile.
- **Footer:** the site's link row, copyright, and Light/Dark/System segmented
  selector. It uses the same `theme` storage key and values as next-themes.
- **Deliberately left out:** card grids, KPI or metric tiles, tag pills for
  skills, eyebrow labels, section numbers, gradients, and decorative motion.
  Metrics stay in sentences.

## Information structure

The intro is a first-person paragraph built from the inventory facts, followed
by Download résumé ("PDF, one page") and a LinkedIn link.

Wayfinding is an "On this page" list of six section links. On desktop it's a
sticky right column, mirroring About's text-plus-side-column layout, and the
current section is highlighted with teal text and a 1px rail marker. Below
1024px it becomes a wrapped row of links between the intro and the content.

| Section | Contents |
|---|---|
| Professional experience | **Dayforce** (2025–Present): five achievement bullets plus the note "Joined through Dayforce's acquisition of Agentnoon." **Agentnoon** (2025): "A Y Combinator-backed workforce planning startup, acquired by Dayforce in 2025," plus two bullets. **Deloitte Canada** (2018–2025): one group showing "Full-time 2020–2025 · Internship 2018–2019", an employer-level summary with the 165 project hours and 60 business units claims, a ladder of all five roles (most recent first, each with its own years), and a "Consulting case studies" link to `projects?tab=consulting`. |
| Research and early experience | Troost Institute (2020), University of Toronto Lead Campus Experience Officer (2019–2020), You're Next Career Network (2019–2020, title only, as the source requires), and HomEquity Bank (2017). |
| Leadership and community | **Phi Gamma Delta** (2016–2020), grouped, with all four roles and years. |
| Education | University of Toronto (2015–2020): degree, minor and certificate, and "Graduated 2020". Capstone and student involvement sit in a disclosure. A.R.S. Armenian Private School: High School Diploma, with no date because the source has none. |
| Skills and languages | A definition list with Core, Proficient (tools, plus a line for AI and agentic coding tools), Familiar, Languages, and Interests. |
| Awards and recognition | All seven awards as rows. Only the two dated awards show years (2020 and 2015). No granting bodies were added. |

## Coverage check

- **15 of 15 role entries:** Dayforce 1, Agentnoon 1, Deloitte 5, Troost 1,
  University of Toronto 1, You're Next 1, HomEquity 1, Phi Gamma Delta 4.
- **2 of 2 education entries, 7 of 7 awards, 3 of 3 languages.** Proficiency
  levels are unchanged: Native or bilingual, Limited working, Elementary.
- **All three skill tiers are kept separate:** Core, Proficient, Familiar.
- **Dates are years only.** No month-level dates and no elapsed-duration text.
  Source conflicts appear only in this report and the brief, never on the page.
- **Wording kept to the sources:** "Selected to deliver" (not "delivered") for
  Dayforce Discover. HomEquity figures are given as the source states them. No
  client names, locations, contract values, phone numbers, or email addresses.
- **Copy I added:**
  - The intro paragraph, written from the inventory facts.
  - "Four roles while at the University of Toronto" for Phi Gamma Delta. The
    inventory lists Phi Gamma Delta under UofT student involvement.
  - The closing line, "The one-page résumé has the condensed version of this
    record."
- **Wording choices for review:**
  - "Minor and certificate in Advanced Manufacturing Technology and Engineering
    Business." The source doesn't say which of the two is the minor.
  - "Six years at Deloitte" reuses the live About copy.

## Interactions

- **Theme:** the Light/Dark/System radio group sits in the footer. It's
  keyboard-operable with a visible focus ring, saved to `localStorage.theme`,
  and in System mode it follows the OS setting live. For screenshots, the URL
  parameter `?theme=light|dark|system` forces a theme (and also saves it).
- **Mobile menu (below 1024px):**
  - The button sets `aria-expanded` and `aria-controls`. The panel is a modal
    dialog over a blurred backdrop.
  - Focus moves to the close button and Tab stays inside the panel.
  - Escape, the backdrop, the close button, or any link closes it, and focus
    returns to Menu. It also closes if the window grows past 1024px.
  - The CV item carries `aria-current="page"`.
- **Disclosure:** education details use native `<details>`/`<summary>`, so
  Enter and Space work. The summary stays visible and its chevron rotates when
  open. Every role title and date is visible at rest; nothing essential is
  hidden.
- **Wayfinding:** the current section gets `aria-current="location"`, updated on
  scroll and resize via requestAnimationFrame. Anchor jumps scroll smoothly
  unless reduced motion is set. Sections have `scroll-margin-top`.
- **Accessibility basics:**
  - A skip link.
  - One h1, h2 per section, h3 per organisation, h4 per grouped role.
  - `<time>` elements, with a screen-reader-only "to" in place of the visible
    em dash.
  - Decorative logos use `alt=""`.
  - 44px minimum targets for the button, text links, the disclosure summary,
    and the theme options.
  - Themed text selection, scrollbar colours, and focus rings.
- **Motion:** only the mobile menu panel animates in (160ms ease-out). Nothing
  else moves.

## Design hook findings

- **low-contrast** (teal-600 active nav text on white and zinc-50, about 3.7:1):
  **fixed**. Active nav text is now teal-700. Teal-600 stays only on the
  Contact button's border, which isn't text.
- **cramped-padding** (`.fact`, plus two more of the same kind on divided
  rows): **left standing**. These are full-width rows split by 1px rules, with
  12–18px between the rule and the text and no left or right box edge. It's the
  site's divider-list pattern (like the mobile menu's `divide-y`), not text
  crammed inside a bordered container. Not suppressed; the parent's detector
  pass can decide.
- **flat-type-hierarchy:** reported before any stylesheet existed and not
  repeated after styles landed. The final scale steps are 48, 24, 18, and 15px.

## Limitations

- **Screenshots:** I didn't produce final evidence captures. One headless Chrome
  check matched the parent's early desktop render. Headless Chrome on macOS
  won't lay out narrower than 500px, so its "390px" capture clipped content at
  the right edge. That's a tool artifact, not page overflow. Final mobile
  screenshots should come from the parent's managed browser at a real 390px
  viewport.
- **Header behaviour:** the header is static. The live site's scroll-linked
  sticky header and home-page avatar animation aren't reproduced, since this
  isn't the home page and the mockup is static.
- **Fonts:** the platform sans stack is used, as on the live site, so rendering
  differs slightly between macOS and Windows.
- **Unused logos:** the UofT and HomEquity logos aren't used. Logos appear only
  in Professional experience so the compact sections line up.
- **Not done (out of scope):** production route, nav entry, and résumé file
  changes.
