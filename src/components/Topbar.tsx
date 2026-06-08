'use client';
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Topbar({ title }: { title?: string }) {
  const { data: session } = useSession();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const name = session?.user?.name ?? 'User';
  const email = session?.user?.email ?? '';
  const initials = name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <h5>{title || 'Панель управления'}</h5>
      </div>
      <div className="topbar-right">
        <i className="bi bi-bell topbar-icon"></i>
        <div style={{ position: 'relative' }} ref={dropRef}>
          <button className="profile-btn" onClick={() => setDropOpen(o => !o)}>
            <div className="profile-avatar">{initials}</div>
            <i className="bi bi-chevron-down" style={{ fontSize: '12px', color: 'var(--text-secondary)' }}></i>
          </button>
          {dropOpen && (
            <div className="profile-dropdown" style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', zIndex: 200 }}>
              <div className="dropdown-header">
                <strong>{name}</strong>
                <small>{email}</small>
              </div>
              <Link href="/dashboard/profile" className="dropdown-item" onClick={() => setDropOpen(false)}>
                <i className="bi bi-person"></i> Мой профиль
              </Link>
              <Link href="/dashboard/settings" className="dropdown-item" onClick={() => setDropOpen(false)}>
                <i className="bi bi-gear"></i> Настройки
              </Link>
              <div style={{ borderTop: '1px solid var(--border-color)' }} />
              <button
                className="dropdown-item text-danger"
                style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                <i className="bi bi-box-arrow-right"></i> Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
