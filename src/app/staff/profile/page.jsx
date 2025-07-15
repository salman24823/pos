'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StaffProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login'); // Redirect if not logged in
    }
  }, [status]);

  if (status === 'loading') return <div className="text-center py-10">Loading...</div>;

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-10">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">👤 Staff Profile</h1>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{user?.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{user?.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Role:</span>
            <span className="capitalize">{user?.role || 'staff'}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Joined On:</span>
            <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
