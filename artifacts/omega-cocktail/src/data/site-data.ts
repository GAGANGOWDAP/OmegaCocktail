export type Service = {
  name: string;
  slug: string;
  index: string;
  description: string;
  detail: string;
  icon: string;
};

export const services: Service[] = [
  {
    name: 'Bar Consultancy',
    slug: 'bar-consultancy',
    index: '01',
    icon: '◎',
    description: 'A considered point of view for beverage programs, menus, and bar operations.',
    detail: 'A focused consulting engagement for hospitality founders and venue owners shaping a bar from concept through service. The scope follows the needs of the project.',
  },
  {
    name: 'Bar Setup and Design',
    slug: 'bar-setup-design',
    index: '02',
    icon: '◇',
    description: 'Planning the physical bar around the way a team works and guests move.',
    detail: 'From the first layout conversation to a working bar environment, this service brings together practical planning, design coordination, and the details that support service.',
  },
  {
    name: 'Brewery Setup',
    slug: 'brewery-setup',
    index: '03',
    icon: '△',
    description: 'A structured lens on brewery projects, from early planning to opening.',
    detail: 'A project-facing service for brewery setup, with attention to the operational and licensing considerations that sit behind a smooth opening.',
  },
  {
    name: 'Event Organisation',
    slug: 'event-organisation',
    index: '04',
    icon: '✳',
    description: 'Beverage planning and service thinking for events with a distinct point of view.',
    detail: 'A practical, tailored approach to beverage-led events: shaping the menu, planning the service, and aligning the bar experience with the occasion.',
  },
  {
    name: 'Bartending Services',
    slug: 'bartending-services',
    index: '05',
    icon: '＋',
    description: 'A composed bar team and service approach for private and hospitality settings.',
    detail: 'Bartending support for an event or venue, shaped around the guest experience, the menu, and the rhythm of service on the day.',
  },
  {
    name: 'Staff Training',
    slug: 'staff-training',
    index: '06',
    icon: '—',
    description: 'Practical training that gives teams more confidence behind the bar.',
    detail: 'A hands-on training service built around beverage knowledge, cocktails, service technique, safety, and the operating habits that keep a bar moving.',
  },
  {
    name: 'All Services',
    slug: 'all-services',
    index: '07',
    icon: '·',
    description: 'A complete view of the studio’s service offering, brought together around your brief.',
    detail: 'A combined engagement can bring consultancy, setup, events, bartending, brewery work, and training into one considered project.',
  },
];

export const syrupNames = [
  'Jamun',
  'Limoncello',
  'Triple Sec',
  'Guava Chilli',
  'Paloma (Grapefruit)',
  'Cucumber',
  'Green Apple',
  'Raspberry',
  'Strawberry',
  'Pineapple',
  'Cherry',
  'Blue Curacao',
  'Pandan',
  'Grenadine',
  'Litchi',
  'Irish Cream',
  'Watermelon',
  'Peach',
  'Cinnamon',
  'Green Melon',
  'Coconut',
];

export const toSlug = (value: string) =>
  value.toLowerCase().replace(/[()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const profiles = [
  {
    name: 'Manoj Alphonse',
    role: 'Beverage Connoisseur',
    image: '/assets/people/manoj-alphonse.jpeg',
    eyebrow: '01 / Beverage',
    biography: 'A dynamic and energetic beverage professional with experience across bar management, mixology, menu development, operations, and team leadership.',
    experience: [
      'Beverage Head & Master Mixologist at Phoenix (Bellona Hospitality), India, 2023–2024.',
      'Beverage Head at GATSBY (Westfield Hospitality Pvt Ltd), Bangalore, 2021–2023.',
      'Beverage Manager at Iron Hill (Hybrew street Pvt Ltd), Bangalore, 2021.',
      'Bar Manager & Head Mixologist at Gawky Goose (KG Hospitality Pvt Ltd), Bangalore, 2020–2021.',
    ],
    contact: ['+91 8971825137', 'mjsince1987@gmail.com', 'No 6, RA Road, Ejipura, Bengaluru-560047'],
  },
  {
    name: 'Suresh Naidu',
    role: 'Hospitality & Liaising Consultant',
    image: '/assets/people/suresh-naidu-source.jpeg',
    eyebrow: '02 / Hospitality',
    biography: 'Hotel, micro brewery, restaurant, and bar management, acquisition, development, and licensing consultant.',
    experience: [
      '30 years combined expertise: 20 years hospitality and 10 years government liaising.',
      'Independent since 2011.',
      'Coverage: Karnataka, Tamil Nadu, Andhra Pradesh, Kerala.',
      'Service lines include acquisition consulting, operations management, development consulting, and project consulting & licensing.',
    ],
    contact: ['9980841016', 'sureshvat69@gmail.com', 'Karnataka · Tamil Nadu · Andhra Pradesh · Kerala'],
  },
];