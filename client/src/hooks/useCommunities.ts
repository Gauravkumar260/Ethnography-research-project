import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Community {
  _id: string;
  name: string;
  slug: string;
  region: string;
  location?: string;
  heroImage: string;
  description: string;
  subtitle?: string;
}

interface UseCommunitiesResult {
  communities: Community[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCommunities(): UseCommunitiesResult {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/communities');
      setCommunities(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch communities:', err);
      setError('Unable to load community data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  return { communities, loading, error, refetch: fetchCommunities };
}
