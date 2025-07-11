import logoHomEquity from '@/images/logos/homequity.svg'
import logoDeloitte from '@/images/logos/deloitte.svg'
import logoUofT from '@/images/logos/uoft.svg'

export interface ProjectType {
  name: string;
  description: string;
  logo: any;
  descriptor: string;
  context: string;
  timeline: string;
  role: string[];
}

export const projects: ProjectType[] = [
  {
    name: "Technology Impact Modeling on Workforce Capacity",
    logo: logoDeloitte,
    descriptor: "Confidential Client",
    timeline: "March 2025 – July 2025 (5 months)",
    context: "The client was seeking to develop a methodology and supporting tooling to assess the impact of integrating Generative AI technologies into daily operations, with a focus on workforce size and distribution, project cost, and organizational capacity.",
    role: [
      "Stephen was involved as the technical team lead and contributed in the following capacity:",
      "Designed the assessment methodology by gathering requirements from project sponsors and senior leaders, proposing multiple fidelity levels for analysis, and ultimately recommending a preferred approach aligned with organizational goals, timelines, and desired outcomes.",
      "Led the development of an operational task inventory and conducted a technology impact analysis to quantify potential disruptions, generating a foundational dataset to support visualization and insight generation.",
      "Built a robust Power BI model leveraging over 30 transformation steps and referenced queries, enabling seamless, no-code data refresh capabilities and enhanced connectivity across data sources.",
      "Developed a custom Excel function, \u201c=AskGenAI(<prompt>)\u201d, using VBA to enable secure API calls to Azure-hosted large language models (LLMs), allowing users to interact with Generative AI directly within Excel.",
      "Oversaw and supported a team of two in shaping the stakeholder engagement approach and planning for short- to medium-term sustainability of the solution.",
      "Provided ongoing feedback and quality assurance on supporting materials, such as presentation decks and communications, to ensure end-user clarity and adoption."
    ],
    description: "Modeled AI's impact on workforce, cost, & capacity, delivering a methodology & tooling for strategic assessment.\n\n\n\n"
  },
  {
    name: "Job Architecture Refresh and Total Rewards Benchmark",
    logo: logoDeloitte,
    descriptor: "Canadian Public Safety Organization",
    timeline: "November 2024 – February 2025 (4 months)",
    context: "The client, a public safety and law enforcement organization, was seeking to refresh its Job Architecture framework to align job classifications and conduct external benchmarking on salary, benefits, and allowances/premiums against comparable organizations to support upcoming bargaining with its three unionized workforce\u2019s.",
    role: [
      "Stephen was involved as a senior member of the core team and contributed in the following capacity:",
      "Innovated on the firm\u2019s job mapping methodology by standardizing the process and developing a GenAI-powered Python script to automate manual mapping activities, achieving a 99% efficiency gain and 90% accuracy rate. The tool saved over $17,000 (5%) of the project budget and is estimated to deliver $400K in annual efficiency gains compared to previous methods.",
      "Led the benchmarking of allowances and premiums by reviewing 18 collective agreements across six peer organizations, compiling and validating data with subject matter experts, and synthesizing findings into actionable recommendations in the final client report.",
      "Developed a Python implementation of numerical methods to support the design of an updated salary structure, tailored to address client-defined incentive challenges and workforce planning pain points."
    ],
    description: "Refreshed job architecture & benchmarked total rewards to support union bargaining for a public safety organization.\n\n\n\n"
  },
  {
    name: "Capability Gap Analysis and Strategic Prioritization Support",
    logo: logoDeloitte,
    descriptor: "Canadian Public Health Organization",
    timeline: "January 2025 – January 2025 (1 month)",
    context: "The client, a public health organization, was seeking support at the C-suite level in developing a strategic plan to equip the organization with the skills and capabilities required to deliver on its key priorities.",
    role: [
      "Stephen was involved as a subject matter expert in data analytics and processes engineering, and he contributed in the following capacity:",
      "Collaborated with project leadership to define the data analysis approach and developed an MS Excel–based analysis engine that generated high-impact visualizations using executive input data; the quality of these visuals was cited as a key point of satisfaction by the CEO.",
      "Coached team members on how to interface with the solution and provided troubleshooting support to ensure smooth adoption and use throughout the analysis process."
    ],
    description: "Analyzed capability gaps & prioritized strategic initiatives for a public health organization\u2019s future success.\n\n\n\n"
  },
  {
    name: "Workforce Readiness, Strategic Workforce Planning and High-level Organizational Design",
    logo: logoDeloitte,
    descriptor: "Large Canadian Metropolitan Airport",
    timeline: "August 2024 – October 2024 (3 months)",
    context: "The client, a regional airport authority managing one of the world\u2019s busiest airports, was seeking to develop a Workforce Readiness plan to support the planning and execution of an upcoming large-scale capital expansion and physical asset modernization initiative. With growing annual passenger volumes, evolving customer needs, and a workforce constrained by post-COVID capacity reductions, the client sought to ensure workforce alignment across business continuity, transformation priority enablement, and long-term workforce sustainability.",
    role: [
      "Stephen was involved as a senior member of the core engagement team and contributed in the following capacity:",
      "Led the development of a logical decision matrix in MS Excel to evaluate sourcing strategies for individual skill gaps; the tool has since been reused across multiple engagements to support informed decision-making on workforce reskilling and sourcing.",
      "Built a data model using Power Query and Power Pivot that synthesized skill gap inputs from stakeholder workshops to generate prioritization insights for organization-wide workforce planning.",
      "Developed a workforce risk model using HRIS data to identify high-risk roles and skillsets by creating risk indicators and establishing evaluation criteria to flag capability-based vulnerabilities across the organization."
    ],
    description: "Developed workforce readiness plan for airport expansion, addressing capacity, transformation, and long-term sustainability.\n\n\n\n"
  },
  {
    name: "Culture Change to Enable Proactive Technical Debt Management",
    logo: logoDeloitte,
    descriptor: "Confidential Public Sector Client",
    timeline: "March 2024 – July 2024 (4 months)",
    context: "The client, a large enterprise IT organization, was seeking to transform its approach to technical debt management by addressing root causes and encouraging long-term mitigation through behavior change. The engagement focused on implementing Deloitte\u2019s behavioral-lens framework to promote mindful practices around technical debt prevention and resolution.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Led multiple workstreams across two project phases, including current state analysis, development and validation of the behavioral approach, ideation and activation of the roadmap, and creation of a pilot plan to engage and influence target user groups.",
      "Created a strategic document outlining a high-level methodology for identifying and implementing over 12 behavioral interventions to support everyday management of technical debt.",
      "Developed detailed blueprints for 30 behavior-based interventions tailored to embed proactive technical debt mitigation practices into team workflows and support long-term organizational objectives."
    ],
    description: "Led culture change initiative using behavioral science to proactively address and mitigate technical debt.\n\n\n\n"
  },
  {
    name: "Workforce Planning Capability Design and Enabler Development",
    logo: logoDeloitte,
    descriptor: "Canadian Higher Education Institution",
    timeline: "November 2023 – February 2024 (4 months)",
    context: "The client, a public higher education institution, was seeking to establish a centralized Workforce Planning capability within HR to enable strategic workforce management across the enterprise. Deloitte was approached to provide specialized expertise in data analysis, workforce process design, and tooling to support this initiative.",
    role: [
      "Stephen was recommended to the client to lead the development of their workforce planning team, process and tooling where he added value through the following achievements:",
      "Facilitated 10+ workshops with key stakeholders to gather objectives, functional roles, and constraints for the future-state workforce planning design, and developed business requirements documentation to ensure clarity and alignment for the broader team.",
      "Drafted a high-level implementation roadmap outlining enabling technologies, resource needs, stakeholder engagement milestones, and a continuous improvement approach.",
      "Designed an end-to-end annual workforce planning process represented through a business flow chart and high-level process map, incorporating mechanisms to evaluate and improve procedures and identify opportunities for business improvements.",
      "Built a customizable workforce planning template using MS SharePoint/OneDrive, Excel, and Power Query to enable workforce supply, demand, and gap analyses via structured data collection and reporting.",
      "Led five pilot groups through the new planning process to support strategic workforce planning, collect feedback and lessons learned, and iterate on process enablers and definitions based on real-world application."
    ],
    description: "Designed workforce planning capability & tools for a higher education institution's HR department.\n\n\n\n"
  },
  {
    name: "Talent Strategy and TVP Narrative",
    logo: logoDeloitte,
    descriptor: "International Integrated Oil & Gas Corporation",
    timeline: "September 2023 – November 2023 (3 months)",
    context: "The client, a fully integrated oil and gas corporation, was seeking to redesign its Talent Strategy for a key business unit through a comprehensive, data-driven assessment of future workforce needs. The objective was to create a best-in-class, flexible strategy tailored to evolving organizational capabilities and long-term business goals.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Developed a Python-based web scraping script using functional programming (Selenium, Pandas) to extract and process over 10,000 publicly available employer reviews across 10 competitor organizations, enabling in-depth sentiment and experience analysis.",
      "Managed working relationships with a third-party vendor to integrate their AI-based sentiment analysis engine, extracting emotionality and employee experience insights to assess each competitor\u2019s perceived ability to attract and retain talent.",
      "Led external benchmark analysis by identifying each competitor's Talent Value Proposition (TVP) through public-facing sources (e.g., corporate websites, careers portals, ESG/annual reports), analyzing aligned employer review themes, and highlighting strategic opportunities for the client to differentiate in the talent market.",
      "Conducted business analysis of functional requirements to identify informational needs, procedural workflows, and decision points in order to extract meaningful market data and conduct a comparative assessment of the client's current TVP relative to competitors."
    ],
    description: "Developed data-driven talent strategy & narrative aligning workforce needs with long-term business goals for oil & gas client.\n\n\n\n"
  },
  {
    name: "Workforce Strategy and Planning Analysis",
    logo: logoDeloitte,
    descriptor: "International Integrated Oil & Gas Corporation",
    timeline: "May 2023 – August 2023 (4 months)",
    context: "The client, a fully integrated oil and gas corporation, was seeking to define the vision for its workforce planning function by assessing the current state, analyzing skills and labour market trends, and consolidating findings into a final strategic report.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Led the current state analysis workstream by collaborating with engagement leadership to align on strategic direction and timelines, managing the assessment approach, evaluating existing procedures and processes, documenting statements of requirements for potential alternatives, and driving content development for deliverables.",
      "Led the quality assurance review of final project deliverables, ensuring alignment with delivery excellence standards.",
      "Facilitated the capture and synthesis of insights from 13 stakeholder interviews by coordinating scheduling, managing timelines, and extracting key themes to support final recommendations."
    ],
    description: "Developed workforce strategy, analyzing skills gaps & trends, delivering a strategic report for an oil & gas client.\n\n\n\n"
  },
  {
    name: "Workforce Planning Dashboard",
    logo: logoDeloitte,
    descriptor: "Higher Education Institution",
    timeline: "December 2022 (1 month)",
    context: "The client, a regional higher education institution, was seeking to develop a workforce planning framework and supporting proof-of-concept tools to strategically recruit and deploy resources in alignment with its organizational priorities.",
    role: [
      "Stephen was asked to support the engagement team ad-hoc and contributed in the following capacity:",
      "Supported the project team as a Subject Matter Expert in MS Excel and Power BI, providing guidance throughout the dashboard development process to ensure the chosen platform and design best met client needs.",
      "Oversaw the development of a workforce planning dashboard designed to forecast resource supply and demand based on key variables, by advising functional team members, reviewing outputs for quality, and implementing improvements to enhance functionality as required."
    ],
    description: "Developed a data dashboard for strategic workforce planning, aligning resources with institutional priorities."
  },
  {
    name: "State of Performance",
    logo: logoDeloitte,
    descriptor: "National Sales Organization",
    timeline: "March 2022 (1 month)",
    context: "The client, the Sales function of a large professional services organization, was seeking to deliver an immersive workshop aimed at diagnosing team effectiveness and improving employee wellbeing, efficiency, and overall experience",
    role: [
      "Stephen was asked to support the engagement team ad-hoc and contributed in the following capacity:",
      "Developed and implemented a Python-based automation script to streamline the extraction and processing of Qualtrics survey data, integrating results into an intuitive dashboard and reducing related task timelines by over 80%."
    ],
    description: "Designed immersive workshop to diagnose sales team effectiveness & boost wellbeing/performance.\n\n\n\n"
  },
  {
    name: "Leadership Capability Model Development and Assessment Program",
    logo: logoDeloitte,
    descriptor: "Regional Airport Authority",
    timeline: "September 2022 – May 2023 (8 months)",
    context: "The client, a regional airport authority managing one of the world\u2019s busiest airports, was seeking to enhance their leadership development program to refresh their leadership capabilities organization-wide and develop a \u201cworld-class\u201d talent experience to support its ambitious growth and innovation strategy.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Managed the end-to-end process of 100+ leadership assessments for senior leaders by facilitating scheduling using an integrated and automated form technology, administering prework through three online psychometric assessment platforms, addressing on average 10 ad-hoc questions or concerns per week, as needed, and preparing reports on psychometric data from three data sources, leveraging Python (pandas, openpyxl, win30com.client, selenium) and MS Excel to streamline the process whenever possible – ultimately reducing task timeline up to 90% (approximately $40,000 in client service hours over the course of the project).",
      "Synthesized 58 unique profiles on stakeholder feedback for each leader in the program\u2019s second cohort by exhaustively reviewing and extracting relevant insights from ~300 individual responses and over 1800 cells of free text data.",
      "Coordinated efforts between key stakeholders across up to 5 time zones to support leadership assessment approach and logistics.",
      "Produced 3 summative report document to collate insights on aggregated data from assessment progress to present findings on bench strength and leadership development focus areas to senior Talent leaders and Executive stakeholders.",
      "Supported the preparation and facilitation of 10+ sessions, including audiences from front-line contributors to executive leaders – mainly for senior leader reporting into the Executive Team.",
      "Lead/supported the development of several core deliverables including all assessment materials for 3 cohorts of leaders, the overall leadership capability model, and content for stakeholder engagement sessions.",
      "Meaningfully contributed to brainstorming and solutioning of various decision points in project as they relate to assessment process design, third-party technology integration, and both internal and external stakeholder management.",
      "Developed an end-to-end process for undertaking the assessment process by gathering business requirement documentation, creating a business flow chart and process map, and developing process definitions. Further undertook strategic planning to develop the tools to enable the future state design."
    ],
    description: "Developed leadership model & assessment program to drive talent & support strategic growth for a major airport.\n\n\n\n"
  },
  {
    name: "Account Team Revenue Reporting",
    logo: logoDeloitte,
    descriptor: "Confidential Client",
    timeline: "June 2022 – Present (16 months)",
    context: "The client was seeking to develop a more nuanced understanding of revenue streams across their unique account portfolio, based on a dataset exceeding 2 million records. This information needed to be categorized by specific account clusters and presented in a user-friendly dashboard to support strategic planning and decision-making.",
    role: [
      "Stephen was the main lead and driver for this work and contributed in the following capacity:",
      "Designed and iteratively enhanced an interactive Power BI dashboard using Power Query, adding new features to maximize relevance and impact for leadership decision-making.",
      "Developed a Python script to automate data processing for Power BI import and extract project-level insights for ad-hoc analysis.",
      "Established and maintained relationships with database administrators to ensure consistent and timely access to core data sources for ongoing analytics."
    ],
    description: "Developed revenue reporting dashboard from 2M+ records, enabling data-driven strategic account planning."
  },
  {
    name: "CRM Reporting Process Optimization",
    logo: logoDeloitte,
    descriptor: "Confidential Client",
    timeline: "June 2022 – Present (16 months)",
    context: "The client was seeking to set up an automated process to perform regular reporting on its Customer Relationship Management (CRM) pipeline to gain a clearer perspective on the existing opportunities.",
    role: [
      "Stephen was the main lead and driver for this work and contributed in the following capacity:",
      "Developed a Python script that automated two hours of manual data processing into a 15-second runtime to extract CRM insights, prepare executive reports, and update data sources feeding dependent dashboards.",
      "Created a Power BI dashboard using Power Query to provide the broader team with accessible insights into the CRM opportunity pipeline and support the democratization of data.",
      "Collaborated with leadership to define specific dashboard requirements, ensuring the solution directly supported strategic decision-making and broader organizational goals."
    ],
    description: "Automated CRM pipeline reporting, delivering clearer opportunity insights and streamlining client processes.\n\n\n\n"
  },
  {
    name: "Leadership Development Program for High Potential Senior Employees",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "June 2022 – August 2022 (2 months)",
    context: "The client, a large schedule 1 financial institution, was seeking to develop a refreshed leadership development program for high-potential senior leaders across the enterprise.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Translated design documents into detailed specifications for executing the leadership development curriculum over a 52-week timeframe.",
      "Co-owned the end-to-end pricing process by conducting a comprehensive effort estimate and developing a rigorous, Excel-based pricing model to deliver accurate costing to the client in a timely manner, while working collaboratively to maximize program value within the client\u2019s budget."
    ],
    description: "Designed leadership program for high-potential senior employees at a major financial institution.\n\n\n\n"
  },
  {
    name: "Strategic Visioning Workshop",
    logo: logoDeloitte,
    descriptor: "Department of the Federal Government",
    timeline: "May 2022 – June 2022 (1 month)",
    context: "The client, a government organization\u2019s CFO Office, was seeking to define a 12-month strategic vision and roadmap. The engagement included a one-day facilitated lab with 20+ attendees across multiple departments to align on priorities and enable each subgroup to begin developing individual roadmaps.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Developed a consolidated presentation incorporating materials from five keynote speakers and subject matter experts covering topics such as the Future of Finance, Talent, Industry, and Work.",
      "Arranged logistics for the day-long lab by coordinating with four vendors and engaging with engagement leadership to determine appropriate resource requirements. "
    ],
    description: "Facilitated strategic visioning workshop for government CFO, aligning 20+ stakeholders on a 12-month roadmap.\n\n\n\n"
  },
  {
    name: "Post-M&A Sales Process RACI",
    logo: logoDeloitte,
    descriptor: "Global Airline Services Provider",
    timeline: "April 2022 (1 month)",
    context: "The client, a global aviation firm serving airline clients, was seeking support with post-acquisition integration by mapping sales and customer care processes and developing a RACI matrix to clarify roles and responsibilities across teams.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Developed three refreshed end-to-end process maps for the sales and customer care teams to reflect post-acquisition workflows.",
      "Supported four stakeholder workshops with over 20 participants to facilitate the development of a comprehensive RACI matrix.",
      "Generated role-based responsibility and accountability overviews outlining involvement in specific process steps for each of the 20 roles in-scope using Python libraries such as Pandas and Python-PPTX."
    ],
    description: "Developed RACI matrix streamlining post-acquisition sales & customer care processes for a global aviation firm.\n\n\n\n"
  },
  {
    name: "Global Performance Development Refresh",
    logo: logoDeloitte,
    descriptor: "Global Infrastructure Engineering Firm",
    timeline: "February 2022 – April 2022 (2 months)",
    context: "The client, a global infrastructure engineering consulting firm with over 55,000 employees across 40 countries, was seeking to refresh its Performance Management (PM) program across all major regions in which it operates to elevate the program\u2019s effectiveness and drive consistency across the enterprise.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Owned the development of a high-level implementation roadmap, including a global change management plan outlining four workstreams and 22 initiatives to phase in the new PD design over three years.",
      "Supported the design of the annual PD experience by contributing to key design elements and participating in strategy sessions to refine the approach over a two-week period.",
      "Created a visual process flow in PowerPoint to illustrate how the PD design could be enabled independently of the selected ERP solution, including identification of applicable technology enablers.",
      "Produced four stakeholder mindsets/personas to represent key impacted groups, informing both the program vision and change management approach.",
      "Led internal team meetings to track outstanding activities, drive progress, and support the development of the final client deliverable.",
      "Captured and synthesized current state insights through interviews with six regional CEOs and HR Vice Presidents."
    ],
    description: "Revamped global performance management program for 55,000+ employees, driving consistency and effectiveness.\n\n\n\n"
  },
  {
    name: "Group Retreat",
    logo: logoDeloitte,
    descriptor: "Provincial Children\u2019s Healthcare Network",
    timeline: "January 2022 – February 2022 (1 month)",
    context: "The client, a division of a provincial children\u2019s hospital specializing in pediatric cardiology, was seeking to facilitate an annual strategic retreat to align on future priorities, address workplace culture challenges, and define a shared vision for the team.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Captured detailed interview notes and synthesized insights from 15 conversations with clinical team members.",
      "Extracted key themes to guide discussions during the annual cardiology team retreat.",
      "Developed the retreat presentation materials and supported the creation of the agenda and session flow.",
      "Coordinated logistics for the event, working with internal teams across catering, facilities, and business operations.",
      "Produced the final retreat outcome summary to consolidate takeaways and key decisions from the day-long session."
    ],
    description: "Facilitated strategic retreat for pediatric cardiology team, aligning priorities & fostering a shared vision.\n\n\n\n"
  },
  {
    name: "Operational Resilience Transformation",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "June 2021 – January 2022 (7 months)",
    context: "The client, a large international Schedule 1 financial institution, was seeking to understand and develop a response to a newly instantiated regulation from the UK Financial Conduct Authority regarding operational resilience for systemic financial institutions. As a result, the client required support in defining and developing an operational resilience program to meet the new standard set by regulators.",
    role: [
      "Stephen was involved as a key driver in the \u201cFoundational Elements\u201d workstream since the initial stages of the sales cycle and contributed in the following capacity:",
      "Developed content across key workstreams, including scenario testing methodology, program-level RACI, and risk assessment and remediation planning by synthesizing inputs from regulatory policy, industry thought leadership, and subject matter experts.",
      "Produced a suite of over 20 deliverables for key stakeholders, including reports for C-suite executives and the Board, weekly status updates, a high-level 3-year program roadmap, illustrative dashboards, and regulatory summaries.",
      "Performed business analysis of functional requirements to identify key information, procedures, and decision flows in order to develop a program roadmap aligned to regulatory expectations."
    ],
    description: "Developed operational resilience program for a global bank to meet new UK regulatory requirements.\n\n\n\n"
  },
  {
    name: "Board-Level Ransomware Desktop Exercise",
    logo: logoDeloitte,
    descriptor: "Schedule 1 Financial Institution",
    timeline: "May 2021 – June 2021 (2 months)",
    context: "The client, a Schedule 1 financial institution, was seeking to strengthen board-level preparedness for ransomware events and improve alignment between crisis response and executive leadership. The engagement involved developing and facilitating a ransomware-focused desktop exercise to introduce key cyber threats, roles, and decision-making considerations.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Supported the development of the ransomware crisis desktop scenario tailored to board-level stakeholders.",
      "Led the creation of the final After Action Report, highlighting observed strengths, identifying opportunities for improvement, and providing actionable recommendations to enhance crisis response capabilities and alignment between the Board and executive leadership."
    ],
    description: "Facilitated a ransomware desktop exercise for a financial institution to enhance board preparedness and crisis response alignment.\n\n\n\n"
  },
  {
    name: "Executive and Cybersecurity Ransomware Tabletop Exercise",
    logo: logoDeloitte,
    descriptor: "Global Airline Services Provider",
    timeline: "April 2021 – August 2021 (5 months)",
    context: "The client, a global aviation firm providing a broad range of services to airline clients, was seeking to assess its preparedness for a ransomware incident by conducting two targeted tabletop exercises. One exercise aimed to evaluate the security team\u2019s technical response capabilities and the effectiveness of existing incident response plans, while the second focused on executive-level crisis management and decision-making under pressure.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Led the simultaneous development of two separate ransomware tabletop exercise scenarios targeting both technical response and crisis management workflows.",
      "Co-facilitated the sessions and managed all aspects of technology enablement to ensure a seamless exercise experience.",
      "Prepared two comprehensive After-Action Reports based on detailed session notes, highlighting observed strengths and identifying actionable recommendations to improve incident response and crisis management practices."
    ],
    description: "Led ransomware tabletop exercises for aviation firm, assessing technical response & executive crisis management readiness.\n\n\n\n"
  },
  {
    name: "Benefits and Claims Process End-to-End Mapping",
    logo: logoDeloitte,
    descriptor: "Workplace Compensation Board",
    timeline: "April 2021 – May 2021 (1 month)",
    context: "The client, a workplace compensation board for provincially regulated workplaces, was seeking to facilitate an end-to end resilience assessment of a mission-critical business process in order to determine key dependencies, Single Points of Failure (SPOFs), the Maximum Allowable Outage (MAO), potential recovery strategies and other factors relating to improving operational resiliency.",
    role: [
      "Stephen was involved as a core team member of the engagement team for the first half of the engagement and contributed in the following capacity:",
      "Developed 4 updated, high-level process maps on MS Visio for the benefits and payments process.",
      "Built and maintained a comprehensive MS Excel-based questionnaire to gather data pertaining to the client\u2019s Disaster Recovery and Technology Resilience posture."
    ],
    description: "Mapped end-to-end benefits/claims process, identifying risks & recovery strategies for improved operational resilience."
  },
  {
    name: "Refreshed Business Impact Analysis",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "September 2020 – April 2021 (8 months)",
    context: "The client, a large international schedule 1 financial institution, was seeking to complete a large-scale Business Impact Analysis (BIA) exercise to assess all key business processes against business continuity best practices and to identify major resilience gaps across its US and Canada operations.",
    role: [
      "Stephen was involved as a core team member of the engagement team and contributed in the following capacity:",
      "Produced custom Excel formulas using Python to seamlessly process inputs from in Excel and perform complex calculations core to analysis efforts, reducing task timeline by 88% and allowing for repeatability in any future complex computational processes – ultimately saving 35 project work hours.",
      "Developed two (2) consolidation tools for multi-sheet workbooks, enabling data analysis and project reporting, using VBA, reducing the task timeline by 94% (from 13.25 minutes to 47 seconds), and Python, reducing the task timeline by 98% (from 6 minutes to 4 seconds) – ultimately saving a combined 130 project work hours.",
      "Led key stakeholders of 61 business units' in completing BIA workbooks by coordinating with clients, drafting key communications, leading discussions with 1st Line staff relating to the BIA methodology/process, and tracking/facilitating the resolution of issues.",
      "Redeveloped legacy data collection template to reduce file size by 74% and simplified user interface for ease of use by analyzing file XML composition for redundancy, identifying opportunities to remove extra data, relinking formulas, and developing dynamic data validation inputs.",
      "Developed a User Guide to support participants in completing preliminary data collection.",
      "Developed an end-to-end process for undertaking the business impact assessment process by gathering business requirement documentation, creating a business flow chart and process map, and developing process definitions. Further undertook strategic planning to develop the tools to enable the future state design."
    ],
    description: "Completed BIA for a major financial institution, identifying resilience gaps across US/Canada operations.\n\n\n\n"
  },
  {
    name: "Market Assessment of Large Corporate Clients",
    logo: logoDeloitte,
    descriptor: "Central Government Agency",
    timeline: "September 2020 – October 2020 (2 months)",
    context: "The client, a central government agency, was seeking to conduct a market assessment of large corporations as they relate to the Financial Consumer Protection Framework and identify trends and opportunities to support their advisory services of the federal government.",
    role: [
      "Stephen was involved as support to the engagement team contributed in the following capacity:",
      "Conducted desktop research on consumer protection provisions and supported interviews with representatives from six large corporations.",
      "Recorded detailed and meaningful interview notes, organized data in Excel to identify patterns and extract insights, and contributed to the development of a final report with clearly articulated findings.",
      "Independently developed a summary report, sought and incorporated feedback from engagement leadership, obtained final approvals, and shared the report with the client."
    ],
    description: "Analyzed large corporate practices regarding financial consumer protection, informing federal advisory service improvements.\n\n\n\n"
  },
  {
    name: "Chief Risk Office Reporting Optimization",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "February 2019 – April 2019 (3 months)",
    context: "The client, a large international schedule 1 financial institution, was seeking to benchmark and improve upon the process to produce the Chief Compliance Officer\u2019s opinion on the state of compliance, a required quarterly attestation stipulated in OSFI Guideline E-13.",
    role: [
      "Stephen was involved as support to the engagement team contributed in the following capacity:",
      "Conducted high-level benchmark on the Chief Risk Officer opinions on the state of compliance from internal research, comparing the overall structure, sophistication and individual elements present in competitor\u2019s opinion statements.",
      "Supported the development of a summary report to outline findings, to propose enhancements to current state and to provide recommendations to improve current state processes with a short to medium term roadmap."
    ],
    description: "Optimized quarterly compliance reporting process for a major financial institution, adhering to OSFI E-13 guidelines.\n\n\n\n"
  },
  {
    name: "Welfare Service Audit",
    logo: logoDeloitte,
    descriptor: "Provincial Ministry",
    timeline: "November 2018 – January 2019 (3 months)",
    context: "The client, a provincial ministry providing social support, was seeking to conduct an internal audit on 3 social service programs to measure compliance to policy and procedure.",
    role: [
      "Stephen was involved as support to the engagement team contributed in the following capacity:",
      "Traveled to 7 rural/remote communities and followed testing protocols for 150+ case files to successfully perform procedural audits of 3 government services."
    ],
    description: "Audited social service programs for policy compliance, delivering insights to improve program effectiveness.\n\n\n\n"
  },
  {
    name: "Regulatory Binders",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "October 2018 (1 month)",
    context: "The client, a large international schedule 1 financial institution, was seeking to identify and catalogue all relevant financial regulations that applies to their business segments to have better insight to their obligations.",
    role: [
      "Stephen was involved as support to the engagement team contributed in the following capacity:",
      "Reviewed 150+ draft regulation summaries / interpretations for format and sentence structure.",
      "Consolidate regulation summaries into 8 individualized compliance manuals (also know as Regulatory Binders) for each of the Bank\u2019s in scope Business Units."
    ],
    description: "Developed regulatory binders cataloging financial obligations for a major international financial institution.\n\n\n\n"
  },
  {
    name: "Compliance Transformation and Optimization Program",
    logo: logoDeloitte,
    descriptor: "Large International Schedule 1 Financial Institution",
    timeline: "May 2018 – October 2018 (6 months)",
    context: "The client, a large international schedule 1 financial institution, was seeking to modernize their current state operating model for the global compliance and prioritize existing regulatory findings against the new target operating model.",
    role: [
      "Stephen was involved as support to the engagement team contributed in the following capacity:",
      "Mapped 393 open regulatory issues across 4 global operating groups to a Business Activity Map of 47 activities using Excel and aggregated activities into 9 summary spreadsheets for executive review.",
      "Produced 23 figures with Tableau to represent the current-state effectiveness of the Financial Institution\u2019s Global Compliance function for the Chief Risk Officer\u2019s review.",
      "Collected data from the Director of Global Compliance using PowerPoint to record 81 reports on compliance against People, Process, Data, and Technology, and used Excel to collate a database of results. ",
      "Created 8 client deliverables for projects with a cumulative value of $2MM+ including design presentations, proposals, Gantt charts, educational presentations, and business architecture flowcharts.",
      "Developed and delivered a 100+ task Gantt chart with defined dependencies and milestones for an $800K pursuit to extend the project scope."
    ],
    description: "Modernized global compliance operating model, prioritizing regulatory findings for a major financial institution.\n\n\n\n"
  },
  {
    name: "Engineering Campus Experience Office Program",
    logo: logoUofT,
    descriptor: "Large Canadian Higher Education Institution",
    timeline: "Sept 2019 – May 2020 (8 months)",
    context: "To improve student experience and support students throughout their engineering education, the University developed a novel strategic initiative focused on providing ad-hoc mentorship to a student body of over 5000, deemed the Engineering Campus Experience Officer (engCEO) program.",
    role: [
      "Stephen was hired to lead the engCEO program and contributed in the following capacity:",
      "Developed organizational structure for a team of 12 student leaders – synthesizing functional groups to support execution of mandate with respect to marketing, event planning, financial, and logistical operations.",
      "Supported the team by providing regular guidance and feedback, ensuring that each member was aligned with the program's goals and objectives.",
      "Promoted the engCEO program through various marketing channels, including social media, newsletters, and campus events, to increase visibility and participation.",
      "Monitored and evaluated the program's impact through surveys and feedback sessions, making data-driven decisions to refine and enhance the initiative.",
      "Managed the program's budget, ensuring that all expenditures were within the allocated funds and providing financial reports to stakeholders.",
      "Produced thorough report using MS PowerPoint to provide an overview of the pilot program's performance for review by the Dean's Strategic Fund committee including content relating to program outreach, financial analysis, overview of strategic decisions, and feedback from mentors for future terms."
    ],
    description: "Developed engCEO program, providing ad-hoc mentorship to 5000+ engineering students, improving their overall university experience.\n\n\n\n"
  },
  {
    name: "Business Process Analysis",
    logo: logoHomEquity,
    descriptor: "Schedule 1 Financial Institution",
    timeline: "May 2017 – August 2018 (4 months)",
    context: "During Stephen\u2019s first co-op placement, he supported the Business Process manager in analysing and enhancing business processes on an ad-hoc basis, independently identifying opportunities for improvement and optimizing procedures by developing tools or reviewing process designs.",
    role: [
      "Stephen was involved as support and contributed in the following capacity:",
      "Built a Quality Assurance program using Excel to capture and produce reports on data being collected on a day-to-day basis, expediting task timeline by 15% and saving approximately 180 hours of work per quarter.",
      "Streamlined daily operational reporting by developing a user-friendly Excel program for management review to automate repeatable processes and visualize key performance indicators, reducing task duration by 57% per report and saving over 25 hours of work per quarter."
    ],
    description: "Analyzed & improved business processes, identifying opportunities & optimizing procedures through tool development & design review.\n\n\n\n"
  }
]



// [
//   {name:"Technology Impact Modeling on Workforce Capacity",
//     description: "test",
//     logo: logoDeloitte,
//     descriptor: "Confidential Client",
//     timeline: "March 2025 – July 2025 (5 months)",
//     context: "The client was seeking to develop a methodology and supporting tooling to assess the impact of integrating Generative AI technologies into daily operations, with a focus on workforce size and distribution, project cost, and organizational capacity.",
//     role: ["Stephen was involved as the technical team lead and contributed in the following capacity:",
//     "Designed the assessment methodology by gathering requirements from project sponsors and senior leaders, proposing multiple fidelity levels for analysis, and ultimately recommending a preferred approach aligned with organizational goals, timelines, and desired outcomes.",
//     "Led the development of an operational task inventory and conducted a technology impact analysis to quantify potential disruptions, generating a foundational dataset to support visualization and insight generation.",
//     "Built a robust Power BI model leveraging over 30 transformation steps and referenced queries, enabling seamless, no-code data refresh capabilities and enhanced connectivity across data sources.",
//     "Developed a custom Excel function, “=AskGenAI(<prompt>)”, using VBA to enable secure API calls to Azure-hosted large language models (LLMs), allowing users to interact with Generative AI directly within Excel.",
//     "Oversaw and supported a team of two in shaping the stakeholder engagement approach and planning for short- to medium-term sustainability of the solution.",
//     "Provided ongoing feedback and quality assurance on supporting materials, such as presentation decks and communications, to ensure end-user clarity and adoption."]}

  // {
  //   name: 'Planetaria',
  //   description:
  //     'Creating technology to empower civilians to explore space on their own terms.',
  //   logo: logoPlanetaria,
  //   industry: 'energy',
  //   role: 'role Planetaria',
  //   context: 'context',
  //   timeline: "Aug 2020"
  // },
  // {
  //   name: 'Animaginary',
  //   description:
  //   'High performance web animation library, hand-written in optimized WASM.',
  //   logo: logoAnimaginary,
  //   industry: 'energy',
  //   role: 'role Animaginary',
  //   context: 'context',
  //   timeline: "Aug 2020"
  // },
  // {
  //   name: 'HelioStream',
  //   description:
  //     'Real-time video streaming library, optimized for interstellar transmission.',
  //   logo: logoHelioStream,
  //   industry: 'energy',
  //   role: 'role',
  //   context: 'context',
  //   timeline: "Aug 2020"
  // },
  // {
  //   name: 'cosmOS',
  //   description:
  //     'The operating system that powers our Planetaria space shuttles.',
  //   logo: logoCosmos,
  //   industry: 'energy',
  //   role: 'role',
  //   context: 'context',
  //   timeline: "Aug 2020"
  // },
  // {
  //   name: 'OpenShuttle',
  //   description:
  //     'The schematics for the first rocket I designed that successfully made it to orbit.',
  //   logo: logoOpenShuttle,
  //   industry: 'energy',
  //   role: 'role',
  //   context: 'context',
  //   timeline: "Aug 2020"
  // },
// ]