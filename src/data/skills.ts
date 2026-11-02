export type SkillGroup = {
  id: string;
  /** Devil-Fruit style name for the category. */
  fruit: string;
  /** Plain-language category name (what recruiters scan for). */
  category: string;
  type: string;
  ability: string;
  /** Fruit body colours: base, highlight, swirl. */
  palette: { base: string; light: string; swirl: string };
  items: string[];
  variant: 'fruit' | 'haki';
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    fruit: 'Syntax-Syntax Fruit',
    category: 'Programming Languages',
    type: 'Paramecia',
    ability: 'Grants fluency across paradigms — from high-level scripting down to the metal.',
    palette: { base: '#b9822f', light: '#f1cb7a', swirl: '#6e4512' },
    items: ['Python', 'Java', 'SQL', 'R', 'C++', 'Assembly'],
    variant: 'fruit',
  },
  {
    id: 'ai-ml',
    fruit: 'Neuro-Neuro Fruit',
    category: 'AI / Machine Learning',
    type: 'Logia',
    ability: 'Lets the user learn from data itself — vision, language and brain signals alike.',
    palette: { base: '#2b8a86', light: '#8ee0d6', swirl: '#0f4a4a' },
    items: [
      'PyTorch',
      'Scikit-learn',
      'Hugging Face Transformers',
      'MNE-Python',
      'NumPy',
      'torchvision',
      'Pandas',
      'Matplotlib',
    ],
    variant: 'fruit',
  },
  {
    id: 'tools',
    fruit: 'Forge-Forge Fruit',
    category: 'Tools & Frameworks',
    type: 'Zoan',
    ability: 'Shapes ideas into shipped products — interfaces, data stores, cloud and pipelines.',
    palette: { base: '#c95a2a', light: '#f5a26a', swirl: '#6a2410' },
    items: [
      'React.js',
      'Docker',
      'Git',
      'VS Code',
      'Google Colab',
      'Pinecone',
      'Supabase',
      'Power BI',
      'Microsoft Graph API',
      'Microsoft Azure',
    ],
    variant: 'fruit',
  },
  {
    id: 'certifications',
    fruit: 'Haki of Discipline',
    category: 'Certifications',
    type: 'Trained, not eaten',
    ability: 'Strength earned through study — completed coursework in NLP, data prep and ML.',
    palette: { base: '#8f2a2a', light: '#e06a5a', swirl: '#3a0d0d' },
    items: [
      'Natural Language Processing in Python',
      'Python Data Science: Data Prep and EDA with Python',
      'Python Machine Learning and Data Science with Scikit-learn',
    ],
    variant: 'haki',
  },
];
