export type TimelineKind = 'education' | 'honor' | 'research' | 'project' | 'volunteer' | 'work';

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  when: string;
  title: string;
  org?: string;
  description: string;
  tags?: string[];
};

/**
 * Most recent first. To add volunteering or work experience, push an entry with
 * kind 'volunteer' or 'work' — the timeline styles each kind automatically.
 */
export const timeline: TimelineEntry[] = [
  {
    id: 'research-maa',
    kind: 'research',
    when: 'Current',
    title: 'Data Annotator — Multimodal Argument Analysis',
    description:
      'Supporting research on visual and textual information in NLP, AI and computational argumentation.',
    tags: ['NLP', 'Multimodal AI', 'Argumentation'],
  },
  {
    id: 'neural-decoder',
    kind: 'project',
    when: 'Sep 2026 – Present',
    title: 'Neural Decoder',
    description: 'EEG motor-imagery decoding with MNE-Python, CSP + LDA, moving toward real-time LSL streaming.',
    tags: ['EEG', 'BCI', 'Signal processing'],
  },
  {
    id: 'sentry',
    kind: 'project',
    when: 'Jul 2026 – Sep 2026',
    title: 'Sentry',
    description: 'Real-time threat and scream detection from spoken audio, wired to mobile safety alerts.',
    tags: ['Audio ML', 'NLP', 'Real-time'],
  },
  {
    id: 'fold',
    kind: 'project',
    when: 'Apr 2026 – May 2026',
    title: 'Fold',
    description: 'PyTorch computer-vision model classifying Fashion-MNIST across 10 categories.',
    tags: ['PyTorch', 'Computer Vision'],
  },
  {
    id: 'medpred',
    kind: 'project',
    when: 'Feb 2026 – Mar 2026',
    title: 'MedPred',
    description: 'NLP classifier for medication reviews — 91.6% accuracy, served with Streamlit.',
    tags: ['NLP', 'Streamlit'],
  },
  {
    id: 'deans-list',
    kind: 'honor',
    when: 'Fall 2025',
    title: "Dean's List",
    org: 'The University of Texas at Dallas',
    description: 'Recognised for academic excellence.',
  },
  {
    id: 'utd',
    kind: 'education',
    when: 'Expected May 2028',
    title: 'B.S. Computer Science',
    org: 'The University of Texas at Dallas',
    description: 'GPA 3.875 / 4.00. The home port where the voyage began.',
    tags: ['GPA 3.875', "Dean's List"],
  },
];
