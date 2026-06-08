'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type UserRow = {
  id: string; email: string; name: string; firstName?: string; lastName?: string;
  role: string; points: number; rank?: string; city?: string; phone?: string;
  birthDate?: string; createdAt: string;
};

const ROLE_LABELS: Record<string, string> = {
  ATHLETE: 'Спортсмен', COACH: 'Тренер', ADMIN: 'Администратор',
  PARENT: 'Родитель', SPONSOR: 'Спонсор',
};

const ROLE_COLORS: Record<string, string> = {
  ATHLETE: '#3b82f6', COACH: '#10b981', ADMIN: '#ef4444',
  PARENT: '#8b5cf6', SPONSOR: '#f59e0b',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [editUser, setEditUser] = useState<UserRow | null>(null);

  const load = () => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = (u.name ?? '').toLowerCase().includes(q) ||
      (u.email ?? '').toLowerCase().includes(q) ||
      (u.city ?? '').toLowerCase().includes(q);
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchQ && matchRole;
  });

  const stats = {
    total: users.length,
    athletes: users.filter(u => u.role === 'ATHLETE').length,
    coaches: users.filter(u => u.role === 'COACH').length,
    parents: users.filter(u => u.role === 'PARENT').length,
    sponsors: users.filter(u => u.role === 'SPONSOR').length,
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Управление пользователями</h1>
          <p>Все аккаунты в системе</p>
        </div>

        {/* Stats row */}
        <div className="cards-grid" style={{ marginBottom: 20 }}>
          {[
            { label: 'Всего', value: stats.total, icon: 'bi-people-fill', color: '#1f3a5f' },
            { label: 'Спортсменов', value: stats.athletes, icon: 'bi-person-badge', color: '#3b82f6' },
            { label: 'Тренеров', value: stats.coaches, icon: 'bi-clipboard2-check', color: '#10b981' },
            { label: 'Родителей', value: stats.parents, icon: 'bi-person-hearts', color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} className="dashboard-card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: 18 }}></i>
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="content-card" style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="form-input-wrapper" style={{ flex: '1 1 280px' }}>
            <i className="bi bi-search"></i>
            <input className="form-input" placeholder="Поиск по имени, email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['ALL', 'ATHLETE', 'COACH', 'PARENT', 'SPONSOR', 'ADMIN'].map(r => (
              <button
                key={r} onClick={() => setRoleFilter(r)}
                style={{
                  padding: '7px 14px', borderRadius: 20, border: '1.5px solid',
                  fontSize: 12, cursor: 'pointer', fontWeight: 500, transition: 'all 0.2s',
                  background: roleFilter === r ? 'var(--accent-color)' : 'white',
                  borderColor: roleFilter === r ? 'var(--accent-color)' : 'var(--border-color)',
                  color: roleFilter === r ? 'white' : 'var(--text-primary)',
                }}
              >
                {r === 'ALL' ? 'Все' : ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Загрузка...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--border-color)' }}>
                    {['#', 'Пользователь', 'Email', 'Роль', 'Город', 'Баллы', 'Ранг', 'Действия'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px', textAlign: 'left', fontSize: 12,
                        fontWeight: 700, color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                        textTransform: 'uppercase', letterSpacing: '0.5px',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, idx) => (
                    <tr key={u.id}
                      style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{idx + 1}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: ROLE_COLORS[u.role] ?? '#999', color: 'white',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 700, flexShrink: 0,
                          }}>
                            {(u.firstName?.[0] ?? u.name?.[0] ?? '?').toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name ?? '—'}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>ID: {u.id.slice(0, 8).toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{u.email}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: (ROLE_COLORS[u.role] ?? '#999') + '20',
                          color: ROLE_COLORS[u.role] ?? '#999',
                          padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                        }}>{ROLE_LABELS[u.role] ?? u.role}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13 }}>{u.city ?? '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          background: '#dcfce7', color: '#16a34a',
                          padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                        }}>{u.points}</span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--text-secondary)' }}>{u.rank ?? '—'}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            onClick={() => setEditUser(u)}
                            style={{
                              padding: '5px 10px', borderRadius: 8, border: '1px solid var(--border-color)',
                              cursor: 'pointer', fontSize: 12, background: 'white', transition: 'all 0.2s',
                            }}
                            title="Редактировать"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  Пользователи не найдены
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editUser && (
        <AdminEditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={() => { load(); setEditUser(null); }}
        />
      )}
    </DashboardLayout>
  );
}

function AdminEditModal({ user, onClose, onSave }: { user: UserRow; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    role: user.role, points: String(user.points), rank: user.rank ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: form.role, points: parseInt(form.points), rank: form.rank }),
    });
    setLoading(false);
    if (res.ok) { setSuccess(true); setTimeout(onSave, 800); }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 32,
        width: '100%', maxWidth: 460, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Редактировать пользователя</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
          <div style={{ fontWeight: 600 }}>{user.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.email}</div>
        </div>

        {success && (
          <div style={{ background: '#dcfce7', color: '#15803d', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontWeight: 500 }}>
            <i className="bi bi-check-circle"></i> Сохранено!
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Роль</label>
            <select className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
              {Object.entries(ROLE_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Баллы</label>
            <input type="number" className="form-input" value={form.points} onChange={e => setForm(f => ({ ...f, points: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Ранг</label>
            <input type="text" className="form-input" value={form.rank} onChange={e => setForm(f => ({ ...f, rank: e.target.value }))} placeholder="Напр: III дорослий розряд" />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleSave} disabled={loading} className="btn btn-primary" style={{ flex: 1 }}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
            <button onClick={onClose} className="btn btn-outline">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
}
