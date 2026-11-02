export type IslandTheme = 'neural' | 'sentry' | 'fold' | 'medpred' | 'lumi' | 'incuria' | 'spam' | 'cnn';

export type Project = {
  id: string;
  name: string;
  subtitle?: string;
  /** Omit when no date range has been confirmed. */
  period?: string;
  status?: 'In progress' | 'Completed';
  island: {
    name: string;
    theme: IslandTheme;
    /** Decorative map coordinates — purely stylistic. */
    coords: string;
  };
  /** Accent colour used for glows and chips. */
  accent: string;
  summary: string;
  description: string;
  tech: string[];
  highlights: string[];
  /** Headline facts shown on the card. Only verified numbers belong here. */
  metrics?: { label: string; value: string }[];
  extra?: { heading: string; items: string[] };
  /**
   * Add verified URLs here. Leave undefined and the UI shows a muted
   * "link coming soon" label instead of a dead button.
   */
  links: { github?: string; demo?: string };
};

export const projects: Project[] = [
  {
    id: 'lumi',
    name: 'Lumi',
    subtitle: 'AI Visual Assistant for Blind & Visually Impaired People',
    island: { name: 'Lantern Isle', theme: 'lumi', coords: '41°N · 12°E' },
    accent: '#8fc4e8',
    summary:
      'An AI visual assistant that helps blind and visually impaired people understand the world around them.',
    description:
      'An AI-powered visual assistant designed to support blind and visually impaired individuals through real-time scene understanding, voice interaction, guided tasks, and personalized fairytale experiences.',
    tech: ['AI', 'Computer Vision', 'Voice Interaction', 'Accessibility'],
    highlights: [
      'Real-time scene understanding.',
      'Voice interaction.',
      'Guided tasks.',
      'Personalized fairytale experiences.',
    ],
    links: {
      github: 'https://github.com/reventhTheCoder333/Lumi',
      demo: 'https://www.youtube.com/watch?v=OhPfyMSOIls',
    },
  },
  {
    id: 'neural-decoder',
    name: 'Neural Decoder',
    period: 'Sep 2026 – Present',
    status: 'In progress',
    island: { name: 'Synapse Isle', theme: 'neural', coords: '32°N · 117°W' },
    accent: '#5bb5ad',
    summary:
      'An EEG-based neural decoder that classifies left- vs right-hand motor imagery.',
    description:
      'Developing an EEG-based neural decoder to classify left- and right-hand motor imagery using the PhysioNet EEGBCI dataset and MNE-Python — the first leg of a voyage toward real-time brain-computer interfaces.',
    tech: ['Python', 'MNE-Python', 'PhysioNet EEGBCI', 'CSP', 'LDA', 'Lab Streaming Layer'],
    highlights: [
      'Built an end-to-end signal-processing and machine-learning pipeline.',
      'Implemented 8–30 Hz band-pass filtering to isolate motor-related rhythms.',
      'Performed event detection and epoching on the raw EEG recordings.',
      'Applied Common Spatial Patterns (CSP) with Linear Discriminant Analysis (LDA) for classification.',
      'Developing a real-time EEG prediction pipeline using Lab Streaming Layer (LSL).',
    ],
    metrics: [
      { label: 'Band-pass', value: '8–30 Hz' },
      { label: 'Classes', value: 'L / R hand' },
    ],
    links: { github: 'https://github.com/reventhTheCoder333/Neural-Decoder' },
  },
  {
    id: 'sentry',
    name: 'Sentry',
    subtitle: 'Real-Time AI Threat & Scream Detection System',
    period: 'Jul 2026 – Sep 2026',
    status: 'Completed',
    island: { name: 'Watchtower Key', theme: 'sentry', coords: '18°N · 64°W' },
    accent: '#e8773b',
    summary:
      'A real-time AI safety system that listens for verbal threats and human screams.',
    description:
      'Developed a real-time AI safety system that analyzes spoken audio to detect verbal threats and human screams, then routes alerts to a mobile device.',
    tech: ['Machine Learning', 'NLP', 'Real-time Audio', 'Speech Translation', 'Mobile Alerts'],
    highlights: [
      'Built independent ML models for threat detection and scream detection.',
      'Integrated live speech translation into the audio pipeline.',
      'Implemented NLP-based classification of verbal threats.',
      'Connected real-time audio processing, ML predictions and mobile safety alerts end to end.',
    ],
    metrics: [
      { label: 'Models', value: '2 independent' },
      { label: 'Mode', value: 'Real-time' },
    ],
    links: { github: 'https://github.com/reventhTheCoder333/Threat_Detection_Sentry' },
  },
  {
    id: 'incuria',
    name: 'Incuria',
    subtitle: 'AI Email Assistant for Professors',
    island: { name: 'Scriptorium Cay', theme: 'incuria', coords: '55°N · 03°W' },
    accent: '#7fbf8a',
    summary: 'An AI email assistant that helps professors keep up with student communications.',
    description:
      'An AI-powered email assistant that helps professors manage student communications, generate context-aware draft responses, and streamline academic email workflows.',
    tech: ['AI', 'NLP', 'Email Automation'],
    highlights: [
      'Helps professors manage student communications.',
      'Generates context-aware draft responses.',
      'Streamlines academic email workflows.',
    ],
    links: { github: 'https://github.com/reventhTheCoder333/Incuria' },
  },
  {
    id: 'fold',
    name: 'Fold',
    period: 'Apr 2026 – May 2026',
    status: 'Completed',
    island: { name: 'Loom Atoll', theme: 'fold', coords: '07°S · 142°E' },
    accent: '#d8aa4f',
    summary: 'A PyTorch computer-vision model for classifying Fashion-MNIST clothing.',
    description:
      'Developed a deep learning model to classify the 60,000 Fashion-MNIST images across 10 clothing categories, built as a full computer-vision pipeline in PyTorch.',
    tech: ['Python', 'PyTorch', 'torchvision', 'Google Colab', 'NVIDIA T4 GPU'],
    highlights: [
      'Designed and trained a deep learning model in PyTorch.',
      'Built a computer-vision data pipeline using torchvision.',
      'Trained for three epochs on an NVIDIA T4 GPU in Google Colab.',
      'Reached approximately 0.26 training loss and 0.30 test loss.',
    ],
    metrics: [
      { label: 'Images', value: '60,000' },
      { label: 'Categories', value: '10' },
      { label: 'Test loss', value: '≈ 0.30' },
    ],
    links: {},
  },
  {
    id: 'medpred',
    name: 'MedPred',
    subtitle: 'Medication Review Condition Predictor',
    period: 'Feb 2026 – Mar 2026',
    status: 'Completed',
    island: { name: 'Remedy Reef', theme: 'medpred', coords: '21°N · 157°W' },
    accent: '#c25b5b',
    summary: 'An NLP system that classifies medication reviews by condition.',
    description:
      'Developed an NLP-based machine learning system that classifies medication reviews into five predefined condition categories, served through an interactive Streamlit app.',
    tech: ['Python', 'NLP', 'Machine Learning', 'Streamlit'],
    highlights: [
      'Achieved 91.6% classification accuracy across five categories.',
      'Built an interactive Streamlit application for exploring predictions.',
      'Implemented confidence-based predictions so each result shows how certain the model is.',
    ],
    metrics: [
      { label: 'Accuracy', value: '91.6%' },
      { label: 'Categories', value: '5' },
    ],
    extra: {
      heading: 'Categories',
      items: ['Anxiety', 'Depression', 'Acne', 'Pain', 'Birth Control'],
    },
    links: { github: 'https://github.com/reventhTheCoder333/Medication-Review-Condition-Predictor' },
  },
  {
    id: 'spamscope',
    name: 'SpamScope',
    island: { name: 'Sieve Shoals', theme: 'spam', coords: '12°S · 77°W' },
    accent: '#d77fa8',
    summary: 'A machine learning classifier that separates spam from legitimate messages.',
    description:
      'A machine learning project focused on identifying and classifying spam messages, distinguishing unwanted communications from legitimate content.',
    tech: ['Machine Learning', 'Text Classification'],
    highlights: [
      'Identifies and classifies spam messages.',
      'Distinguishes unwanted communications from legitimate content.',
    ],
    links: { github: 'https://github.com/reventhTheCoder333/SpamScope' },
  },
  {
    id: 'cnn-practice',
    name: 'CNN Practice Project',
    island: { name: 'Kernel Rock', theme: 'cnn', coords: '35°S · 18°E' },
    accent: '#a0a8ff',
    summary: 'Hands-on exploration of convolutional neural networks for image classification.',
    description:
      'A convolutional neural network project exploring deep learning architectures and image classification using Python and machine learning tools.',
    tech: ['Python', 'CNNs', 'Deep Learning', 'Image Classification'],
    highlights: [
      'Explores convolutional neural network architectures.',
      'Applies them to image classification in Python.',
    ],
    links: { github: 'https://github.com/reventhTheCoder333/CNNPracticeProject' },
  },
];
