"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Globe, Clock, Trash2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface Session {
  id: string;
  deviceInfo: { browser?: string; os?: string; deviceType?: string };
  ipAddress: string;
  location?: { country?: string; city?: string; region?: string };
  lastUsedAt: string;
  isCurrent: boolean;
}

export function SessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  useEffect(() => {
    // Mock fetch
    setTimeout(() => {
      setSessions([
        {
          id: '1',
          deviceInfo: { browser: 'Chrome', os: 'macOS', deviceType: 'desktop' },
          ipAddress: '192.168.1.1',
          location: { city: 'New York', country: 'US' },
          lastUsedAt: new Date().toISOString(),
          isCurrent: true,
        },
        {
          id: '2',
          deviceInfo: { browser: 'Safari', os: 'iOS', deviceType: 'mobile' },
          ipAddress: '10.0.0.12',
          location: { city: 'Boston', country: 'US' },
          lastUsedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          isCurrent: false,
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRevoke = async (id: string) => {
    setRevokingId(id);
    setTimeout(() => {
      setSessions(sessions.filter(s => s.id !== id));
      setRevokingId(null);
      toast.success("Session revoked successfully");
    }, 800);
  };

  const handleRevokeAll = async () => {
    toast.success("All other sessions revoked");
    setSessions(sessions.filter(s => s.isCurrent));
  };

  if (loading) {
    return (
      <div className="space-y-4 w-full">
        <div className="h-8 bg-muted animate-pulse rounded w-1/4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-muted animate-pulse rounded-lg border border-border"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold font-serif text-primary">Active Sessions</h3>
          <p className="text-sm text-muted-foreground mt-1">Manage devices currently logged into your account.</p>
        </div>
        <Button variant="destructive" onClick={handleRevokeAll} className="gap-2">
          <Trash2 className="w-4 h-4" /> Revoke All Others
        </Button>
      </div>

      <div className="bg-card shadow-sm border border-border rounded-xl overflow-hidden">
        <ul className="divide-y divide-border">
          {sessions.map((session) => (
            <li key={session.id} className="p-4 sm:px-6 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-full hidden sm:block">
                    {session.deviceInfo?.deviceType === 'mobile' ? 
                      <Smartphone className="w-6 h-6 text-primary" /> : 
                      <Monitor className="w-6 h-6 text-primary" />
                    }
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-foreground">
                        {session.deviceInfo?.browser} on {session.deviceInfo?.os}
                      </span>
                      {session.isCurrent && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <ShieldCheck className="w-3 h-3" /> Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        {session.location?.city ? `${session.location.city}, ${session.location.country}` : 'Unknown Location'} ({session.ipAddress})
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Last active: {new Date(session.lastUsedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                {!session.isCurrent && (
                  <div className="ml-4 flex-shrink-0">
                    {revokingId === session.id ? (
                      <Button variant="outline" disabled className="text-destructive border-destructive/30">
                        Revoking...
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => handleRevoke(session.id)} className="text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
                        Revoke
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
