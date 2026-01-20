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
    thumbnail: 'https://images.unsplash.com/photo-1748640773152-a5c24b000d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwYmxhY2tzbWl0aCUyMGZpcmV8ZW58MXx8fHwxNzY2MTUxMTk5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'bhoksa-doc',
    title: 'Bhoksa: Between Tradition and Tomorrow',
    description: 'A tribal community navigating modern challenges while preserving ancestral wisdom',
    duration: '32 min',
    category: ['tribal', 'heritage'],
    thumbnail: 'https://images.unsplash.com/photo-1759738103333-1c836a32f848?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBjb21tdW5pdHklMjBpbmRpYXxlbnwxfHx8fDE3NjYxNTExOTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'jaunsar-doc',
    title: 'Jaunsar: Where Culture Breathes',
    description: 'Himalayan communities with unique polyandrous traditions and rich folklore',
    duration: '35 min',
    category: ['heritage', 'tribal'],
    thumbnail: 'https://images.unsplash.com/photo-1738482223848-008ac3110276?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjB2aWxsYWdlJTIwY3VsdHVyZXxlbnwxfHx8fDE3NjYxNTEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
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