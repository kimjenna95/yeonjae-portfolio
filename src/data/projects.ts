export interface Project {
  id: number
  slug: string
  name: string
  subtitle: string
  category: string          // comma-joined, kept for ProjectDetail compatibility
  categories: string[]      // individual tags for work-page rows
  role?: string             // overrides categories[0] in the ROLE field on project pages
  year: string
  description: string
  thumbnail: string
  blurDataURL: string
  tags: string[]
  featured: boolean
  wip?: boolean
}

export const projects: Project[] = [
  // ── Featured Work ──────────────────────────────────────────────
  {
    id: 1,
    slug: 'cisco',
    name: 'Unified Group Management',
    subtitle: 'Cisco',
    category: 'Product Design, Platform Strategy, Internal Tooling, Access Governance',
    categories: ['Product Design', 'Platform Strategy', 'Internal Tooling', 'Access Governance'],
    role: 'Product Design Lead',
    year: '2023–2025',
    description:
      `Consolidating Cisco's legacy access management systems into a unified platform for group creation, membership management, and governance workflows.`,
    thumbnail: '/cisco/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Product Design', 'Enterprise UX', 'Design Systems'],
    featured: true,
  },
  {
    id: 2,
    slug: 'jpmorgan-chase',
    name: 'Apply & Fulfillment',
    subtitle: 'Chase MyHome',
    category: 'Product Design, Customer Experience, Workflow Optimization',
    categories: ['Product Design', 'Customer Experience', 'Workflow Optimization'],
    role: 'Product Design Lead',
    year: '2022–2023',
    description:
      `Designing a more personalized and streamlined mortgage application experience for Chase customers.`,
    thumbnail: '/jpmorgan-chase/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Product Design', 'UX Research', 'Enterprise'],
    featured: true,
  },
  {
    id: 3,
    slug: 'oxefit',
    name: 'Fitness Content Platform',
    subtitle: 'OxeLife',
    category: 'Product Design, Mobile Design, Design System, Brand Identity',
    categories: ['Product Design', 'Mobile Design', 'Design System', 'Brand Identity'],
    role: 'UX/UI Design, Visual Design',
    year: '2021',
    description:
      `Extending the OxeFit experience through onboarding, creator-led content, and connected fitness experiences beyond the machine.`,
    thumbnail: '/oxefit/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Product Design', 'Mobile Design', 'UX/UI Design'],
    featured: true,
  },
  // ── Past Work ──────────────────────────────────────────────────
  {
    id: 4,
    slug: 'travelu',
    name: 'Shared Travel Expenses',
    subtitle: 'Travel.U',
    category: 'Product Design, UX Research, Mobile Design',
    categories: ['Product Design', 'UX Research', 'Mobile Design'],
    year: '2020',
    description:
      `Designing a mobile experience for tracking shared travel expenses, splitting group costs, and reducing financial friction during trips.`,
    thumbnail: '/travelu/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Product Design', 'UX Research', 'Mobile Design'],
    featured: false,
  },
  {
    id: 5,
    slug: '2checkout',
    name: '2Checkout',
    subtitle: '',
    category: 'UX/UI Design, Visual Direction',
    categories: ['UX/UI Design', 'Visual Direction'],
    year: '2022',
    description:
      'A homepage redesign for a global payments platform — cutting through a cluttered, multi-CTA layout to a single clear message and one reason to convert.',
    thumbnail: '/2checkout/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['UX/UI Design', 'E-commerce'],
    featured: false,
  },
  {
    id: 6,
    slug: 'apa',
    name: 'American Party Animals',
    subtitle: 'NFT',
    category: 'UX/UI Design, Visual Direction',
    categories: ['UX/UI Design', 'Visual Direction'],
    year: '2022',
    description:
      'A landing page redesign for a civic NFT project — aligning the site\'s visual identity with its artwork and making the value proposition impossible to miss.',
    thumbnail: '/apa/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Branding', 'Visual Design', 'Web Design'],
    featured: false,
  },
  {
    id: 12,
    slug: 'fire-escape',
    name: 'Fire Escape',
    subtitle: '',
    category: 'Photography',
    categories: ['Photography'],
    year: '2018',
    description: 'A photographic series exploring urban architecture and the quietude of in-between spaces.',
    thumbnail: '/fire-escape/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Photography'],
    featured: false,
  },
  {
    id: 11,
    slug: 'life-is-sweet',
    name: 'Life is Sweet',
    subtitle: '',
    category: 'Fashion Design',
    categories: ['Fashion Design'],
    year: '2018',
    description: 'Womenswear collection exploring sweetness, nostalgia, and tactile joy through textile and silhouette.',
    thumbnail: '/life-is-sweet/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Fashion Design'],
    featured: false,
  },
  {
    id: 13,
    slug: 'silent-echo',
    name: 'Silent Echo',
    subtitle: '',
    category: 'Fashion Design',
    categories: ['Fashion Design'],
    year: '2017',
    description: 'Conceptual womenswear collection rooted in restraint, negative space, and quiet tension.',
    thumbnail: '/silent-echo/thumbnail.jpg',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    tags: ['Fashion Design'],
    featured: false,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null
  next: Project | null
} {
  const idx = projects.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  }
}
