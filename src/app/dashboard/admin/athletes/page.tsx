'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

type UserRow = {
  id: string; email: string; name: string; firstName?: string; lastName?: string;
  points: number; rank?: string; city?: string; phone?: string; birthDate?: string;
};

export default function AdminAthletesPage() {
  const [athletes, setAthletes] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/public/athletes')
      .then(r => r.json())
      .then(data => { setAthletes(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = athletes.filter(a => {
    const q = search.toLowerCase();
    return (a.name ?? '').toLowerCase().includes(q) ||
      (a.email ?? '').toLowerCase().includes(q) ||
      (a.city ?? '').toLowerCase().includes(q);
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Спортсмены</h1>
          <p>Все зарегистрированные атлеты</p>
        </div>

        <div className="content-card" style={{ marginBottom: 16 }}>
          <div className="form-input-wrapper" style={{ maxWidth: 400 }}>
            <i className="bi bi-search"></i>
            <input className="form-input" placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Загрузка...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--border-color)' }}>
                  {['#', 'Спортсмен', 'Email', 'Город', 'Дата рождения', 'Баллы', 'Ранг'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => (
                  <tr key={a.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{idx + 1}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: 'var(--accent-color)', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700, flexShrink: 0,
                        }}>
                          {(a.firstName?.[0] ?? a.name?.[0] ?? '?').toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{a.name ?? '—'}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>ID: {a.id.slice(0, 6).toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{a.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{a.city ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{a.birthDate ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                        {a.points}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{a.rank ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Спортсмены не найдены</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
