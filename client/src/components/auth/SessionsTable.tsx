import React, { useEffect, useState } from 'react';

interface Session {
  id: string;
  deviceInfo: {
    browser?: string;
    os?: string;
    deviceType?: string;
  };
  ipAddress: string;
  location?: {
    country?: string;
    city?: string;
    region?: string;
  };
  lastUsedAt: string;
  isCurrent: boolean;
}

export function SessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sessions logic here
    const fetchSessions = async () => {
      // Mock for now until API is connected
      setSessions([
        {
          id: '1',
          deviceInfo: { browser: 'Chrome', os: 'Windows' },
          ipAddress: '192.168.1.1',
          lastUsedAt: new Date().toISOString(),
          isCurrent: true,
        },
      ]);
      setLoading(false);
    };
    
    fetchSessions();
  }, []);

  const handleRevoke = async (id: string) => {
    // await api.delete(`/auth/sessions/${id}`);
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handleRevokeAll = async () => {
    // await api.delete('/auth/sessions');
    setSessions(sessions.filter(s => s.isCurrent));
  };

  if (loading) {
    return <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Active Sessions</h3>
        <button
          onClick={handleRevokeAll}
          className="text-sm text-red-600 hover:text-red-500 font-medium"
        >
          Log out all other devices
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {sessions.map((session) => (
            <li key={session.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-indigo-600 truncate">
                      {session.deviceInfo?.browser} on {session.deviceInfo?.os}
                    </span>
                    {session.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current Session
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>IP: {session.ipAddress}</span>
                    {session.location?.city && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{session.location.city}, {session.location.country}</span>
                      </>
                    )}
                    <span className="mx-2">•</span>
                    <span>Last active: {new Date(session.lastUsedAt).toLocaleString()}</span>
                  </div>
                </div>
                
                {!session.isCurrent && (
                  <button
                    onClick={() => handleRevoke(session.id)}
                    className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Revoke
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
