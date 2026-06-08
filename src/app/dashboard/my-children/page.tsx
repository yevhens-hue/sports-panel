'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type AthleteInfo = {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  points: number;
  rank?: string;
  city?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  transactions: { type: string; amount: number; date: string; source: string }[];
};

export default function MyChildrenPage() {
  const { data: session } = useSession();
  const [children, setChildren] = useState<AthleteInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/parent/children')
      .then(r => r.json())
      .then(data => {
        setChildren(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мои дети</h1>
          <p>Информация о ваших детях-спортсменах</p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Загрузка...</div>
        )}

        {!loading && children.length === 0 && (
          <div className="content-card" style={{ textAlign: 'center', padding: '60px' }}>
            <i className="bi bi-person-hearts" style={{ fontSize: 50, color: 'var(--accent-color)', display: 'block', marginBottom: 16 }}></i>
            <h2 style={{ fontSize: 18, marginBottom: 8 }}>Нет привязанных детей</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Обратитесь к тренеру или администратору для привязки</p>
          </div>
        )}

        {children.map(child => (
          <ChildCard key={child.id} child={child} />
        ))}
      </div>
    </DashboardLayout>
  );
}

function ChildCard({ child }: { child: AthleteInfo }) {
  const [tab, setTab] = useState<'info' | 'points'>('info');

  return (
    <div className="content-card" style={{ marginBottom: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--border-color)' }}>
        <div style={{
          width: 60, height: 60, borderRadius: '50%',
          background: 'var(--accent-color)', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, fontWeight: 700,
        }}>
          {(child.firstName?.[0] ?? child.name?.[0] ?? '?').toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 2 }}>{child.name}</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{child.email}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-color)' }}>{child.points}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>баллов</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {(['info', 'points'] as const).map(t => (
          <button
            key={t} onClick={() => setTab(t)}
            style={{
              padding: '8px 20px', borderRadius: 20, border: '1.5px solid',
              cursor: 'pointer', fontSize: 13, fontWeight: 500, transition: 'all 0.2s',
              background: tab === t ? 'var(--accent-color)' : 'white',
              borderColor: tab === t ? 'var(--accent-color)' : 'var(--border-color)',
              color: tab === t ? 'white' : 'var(--text-primary)',
            }}
          >
            {t === 'info' ? '📋 Профиль' : '🏆 Баллы'}
          </button>
        ))}
      </div>

      {tab === 'info' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          <InfoItem label="Имя" value={child.firstName ?? '—'} />
          <InfoItem label="Фамилия" value={child.lastName ?? '—'} />
          <InfoItem label="Город" value={child.city ?? '—'} />
          <InfoItem label="Дата рождения" value={child.birthDate ?? '—'} />
          <InfoItem label="Телефон" value={child.phone ?? '—'} />
          <InfoItem label="Ранг" value={child.rank ?? '—'} />
        </div>
      )}

      {tab === 'points' && (
        <div>
          {!child.transactions || child.transactions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
              История баллов пуста
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {child.transactions.map((tx, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', background: '#f8f9fa', borderRadius: 10,
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: tx.amount >= 0 ? '#22c55e' : '#ef4444', flexShrink: 0,
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{tx.type}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      📅 Дата выполнения &nbsp;{tx.date} &nbsp;
                      <span style={{
                        background: '#bbf7d0', color: '#15803d',
                        padding: '2px 8px', borderRadius: 10, fontSize: 11,
                      }}>{tx.source}</span>
                    </div>
                  </div>
                  <span style={{
                    background: tx.amount >= 0 ? '#dcfce7' : '#fee2e2',
                    color: tx.amount >= 0 ? '#16a34a' : '#dc2626',
                    padding: '4px 12px', borderRadius: 20, fontWeight: 700, fontSize: 14,
                  }}>
                    {tx.amount >= 0 ? '+' : ''}{tx.amount}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  );
}
