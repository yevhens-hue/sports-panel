'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

type Coach = {
  id: string; email: string; name: string; city?: string; phone?: string; points: number;
};

export default function AdminCoachesPage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(r => r.json())
      .then((data: any[]) => {
        setCoaches(data.filter(u => u.role === 'COACH'));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Тренеры</h1>
          <p>Список тренерского состава</p>
        </div>

        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Загрузка...</div>
          ) : coaches.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>Тренеры не найдены</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--border-color)' }}>
                  {['#', 'Тренер', 'Email', 'Город', 'Телефон', 'Баллы'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coaches.map((c, idx) => (
                  <tr key={c.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{idx + 1}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: '50%',
                          background: '#10b981', color: 'white',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, flexShrink: 0,
                        }}>
                          {(c.name?.[0] ?? '?').toUpperCase()}
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name ?? '—'}</div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{c.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{c.city ?? '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{c.phone ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#dcfce7', color: '#16a34a', padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                        {c.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
