'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function PointsPage() {
  const points = 9;
  const transactions = [
    { id: 1, type: 'Тренировка', date: '08.05.2026', source: 'Начислено тренером', amount: 3 },
    { id: 2, type: 'Тренировка', date: '11.05.2026', source: 'Начислено тренером', amount: 3 },
    { id: 3, type: 'Тренировка', date: '01.06.2026', source: 'Начислено тренером', amount: 3 },
  ];

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мои Баллы</h1>
        </div>

        <div className="content-card">
          <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>У Вас {points} баллов</p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Продолжайте в том же духе — за активность начисляются баллы, которые влияют на ваш рейтинг.
          </p>

          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>История начислений</h3>

          <div>
            {transactions.map(t => (
              <div key={t.id} className="points-item">
                <div className="points-dot"></div>
                <div className="points-item-info">
                  <strong>{t.type}</strong>
                  <div className="points-date">
                    <i className="bi bi-calendar3"></i>
                    <span>Дата выполнения</span>
                    <span style={{ background: '#f3f4f6', padding: '1px 8px', borderRadius: '4px', fontWeight: 500 }}>{t.date}</span>
                  </div>
                  <div><span className="points-badge-source">{t.source}</span></div>
                </div>
                <div className="points-amount">+{t.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
