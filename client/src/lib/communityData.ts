export interface CommunitySection {
  title: string;
  content: string;
}

export interface CommunityData {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  heroImage: string;
  intro: string;
  description: string;
  sections: Record<string, CommunitySection>;
  insights: string[];
  impact: string;
  // Infographic Data (Optional fields marked with ?)
  timeline?: { year: string; event: string; description: string }[];
  lifestyle?: {
    settlement: { label: string; value: number; icon: string }[];
    migration: Record<string, string>;
    dailyLife?: { time: string; activity: string }[];
    livestock?: { animal: string; count: string; purpose: string }[];
  };
  craft?: {
    tools?: { name: string; demand: number; price: string }[];
    textiles?: { item: string; demand: number; price: string }[];
    skills?: { name: string; proficiency: number; market: string }[];
    process?: { step: number; name: string; detail: string }[];
    economicImpact: Record<string, string>;
  };
  culture?: {
    language: string;
    religion: string;
    festivals: string[];
    music: string;
    marriage: string;
  };
  gender?: {
    roles: { category: string; men?: number; women?: number; boys?: number; girls?: number }[];
  };
  challenges?: { issue: string; severity: number; impact: string }[];
  aspirations?: { goal: string; interest: number; icon: string }[];
}

export const communities: Record<string, CommunityData> = {
  'gadia-lohar': {
    id: 'gadia-lohar',
    name: 'Gadia Lohar',
    subtitle: 'Forged in Fire',
    location: 'Rajasthan, Gujarat, Madhya Pradesh',
    description: 'Nomadic blacksmiths carrying centuries of ironworking heritage',
    heroImage: '/assets/home-image-gadia-lohar.png',
    intro: 'The Gadia Lohar are one of India\'s most remarkable nomadic communities - iron artisans who have carried the ancient craft of blacksmithing across states for over 500 years.',
    sections: {
      history: {
        title: 'History & Origin',
        content: 'Legend traces the Gadia Lohar to the Rajput warriors of Chittorgarh who refused to settle after their fort fell to invaders in the 16th century. Taking a vow to remain nomadic until their land was reclaimed, they adopted blacksmithing as their livelihood.'
      },
      lifestyle: {
        title: 'Lifestyle & Settlement',
        content: 'Living in temporary roadside settlements, the Gadia Lohar construct makeshift shelters using tarpaulin, cloth, and bamboo. Their bullock carts carry not just tools and raw materials, but the entirety of their movable lives.'
      },
      craft: {
        title: 'Craft & Livelihood',
        content: 'The Gadia Lohar craft essential agricultural tools - sickles, axes, ploughs, and knives - using traditional forging techniques passed down through generations. Working with scrap iron and rudimentary bellows, they transform raw metal over open fires into functional implements.'
      },
      culture: {
        title: 'Culture & Rituals',
        content: 'Despite their nomadic existence, the Gadia Lohar maintain strong cultural bonds. They speak a unique dialect mixing Rajasthani and local languages. Their festivals, marriages, and rituals reflect a blend of Hindu practices with community-specific traditions.'
      }
    },
    insights: [
      'The Gadia Lohar represent a unique intersection of historical memory and contemporary survival',
      'Their craft is not merely economic but deeply tied to identity and dignity',
      'Nomadism, once born of defiance, has become a cycle difficult to break without systemic support'
    ],
    impact: 'Addressing the needs of the Gadia Lohar requires a multi-dimensional approach: legal recognition, access to education and healthcare, preservation of craft heritage, and economic support that respects their cultural identity.',

    // Infographic Data
    timeline: [
      { year: '1568', event: 'Fall of Chittorgarh Fort', description: 'Rajput warriors take vow of nomadism' },
      { year: '1600s', event: 'Craft Adoption', description: 'Blacksmithing becomes primary livelihood' },
      { year: '1947', event: 'Independence Era', description: 'Continue migration across newly formed states' },
      { year: '2024', event: 'Present Day', description: 'Balancing tradition with modernization' },
    ],
    lifestyle: {
      settlement: [
        { label: 'Temporary Camps', value: 85, icon: '⛺' },
        { label: 'Semi-permanent', value: 12, icon: '🏚️' },
        { label: 'Permanent Housing', value: 3, icon: '🏠' },
      ],
      migration: {
        frequency: 'Every 3-6 months',
        distance: '100-500 km per cycle',
        reason: 'Agricultural demand for tools',
      },
      dailyLife: [
        { time: '5:00 AM', activity: 'Fire preparation & tool gathering' },
        { time: '7:00 AM', activity: 'Metalwork begins - forging & shaping' },
        { time: '12:00 PM', activity: 'Community meal & rest' },
        { time: '2:00 PM', activity: 'Customer visits & tool delivery' },
        { time: '6:00 PM', activity: 'Evening metal finishing work' },
        { time: '8:00 PM', activity: 'Family time & cultural activities' },
      ],
    },
    craft: {
      tools: [
        { name: 'Sickle', demand: 30, price: '₹50-80' },
        { name: 'Axe', demand: 25, price: '₹100-150' },
        { name: 'Plough', demand: 20, price: '₹200-400' },
        { name: 'Knives', demand: 15, price: '₹40-70' },
        { name: 'Other Tools', demand: 10, price: 'Varies' },
      ],
      process: [
        { step: 1, name: 'Material Sourcing', detail: 'Collect scrap iron & metal' },
        { step: 2, name: 'Heating', detail: 'Traditional bellows fire (800°C)' },
        { step: 3, name: 'Forging', detail: 'Hammer shaping on anvil' },
        { step: 4, name: 'Tempering', detail: 'Water cooling for strength' },
        { step: 5, name: 'Finishing', detail: 'Sharpening & handle fitting' },
      ],
      economicImpact: {
        avgIncome: '₹3,000-6,000/month',
        familySize: '6-8 members',
        industrialCompetition: '↓ 60% demand loss since 2000',
      },
    },
    culture: {
      language: 'Rajasthani-Marwari dialect',
      religion: 'Hinduism with folk practices',
      festivals: ['Diwali', 'Holi', 'Janmashtami', 'Gangaur'],
      music: 'Devotional songs & folk ballads',
      marriage: 'Community endogamy, bride price tradition',
    },
    gender: {
      roles: [
        { category: 'Metalwork', men: 70, women: 30 },
        { category: 'Customer Relations', men: 40, women: 60 },
        { category: 'Finance Management', men: 35, women: 65 },
        { category: 'Child Care', men: 20, women: 80 },
        { category: 'Education', boys: 15, girls: 8 },
      ],
    },
    challenges: [
      { issue: 'No Identity Documents', severity: 90, impact: 'Cannot access welfare schemes' },
      { issue: 'Education Access', severity: 85, impact: 'Child literacy below 20%' },
      { issue: 'Healthcare', severity: 80, impact: 'Limited access to medical facilities' },
      { issue: 'Market Decline', severity: 75, impact: 'Industrial competition reducing income' },
      { issue: 'Social Stigma', severity: 70, impact: 'Marginalization in settled areas' },
    ],
    aspirations: [
      { goal: 'Permanent Housing', interest: 92, icon: '🏠' },
      { goal: 'Children\'s Education', interest: 88, icon: '📚' },
      { goal: 'Identity Documents', interest: 95, icon: '📋' },
      { goal: 'Healthcare Access', interest: 85, icon: '🏥' },
      { goal: 'Craft Recognition', interest: 78, icon: '🏆' },
      { goal: 'Skill Diversification', interest: 65, icon: '🔧' },
    ]
  },
  'bhoksa': {
    id: 'bhoksa',
    name: 'Bhoksa',
    subtitle: 'Between Tradition and Tomorrow',
    location: 'Uttarakhand',
    description: 'A tribal community navigating modern challenges while preserving ancestral wisdom',
    heroImage: 'https://i.ibb.co/kghBddxH/home-Image-Bhoksa.png',
    intro: 'The Bhoksa are a Scheduled Tribe community primarily residing in the Terai region of Uttarakhand. Traditionally forest dwellers, they have navigated significant socio-economic transitions over the past few decades.',
    sections: {
      history: { title: 'History & Origin', content: 'The Bhoksa people have inhabited the foothill forests of the Shivalik range for centuries. Historically, they were hunter-gatherers and shifting cultivators with deep knowledge of forest resources.' },
      lifestyle: { title: 'Lifestyle & Settlement', content: 'Today, most Bhoksa communities live in permanent settlements with mixed livelihoods combining agriculture, daily wage labor, and residual forest-based activities.' }
    },
    insights: ['The Bhoksa community exemplifies the complex negotiations between tradition and modernity', 'Loss of forest access has fundamentally altered their socio-economic structure'],
    impact: 'Supporting the Bhoksa requires integrated approaches: educational infrastructure, livelihood diversification programs, cultural documentation initiatives, and policies that recognize traditional forest rights.',

    // Infographic Data
    timeline: [
      { year: '1500s', event: 'Forest Settlement', description: 'Established in Shivalik foothill forests' },
      { year: '1800s', event: 'Colonial Period', description: 'British forest laws restrict access' },
      { year: '1950', event: 'Post-Independence', description: 'Forest conservation policies enacted' },
      { year: '1989', event: 'Scheduled Tribe Status', description: 'Official recognition granted' },
      { year: '2024', event: 'Transition Era', description: 'Balancing tradition with modernization' },
    ],
    lifestyle: {
      settlement: [
        { label: 'Permanent Villages', value: 75, icon: '🏘️' },
        { label: 'Semi-urban Areas', value: 20, icon: '🏙️' },
        { label: 'Forest Proximity', value: 5, icon: '🌲' },
      ],
      migration: {
        frequency: 'Seasonal for wage labor',
        distance: 'Within state (50-200 km)',
        reason: 'Agricultural work & construction',
      },
      dailyLife: [
        { time: '5:30 AM', activity: 'Agricultural & forest activities' },
        { time: '9:00 AM', activity: 'Traditional craft work (basketry)' },
        { time: '12:00 PM', activity: 'Meal & rest period' },
        { time: '2:00 PM', activity: 'Wage labor or cultivation' },
        { time: '6:00 PM', activity: 'Community gatherings' },
        { time: '8:00 PM', activity: 'Cultural activities & storytelling' },
      ],
    },
    craft: {
      skills: [
        { name: 'Basketry & Weaving', proficiency: 80, market: 'Limited local demand' },
        { name: 'Medicinal Plant Knowledge', proficiency: 85, market: 'Traditional healing' },
        { name: 'Agriculture', proficiency: 70, market: 'Primary livelihood' },
        { name: 'Forest Resource Collection', proficiency: 75, market: 'Restricted access' },
      ],
      process: [
        { step: 1, name: 'Material Collection', detail: 'Bamboo & cane from forests' },
        { step: 2, name: 'Preparation', detail: 'Soaking and splitting' },
        { step: 3, name: 'Weaving', detail: 'Traditional basket patterns' },
        { step: 4, name: 'Finishing', detail: 'Trimming & reinforcement' },
        { step: 5, name: 'Local Sale', detail: 'Weekly markets' },
      ],
      economicImpact: {
        avgIncome: '₹4,000-8,000/month',
        forestDependency: '40% livelihood reliance',
        wageLaborShare: '↑ 60% households dependent',
      },
    },
    culture: {
      language: 'Bhoksa (Indo-Aryan), Hindi',
      religion: 'Hinduism with animistic practices',
      festivals: ['Diwali', 'Holi', 'Makar Sankranti', 'Forest Deity Festivals'],
      music: 'Folk songs with dhol & damau',
      marriage: 'Community endogamy, dowry practices',
    },
    gender: {
      roles: [
        { category: 'Forest Collection', men: 40, women: 60 },
        { category: 'Agriculture', men: 65, women: 35 },
        { category: 'Basketry', men: 55, women: 45 },
        { category: 'Wage Labor', men: 75, women: 25 },
        { category: 'Education', boys: 45, girls: 30 },
      ],
    },
    challenges: [
      { issue: 'Forest Access Restrictions', severity: 85, impact: 'Loss of traditional livelihood' },
      { issue: 'Education Quality', severity: 80, impact: 'Limited higher education access' },
      { issue: 'Economic Opportunities', severity: 75, impact: 'Dependent on daily wage labor' },
      { issue: 'Traditional Knowledge Loss', severity: 70, impact: 'Youth disinterest in customs' },
      { issue: 'Health Infrastructure', severity: 68, impact: 'Distance to medical facilities' },
    ],
    aspirations: [
      { goal: 'Forest Rights Recognition', interest: 88, icon: '🌲' },
      { goal: 'Quality Education', interest: 90, icon: '📚' },
      { goal: 'Stable Employment', interest: 85, icon: '💼' },
      { goal: 'Healthcare Access', interest: 82, icon: '🏥' },
      { goal: 'Cultural Preservation', interest: 75, icon: '🎭' },
      { goal: 'Skill Development', interest: 80, icon: '🔧' },
    ]
  },
  'jaunsar': {
    id: 'jaunsar',
    name: 'Jaunsar',
    subtitle: 'Keepers of Ancient Traditions',
    location: 'Jaunsar-Bawar Region, Uttarakhand',
    description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
    heroImage: 'https://i.ibb.co/cXLq8cLK/home-Image-jaunsar.png',
    intro: 'The Jaunsar people inhabit the remote Jaunsar-Bawar region of Uttarakhand, maintaining one of India\'s most distinctive cultural identities. Known for their unique polyandrous family system and rich oral traditions, they represent a fascinating intersection of Himalayan culture and ancient customs.',
    sections: {
      history: {
        title: 'History & Origin',
        content: 'The Jaunsar people trace their ancestry to the Pandavas of the Mahabharata epic, maintaining cultural practices that reflect ancient Indo-Aryan traditions with Himalayan influences.'
      },
      lifestyle: {
        title: 'Lifestyle & Settlement',
        content: 'Jaunsar villages cling to mountain slopes, with traditional wooden houses featuring intricate carvings. Agriculture on terraced fields and animal husbandry form the economic backbone.'
      }
    },
    insights: [
      'The Jaunsar demonstrate how geographic isolation preserves cultural distinctiveness',
      'Changing marriage practices reflect broader negotiations with modernity and law'
    ],
    impact: 'Development interventions must respect cultural uniqueness while addressing infrastructure needs. Cultural documentation, sustainable tourism models, agricultural support, and education that values local knowledge alongside modern skills are essential.',
    timeline: [],
    lifestyle: { settlement: [], migration: {} },
    aspirations: []
  },
  'banjara': {
    id: 'banjara',
    name: 'Banjara',
    subtitle: 'Woven in Color',
    location: 'Multiple states (originally nomadic)',
    description: 'Nomadic traders whose vibrant culture moves with their journeys',
    heroImage: 'https://i.ibb.co/1JLjnks5/home-Image-Banjara.png',
    intro: 'The Banjara, also known as Lambani or Gormati, are one of India\'s most vibrant nomadic communities. Historically, they were traders and transporters who moved goods across the subcontinent.',
    sections: {
      history: {
        title: 'History & Origin',
        content: 'The Banjara have a rich history as nomadic merchants and grain traders who supplied armies and facilitated trade across medieval India.'
      },
      lifestyle: {
        title: 'Lifestyle & Settlement',
        content: 'While traditionally nomadic, most Banjara communities have now settled in permanent villages, primarily in Maharashtra, Andhra Pradesh, Karnataka, and Madhya Pradesh.'
      }
    },
    insights: [
      'The Banjara demonstrate how visual culture serves as powerful identity marker',
      'Transition from nomadism to settlement creates complex socio-economic challenges'
    ],
    impact: 'Supporting Banjara communities requires craft enterprise development, market linkages, educational initiatives, healthcare access, and cultural documentation.',
    timeline: [],
    lifestyle: { settlement: [], migration: {} },
    aspirations: []
  },
  'van-gujjar': {
    id: 'van-gujjar',
    name: 'Van Gujjar',
    subtitle: 'Guardians of the Forest',
    location: 'Uttarakhand, Himachal Pradesh',
    description: 'Forest dwellers balancing conservation challenges with traditional livelihoods',
    heroImage: 'https://i.ibb.co/k2cTvVkW/home-Image-Van-Gujjar.png',
    intro: 'The Van Gujjar are a pastoral community deeply connected to the Himalayan forests, practicing transhumance - seasonal migration between lowland winter settlements and high-altitude summer pastures.',
    sections: {
      history: {
        title: 'History & Origin',
        content: 'The Van Gujjar have practiced transhumant pastoralism for centuries, migrating seasonally with their buffalo herds between summer pastures in high-altitude forests and winter settlements in the plains.'
      },
      lifestyle: {
        title: 'Lifestyle & Settlement',
        content: 'Van Gujjar families undertake annual migrations, living in temporary huts called "chhaparas" made of bamboo and tarpaulin.'
      }
    },
    insights: [
      'The Van Gujjar embody complex relationships between conservation and traditional livelihoods',
      'Nomadic pastoralism requires ecological knowledge that modern systems often overlook'
    ],
    impact: 'Addressing Van Gujjar needs requires policy reform recognizing forest rights, mobile service delivery models for education and healthcare, fair trade mechanisms for dairy products, and conservation approaches that value traditional ecological knowledge.',
    timeline: [],
    lifestyle: { settlement: [], migration: {} },
    aspirations: []
  }
};