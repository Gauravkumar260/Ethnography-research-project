export interface CommunityLocation {
    _id: string;
    name: string;
    slug: string;
    mapCoordinates?: {
        latitude: number;
        longitude: number;
    };
    location?: string;
    heroImage: string;
}

export interface Community {
    _id: string;
    name: string;
    slug: string;
    subtitle?: string;
    region: string;
    state: string;
    location?: string;
    mapCoordinates?: {
        latitude: number;
        longitude: number;
    };
    population?: string;
    language?: string;
    primaryLivelihood?: string;
    heroImage: string;
    thumbnail?: string;
    posterImage?: string;
    galleryImages?: string[];
    documentaryVideoUrl?: string;
    attire?: {
        gender?: string;
        upperGarment?: string;
        lowerGarment?: string;
        drape?: string;
        jewellery?: string;
        head?: string;
    };
    palette?: {
        primary?: string[];
        accents?: string[];
        background?: string;
        text?: string;
    };
    designNotes?: {
        style?: string;
        pose?: string;
        typography?: string;
    };
    intro?: string;
    description?: string;
    sections?: {
        history?: { title?: string; content?: string };
        lifestyle?: { title?: string; content?: string };
        craft?: { title?: string; content?: string };
        culture?: { title?: string; content?: string };
    };
    insights?: string[];
    futureDirection?: string;
    timeline?: Array<{ year?: string; event?: string; description?: string }>;
    statistics?: {
        settlement?: Array<{ label?: string; value?: number; icon?: string }>;
        migration?: Record<string, string>;
    };
    aspirations?: Array<{ goal?: string; interest?: number; icon?: string }>;
    researchCount: number;
    documentaryCount: number;
    status: 'active' | 'inactive';
    createdAt: string;
    updatedAt?: string;
}
