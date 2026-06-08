'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function RatingPage() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мой Рейтинг</h1>
        </div>
        <div className="content-card">
          <p style={{ fontWeight: 600, marginBottom: '12px' }}>Рейтинг пока недоступен.</p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Продолжайте тренировки и активность — как только данных станет достаточно, он появится.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
