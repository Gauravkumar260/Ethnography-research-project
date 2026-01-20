const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Community = require('../models/Community'); 
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

/**
 * MASTER DATASET
 * * This dataset bridges the gap between:
 * 1. Ethnographic Data (History, Culture, Timelines)
 * 2. Visual Design Data (Palettes, Attire, Poster Images)
 */

const communities = [
  // ==============================================================
  // 1. BANJARA
  // ==============================================================
  {
    name: 'Banjara',
    slug: 'banjara',
    subtitle: 'Woven in Color',
    region: 'Deccan & North India',
    state: 'Rajasthan/Telangana',
    location: 'Widespread across India',
    population: '~10 Million',
    language: 'Gor-boli',
    primaryLivelihood: 'Trade & Crafts',

    // --- IMAGERY ---
    // Realistic Photo for Hero Banner
    heroImage: 'https://images.unsplash.com/photo-1610647752706-3bb12232b37d?auto=format&fit=crop&w=1080',
    thumbnail: 'https://images.unsplash.com/photo-1610647752706-3bb12232b37d?auto=format&fit=crop&w=400',
    // Illustrated Character for Cards/Posters
    posterImage: 'https://i.ibb.co/Z160W6bY/Banjara.png',

    intro: 'The Banjara, also known as Lambani or Gormati, are one of India’s most vibrant communities, historically the great traders of the subcontinent.',
    description: 'Nomadic traders whose vibrant culture moves with their journeys.',

    // --- TEXT SECTIONS ---
    sections: {
      history: {
        title: 'History',
        content: 'Historically nomadic merchants who supplied armies and caravans across the subcontinent, including as carriers of salt during the Mughal era.'
      },
      lifestyle: {
        title: 'Lifestyle',
        content: 'Many Banjara groups have shifted from full nomadism to settled tandas (hamlets), though seasonal migration for labor and trade continues in several regions.'
      },
      craft: {
        title: 'Craft',
        content: 'Renowned for Lambani embroidery, dense mirror work, and heavy silver jewellery that have gained global recognition in contemporary craft markets.'
      },
      culture: {
        title: 'Culture',
        content: 'Rich oral traditions, dance, and music, with women’s attire featuring layered skirts, vibrant cholis, and heavily embroidered odhnis.'
      }
    },

    // --- DESIGN SYSTEM METADATA ---
    attire: {
      gender: 'Female',
      upperGarment: 'Deep red choli with mirror work and embroidery',
      lowerGarment: 'Long ghagra/lehenga with geometric borders',
      drape: 'Contrasting dupatta/odhni draped over shoulder',
      jewellery: 'Multiple necklaces, bangles, and traditional metallic ornaments, emphasising mirrors and coins',
      head: 'Hair tied back or partially covered by dupatta'
    },
    palette: {
      primary: ['#7C1D2A', '#B4373F'], // Deep reds/maroons
      accents: ['#F5C453', '#FFE9B8'], // Gold/yellow highlights
      background: '#F4E7D3',           // Cream canvas
      text: '#2E2216'
    },
    designNotes: {
      style: 'Flat, vector, no outlines',
      pose: 'Neutral frontal standing pose, arms relaxed',
      typography: 'Clean serif/sans-serif label “BANJARA” at bottom'
    },

    // --- INFOGRAPHICS ---
    timeline: [
      { year: '1600s', event: 'Mughal Era', description: 'Key supply chain transporters for armies.' },
      { year: '1800s', event: 'British Rule', description: 'Criminal Tribes Act (later repealed) deeply marginalised them.' },
      { year: '2000s', event: 'Craft Revival', description: 'Lambani embroidery and jewellery received global attention.' }
    ],
    statistics: {
      settlement: [
        { label: 'Settled Tandas', value: 70, icon: '🏘️' },
        { label: 'Migrant Labor', value: 30, icon: '🏗️' }
      ],
      migration: {
        'Type': 'Economic',
        'Frequency': 'Seasonal',
        'Reason': 'Labor/Trade'
      }
    },
    aspirations: [
      { goal: 'Social Status', interest: 90, icon: '⚖️' },
      { goal: 'Craft Enterprise', interest: 85, icon: '🧵' },
      { goal: 'Political Rep', interest: 70, icon: '🗳️' }
    ],
    insights: ['Nomadic trade heritage', 'Global craft recognition'],
    futureDirection: 'Craft enterprise development and political representation.'
  },

  // ==============================================================
  // 2. BHOKSA
  // ==============================================================
  {
    name: 'Bhoksa',
    slug: 'bhoksa',
    subtitle: 'Between Tradition and Tomorrow',
    region: 'Terai Region',
    state: 'Uttarakhand',
    location: 'Udham Singh Nagar',
    population: '~80,000',
    language: 'Bhoksa',
    primaryLivelihood: 'Agriculture & Labor',

    heroImage: 'https://images.unsplash.com/photo-1759738103333-1c836a32f848?auto=format&fit=crop&w=1080',
    thumbnail: 'https://images.unsplash.com/photo-1759738103333-1c836a32f848?auto=format&fit=crop&w=400',
    posterImage: 'https://i.ibb.co/Kj3ddvjm/Bhoksa.png',

    intro: 'The Bhoksa are a Scheduled Tribe community primarily residing in the Terai foothill forests, transitioning from forest-based livelihoods to settled agriculture.',
    description: 'A tribal community navigating modern challenges while preserving ancestral wisdom.',

    sections: {
      history: {
        title: 'History',
        content: 'Bhoksa (also known as Buksa) are indigenous people of Uttarakhand and Uttar Pradesh who have inhabited the Shivalik foothills and Terai forests for centuries.'
      },
      lifestyle: {
        title: 'Lifestyle',
        content: 'Most Bhoksa families now live in permanent villages, combining small-scale agriculture, daily wage labour, and occasional forest-based activities.'
      },
      craft: {
        title: 'Craft',
        content: 'Known for basketry, simple handicrafts, and traditional agricultural knowledge rather than large commercial craft enterprises.'
      },
      culture: {
        title: 'Culture',
        content: 'They follow a mix of indigenous beliefs and Hindu practices, with strong village panchayat institutions and rich folk songs and stories.'
      }
    },

    attire: {
      gender: 'Female',
      upperGarment: 'Simple traditional blouse/top in muted tones',
      lowerGarment: 'Long ankle-length skirt or dress in earth colours',
      drape: 'Occasional light scarf or dupatta',
      jewellery: 'Minimal jewellery compared to Banjara, small earrings/bangles',
      head: 'May include a plain headscarf or uncovered head'
    },
    palette: {
      primary: ['#6B5A3B', '#8A7C5C'], // Browns / muted earth
      accents: ['#C5B28A', '#E0D4B8'], // Muted greens/beige
      background: '#F4E7D3',
      text: '#2E2216'
    },
    designNotes: {
      style: 'Flat, vector, no outlines',
      pose: 'Neutral frontal standing pose',
      typography: '“BHOKSA” centered at bottom'
    },

    timeline: [
      { year: '1800s', event: 'Forest Settlement', description: 'Inhabited dense Terai forests as hunter-gatherers and small farmers.' },
      { year: '1967', event: 'Scheduled Tribe Status', description: 'Received constitutional recognition as a Scheduled Tribe.' },
      { year: '2000s', event: 'Agricultural Shift', description: 'Increased dependence on settled farming and wage labour.' }
    ],
    statistics: {
      settlement: [
        { label: 'Permanent Villages', value: 90, icon: '🏠' },
        { label: 'Forest Fringe', value: 10, icon: '🌲' }
      ],
      migration: {
        'Type': 'Settled',
        'Mobility': 'Low',
        'Reason': 'Agriculture'
      }
    },
    aspirations: [
      { goal: 'Land Rights', interest: 95, icon: '🌾' },
      { goal: 'Higher Education', interest: 75, icon: '🎓' },
      { goal: 'Govt Employment', interest: 80, icon: '💼' }
    ],
    futureDirection: 'Focus on educational infrastructure and livelihood diversification.'
  },

  // ==============================================================
  // 3. GADIA LOHAR
  // ==============================================================
  {
    name: 'Gadia Lohar',
    slug: 'gadia-lohar',
    subtitle: 'Forged in Fire',
    region: 'Rajasthan, Gujarat, MP',
    state: 'Rajasthan',
    location: 'Mewar Region & North Indian roadsides',
    population: '~15,000 families',
    language: 'Marwari-influenced dialects',
    primaryLivelihood: 'Traditional Ironworking',

    heroImage: 'https://images.unsplash.com/photo-1748640773152-a5c24b000d98?auto=format&fit=crop&w=1080',
    thumbnail: 'https://images.unsplash.com/photo-1748640773152-a5c24b000d98?auto=format&fit=crop&w=400',
    posterImage: 'https://i.ibb.co/gMw3bNgx/Gadia-Lohar.png',

    intro: 'The Gadia Lohar are itinerant blacksmiths who have carried the legacy of ironworking across northern India for centuries while living in mobile bullock-cart camps.',
    description: 'Nomadic blacksmiths carrying centuries of ironworking heritage.',

    sections: {
      history: {
        title: 'History & Origin',
        content: 'Community legends trace them to Rajput blacksmiths of Chittorgarh who vowed to remain nomadic after the 16th‑century fall of their fort, taking to the roads with their forges mounted on bullock carts.'
      },
      lifestyle: {
        title: 'Lifestyle',
        content: 'Families live in temporary roadside encampments, with decorated bullock carts functioning as both home and workshop as they move where agricultural demand exists.'
      },
      craft: {
        title: 'Craft',
        content: 'They forge and repair essential tools such as sickles, axes, ploughs, and knives using traditional hand‑forging techniques and portable furnaces.'
      },
      culture: {
        title: 'Culture',
        content: 'Despite constant movement, they maintain close community ties, endogamous marriage patterns, and distinctive speech mixing Rajasthani with local languages.'
      }
    },

    attire: {
      gender: 'Male',
      upperGarment: 'Simple light shirt or kurta',
      lowerGarment: 'Dhoti or loose work trousers',
      drape: 'Occasional cloth around waist/shoulder',
      jewellery: 'Minimal, functional look',
      head: 'Simple turban or bare head; sometimes tools in hand'
    },
    palette: {
      primary: ['#C2B59B', '#F0E9DC'], // Browns/beiges/whites
      accents: ['#7A5C3A', '#44413C'], // Practical earth tones
      background: '#F4E7D3',
      text: '#2E2216'
    },
    designNotes: {
      style: 'Flat, vector, no outlines',
      pose: 'Neutral standing, optionally with tool',
      typography: '“GADIA LOHAR” at bottom'
    },

    timeline: [
      { year: '1568', event: 'Fall of Chittorgarh', description: 'Community legend of oath to remain nomadic after loss of the fort.' },
      { year: '1947', event: 'Independence', description: 'Continued migration across newly formed state borders.' },
      { year: '1950s', event: 'Urban Expansion', description: 'Roadside encampments near growing cities like Delhi and Jaipur.' },
      { year: 'Present', event: 'Identity & Housing', description: 'Struggles around legal documents, schooling, and resettlement schemes.' }
    ],
    statistics: {
      settlement: [
        { label: 'Temporary Camps', value: 85, icon: '⛺' },
        { label: 'Semi‑permanent', value: 12, icon: '🏚️' },
        { label: 'Permanent Housing', value: 3, icon: '🏠' }
      ],
      migration: {
        'Frequency': 'Every 3–6 months',
        'Avg Distance': '100–500 km',
        'Primary Reason': 'Agricultural demand'
      }
    },
    aspirations: [
      { goal: 'Permanent Housing', interest: 92, icon: '🏠' },
      { goal: 'Education', interest: 88, icon: '📚' },
      { goal: 'Identity Docs', interest: 95, icon: '📋' }
    ],
    insights: ['Unique intersection of Rajput history and artisan survival'],
    futureDirection: 'Seeking legal recognition and permanent settlements while preserving blacksmith craft.'
  },

  // ==============================================================
  // 4. JAUNSAR
  // ==============================================================
  {
    name: 'Jaunsar',
    slug: 'jaunsar',
    subtitle: 'Keepers of Ancient Traditions',
    region: 'Jaunsar‑Bawar',
    state: 'Uttarakhand',
    location: 'Dehradun District',
    population: '~1,50,000',
    language: 'Jaunsari',
    primaryLivelihood: 'Horticulture & Agriculture',

    heroImage: 'https://images.unsplash.com/photo-1626621341517-4c9da036e2e5?auto=format&fit=crop&w=1080',
    thumbnail: 'https://images.unsplash.com/photo-1626621341517-4c9da036e2e5?auto=format&fit=crop&w=400',
    posterImage: 'https://i.ibb.co/mr1J2H4M/Jaunsar.png',

    intro: 'The Jaunsar people inhabit the remote Jaunsar‑Bawar region in the mid‑Himalayas, known for distinctive architecture, festivals, and complex kinship systems.',
    description: 'Himalayan communities with unique social structures and rich folklore.',

    sections: {
      history: {
        title: 'History',
        content: 'Local traditions link their ancestry to the Pandavas of the Mahabharata, shaping lineage and ritual practices across villages.'
      },
      lifestyle: {
        title: 'Lifestyle',
        content: 'Settlements are clustered mountain villages with multi‑storey wooden houses adapted to cold climates and terraced fields for crops and orchards.'
      },
      craft: {
        title: 'Craft',
        content: 'Jaunsari artisans are noted for intricate wood carving, traditional wool weaving, and ornament making used in temples and homes.'
      },
      culture: {
        title: 'Culture',
        content: 'Festivals like Magh Mela, distinctive dances, and historically polyandrous marriage customs mark Jaunsar as culturally unique within Uttarakhand.'
      }
    },

    attire: {
      gender: 'Female',
      upperGarment: 'Traditional blouse/choli',
      lowerGarment: 'Long patterned skirt typical of hill communities',
      drape: 'Shawl or wrap over shoulders',
      jewellery: 'Necklaces, earrings, and head ornaments in Jaunsari style',
      head: 'May include traditional cap or head jewellery'
    },
    palette: {
      primary: ['#3F6A8A', '#A13552'], // Vibrant blues and reds
      accents: ['#F4C95D', '#D9E3EC'], // Yellows/silvers
      background: '#F4E7D3',
      text: '#2E2216'
    },
    designNotes: {
      style: 'Flat, vector, no outlines',
      pose: 'Neutral standing front view',
      typography: '“JAUNSAR” label at bottom'
    },

    timeline: [
      { year: 'Ancient', event: 'Mythic Origins', description: 'Oral traditions situate ancestry in epic narratives.' },
      { year: '1967', event: 'Tribal Status', description: 'Declared a Scheduled Tribe, formal recognition of distinct identity.' },
      { year: 'Present', event: 'Cultural Tourism', description: 'Growing interest in architecture, festivals, and village life.' }
    ],
    statistics: {
      settlement: [
        { label: 'Mountain Villages', value: 95, icon: '⛰️' },
        { label: 'Urban Migration', value: 5, icon: '🏙️' }
      ],
      migration: {
        'Type': 'Sedentary',
        'Mobility': 'Low',
        'Reason': 'Local agriculture'
      }
    },
    aspirations: [
      { goal: 'Cultural Preservation', interest: 90, icon: '🎭' },
      { goal: 'Sustainable Tourism', interest: 85, icon: '📸' },
      { goal: 'Road Connectivity', interest: 80, icon: '🛣️' }
    ],
    futureDirection: 'Balanced cultural tourism and documentation of oral traditions.'
  },

  // ==============================================================
  // 5. VAN GUJJAR
  // ==============================================================
  {
    name: 'Van Gujjar',
    slug: 'van-gujjar',
    subtitle: 'Guardians of the Forest',
    region: 'Himalayas',
    state: 'Uttarakhand/HP',
    location: 'Rajaji National Park & Shivalik forests',
    population: '~1,00,000',
    language: 'Gojri',
    primaryLivelihood: 'Buffalo Herding',

    heroImage: 'https://images.unsplash.com/photo-1601850642139-0d29d477ff51?auto=format&fit=crop&w=1080',
    thumbnail: 'https://images.unsplash.com/photo-1601850642139-0d29d477ff51?auto=format&fit=crop&w=400',
    posterImage: 'https://i.ibb.co/JwjhNY3p/Van-Gujjar.png',

    intro: 'The Van Gujjars are a transhumant pastoral community whose seasonal movements between forests and high pastures have shaped the Himalayan landscape for generations.',
    description: 'Forest dwellers balancing conservation pressures with traditional pastoral livelihoods.',

    sections: {
      history: {
        title: 'History',
        content: 'For centuries they have practiced transhumance, moving with buffalo herds between winter forests in the Shivaliks and summer grazing grounds in higher Himalayas.'
      },
      lifestyle: {
        title: 'Lifestyle',
        content: 'Families live in temporary forest camps called deras, migrating in groups along established routes and relying on milk, ghee, and forest resources.'
      },
      craft: {
        title: 'Craft',
        content: 'Specialised in dairy production and traditional knowledge of fodder, water sources, and forest ecology, rather than decorative crafts.'
      },
      culture: {
        title: 'Culture',
        content: 'Strong pastoral identity, deep ecological knowledge, and in many groups, a commitment to vegetarianism tied to buffalo reverence.'
      }
    },

    attire: {
      gender: 'Male',
      upperGarment: 'Simple kurta or long shirt',
      lowerGarment: 'Loose salwar or pants suitable for walking',
      drape: 'Occasional shawl or light wrap',
      jewellery: 'Very minimal, practical dress',
      head: 'Traditional cap or light turban typical of Gujjar men'
    },
    palette: {
      primary: ['#E3DED2', '#C4BEB1'], // Whites/creams/earthy
      accents: ['#6C7A5F', '#8A5A3B'], // Muted greens/browns
      background: '#F4E7D3',
      text: '#2E2216'
    },
    designNotes: {
      style: 'Flat, vector, no outlines',
      pose: 'Neutral frontal standing pose',
      typography: '“VAN GUJJAR” label at bottom'
    },

    timeline: [
      { year: 'Traditional', event: 'Transhumant Cycle', description: 'Seasonal movement between high pastures and lowland forests.' },
      { year: '2006', event: 'Forest Rights Act', description: 'Legal framework created for forest‑dwelling communities, with uneven implementation.' },
      { year: 'Present', event: 'Conservation Conflict', description: 'Ongoing negotiations and conflicts around grazing rights and relocations from protected areas.' }
    ],
    statistics: {
      settlement: [
        { label: 'Nomadic (Deras)', value: 80, icon: '⛺' },
        { label: 'Settled', value: 20, icon: '🏠' }
      ],
      migration: {
        'Type': 'Seasonal',
        'Range': 'Low‑to‑high Himalayas',
        'Cycle': 'Summer/Winter'
      }
    },
    aspirations: [
      { goal: 'Forest Rights', interest: 100, icon: '🌲' },
      { goal: 'Milk Markets', interest: 85, icon: '🥛' },
      { goal: 'Mobile Education', interest: 80, icon: '📖' }
    ],
    futureDirection: 'Secure forest rights, climate‑resilient pastoralism, and fair access to dairy markets.'
  }
];

// ==============================================
// SEEDER EXECUTION
// ==============================================

const importData = async () => {
  try {
    await Community.deleteMany(); // Clear old data to avoid duplicates
    console.log('🗑️  Old community data destroyed'.red.inverse);

    await Community.insertMany(communities);
    console.log('✅ Rich community data imported!'.green.inverse);

    process.exit(0);
  } catch (err) {
    console.error(`Seeder Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Community.deleteMany();
    console.log('🗑️  All community data removed'.red.inverse);
    process.exit(0);
  } catch (err) {
    console.error(`Destroy Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
};

// COMMAND LINE ARGS
// Run: node seeder.js      -> Imports data
// Run: node seeder.js -d   -> Deletes data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}