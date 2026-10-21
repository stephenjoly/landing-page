import type { ImageProps } from 'next/image'

import logoDeloitte from '@/images/logos/deloitte.svg'
import logoHomEquity from '@/images/logos/homequity.svg'
import logoUofT from '@/images/logos/uoft.svg'
import iconBackupAgent from '@/images/project-icons/backup-agent.svg'
import iconCodexSessionIndexer from '@/images/project-icons/codex-session-indexer.svg'
import iconDeployWizard from '@/images/project-icons/deploy-wizard.svg'
import iconJolifyPpt from '@/images/project-icons/jolify-ppt.svg'
import iconMarketCallSummaries from '@/images/project-icons/market-call-summaries.svg'
import iconPizzaCalculator from '@/images/project-icons/pizza-calculator.svg'
import iconScreenshotSense from '@/images/project-icons/screenshot-sense.svg'
import iconSocialKnowledge from '@/images/project-icons/social-knowledge.svg'
import iconTraefikRulesManager from '@/images/project-icons/traefik-rules-manager.svg'

export interface CodingProject {
  name: string
  description: string
  logo: ImageProps['src']
  homeFeatured?: boolean
  homeSummary?: string
  status?: 'published' | 'wip'
  link?: {
    href: string
    label: string
  }
}

export interface ConsultingProject {
  slug: string
  shortTitle: string
  year: string
  outcome: string
  category:
    | 'AI and analytics'
    | 'Workforce and organization'
    | 'Risk and operations'
  featured: boolean
  homeFeatured?: boolean
  homeSummary?: string
  name: string
  description: string
  logo: ImageProps['src']
  descriptor: string
  context: string
  timeline: string
  role: string[]
}

export const consultingProjects: ConsultingProject[] = [
  {
    name: 'GenAI Business Development Intelligence Tool',
    logo: logoDeloitte,
    descriptor: 'Deloitte Canada, Office of GenAI',
    timeline: 'My involvement: July – August 2025',
    context:
      "Deloitte Canada's Office of GenAI was exploring opportunities to turn promising internal AI ideas into build-ready product concepts that could be mobilized with engineering support. One priority opportunity focused on reducing a major business development bottleneck: helping senior leaders transfer relationship knowledge, account context, and market intelligence in a structured way so AI could surface actionable insights and help client-facing teams advance opportunities faster and with greater consistency.",
    role: [
      'I led a 0-to-1 product discovery and definition workstream, taking a high-potential internal GenAI idea from early concept to a build-ready product direction, and contributed in the following capacity:',
      'I translated a broad GenAI enablement opportunity into a defined product concept by clarifying the business problem, target users, workflow pain points, and expected value for senior leaders and client-facing teams.',
      'I conducted market and vendor research, shaped early solution options, and prioritized ideas against desirability, viability, and feasibility criteria to recommend the strongest path forward.',
      'I led stakeholder discussions with senior leaders to gather feedback, refine the product direction, and build alignment around the proposed solution and its role in improving business development effectiveness.',
      'I directed the development of early product artifacts, including wireframes, feature definitions, MVP workstreams, agentic solution concepts, technical requirements, and a full product overview document.',
      'I coordinated with a UI/UX design resource to translate the product concept into wireframes and a clearer user experience for capturing leadership knowledge and surfacing actionable intelligence.',
      'I helped define a multi-agent intelligence solution intended to identify relevant client context, relationship signals, next-best actions, and business development opportunities from senior leader knowledge transfer.',
    ],
    description:
      'I led early product discovery for an internal GenAI tool designed to turn senior leader knowledge into actionable business development intelligence.',
    slug: 'genai-business-development-intelligence',
    shortTitle: 'GenAI product discovery',
    category: 'AI and analytics',
    outcome:
      'I defined a build-ready product direction with wireframes, MVP workstreams, and technical requirements.',
    year: '2025',
    featured: false,
  },
  {
    name: 'Technology Impact Modeling on Workforce Capacity',
    logo: logoDeloitte,
    descriptor: 'Confidential Client',
    timeline: 'March 2025 – July 2025 (5 months)',
    context:
      'The client was seeking to develop a methodology and supporting tooling to assess the impact of integrating Generative AI technologies into daily operations, with a focus on workforce size and distribution, project cost, and organizational capacity.',
    role: [
      'I was involved as the technical team lead and contributed in the following capacity:',
      'I designed the assessment methodology by gathering requirements from project sponsors and senior leaders, proposing multiple fidelity levels for analysis, and ultimately recommending a preferred approach aligned with organizational goals, timelines, and desired outcomes.',
      'I led the development of an operational task inventory and conducted a technology impact analysis to quantify potential disruptions, generating a foundational dataset to support visualization and insight generation.',
      'I built a robust Power BI model leveraging over 30 transformation steps and referenced queries, enabling seamless, no-code data refresh capabilities and enhanced connectivity across data sources.',
      'I developed a custom Excel function, “=AskGenAI(<prompt>)”, using VBA to enable secure API calls to Azure-hosted large language models (LLMs), allowing users to interact with Generative AI directly within Excel.',
      'I oversaw and supported a team of two in shaping the stakeholder engagement approach and planning for short- to medium-term sustainability of the solution.',
      'I provided ongoing feedback and quality assurance on supporting materials, such as presentation decks and communications, to ensure end-user clarity and adoption.',
    ],
    description:
      "I modeled AI's impact on workforce, cost, & capacity, delivering a methodology & tooling for strategic assessment.",
    slug: 'technology-impact-workforce-capacity',
    shortTitle: 'AI workforce impact modeling',
    category: 'AI and analytics',
    outcome:
      'I built a Power BI assessment model and an Excel function for Azure-hosted LLM queries.',
    year: '2025',
    featured: true,
  },
  {
    name: 'Job Architecture Refresh and Total Rewards Benchmark',
    logo: logoDeloitte,
    descriptor: 'Canadian Public Safety Organization',
    timeline: 'November 2024 – February 2025 (4 months)',
    context:
      'The client, a public safety and law enforcement organization, was seeking to refresh its Job Architecture framework to align job classifications and conduct external benchmarking on salary, benefits, and allowances/premiums against comparable organizations to support upcoming bargaining with its three unionized workforces.',
    role: [
      'I was involved as a senior member of the core team and contributed in the following capacity:',
      'I innovated on the firm’s job mapping methodology by standardizing the process and developing a GenAI-powered Python script to automate manual mapping activities, achieving a 99% efficiency gain and 90% accuracy rate. The tool saved over $17,000 (5%) of the project budget and is estimated to deliver $400K in annual efficiency gains compared to previous methods.',
      'I led the benchmarking of allowances and premiums by reviewing 18 collective agreements across six peer organizations, compiling and validating data with subject matter experts, and synthesizing findings into actionable recommendations in the final client report.',
      'I developed a Python implementation of numerical methods to support the design of an updated salary structure, tailored to address client-defined incentive challenges and workforce planning pain points.',
    ],
    description:
      'I refreshed job architecture & benchmarked total rewards to support union bargaining for a public safety organization.',
    slug: 'job-architecture-total-rewards',
    shortTitle: 'Job mapping automation',
    category: 'Workforce and organization',
    outcome:
      'My GenAI-powered mapping tool achieved a 99% efficiency gain and 90% accuracy, saving over $17,000 of the project budget; estimated annual efficiency gains were $400K.',
    year: '2024–2025',
    featured: true,
    homeFeatured: true,
    homeSummary:
      'I automated manual job mapping with GenAI and Python, achieving 90% accuracy and saving over $17,000 of the project budget. Estimated annual efficiency gains were $400K.',
  },
  {
    name: 'Capability Gap Analysis and Strategic Prioritization Support',
    logo: logoDeloitte,
    descriptor: 'Canadian Public Health Organization',
    timeline: 'January 2025 – January 2025 (1 month)',
    context:
      'The client, a public health organization, was seeking support at the C-suite level in developing a strategic plan to equip the organization with the skills and capabilities required to deliver on its key priorities.',
    role: [
      'I contributed as a subject matter expert in data analytics and process engineering:',
      'I collaborated with project leadership to define the data analysis approach and developed an MS Excel–based analysis engine that generated high-impact visualizations using executive input data; the quality of these visuals was cited as a key point of satisfaction by the CEO.',
      'I coached team members on how to interface with the solution and provided troubleshooting support to ensure smooth adoption and use throughout the analysis process.',
    ],
    description:
      'I built an Excel analysis engine to support capability gap analysis and strategic prioritization for a public health organization.',
    slug: 'capability-gap-strategic-prioritization',
    shortTitle: 'Capability gap analysis',
    category: 'Workforce and organization',
    outcome:
      'I built an Excel analysis engine whose visualizations were cited by the CEO as a key point of satisfaction.',
    year: '2025',
    featured: false,
  },
  {
    name: 'Workforce Readiness, Strategic Workforce Planning and High-level Organizational Design',
    logo: logoDeloitte,
    descriptor: 'Large Canadian Metropolitan Airport',
    timeline: 'August 2024 – October 2024 (3 months)',
    context:
      'The client, a regional airport authority managing one of the world’s busiest airports, was seeking to develop a Workforce Readiness plan to support the planning and execution of an upcoming large-scale capital expansion and physical asset modernization initiative. With growing annual passenger volumes, evolving customer needs, and a workforce constrained by post-COVID capacity reductions, the client sought to ensure workforce alignment across business continuity, transformation priority enablement, and long-term workforce sustainability.',
    role: [
      'I was involved as a senior member of the core engagement team and contributed in the following capacity:',
      'I led the development of a logical decision matrix in MS Excel to evaluate sourcing strategies for individual skill gaps; the tool has since been reused across multiple engagements to support informed decision-making on workforce reskilling and sourcing.',
      'I built a data model using Power Query and Power Pivot that synthesized skill gap inputs from stakeholder workshops to generate prioritization insights for organization-wide workforce planning.',
      'I developed a workforce risk model using HRIS data to identify high-risk roles and skillsets by creating risk indicators and establishing evaluation criteria to flag capability-based vulnerabilities across the organization.',
    ],
    description:
      'I developed workforce readiness models for airport expansion, addressing capacity, transformation, and long-term sustainability.',
    slug: 'airport-workforce-readiness',
    shortTitle: 'Airport workforce readiness',
    category: 'Workforce and organization',
    outcome:
      'I developed sourcing, skills-gap, and workforce risk models; the sourcing tool was reused across engagements.',
    year: '2024',
    featured: false,
  },
  {
    name: 'Culture Change to Enable Proactive Technical Debt Management',
    logo: logoDeloitte,
    descriptor: 'Confidential Public Sector Client',
    timeline: 'March 2024 – July 2024 (4 months)',
    context:
      'The client, a large enterprise IT organization, was seeking to transform its approach to technical debt management by addressing root causes and encouraging long-term mitigation through behavior change. The engagement focused on implementing Deloitte’s behavioral-lens framework to promote mindful practices around technical debt prevention and resolution.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I led multiple workstreams across two project phases, including current state analysis, development and validation of the behavioral approach, ideation and activation of the roadmap, and creation of a pilot plan to engage and influence target user groups.',
      'I created a strategic document outlining a high-level methodology for identifying and implementing over 12 behavioral interventions to support everyday management of technical debt.',
      'I developed detailed blueprints for 30 behavior-based interventions tailored to embed proactive technical debt mitigation practices into team workflows and support long-term organizational objectives.',
    ],
    description:
      'I developed behavioral intervention blueprints to support proactive technical debt management.',
    slug: 'technical-debt-behavior-change',
    shortTitle: 'Technical debt behavior change',
    category: 'Risk and operations',
    outcome:
      'I developed 30 intervention blueprints to support proactive technical debt management.',
    year: '2024',
    featured: false,
  },
  {
    name: 'Workforce Planning Capability Design and Enabler Development',
    logo: logoDeloitte,
    descriptor: 'Canadian Higher Education Institution',
    timeline: 'November 2023 – February 2024 (4 months)',
    context:
      'The client, a public higher education institution, was seeking to establish a centralized Workforce Planning capability within HR to enable strategic workforce management across the enterprise. Deloitte was approached to provide specialized expertise in data analysis, workforce process design, and tooling to support this initiative.',
    role: [
      'I was recommended to the client to lead the development of its workforce planning team, process, and tooling. My contributions included:',
      'I facilitated 10+ workshops with key stakeholders to gather objectives, functional roles, and constraints for the future-state workforce planning design, and developed business requirements documentation to ensure clarity and alignment for the broader team.',
      'I drafted a high-level implementation roadmap outlining enabling technologies, resource needs, stakeholder engagement milestones, and a continuous improvement approach.',
      'I designed an end-to-end annual workforce planning process represented through a business flow chart and high-level process map, incorporating mechanisms to evaluate and improve procedures and identify opportunities for business improvements.',
      'I built a customizable workforce planning template using MS SharePoint/OneDrive, Excel, and Power Query to enable workforce supply, demand, and gap analyses via structured data collection and reporting.',
      'I led five pilot groups through the new planning process to support strategic workforce planning, collect feedback and lessons learned, and iterate on process enablers and definitions based on real-world application.',
    ],
    description:
      "I designed workforce planning capability & tools for a higher education institution's HR department.",
    slug: 'workforce-planning-capability',
    shortTitle: 'Workforce planning capability',
    category: 'Workforce and organization',
    outcome:
      'I designed an annual planning process and supporting tools, then led five pilot groups through it.',
    year: '2023–2024',
    featured: true,
  },
  {
    name: 'Talent Strategy and TVP Narrative',
    logo: logoDeloitte,
    descriptor: 'International Integrated Oil & Gas Corporation',
    timeline: 'September 2023 – November 2023 (3 months)',
    context:
      'The client, a fully integrated oil and gas corporation, was seeking to redesign its Talent Strategy for a key business unit through a comprehensive, data-driven assessment of future workforce needs. The objective was to create a best-in-class, flexible strategy tailored to evolving organizational capabilities and long-term business goals.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I developed a Python-based web scraping script using functional programming (Selenium, Pandas) to extract and process over 10,000 publicly available employer reviews across 10 competitor organizations, enabling in-depth sentiment and experience analysis.',
      'I managed working relationships with a third-party vendor to integrate their AI-based sentiment analysis engine, extracting emotionality and employee experience insights to assess each competitor’s perceived ability to attract and retain talent.',
      "I led external benchmark analysis by identifying each competitor's Talent Value Proposition (TVP) through public-facing sources (e.g., corporate websites, careers portals, ESG/annual reports), analyzing aligned employer review themes, and highlighting strategic opportunities for the client to differentiate in the talent market.",
      "I conducted business analysis of functional requirements to identify informational needs, procedural workflows, and decision points in order to extract meaningful market data and conduct a comparative assessment of the client's current TVP relative to competitors.",
    ],
    description:
      'I supported a data-driven talent strategy and narrative through competitor research and employee sentiment analysis for an oil and gas client.',
    slug: 'talent-strategy-tvp',
    shortTitle: 'Talent strategy and TVP',
    category: 'Workforce and organization',
    outcome:
      'I analyzed over 10,000 employer reviews across 10 competitors to inform talent positioning.',
    year: '2023',
    featured: false,
  },
  {
    name: 'Workforce Strategy and Planning Analysis',
    logo: logoDeloitte,
    descriptor: 'International Integrated Oil & Gas Corporation',
    timeline: 'May 2023 – August 2023 (4 months)',
    context:
      'The client, a fully integrated oil and gas corporation, was seeking to define the vision for its workforce planning function by assessing the current state, analyzing skills and labour market trends, and consolidating findings into a final strategic report.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I led the current state analysis workstream by collaborating with engagement leadership to align on strategic direction and timelines, managing the assessment approach, evaluating existing procedures and processes, documenting statements of requirements for potential alternatives, and driving content development for deliverables.',
      'I led the quality assurance review of final project deliverables, ensuring alignment with delivery excellence standards.',
      'I facilitated the capture and synthesis of insights from 13 stakeholder interviews by coordinating scheduling, managing timelines, and extracting key themes to support final recommendations.',
    ],
    description:
      'I led current-state analysis and supported a strategic workforce report for an oil and gas client.',
    slug: 'workforce-strategy-planning',
    shortTitle: 'Workforce strategy analysis',
    category: 'Workforce and organization',
    outcome:
      'I led current-state analysis and synthesized 13 stakeholder interviews for a strategic workforce report.',
    year: '2023',
    featured: false,
  },
  {
    name: 'Workforce Planning Dashboard',
    logo: logoDeloitte,
    descriptor: 'Higher Education Institution',
    timeline: 'December 2022 (1 month)',
    context:
      'The client, a regional higher education institution, was seeking to develop a workforce planning framework and supporting proof-of-concept tools to strategically recruit and deploy resources in alignment with its organizational priorities.',
    role: [
      'I was asked to support the engagement team ad hoc and contributed in the following capacity:',
      'I supported the project team as a Subject Matter Expert in MS Excel and Power BI, providing guidance throughout the dashboard development process to ensure the chosen platform and design best met client needs.',
      'I oversaw the development of a workforce planning dashboard designed to forecast resource supply and demand based on key variables, by advising functional team members, reviewing outputs for quality, and implementing improvements to enhance functionality as required.',
    ],
    description:
      'I advised on and oversaw a dashboard for strategic workforce planning, aligning resources with institutional priorities.',
    slug: 'workforce-planning-dashboard',
    shortTitle: 'Workforce planning dashboard',
    category: 'Workforce and organization',
    outcome:
      'I advised on platform selection and oversaw development of a resource supply-and-demand dashboard.',
    year: '2022',
    featured: false,
  },
  {
    name: 'State of Performance',
    logo: logoDeloitte,
    descriptor: 'National Sales Organization',
    timeline: 'March 2022 (1 month)',
    context:
      'The client, the Sales function of a large professional services organization, was seeking to deliver an immersive workshop aimed at diagnosing team effectiveness and improving employee wellbeing, efficiency, and overall experience.',
    role: [
      'I was asked to support the engagement team ad hoc and contributed in the following capacity:',
      'I developed and implemented a Python-based automation script to streamline the extraction and processing of Qualtrics survey data, integrating results into an intuitive dashboard and reducing related task timelines by over 80%.',
    ],
    description:
      'I automated survey data processing for a workshop diagnosing sales team effectiveness and wellbeing.',
    slug: 'state-of-performance',
    shortTitle: 'Sales team survey automation',
    category: 'AI and analytics',
    outcome:
      'My Python automation reduced survey data extraction and processing timelines by over 80%.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Leadership Capability Model Development and Assessment Program',
    logo: logoDeloitte,
    descriptor: 'Regional Airport Authority',
    timeline: 'September 2022 – May 2023 (8 months)',
    context:
      'The client, a regional airport authority managing one of the world’s busiest airports, was seeking to enhance their leadership development program to refresh their leadership capabilities organization-wide and develop a “world-class” talent experience to support its ambitious growth and innovation strategy.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I managed the end-to-end process of 100+ leadership assessments for senior leaders by facilitating scheduling using an integrated and automated form technology, administering prework through three online psychometric assessment platforms, addressing on average 10 ad hoc questions or concerns per week, as needed, and preparing reports on psychometric data from three data sources, leveraging Python (pandas, openpyxl, win30com.client, selenium) and MS Excel to streamline the process whenever possible – ultimately reducing task timeline up to 90% (an estimated $40,000 in client service hours over the course of the project).',
      'I synthesized 58 unique profiles on stakeholder feedback for each leader in the program’s second cohort by exhaustively reviewing and extracting relevant insights from ~300 individual responses and over 1800 cells of free text data.',
      'I coordinated efforts between key stakeholders across up to 5 time zones to support leadership assessment approach and logistics.',
      'I produced 3 summative report documents to collate insights on aggregated data from assessment progress to present findings on bench strength and leadership development focus areas to senior Talent leaders and Executive stakeholders.',
      'I supported the preparation and facilitation of 10+ sessions, including audiences from front-line contributors to executive leaders – mainly for senior leaders reporting into the Executive Team.',
      'I led or supported the development of several core deliverables including all assessment materials for 3 cohorts of leaders, the overall leadership capability model, and content for stakeholder engagement sessions.',
      'I meaningfully contributed to brainstorming and solutioning of various decision points in the project as they related to assessment process design, third-party technology integration, and both internal and external stakeholder management.',
      'I developed an end-to-end process for undertaking the assessment process by gathering business requirement documentation, creating a business flow chart and process map, and developing process definitions. I also undertook strategic planning to develop the tools to enable the future state design.',
    ],
    description:
      'I supported a leadership capability model and managed assessment delivery for a major airport.',
    slug: 'leadership-capability-assessment',
    shortTitle: 'Leadership capability assessment',
    category: 'Workforce and organization',
    outcome:
      'I managed over 100 leadership assessments and automated tasks to reduce their timelines by up to 90%, an estimated $40,000 in client service hours.',
    year: '2022–2023',
    featured: false,
  },
  {
    name: 'Account Team Revenue Reporting',
    logo: logoDeloitte,
    descriptor: 'Confidential Client',
    timeline: 'My involvement: 2022–2025',
    context:
      'The client was seeking to develop a more nuanced understanding of revenue streams across their unique account portfolio, based on a dataset exceeding 2 million records. This information needed to be categorized by specific account clusters and presented in a user-friendly dashboard to support strategic planning and decision-making.',
    role: [
      'I was the main lead and driver for this work and contributed in the following capacity:',
      'I designed and iteratively enhanced an interactive Power BI dashboard using Power Query, adding new features to maximize relevance and impact for leadership decision-making.',
      'I developed a Python script to automate data processing for Power BI import and extract project-level insights for ad hoc analysis.',
      'I established and maintained relationships with database administrators to ensure consistent and timely access to core data sources for ongoing analytics.',
    ],
    description:
      'I developed a revenue reporting dashboard from 2M+ records to support strategic account planning.',
    slug: 'account-team-revenue-reporting',
    shortTitle: 'Account revenue analytics',
    category: 'AI and analytics',
    outcome:
      'I developed a Power BI dashboard and Python processing tools for an account portfolio with over two million records.',
    year: '2022–2025',
    featured: false,
  },
  {
    name: 'CRM Reporting Process Optimization',
    logo: logoDeloitte,
    descriptor: 'Confidential Client',
    timeline: 'My involvement: 2022–2025',
    context:
      'The client was seeking to set up an automated process to perform regular reporting on its Customer Relationship Management (CRM) pipeline to gain a clearer perspective on the existing opportunities.',
    role: [
      'I was the main lead and driver for this work and contributed in the following capacity:',
      'I developed a Python script that automated two hours of manual data processing into a 15-second runtime to extract CRM insights, prepare executive reports, and update data sources feeding dependent dashboards.',
      'I created a Power BI dashboard using Power Query to provide the broader team with accessible insights into the CRM opportunity pipeline and support the democratization of data.',
      'I collaborated with leadership to define specific dashboard requirements, ensuring the solution directly supported strategic decision-making and broader organizational goals.',
    ],
    description:
      'I automated CRM pipeline reporting, delivering clearer opportunity insights and streamlining client processes.',
    slug: 'crm-reporting-automation',
    shortTitle: 'CRM reporting automation',
    category: 'AI and analytics',
    outcome:
      'My Python script automated two hours of manual CRM data processing into a 15-second runtime.',
    year: '2022–2025',
    featured: true,
    homeFeatured: true,
    homeSummary:
      'I built Python automation and a Power BI dashboard for CRM pipeline reporting, turning two hours of manual data processing into a 15-second runtime.',
  },
  {
    name: 'Leadership Development Program for High Potential Senior Employees',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'June 2022 – August 2022 (2 months)',
    context:
      'The client, a large schedule 1 financial institution, was seeking to develop a refreshed leadership development program for high-potential senior leaders across the enterprise.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I translated design documents into detailed specifications for executing the leadership development curriculum over a 52-week timeframe.',
      'I co-owned the end-to-end pricing process by conducting a comprehensive effort estimate and developing a rigorous, Excel-based pricing model to deliver accurate costing to the client in a timely manner, while working collaboratively to maximize program value within the client’s budget.',
    ],
    description:
      'I developed delivery specifications and a pricing model for a senior leadership program at a major financial institution.',
    slug: 'senior-leadership-development',
    shortTitle: 'Senior leadership development',
    category: 'Workforce and organization',
    outcome:
      'I translated the curriculum into 52-week delivery specifications and co-owned the pricing model.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Strategic Visioning Workshop',
    logo: logoDeloitte,
    descriptor: 'Department of the Federal Government',
    timeline: 'May 2022 – June 2022 (1 month)',
    context:
      'The client, a government organization’s CFO Office, was seeking to define a 12-month strategic vision and roadmap. The engagement included a one-day facilitated lab with 20+ attendees across multiple departments to align on priorities and enable each subgroup to begin developing individual roadmaps.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I developed a consolidated presentation incorporating materials from five keynote speakers and subject matter experts covering topics such as the Future of Finance, Talent, Industry, and Work.',
      'I arranged logistics for the day-long lab by coordinating with four vendors and engaging with engagement leadership to determine appropriate resource requirements. ',
    ],
    description:
      'I prepared materials and coordinated logistics for a government CFO strategic visioning workshop with 20+ stakeholders.',
    slug: 'strategic-visioning-workshop',
    shortTitle: 'CFO strategic visioning',
    category: 'Workforce and organization',
    outcome:
      'I consolidated five speakers’ materials and coordinated logistics for a strategic lab with over 20 attendees.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Post-M&A Sales Process RACI',
    logo: logoDeloitte,
    descriptor: 'Global Airline Services Provider',
    timeline: 'April 2022 (1 month)',
    context:
      'The client, a global aviation firm serving airline clients, was seeking support with post-acquisition integration by mapping sales and customer care processes and developing a RACI matrix to clarify roles and responsibilities across teams.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I developed three refreshed end-to-end process maps for the sales and customer care teams to reflect post-acquisition workflows.',
      'I supported four stakeholder workshops with over 20 participants to facilitate the development of a comprehensive RACI matrix.',
      'I generated role-based responsibility and accountability overviews outlining involvement in specific process steps for each of the 20 roles in-scope using Python libraries such as Pandas and Python-PPTX.',
    ],
    description:
      'I developed process maps and role overviews to support a post-acquisition sales and customer care RACI matrix for a global aviation firm.',
    slug: 'post-acquisition-sales-raci',
    shortTitle: 'Post-acquisition sales RACI',
    category: 'Risk and operations',
    outcome:
      'I developed three process maps and generated responsibility overviews for 20 roles.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Global Performance Development Refresh',
    logo: logoDeloitte,
    descriptor: 'Global Infrastructure Engineering Firm',
    timeline: 'February 2022 – April 2022 (2 months)',
    context:
      'The client, a global infrastructure engineering consulting firm with over 55,000 employees across 40 countries, was seeking to refresh its Performance Management (PM) program across all major regions in which it operates to elevate the program’s effectiveness and drive consistency across the enterprise.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I owned the development of a high-level implementation roadmap, including a global change management plan outlining four workstreams and 22 initiatives to phase in the new PD design over three years.',
      'I supported the design of the annual PD experience by contributing to key design elements and participating in strategy sessions to refine the approach over a two-week period.',
      'I created a visual process flow in PowerPoint to illustrate how the PD design could be enabled independently of the selected ERP solution, including identification of applicable technology enablers.',
      'I produced four stakeholder mindsets/personas to represent key impacted groups, informing both the program vision and change management approach.',
      'I led internal team meetings to track outstanding activities, drive progress, and support the development of the final client deliverable.',
      'I captured and synthesized current state insights through interviews with six regional CEOs and HR Vice Presidents.',
    ],
    description:
      'I developed an implementation roadmap and supported performance development design for a global firm with 55,000+ employees.',
    slug: 'global-performance-development',
    shortTitle: 'Global performance development',
    category: 'Workforce and organization',
    outcome:
      'I developed a three-year implementation roadmap with four workstreams and 22 initiatives.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Group Retreat',
    logo: logoDeloitte,
    descriptor: 'Provincial Children’s Healthcare Network',
    timeline: 'January 2022 – February 2022 (1 month)',
    context:
      'The client, a division of a provincial children’s hospital specializing in pediatric cardiology, was seeking to facilitate an annual strategic retreat to align on future priorities, address workplace culture challenges, and define a shared vision for the team.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I captured detailed interview notes and synthesized insights from 15 conversations with clinical team members.',
      'I extracted key themes to guide discussions during the annual cardiology team retreat.',
      'I developed the retreat presentation materials and supported the creation of the agenda and session flow.',
      'I coordinated logistics for the event, working with internal teams across catering, facilities, and business operations.',
      'I produced the final retreat outcome summary to consolidate takeaways and key decisions from the day-long session.',
    ],
    description:
      'I supported a pediatric cardiology team retreat through interview synthesis, materials, logistics, and an outcome summary.',
    slug: 'cardiology-team-retreat',
    shortTitle: 'Cardiology team retreat',
    category: 'Workforce and organization',
    outcome:
      'I synthesized 15 clinical team interviews and produced the retreat materials and outcome summary.',
    year: '2022',
    featured: false,
  },
  {
    name: 'Operational Resilience Transformation',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'June 2021 – January 2022 (7 months)',
    context:
      'The client, a large international Schedule 1 financial institution, was seeking to understand and develop a response to a newly instantiated regulation from the UK Financial Conduct Authority regarding operational resilience for systemic financial institutions. As a result, the client required support in defining and developing an operational resilience program to meet the new standard set by regulators.',
    role: [
      'I was involved as a key driver in the “Foundational Elements” workstream since the initial stages of the sales cycle and contributed in the following capacity:',
      'I developed content across key workstreams, including scenario testing methodology, program-level RACI, and risk assessment and remediation planning by synthesizing inputs from regulatory policy, industry thought leadership, and subject matter experts.',
      'I produced a suite of over 20 deliverables for key stakeholders, including reports for C-suite executives and the Board, weekly status updates, a high-level 3-year program roadmap, illustrative dashboards, and regulatory summaries.',
      'I performed business analysis of functional requirements to identify key information, procedures, and decision flows in order to develop a program roadmap aligned to regulatory expectations.',
    ],
    description:
      'I helped develop an operational resilience program for a global bank to meet new UK regulatory requirements.',
    slug: 'operational-resilience-transformation',
    shortTitle: 'Operational resilience program',
    category: 'Risk and operations',
    outcome:
      'I produced over 20 deliverables, including a three-year program roadmap and executive and Board reports.',
    year: '2021–2022',
    featured: true,
  },
  {
    name: 'Board-Level Ransomware Desktop Exercise',
    logo: logoDeloitte,
    descriptor: 'Schedule 1 Financial Institution',
    timeline: 'May 2021 – June 2021 (2 months)',
    context:
      'The client, a Schedule 1 financial institution, was seeking to strengthen board-level preparedness for ransomware events and improve alignment between crisis response and executive leadership. The engagement involved developing and facilitating a ransomware-focused desktop exercise to introduce key cyber threats, roles, and decision-making considerations.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I supported the development of the ransomware crisis desktop scenario tailored to board-level stakeholders.',
      'I led the creation of the final After Action Report, highlighting observed strengths, identifying opportunities for improvement, and providing actionable recommendations to enhance crisis response capabilities and alignment between the Board and executive leadership.',
    ],
    description:
      'I supported a board-level ransomware exercise and led the final report on crisis response improvements.',
    slug: 'board-ransomware-exercise',
    shortTitle: 'Board ransomware exercise',
    category: 'Risk and operations',
    outcome:
      'I supported the exercise scenario and led the final After Action Report with crisis response recommendations.',
    year: '2021',
    featured: false,
  },
  {
    name: 'Executive and Cybersecurity Ransomware Tabletop Exercise',
    logo: logoDeloitte,
    descriptor: 'Global Airline Services Provider',
    timeline: 'April 2021 – August 2021 (5 months)',
    context:
      'The client, a global aviation firm providing a broad range of services to airline clients, was seeking to assess its preparedness for a ransomware incident by conducting two targeted tabletop exercises. One exercise aimed to evaluate the security team’s technical response capabilities and the effectiveness of existing incident response plans, while the second focused on executive-level crisis management and decision-making under pressure.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I led the simultaneous development of two separate ransomware tabletop exercise scenarios targeting both technical response and crisis management workflows.',
      'I co-facilitated the sessions and managed all aspects of technology enablement to ensure a seamless exercise experience.',
      'I prepared two comprehensive After-Action Reports based on detailed session notes, highlighting observed strengths and identifying actionable recommendations to improve incident response and crisis management practices.',
    ],
    description:
      'I led ransomware tabletop exercises for an aviation firm, assessing technical response & executive crisis management readiness.',
    slug: 'executive-cybersecurity-ransomware-exercises',
    shortTitle: 'Ransomware tabletop exercises',
    category: 'Risk and operations',
    outcome:
      'I developed and co-facilitated two exercises and prepared two After-Action Reports.',
    year: '2021',
    featured: false,
  },
  {
    name: 'Benefits and Claims Process End-to-End Mapping',
    logo: logoDeloitte,
    descriptor: 'Workplace Compensation Board',
    timeline: 'April 2021 – May 2021 (1 month)',
    context:
      'The client, a workplace compensation board for provincially regulated workplaces, was seeking to facilitate an end-to-end resilience assessment of a mission-critical business process in order to determine key dependencies, Single Points of Failure (SPOFs), the Maximum Allowable Outage (MAO), potential recovery strategies and other factors relating to improving operational resiliency.',
    role: [
      'I was involved as a core team member of the engagement team for the first half of the engagement and contributed in the following capacity:',
      'I developed 4 updated, high-level process maps on MS Visio for the benefits and payments process.',
      'I built and maintained a comprehensive MS Excel-based questionnaire to gather data pertaining to the client’s Disaster Recovery and Technology Resilience posture.',
    ],
    description:
      'I developed benefits and payments process maps and a resilience questionnaire to support an end-to-end assessment.',
    slug: 'benefits-claims-process-mapping',
    shortTitle: 'Benefits and claims mapping',
    category: 'Risk and operations',
    outcome:
      'I developed four process maps and a disaster recovery and technology resilience questionnaire.',
    year: '2021',
    featured: false,
  },
  {
    name: 'Refreshed Business Impact Analysis',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'September 2020 – April 2021 (8 months)',
    context:
      'The client, a large international schedule 1 financial institution, was seeking to complete a large-scale Business Impact Analysis (BIA) exercise to assess all key business processes against business continuity best practices and to identify major resilience gaps across its US and Canada operations.',
    role: [
      'I was involved as a core team member of the engagement team and contributed in the following capacity:',
      'I produced custom Excel formulas using Python to seamlessly process inputs from Excel and perform complex calculations core to analysis efforts, reducing task timeline by 88% and allowing for repeatability in any future complex computational processes – ultimately saving 35 project work hours.',
      'I developed two (2) consolidation tools for multi-sheet workbooks, enabling data analysis and project reporting, using VBA, reducing the task timeline by 94% (from 13.25 minutes to 47 seconds), and Python, reducing the task timeline by 98% (from 6 minutes to 4 seconds) – ultimately saving a combined 130 project work hours.',
      'I led key stakeholders of 61 business units in completing BIA workbooks by coordinating with clients, drafting key communications, leading discussions with 1st Line staff relating to the BIA methodology/process, and tracking/facilitating the resolution of issues.',
      'I redeveloped a legacy data collection template to reduce file size by 74% and simplified its user interface for ease of use by analyzing file XML composition for redundancy, identifying opportunities to remove extra data, relinking formulas, and developing dynamic data validation inputs.',
      'I developed a User Guide to support participants in completing preliminary data collection.',
      'I developed an end-to-end process for undertaking the business impact assessment process by gathering business requirement documentation, creating a business flow chart and process map, and developing process definitions. I also undertook strategic planning to develop the tools to enable the future state design.',
    ],
    description:
      'I supported a business impact analysis across US and Canada operations with automation tools, templates, and stakeholder coordination.',
    slug: 'business-impact-analysis',
    shortTitle: 'Business impact analysis automation',
    category: 'Risk and operations',
    outcome:
      'My Python and VBA tools saved 165 project work hours; I also reduced the data collection template’s file size by 74%.',
    year: '2020–2021',
    featured: true,
  },
  {
    name: 'Market Assessment of Large Corporate Clients',
    logo: logoDeloitte,
    descriptor: 'Central Government Agency',
    timeline: 'September 2020 – October 2020 (2 months)',
    context:
      'The client, a central government agency, was seeking to conduct a market assessment of large corporations as they relate to the Financial Consumer Protection Framework and identify trends and opportunities to support their advisory services of the federal government.',
    role: [
      'I supported the engagement team in the following areas:',
      'I conducted desktop research on consumer protection provisions and supported interviews with representatives from six large corporations.',
      'I recorded detailed and meaningful interview notes, organized data in Excel to identify patterns and extract insights, and contributed to the development of a final report with clearly articulated findings.',
      'I independently developed a summary report, sought and incorporated feedback from engagement leadership, obtained final approvals, and shared the report with the client.',
    ],
    description:
      'I researched corporate financial consumer protection practices and developed a summary report for a central government agency.',
    slug: 'corporate-client-market-assessment',
    shortTitle: 'Consumer protection market assessment',
    category: 'Risk and operations',
    outcome:
      'I supported interviews with six corporations and independently developed a client summary report.',
    year: '2020',
    featured: false,
  },
  {
    name: 'Chief Risk Office Reporting Optimization',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'February 2019 – April 2019 (3 months)',
    context:
      'The client, a large international schedule 1 financial institution, was seeking to benchmark and improve upon the process to produce the Chief Compliance Officer’s opinion on the state of compliance, a required quarterly attestation stipulated in OSFI Guideline E-13.',
    role: [
      'I supported the engagement team in the following areas:',
      'I conducted a high-level benchmark of the Chief Risk Officer opinions on the state of compliance from internal research, comparing the overall structure, sophistication and individual elements present in competitors’ opinion statements.',
      'I supported the development of a summary report to outline findings, to propose enhancements to current state and to provide recommendations to improve current state processes with a short to medium term roadmap.',
    ],
    description:
      'I benchmarked compliance reporting and supported process improvement recommendations for a major financial institution.',
    slug: 'chief-risk-office-reporting',
    shortTitle: 'Compliance reporting benchmark',
    category: 'Risk and operations',
    outcome:
      'I benchmarked compliance opinion statements and supported recommendations and a process improvement roadmap.',
    year: '2019',
    featured: false,
  },
  {
    name: 'Welfare Service Audit',
    logo: logoDeloitte,
    descriptor: 'Provincial Ministry',
    timeline: 'November 2018 – January 2019 (3 months)',
    context:
      'The client, a provincial ministry providing social support, was seeking to conduct an internal audit on 3 social service programs to measure compliance with policy and procedure.',
    role: [
      'I supported the engagement team in the following areas:',
      'I traveled to 7 rural/remote communities and followed testing protocols for 150+ case files to successfully perform procedural audits of 3 government services.',
    ],
    description:
      'I audited case files for policy and procedure compliance across three provincial social service programs.',
    slug: 'welfare-service-audit',
    shortTitle: 'Social service audit',
    category: 'Risk and operations',
    outcome:
      'I followed testing protocols for over 150 case files across seven rural or remote communities.',
    year: '2018–2019',
    featured: false,
  },
  {
    name: 'Regulatory Binders',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'October 2018 (1 month)',
    context:
      'The client, a large international schedule 1 financial institution, was seeking to identify and catalogue all relevant financial regulations that apply to its business segments to have better insight into its obligations.',
    role: [
      'I supported the engagement team in the following areas:',
      'I reviewed 150+ draft regulation summaries / interpretations for format and sentence structure.',
      'I consolidated regulation summaries into 8 individualized compliance manuals (also known as Regulatory Binders) for each of the Bank’s in-scope Business Units.',
    ],
    description:
      'I developed regulatory binders cataloging financial obligations for a major international financial institution.',
    slug: 'regulatory-binders',
    shortTitle: 'Regulatory compliance manuals',
    category: 'Risk and operations',
    outcome:
      'I reviewed over 150 regulation summaries and consolidated them into eight compliance manuals.',
    year: '2018',
    featured: false,
  },
  {
    name: 'Compliance Transformation and Optimization Program',
    logo: logoDeloitte,
    descriptor: 'Large International Schedule 1 Financial Institution',
    timeline: 'May 2018 – October 2018 (6 months)',
    context:
      'The client, a large international schedule 1 financial institution, was seeking to modernize their current state operating model for global compliance and prioritize existing regulatory findings against the new target operating model.',
    role: [
      'I supported the engagement team in the following areas:',
      'I mapped 393 open regulatory issues across 4 global operating groups to a Business Activity Map of 47 activities using Excel and aggregated activities into 9 summary spreadsheets for executive review.',
      'I produced 23 figures with Tableau to represent the current-state effectiveness of the Financial Institution’s Global Compliance function for the Chief Risk Officer’s review.',
      'I collected data from the Director of Global Compliance using PowerPoint to record 81 reports on compliance against People, Process, Data, and Technology, and used Excel to collate a database of results. ',
      'I created 8 client deliverables for projects with a cumulative value of $2MM+ including design presentations, proposals, Gantt charts, educational presentations, and business architecture flowcharts.',
      'I developed and delivered a 100+ task Gantt chart with defined dependencies and milestones for an $800K pursuit to extend the project scope.',
    ],
    description:
      'I supported global compliance transformation through regulatory issue mapping, analysis, and executive reporting.',
    slug: 'compliance-transformation',
    shortTitle: 'Global compliance transformation',
    category: 'Risk and operations',
    outcome:
      'I mapped 393 regulatory issues to 47 activities and produced 23 Tableau figures for executive review.',
    year: '2018',
    featured: false,
  },
  {
    name: 'Engineering Campus Experience Office Program',
    logo: logoUofT,
    descriptor: 'Large Canadian Higher Education Institution',
    timeline: 'Sept 2019 – May 2020 (8 months)',
    context:
      'To improve student experience and support students throughout their engineering education, the University developed a novel strategic initiative focused on providing ad hoc mentorship to a student body of over 5000, deemed the Engineering Campus Experience Officer (engCEO) program.',
    role: [
      'I was hired to lead the engCEO program and contributed in the following capacity:',
      'I developed an organizational structure for a team of 12 student leaders – synthesizing functional groups to support execution of the mandate with respect to marketing, event planning, financial, and logistical operations.',
      "I supported the team by providing regular guidance and feedback, ensuring that each member was aligned with the program's goals and objectives.",
      'I promoted the engCEO program through various marketing channels, including social media, newsletters, and campus events, to increase visibility and participation.',
      "I monitored and evaluated the program's impact through surveys and feedback sessions, making data-driven decisions to refine and enhance the initiative.",
      "I managed the program's budget, ensuring that all expenditures were within the allocated funds and providing financial reports to stakeholders.",
      "I produced a thorough report using MS PowerPoint to provide an overview of the pilot program's performance for review by the Dean's Strategic Fund committee including content relating to program outreach, financial analysis, overview of strategic decisions, and feedback from mentors for future terms.",
    ],
    description:
      'I led the engCEO mentorship program and its 12-person student team, supporting a body of 5000+ engineering students.',
    slug: 'engineering-campus-experience',
    shortTitle: 'Engineering student mentorship',
    category: 'Workforce and organization',
    outcome:
      'I led a 12-person student team and reported on the engCEO pilot’s outreach, finances, and mentor feedback.',
    year: '2019–2020',
    featured: false,
  },
  {
    name: 'Business Process Analysis',
    logo: logoHomEquity,
    descriptor: 'Schedule 1 Financial Institution',
    timeline: 'May – August 2017 (4 months)',
    context:
      'During my first co-op placement, I supported the Business Process manager in analysing and enhancing business processes on an ad hoc basis, independently identifying opportunities for improvement and optimizing procedures by developing tools or reviewing process designs.',
    role: [
      'I contributed in a support role:',
      'I built a Quality Assurance program using Excel to capture and produce reports on data being collected on a day-to-day basis, expediting task timeline by 15% and saving an estimated 180 hours of work per quarter.',
      'I streamlined daily operational reporting by developing a user-friendly Excel program for management review to automate repeatable processes and visualize key performance indicators, reducing task duration by 57% per report and saving over 25 hours of work per quarter.',
    ],
    description:
      'I analyzed and improved business processes through Excel tool development and process design review.',
    slug: 'business-process-analysis',
    shortTitle: 'Business process automation',
    category: 'Risk and operations',
    outcome:
      'My Excel tools reduced quality assurance task timelines by 15% and daily reporting time by 57%.',
    year: '2017',
    featured: false,
  },
]

export const codingProjects: CodingProject[] = [
  {
    name: 'Social Knowledge',
    homeFeatured: true,
    homeSummary:
      'I built a self-hosted platform that turns saved social videos into a private, searchable archive with transcription, AI synthesis, and grounded retrieval.',
    description:
      'Open-source, self-hosted platform that turns saved social videos into a private, searchable knowledge archive with transcription, AI synthesis, and grounded retrieval.',
    logo: iconSocialKnowledge,
    link: {
      href: 'https://github.com/stephenjoly/social-knowledge',
      label: 'github.com',
    },
  },
  {
    name: 'Backup Agent',
    homeFeatured: true,
    homeSummary:
      'I built a Linux and macOS backup system that validates space-efficient NAS snapshots and manages scheduling and retention.',
    description:
      'Portable Linux and macOS backup system that creates validated, space-efficient NAS snapshots with rsync, hard links, scheduling, and retention controls.',
    logo: iconBackupAgent,
    link: {
      href: 'https://github.com/stephenjoly/backup-agent',
      label: 'github.com',
    },
  },
  {
    name: 'Deploy Wizard',
    description:
      'Opinionated CLI for branch-aware staging deploys of Docker Compose apps behind Traefik in a homelab environment.',
    logo: iconDeployWizard,
    link: {
      href: 'https://stephenjoly.github.io/deploy-wizard/',
      label: 'stephenjoly.github.io',
    },
  },
  {
    name: 'Market Call Summaries',
    description:
      'Full-stack app that ingests BNN Market Call episodes, extracts structured stock commentary, and publishes reviewed summaries.',
    logo: iconMarketCallSummaries,
    status: 'wip',
  },
  {
    name: 'Jolify for PowerPoint',
    homeFeatured: true,
    homeSummary:
      'I built a native PowerPoint add-in with layout, formatting, and text utilities to make repetitive slide work easier.',
    description:
      'Native PowerPoint add-in with slide layout, formatting, and text utilities for people who spend serious time in decks.',
    logo: iconJolifyPpt,
    link: {
      href: 'https://stephenjoly.github.io/jolify-ppt/',
      label: 'stephenjoly.github.io',
    },
  },
  {
    name: 'Traefik Rules Manager',
    description:
      'UI and lightweight API for managing Traefik dynamic config, validating rules, and writing safe updates back to disk.',
    logo: iconTraefikRulesManager,
    link: {
      href: 'https://github.com/stephenjoly/traefik-rules-manager',
      label: 'github.com',
    },
  },
  {
    name: 'Pizza Dough + Calorie Calculator',
    description:
      'Interactive calculator for planning pizza dough batches, toppings, and calorie estimates without spreadsheet work.',
    logo: iconPizzaCalculator,
    link: {
      href: 'https://stephenjoly.github.io/pizza-calculator/',
      label: 'stephenjoly.github.io',
    },
  },
  {
    name: 'Codex Session Indexer',
    description:
      'Utility that scans local Codex session history and generates project-level Markdown indexes of recent work.',
    logo: iconCodexSessionIndexer,
    link: {
      href: 'https://stephenjoly.github.io/codex-session-indexer/',
      label: 'stephenjoly.github.io',
    },
  },
  {
    name: 'Screenshot Sense',
    description:
      'Local-first macOS product for turning screenshot clutter into grouped, reviewable, actionable knowledge.',
    logo: iconScreenshotSense,
    status: 'wip',
  },
]
