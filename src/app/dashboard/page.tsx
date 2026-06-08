'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const roleLabels: Record<string, string> = {
  ATHLETE: 'Спортсмен',
  COACH: 'Тренер',
  ADMIN: 'Администратор',
  PARENT: 'Родитель',
  SPONSOR: 'Спонсор',
};

// ─── Athlete Dashboard ───────────────────────────────────────────────
function AthleteDashboard({ user }: { user: any }) {
  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'Пользователь';
  return (
    <>
      <div className="page-header">
        <h1>Здравствуйте, {firstName}!</h1>
        <p>Добро пожаловать в вашу инфопанель.</p>
      </div>
      <div className="cards-grid">
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-person-badge"></i></div>
          <h3>Ваша роль</h3>
          <div className="card-value">Спортсмен</div>
        </div>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-key"></i></div>
          <h3>Ваш ID</h3>
          <div className="card-value">{(user?.id ?? '——').slice(0, 6).toUpperCase()}</div>
        </div>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-wallet2"></i></div>
          <h3>Текущий баланс</h3>
          <div className="card-value">{user?.points ?? 0} баллов</div>
        </div>
        <Link href="/dashboard/points" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-clock-history"></i></div>
            <h3>История начислений</h3>
            <p>Посмотреть все начисления и списания баллов.</p>
          </div>
        </Link>
      </div>
    </>
  );
}

// ─── Coach Dashboard ──────────────────────────────────────────────────
function CoachDashboard({ user }: { user: any }) {
  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'Тренер';
  return (
    <>
      <div className="page-header">
        <h1>Здравствуйте, {firstName}!</h1>
        <p>Добро пожаловать в панель тренера.</p>
      </div>
      <div className="cards-grid">
        <Link href="/dashboard/athletes" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-people-fill"></i></div>
            <h3>Мои спортсмены</h3>
            <div className="card-value">—</div>
            <p>Управление учениками</p>
          </div>
        </Link>
        <Link href="/dashboard/award-points" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-plus-circle-fill"></i></div>
            <h3>Начислить баллы</h3>
            <p>Добавить баллы спортсмену за тренировку</p>
          </div>
        </Link>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-calendar-check"></i></div>
          <h3>Мои баллы</h3>
          <div className="card-value">{user?.points ?? 0}</div>
          <p>Начислено за этот период</p>
        </div>
        <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-person-circle"></i></div>
            <h3>Мой профиль</h3>
            <p>Редактировать информацию о себе</p>
          </div>
        </Link>
      </div>
    </>
  );
}

// ─── Parent Dashboard ─────────────────────────────────────────────────
function ParentDashboard({ user }: { user: any }) {
  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'Родитель';
  return (
    <>
      <div className="page-header">
        <h1>Здравствуйте, {firstName}!</h1>
        <p>Добро пожаловать в родительский кабинет.</p>
      </div>
      <div className="cards-grid">
        <Link href="/dashboard/my-children" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-person-hearts"></i></div>
            <h3>Мои дети</h3>
            <p>Просмотр прогресса ваших детей-спортсменов</p>
          </div>
        </Link>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-wallet2"></i></div>
          <h3>Мои баллы</h3>
          <div className="card-value">{user?.points ?? 0}</div>
        </div>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-bell-fill"></i></div>
          <h3>Уведомления</h3>
          <p>Следите за активностью ваших детей</p>
        </div>
        <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-person-circle"></i></div>
            <h3>Мой профиль</h3>
            <p>Редактировать личную информацию</p>
          </div>
        </Link>
      </div>
    </>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────
function AdminDashboard({ user }: { user: any }) {
  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'Администратор';
  return (
    <>
      <div className="page-header">
        <h1>Здравствуйте, {firstName}!</h1>
        <p>Панель администратора системы.</p>
      </div>
      <div className="cards-grid">
        <Link href="/dashboard/admin/users" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-people-fill"></i></div>
            <h3>Пользователи</h3>
            <p>Управление аккаунтами</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/athletes" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-person-badge"></i></div>
            <h3>Спортсмены</h3>
            <p>Список всех атлетов</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/coaches" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-clipboard2-check"></i></div>
            <h3>Тренеры</h3>
            <p>Управление тренерским составом</p>
          </div>
        </Link>
        <Link href="/dashboard/admin/points" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-coin"></i></div>
            <h3>Начисления</h3>
            <p>История всех баллов</p>
          </div>
        </Link>
      </div>
    </>
  );
}

// ─── Sponsor Dashboard ────────────────────────────────────────────────
function SponsorDashboard({ user }: { user: any }) {
  const firstName = user?.firstName ?? user?.name?.split(' ')[0] ?? 'Спонсор';
  return (
    <>
      <div className="page-header">
        <h1>Здравствуйте, {firstName}!</h1>
        <p>Добро пожаловать в кабинет спонсора.</p>
      </div>
      <div className="cards-grid">
        <Link href="/dashboard/sponsored" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-star-fill"></i></div>
            <h3>Подопечные</h3>
            <p>Просмотр спонсируемых спортсменов</p>
          </div>
        </Link>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-wallet2"></i></div>
          <h3>Мои баллы</h3>
          <div className="card-value">{user?.points ?? 0}</div>
        </div>
        <div className="dashboard-card">
          <div className="icon-wrapper"><i className="bi bi-graph-up-arrow"></i></div>
          <h3>Статистика</h3>
          <p>Показатели и отчёты</p>
        </div>
        <Link href="/dashboard/profile" style={{ textDecoration: 'none' }}>
          <div className="dashboard-card" style={{ cursor: 'pointer' }}>
            <div className="icon-wrapper"><i className="bi bi-person-circle"></i></div>
            <h3>Мой профиль</h3>
            <p>Редактировать информацию</p>
          </div>
        </Link>
      </div>
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const role = user?.role ?? 'ATHLETE';

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        {role === 'COACH'   && <CoachDashboard user={user} />}
        {role === 'PARENT'  && <ParentDashboard user={user} />}
        {role === 'ADMIN'   && <AdminDashboard user={user} />}
        {role === 'SPONSOR' && <SponsorDashboard user={user} />}
        {(role === 'ATHLETE' || !role) && <AthleteDashboard user={user} />}
      </div>
    </DashboardLayout>
  );
}
