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

export type CocktailRecipe = {
  cocktailName: string;
  ingredients: string[];
  method: string;
  garnish: string;
};

export type SyrupItem = {
  name: string;
  slug: string;
  recipe: CocktailRecipe;
};

export const syrupItems: SyrupItem[] = [
  {
    name: 'Jamun',
    slug: 'jamun',
    recipe: {
      cocktailName: 'Jamun Old Fashioned',
      ingredients: ['Bourbon — 60 ml', 'Jamun Syrup — 10 ml', 'Angostura Bitters — 2 dashes'],
      method: 'Stir with ice and strain over a large ice cube.',
      garnish: 'Orange peel.',
    },
  },
  {
    name: 'Limoncello',
    slug: 'limoncello',
    recipe: {
      cocktailName: 'Limoncello Collins',
      ingredients: ['Gin — 45 ml', 'Limoncello Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 60 ml'],
      method: 'Shake gin, syrup and lemon with ice. Strain into an ice-filled Collins glass and top with soda.',
      garnish: 'Lemon wheel.',
    },
  },
  {
    name: 'Triple Sec',
    slug: 'triple-sec',
    recipe: {
      cocktailName: 'Triple Sec Margarita',
      ingredients: ['Tequila — 50 ml', 'Triple Sec Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and strain into a salt-rimmed glass over fresh ice.',
      garnish: 'Lime wheel.',
    },
  },
  {
    name: 'Guava Chilli',
    slug: 'guava-chilli',
    recipe: {
      cocktailName: 'Guava Chilli Margarita',
      ingredients: ['Tequila — 50 ml', 'Guava Chilli Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and strain over fresh ice.',
      garnish: 'Guava slice and chilli.',
    },
  },
  {
    name: 'Paloma (Grapefruit)',
    slug: 'paloma-grapefruit',
    recipe: {
      cocktailName: 'Paloma',
      ingredients: ['Tequila — 50 ml', 'Paloma (Grapefruit) Syrup — 20 ml', 'Fresh Lime Juice — 15 ml', 'Soda — 60 ml'],
      method: 'Build over ice in a highball glass and stir gently.',
      garnish: 'Grapefruit wedge.',
    },
  },
  {
    name: 'Cucumber',
    slug: 'cucumber',
    recipe: {
      cocktailName: 'Cucumber Gin Fizz',
      ingredients: ['Gin — 45 ml', 'Cucumber Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 60 ml'],
      method: 'Shake gin, syrup and lemon with ice. Strain over fresh ice and top with soda.',
      garnish: 'Cucumber ribbon.',
    },
  },
  {
    name: 'Green Apple',
    slug: 'green-apple',
    recipe: {
      cocktailName: 'Green Apple Martini',
      ingredients: ['Vodka — 50 ml', 'Green Apple Syrup — 20 ml', 'Fresh Lemon Juice — 10 ml'],
      method: 'Shake vigorously with ice and fine strain into a chilled martini glass.',
      garnish: 'Green apple slice.',
    },
  },
  {
    name: 'Raspberry',
    slug: 'raspberry',
    recipe: {
      cocktailName: 'Raspberry Bramble',
      ingredients: ['Gin — 45 ml', 'Raspberry Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml', 'Soda — 30 ml'],
      method: 'Shake gin, syrup and lemon. Pour over crushed ice and top with soda.',
      garnish: 'Fresh raspberries and lemon.',
    },
  },
  {
    name: 'Strawberry',
    slug: 'strawberry',
    recipe: {
      cocktailName: 'Strawberry Daiquiri',
      ingredients: ['White Rum — 50 ml', 'Strawberry Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake hard with ice and strain into a chilled coupe.',
      garnish: 'Fresh strawberry.',
    },
  },
  {
    name: 'Pineapple',
    slug: 'pineapple',
    recipe: {
      cocktailName: 'Pineapple Mai Tai',
      ingredients: ['Dark Rum — 30 ml', 'White Rum — 30 ml', 'Pineapple Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and pour over crushed ice.',
      garnish: 'Pineapple leaf and lime.',
    },
  },
  {
    name: 'Cherry',
    slug: 'cherry',
    recipe: {
      cocktailName: 'Cherry Manhattan',
      ingredients: ['Bourbon or Rye Whiskey — 50 ml', 'Cherry Syrup — 10 ml', 'Sweet Vermouth — 20 ml', 'Angostura Bitters — 2 dashes'],
      method: 'Stir with ice and strain into a chilled coupe.',
      garnish: 'Cherry.',
    },
  },
  {
    name: 'Blue Curacao',
    slug: 'blue-curacao',
    recipe: {
      cocktailName: 'Blue Curaçao Sour',
      ingredients: ['Vodka — 45 ml', 'Blue Curaçao Syrup — 20 ml', 'Fresh Lemon Juice — 20 ml'],
      method: 'Shake with ice and strain over fresh ice.',
      garnish: 'Orange peel.',
    },
  },
  {
    name: 'Pandan',
    slug: 'pandan',
    recipe: {
      cocktailName: 'Pandan Mojito',
      ingredients: ['White Rum — 50 ml', 'Pandan Syrup — 20 ml', 'Fresh Lime Juice — 20 ml', 'Fresh Mint — 8–10 leaves', 'Soda — 60 ml'],
      method: 'Gently muddle mint and lime. Add rum and syrup. Fill with crushed ice and top with soda.',
      garnish: 'Mint sprig and lime.',
    },
  },
  {
    name: 'Grenadine',
    slug: 'grenadine',
    recipe: {
      cocktailName: 'Jack Rose',
      ingredients: ['Apple Brandy — 50 ml', 'Grenadine Syrup — 15 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and strain into a chilled coupe.',
      garnish: 'Lime twist.',
    },
  },
  {
    name: 'Litchi',
    slug: 'litchi',
    recipe: {
      cocktailName: 'Litchi Martini',
      ingredients: ['Vodka — 50 ml', 'Litchi Syrup — 20 ml', 'Fresh Lemon Juice — 10 ml'],
      method: 'Shake with ice and fine strain into a chilled martini glass.',
      garnish: 'Litchi.',
    },
  },
  {
    name: 'Irish Cream',
    slug: 'irish-cream',
    recipe: {
      cocktailName: 'Irish Cream White Russian',
      ingredients: ['Vodka — 40 ml', 'Irish Cream Syrup — 20 ml', 'Coffee Liqueur — 15 ml', 'Fresh Cream — 30 ml'],
      method: 'Build over ice and stir gently. Float fresh cream on top.',
      garnish: 'Coffee beans.',
    },
  },
  {
    name: 'Watermelon',
    slug: 'watermelon',
    recipe: {
      cocktailName: 'Watermelon Daiquiri',
      ingredients: ['White Rum — 50 ml', 'Watermelon Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and strain into a chilled coupe.',
      garnish: 'Watermelon slice.',
    },
  },
  {
    name: 'Peach',
    slug: 'peach',
    recipe: {
      cocktailName: 'Peach Bellini',
      ingredients: ['Peach Syrup — 20 ml', 'Prosecco — 90 ml'],
      method: 'Add peach syrup to a chilled flute and slowly top with Prosecco. Stir gently.',
      garnish: 'Peach slice.',
    },
  },
  {
    name: 'Cinnamon',
    slug: 'cinnamon',
    recipe: {
      cocktailName: 'Cinnamon Whiskey Sour',
      ingredients: ['Bourbon — 50 ml', 'Cinnamon Syrup — 15 ml', 'Fresh Lemon Juice — 25 ml', 'Egg White — 15 ml (optional)'],
      method: 'Dry shake if using egg white. Add ice and shake again. Fine strain over fresh ice.',
      garnish: 'Cinnamon stick and lemon peel.',
    },
  },
  {
    name: 'Green Melon',
    slug: 'green-melon',
    recipe: {
      cocktailName: 'Green Melon Sour',
      ingredients: ['Vodka — 45 ml', 'Green Melon Syrup — 20 ml', 'Fresh Lime Juice — 20 ml'],
      method: 'Shake with ice and strain over fresh ice.',
      garnish: 'Melon slice.',
    },
  },
  {
    name: 'Coconut',
    slug: 'coconut',
    recipe: {
      cocktailName: 'Coconut Colada',
      ingredients: ['White Rum — 50 ml', 'Coconut Syrup — 20 ml', 'Pineapple Juice — 80 ml', 'Fresh Lime Juice — 10 ml'],
      method: 'Shake with ice and pour over crushed ice, or blend for a frozen serve.',
      garnish: 'Pineapple leaf and coconut.',
    },
  },
];

export const syrupNames = syrupItems.map((item) => item.name);

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
    contact: ['Hospitality & Liaising Consultant', 'Coverage: KA, TN, AP, KL'],
  },
];