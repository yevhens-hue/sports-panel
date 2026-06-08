'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const athleteMenu = [
  { href: '/dashboard', icon: 'bi-speedometer2', label: 'Инфопанель' },
  { href: '/dashboard/profile', icon: 'bi-person-circle', label: 'Мой профиль' },
  {
    label: 'Мой прогресс', icon: 'bi-graph-up', submenu: [
      { href: '/dashboard/level', icon: 'bi-trophy', label: 'Уровень' },
      { href: '/dashboard/points', icon: 'bi-coin', label: 'Мои баллы' },
      { href: '/dashboard/rating', icon: 'bi-bar-chart-line', label: 'Рейтинг' },
    ]
  },
  { href: '/dashboard/parents', icon: 'bi-people', label: 'Родители' },
  { href: '/dashboard/coach', icon: 'bi-person-badge', label: 'Тренер' },
  { href: '/dashboard/settings', icon: 'bi-gear', label: 'Настройки' },
];

const coachMenu = [
  { href: '/dashboard', icon: 'bi-speedometer2', label: 'Инфопанель' },
  { href: '/dashboard/profile', icon: 'bi-person-circle', label: 'Мой профиль' },
  { href: '/dashboard/athletes', icon: 'bi-people', label: 'Мои спортсмены' },
  { href: '/dashboard/award-points', icon: 'bi-plus-circle', label: 'Начислить баллы' },
  { href: '/dashboard/settings', icon: 'bi-gear', label: 'Настройки' },
];

const adminMenu = [
  { href: '/dashboard', icon: 'bi-speedometer2', label: 'Инфопанель' },
  {
    label: 'Пользователи', icon: 'bi-people', submenu: [
      { href: '/dashboard/admin/users', icon: 'bi-people-fill', label: 'Все пользователи' },
      { href: '/dashboard/admin/athletes', icon: 'bi-person-badge', label: 'Спортсмены' },
      { href: '/dashboard/admin/coaches', icon: 'bi-clipboard2-check', label: 'Тренеры' },
    ]
  },
  { href: '/dashboard/admin/points', icon: 'bi-coin', label: 'Начисления' },
  { href: '/dashboard/settings', icon: 'bi-gear', label: 'Настройки' },
];

const parentMenu = [
  { href: '/dashboard', icon: 'bi-speedometer2', label: 'Инфопанель' },
  { href: '/dashboard/profile', icon: 'bi-person-circle', label: 'Мой профиль' },
  { href: '/dashboard/my-children', icon: 'bi-person-hearts', label: 'Мои дети' },
  { href: '/dashboard/settings', icon: 'bi-gear', label: 'Настройки' },
];

const sponsorMenu = [
  { href: '/dashboard', icon: 'bi-speedometer2', label: 'Инфопанель' },
  { href: '/dashboard/profile', icon: 'bi-person-circle', label: 'Мой профиль' },
  { href: '/dashboard/sponsored', icon: 'bi-star', label: 'Подопечные' },
  { href: '/dashboard/settings', icon: 'bi-gear', label: 'Настройки' },
];

function getMenu(role: string) {
  switch (role) {
    case 'COACH': return coachMenu;
    case 'ADMIN': return adminMenu;
    case 'PARENT': return parentMenu;
    case 'SPONSOR': return sponsorMenu;
    default: return athleteMenu;
  }
}

type MenuItem = {
  href?: string;
  icon: string;
  label: string;
  submenu?: { href: string; icon: string; label: string }[];
};

function MenuLink({ item, pathname, onClick }: { item: MenuItem; pathname: string; onClick?: () => void }) {
  const [open, setOpen] = useState(item.submenu?.some(s => s.href === pathname) ?? false);

  if (item.submenu) {
    return (
      <div>
        <div
          className={`menu-group-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
        >
          <i className={`bi ${item.icon}`}></i>
          <span>{item.label}</span>
          <i className="bi bi-chevron-down chevron"></i>
        </div>
        {open && (
          <div className="submenu">
            {item.submenu.map(s => (
              <Link
                key={s.href}
                href={s.href}
                className={`menu-item${pathname === s.href ? ' active' : ''}`}
                onClick={onClick}
              >
                <i className={`bi ${s.icon}`}></i>
                {s.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href!}
      className={`menu-item${pathname === item.href ? ' active' : ''}`}
      onClick={onClick}
    >
      <i className={`bi ${item.icon}`}></i>
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = (session?.user as any)?.role ?? 'ATHLETE';
  const menu = getMenu(role);

  return (
    <>
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Roboto:wght@300;400;500;700&family=Lato:wght@400;700&display=swap" rel="stylesheet" />

      <div className={`sidebar${mobileOpen ? ' show' : ''}`}>
        <div className="sidebar-inner">
          <div className="sidebar-logo">
            <img src="https://panel.userswim.pro/assets/img/logo-2.jpg" alt="UserSwim" />
          </div>

          <div className="sidebar-label">Панель управления</div>

          <nav className="sidebar-menu">
            {menu.map((item, i) => (
              <MenuLink
                key={i}
                item={item}
                pathname={pathname}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>

          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="menu-item"
              style={{ color: 'var(--danger-color)' }}
            >
              <i className="bi bi-box-arrow-right" style={{ color: 'var(--danger-color)' }}></i>
              Выйти
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9998 }}
        />
      )}
    </>
  );
}
