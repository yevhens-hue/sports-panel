'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function DashboardLayout({ children, title }: { children: ReactNode; title?: string }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ color: 'var(--text-secondary)' }}>Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-area">
        <Topbar title={title} />
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  );
}
