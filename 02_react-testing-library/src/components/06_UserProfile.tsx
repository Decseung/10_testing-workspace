'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

const fetchUser = async (userId: number): Promise<User> => {
  const response = await fetch(`http://localhost:8080/users/${userId}`);
  if(!response.ok) {
    throw new Error('사용자를 찾을 수 없습니다');
  }
  const data = await response.json();
  return data;
};

interface UserProfileProps {
  userId: number;
}

// 비동기 컴포넌트
export default function UserProfile({ userId }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 border rounded-lg" data-testid="loading">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50" role="alert">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-4">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={`${user.name}의 프로필 사진`}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

