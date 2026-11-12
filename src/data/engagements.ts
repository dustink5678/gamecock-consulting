import { asset } from '../lib/asset'

export type MotifKind = 'chat' | 'rig' | 'orbit'

export type Workstream = { title: string; body?: string }

export type Project = {
  label?: string
  status?: string
  title?: string
  summary?: string[]
  workstreamsTitle: string
  workstreams: Workstream[]
  deliverablesTitle?: string
  deliverables?: string[]
  outcome?: string
  note?: string
}

export type Team = {
  caption: string
  slide: string
  members: { name: string; role?: string; detail?: string }[]
}

export type Engagement = {
  slug: string
  index: string
  client: string
  clientShort: string
  title: string
  tagline: string
  sector: string
  focus: string[]
  status: string
  statusShort: string
  accent: string
  accentSoft: string
  motif: MotifKind
  overview: string[]
  topics?: string[]
  highlightLabel: string
  highlight: string
  photos?: { src: string; alt: string }[]
  scale?: {
    title: string
    body: string
    metrics: { value: number; prefix?: string; suffix?: string; label: string }[]
  }
  projects: Project[]
  teams?: Team[]
}

const img = (file: string) => asset(`images/engagements/${file}`)

export const engagements: Engagement[] = [
  {
    slug: 'google',
    index: '01',
    client: 'Google',
    clientShort: 'Google',
    title: "Understanding Gen Z's Relationship with AI",
    tagline:
      'How university students perceive, evaluate, and use artificial intelligence — built on ~550 survey responses and advanced statistical analysis.',
    sector: 'Technology',
    focus: ['Primary Research', 'Statistical Modeling', 'Generative AI'],
    status: 'Completed',
    statusShort: 'Completed',
    accent: '#4c8bf5',
    accentSoft: '#dbe7fd',
    motif: 'chat',
    overview: [
      'Gamecock Consulting partnered with Google to examine how university students perceive, evaluate, and use artificial intelligence. The engagement combined primary research, advanced quantitative analysis, and qualitative insights to inform strategic recommendations.',
    ],
    highlightLabel: 'The core question',
    highlight: 'How do university students perceive, evaluate, and use artificial intelligence?',
    photos: [
      { src: img('google-presentation.jpg'), alt: 'A GCC consultant presenting findings to Google at Google Durham' },
      { src: img('google-team-photo.jpg'), alt: 'The GCC engagement team at Google' },
      { src: img('google-durham.jpg'), alt: 'The lobby of Google Durham' },
    ],
    scale: {
      title: 'Research scale and scope',
      body: 'The team collected approximately 550 student survey responses at the University of South Carolina, spanning academic disciplines, class years, and work backgrounds. Research explored AI sentiment, adoption barriers, information sources, product preferences, and usage across seven task categories, alongside perceptions of seven AI providers.',
      metrics: [
        { prefix: '~', value: 550, label: 'Student survey responses' },
        { value: 2399, label: 'Open-ended answers analyzed' },
        { value: 3794, label: 'Respondent-trait combinations evaluated' },
        { value: 7, label: 'AI task categories studied' },
        { value: 7, label: 'AI providers compared' },
      ],
    },
    projects: [
      {
        workstreamsTitle: 'Advanced analysis and deliverables',
        workstreams: [
          {
            title: 'AI-assisted qualitative analysis',
            body: "Applied a local language model to identify themes across 2,399 open-ended answers, connecting numerical findings with students' experiences.",
          },
          {
            title: 'Controlled statistical modeling',
            body: 'Examined relationships among usage, sentiment, and company perceptions while accounting for differences in respondent characteristics.',
          },
          {
            title: 'Audience segmentation',
            body: 'Evaluated 3,794 combinations of respondent traits, applying false-discovery correction to reduce the risk of highlighting chance findings.',
          },
          {
            title: 'Comparative analysis and visualizations',
            body: 'Developed usage profiles, company comparisons, and visual narratives tracing relationships among information sources, experiences, and attitudes.',
          },
          {
            title: 'Strategic presentation',
            body: 'Consolidated the research into a comprehensive presentation, translating findings into strategic recommendations for Google.',
          },
        ],
        outcome:
          'The engagement delivered a structured evidence base for understanding student perspectives and evaluating strategic opportunities.',
        note: 'Findings reflect the surveyed USC population and were treated as directional rather than nationally representative.',
      },
    ],
    teams: [
      {
        caption: 'Google engagement team',
        slide: img('google-team.jpg'),
        members: [
          { name: 'Aidan Welch' },
          { name: 'Amelia Garman' },
          { name: 'Ben Brown' },
          { name: 'Dustin King' },
          { name: 'Mark Beatriz' },
          { name: 'Stefano Bonati' },
          { name: 'Tarun Ramkumar' },
        ],
      },
    ],
  },
  {
    slug: 'capgemini',
    index: '02',
    client: 'Capgemini',
    clientShort: 'Capgemini',
    title: 'AI and Digital Transformation in Offshore Decommissioning',
    tagline:
      'Where AI and digital technologies can create value in retiring and removing aging offshore oil and gas infrastructure.',
    sector: 'Technology Consulting · Energy',
    focus: ['AI & Digital', 'Offshore Energy', 'Strategy'],
    status: 'Completed · Spring 2026',
    statusShort: 'Completed',
    accent: '#12abdb',
    accentSoft: '#d3f0f9',
    motif: 'rig',
    overview: [
      'Gamecock Consulting conducted a strategic research engagement examining the role of AI and digital technologies in offshore oil and gas decommissioning — the retirement and removal of aging infrastructure.',
      'The team analyzed the decommissioning lifecycle, assessed the competitive landscape, and evaluated industry technology capabilities. Research covered enterprise systems, digital twins, data management, and emerging applications of AI, supported by a case study of digital transformation in the energy sector.',
    ],
    topics: ['Enterprise systems', 'Digital twins', 'Data management', 'Emerging AI applications', 'Energy-sector case study'],
    highlightLabel: 'The core question',
    highlight: 'Where can AI and digital technologies create value in retiring aging offshore infrastructure?',
    projects: [
      {
        workstreamsTitle: 'Key areas of work and deliverables',
        workstreams: [
          {
            title: 'Industry and process analysis',
            body: 'Mapped decommissioning activities and examined operational complexity, fragmented information, and coordination challenges.',
          },
          {
            title: 'Technology assessment',
            body: 'Evaluated AI, enterprise software, and digital capabilities in the context of asset retirement.',
          },
          {
            title: 'Business opportunity evaluation',
            body: 'Assessed potential value across efficiency, risk management, safety, compliance, and sustainability.',
          },
          {
            title: 'Strategic deliverables',
            body: 'Developed a demonstration and executive presentation synthesizing research findings and strategic recommendations for Capgemini.',
          },
        ],
        outcome:
          'The engagement connected industry research with technology and business analysis to explore opportunities in a complex, evolving energy market.',
      },
    ],
    teams: [
      {
        caption: 'Capgemini engagement team',
        slide: img('capgemini-team.jpg'),
        members: [{ name: 'Hanah' }, { name: 'Dustin' }, { name: 'Patrick' }],
      },
    ],
  },
  {
    slug: 'srnl',
    index: '03',
    client: 'Savannah River National Laboratory',
    clientShort: 'SRNL',
    title: 'Nuclear Waste Treatment & Used Fuel Lifecycle Cost Modeling',
    tagline:
      'Translating complex nuclear missions into transparent financial models — from Hanford tank waste treatment to used nuclear fuel.',
    sector: 'Energy & Public Sector',
    focus: ['Financial Modeling', 'Scenario Analysis', 'Nuclear Energy'],
    status: 'Project 1 complete · Project 2 underway',
    statusShort: 'Ongoing',
    accent: '#e0a43c',
    accentSoft: '#f8ead2',
    motif: 'orbit',
    overview: [
      'Across two engagements, Gamecock Consulting has partnered with Savannah River National Laboratory to connect scientific and engineering expertise with business analysis — building financial models that help SRNL evaluate complex, long-horizon nuclear missions.',
    ],
    highlightLabel: 'Impact',
    highlight: 'Projections forecasting billions in savings — reaching government and DOE officials.',
    projects: [
      {
        label: 'Project 01',
        status: 'Past engagement',
        title: 'Nuclear Waste Treatment Cost and Schedule Analysis',
        summary: [
          'Gamecock Consulting worked with Savannah River National Laboratory to support financial planning for the Hanford tank waste treatment mission. The team translated technical equipment requirements and processing schedules into financial models for comparing alternative mission scenarios.',
        ],
        workstreamsTitle: 'Scope of work',
        workstreams: [
          { title: 'Capital expenditure modeling' },
          { title: 'Selected operating cost projections' },
          { title: 'Inflation adjustments' },
          { title: 'Annual and cumulative funding analysis' },
        ],
        deliverablesTitle: 'Deliverables',
        deliverables: [
          'Integrated Excel modeling framework',
          'Comparative cost visualizations',
          'Final presentation explaining financial and scheduling tradeoffs',
        ],
        outcome:
          'The projections forecasted billions in savings, reaching government and DOE officials — connecting scientific and engineering expertise with business analysis to support project evaluation.',
      },
      {
        label: 'Project 02',
        status: 'Current engagement',
        title: 'Used Nuclear Fuel Lifecycle Cost Modeling',
        summary: [
          'The current engagement focuses on developing a transparent, adjustable lifecycle cost model to help SRNL evaluate used nuclear fuel packaging, storage, and transportation alternatives.',
        ],
        workstreamsTitle: 'Planned calculations and analysis',
        workstreams: [
          {
            title: 'Lifecycle cost comparisons',
            body: 'Calculate procurement, handling, storage, maintenance, transportation, and potential repackaging costs, separating shared expenses from costs that distinguish alternatives.',
          },
          {
            title: 'Quantity and schedule modeling',
            body: 'Determine equipment requirements, shipment volumes, and annual spending under different capacity and timing assumptions.',
          },
          {
            title: 'Financial projections',
            body: 'Compare constant-dollar, escalated, and present-value costs over the modeled lifecycle.',
          },
          {
            title: 'Scenario and breakeven analysis',
            body: 'Evaluate how changes in schedules, equipment prices, and future acceptance requirements affect the relative cost of alternatives.',
          },
          {
            title: 'Sensitivity and uncertainty analysis',
            body: 'Identify the strongest cost drivers and use Monte Carlo simulation to estimate potential cost ranges and the likelihood that one alternative costs less than another.',
          },
        ],
        deliverablesTitle: 'Planned deliverables',
        deliverables: [
          'Excel decision-support model',
          'Interactive charts and a summary dashboard',
          'Written report or presentation',
        ],
        note: "Inputs and assumptions will remain traceable so SRNL's scientists and engineers can update the analysis as information becomes available.",
      },
    ],
    teams: [
      {
        caption: 'Project 01 team',
        slide: img('srnl-team.jpg'),
        members: [
          { name: 'Jeff Savage, PhD', role: 'Faculty Advisor' },
          { name: 'Jackson Lubar', role: 'Team Lead' },
          { name: 'Anthony Watson', role: 'Consultant' },
          { name: 'Nicholas Hamel', role: 'Consultant' },
          { name: 'Rae Vaughn', role: 'Consultant' },
        ],
      },
    ],
  },
]

export const getEngagement = (slug?: string) => engagements.find((e) => e.slug === slug)
