export interface Documentary {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: ('craft' | 'tribal' | 'nomadic' | 'heritage')[];
  thumbnail: string;
}

export const documentaries: Documentary[] = [
  {
    id: 'gadia-lohar-doc',
    title: 'Gadia Lohar: Forged in Fire',
    description: 'Iron artisans carrying 500 years of heritage amidst instability and strength',
    duration: '28 min',
    category: ['craft', 'nomadic'],
    thumbnail: 'https://i.ibb.co/KjkL7nDD/Story-Gadia-Lohar.png',
  },
  {
    id: 'bhoksa-doc',
    title: 'Bhoksa: Between Tradition and Tomorrow',
    description: 'A tribal community navigating modern challenges while preserving ancestral wisdom',
    duration: '32 min',
    category: ['tribal', 'heritage'],
    thumbnail: 'https://i.ibb.co/GfWM6s2n/Story-Bhoksa.png',
  },
  {
    id: 'jaunsar-doc',
    title: 'Jaunsar: Where Culture Breathes',
    description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
    duration: '35 min',
    category: ['heritage', 'tribal'],
    thumbnail: 'https://i.ibb.co/NggRrFk1/Story-jaunsar.png',
  },
  {
    id: 'banjara-doc',
    title: 'Banjara: Lives That Speak',
    description: 'Nomadic traders whose vibrant culture moves with their journeys',
    duration: '30 min',
    category: ['nomadic', 'craft', 'heritage'],
    thumbnail: 'https://images.unsplash.com/photo-1759459295621-50110405a4bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub21hZGljJTIwcGVvcGxlJTIwaW5kaWF8ZW58MXx8fHwxNzY2MTUxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'van-gujjar-doc',
    title: 'Van Gujjar: Beyond Survival',
    description: 'Forest dwellers balancing conservation challenges with traditional livelihoods',
    duration: '38 min',
    category: ['nomadic', 'heritage'],
    thumbnail: 'https://images.unsplash.com/photo-1745988583865-2249654d864c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzY2MTUxMjAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];