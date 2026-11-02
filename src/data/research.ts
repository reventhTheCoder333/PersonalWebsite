export type ResearchEntry = {
  id: string;
  role: string;
  title: string;
  status: 'Current' | 'Past';
  /** Add a date range when you want it shown, e.g. 'Sep 2026 – Present'. */
  period?: string;
  /** Lab, group or advisor, if you want it listed. */
  group?: string;
  summary: string;
  areas: string[];
  details: string[];
  links?: { label: string; href: string }[];
};

export type Publication = {
  title: string;
  venue: string;
  year: string;
  href?: string;
};

export const research: ResearchEntry[] = [
  {
    id: 'multimodal-argument-analysis',
    role: 'Data Annotator',
    title: 'Multimodal Argument Analysis',
    status: 'Current',
    summary:
      'Annotating data for research into how arguments are expressed and understood when visual and textual information appear together.',
    areas: [
      'Visual & textual information',
      'Natural Language Processing',
      'Artificial Intelligence',
      'Computational argumentation',
    ],
    details: [
      'Contributing human-labelled annotations that ground the study of arguments spanning images and text.',
      'Working at the intersection of NLP, multimodal AI and computational argumentation.',
    ],
  },
];

/** Add papers, posters and talks here as they are published. */
export const publications: Publication[] = [];
