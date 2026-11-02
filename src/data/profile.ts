export const profile = {
  name: 'Reventh Sathish Kumar',
  firstName: 'Reventh',
  title: 'Computer Science Student | AI/ML Engineer | Software Developer',
  roles: ['Computer Science Student', 'AI/ML Engineer', 'Software Developer'],
  university: 'The University of Texas at Dallas',
  universityShort: 'UT Dallas',
  degree: 'B.S. Computer Science',
  graduation: 'May 2028',
  gpa: '3.875',
  gpaScale: '4.00',
  honors: ["Dean's List — Fall 2025"],
  interests: [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Neural Interfaces',
    'Software Engineering',
  ],
  email: 'reventhsathishkumar@gmail.com',
  phone: '(469) 934-4063',
  phoneHref: 'tel:+14699344063',
  links: {
    linkedin: 'https://www.linkedin.com/in/reventh-sathishkumar',
    github: 'https://github.com/reventhTheCoder333',
    portfolio: 'https://reventhsathishkumar.netlify.app',
  },
  /** Short status shown next to the hero buttons. Edit freely. */
  availability: 'Open to opportunities & collaborations',
  /**
   * Profile photo for the wanted poster. Drop an image in /public (e.g. /public/profile.jpg)
   * and set this to '/profile.jpg'. While null, an illustrated placeholder is shown.
   */
  photo: '/profile.jpg' as string | null,
  /**
   * Decorative "bounty" on the wanted poster. It is the GPA written as a bounty —
   * a playful nod, not a monetary figure or award.
   */
  bounty: { value: '3,875', caption: 'Bounty set by GPA · 3.875 / 4.00' },
} as const;

export type NavItem = { id: string; label: string };

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];
