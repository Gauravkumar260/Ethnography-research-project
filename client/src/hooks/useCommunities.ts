
import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';

export interface Community {
  _id: string;
  name: string;
  slug: string;
  region: string;
  location?: string;
  heroImage?: string;
  description: string;
  subtitle?: string;
}

interface UseCommunitiesResult {
  communities: Community[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useCommunities = (): UseCommunitiesResult => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommunities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/communities');
      setCommunities(response.data.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch communities');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);

  return { communities, loading, error, refetch: fetchCommunities };
};
