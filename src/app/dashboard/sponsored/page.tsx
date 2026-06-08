'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type AthleteInfo = {
  id: string;
  name: string;
  email: string;
  points: number;
  rank?: string;
  city?: string;
};

export default function SponsoredPage() {
  const { data: session } = useSession();
  const [athletes, setAthletes] = useState<AthleteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sponsors see all athletes in a read-only mode
    fetch('/api/public/athletes')
      .then(r => r.json())
      .then(data => {
        setAthletes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Подопечные спортсмены</h1>
          <p>Список спортсменов в нашем клубе</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Загрузка...</div>
        ) : athletes.length === 0 ? (
          <div className="content-card" style={{ textAlign: 'center', padding: '60px' }}>
            <i className="bi bi-star" style={{ fontSize: 50, color: 'var(--accent-color)', display: 'block', marginBottom: 16 }}></i>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Нет данных</h2>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {athletes.map((a, i) => (
              <div key={a.id} className="content-card" style={{ textAlign: 'center', padding: 24 }}>
                {/* Rank badge */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: 70, height: 70, borderRadius: '50%',
                    background: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7c2f' : 'var(--accent-color)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, fontWeight: 700, margin: '0 auto 14px',
                  }}>
                    {(a.name?.[0] ?? '?').toUpperCase()}
                  </div>
                  {i < 3 && (
                    <div style={{
                      position: 'absolute', top: 0, right: 'calc(50% - 50px)',
                      background: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#cd7c2f',
                      color: 'white', borderRadius: '50%',
                      width: 22, height: 22, fontSize: 12, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>#{i + 1}</div>
                  )}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{a.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>{a.city ?? '—'}</p>
                <div style={{
                  display: 'inline-block', background: '#dcfce7', color: '#16a34a',
                  padding: '4px 16px', borderRadius: 20, fontWeight: 700, fontSize: 15,
                }}>
                  {a.points} баллов
                </div>
                {a.rank && (
                  <div style={{ marginTop: 8, fontSize: 12, color: 'var(--text-secondary)' }}>{a.rank}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
