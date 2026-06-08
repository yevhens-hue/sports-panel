'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

type TxRow = {
  id: string; type: string; amount: number; date: string; source: string;
  user: { name: string; email: string; role: string };
};

export default function AdminPointsPage() {
  const [transactions, setTransactions] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/admin/transactions')
      .then(r => r.json())
      .then(data => { setTransactions(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = transactions.filter(t => {
    const q = search.toLowerCase();
    return (t.user?.name ?? '').toLowerCase().includes(q) ||
      (t.type ?? '').toLowerCase().includes(q) ||
      (t.source ?? '').toLowerCase().includes(q);
  });

  const totalPlus = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>История начислений</h1>
          <p>Все транзакции баллов в системе</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
          <div className="content-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Всего транзакций</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--heading-color)' }}>{transactions.length}</div>
          </div>
          <div className="content-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Начислено баллов</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#16a34a' }}>+{totalPlus}</div>
          </div>
          <div className="content-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Показано</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--heading-color)' }}>{filtered.length}</div>
          </div>
        </div>

        {/* Search */}
        <div className="content-card" style={{ marginBottom: 16 }}>
          <div className="form-input-wrapper" style={{ maxWidth: 400 }}>
            <i className="bi bi-search"></i>
            <input className="form-input" placeholder="Поиск по пользователю, типу..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Table */}
        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Загрузка...</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--border-color)' }}>
                  {['#', 'Пользователь', 'Тип', 'Дата', 'Источник', 'Баллы'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left', fontSize: 12,
                      fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '11px 16px', color: 'var(--text-secondary)', fontSize: 13 }}>{i + 1}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{t.user?.name ?? '—'}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{t.user?.email}</div>
                    </td>
                    <td style={{ padding: '11px 16px', fontSize: 13 }}>{t.type}</td>
                    <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{t.date}</td>
                    <td style={{ padding: '11px 16px' }}>
                      <span style={{
                        background: '#bbf7d0', color: '#15803d',
                        padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500,
                      }}>{t.source}</span>
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <span style={{
                        background: t.amount >= 0 ? '#dcfce7' : '#fee2e2',
                        color: t.amount >= 0 ? '#16a34a' : '#dc2626',
                        padding: '4px 12px', borderRadius: 20, fontWeight: 700, fontSize: 14,
                      }}>
                        {t.amount >= 0 ? '+' : ''}{t.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Транзакции не найдены</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
