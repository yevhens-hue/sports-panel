'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function LevelPage() {
  const currentLevel = { name: 'Blue Dolphin Rank III', badge: 'III rank', rankLabel: 'III дорослий розряд' };
  const nextLevel = { name: 'Blue Dolphin Rank II', badge: 'II rank' };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мой Уровень</h1>
        </div>

        <div className="content-card">
          <p style={{ fontWeight: 600, marginBottom: '16px' }}>Ваш текущий уровень:</p>
          <div className="level-card">
            <div style={{
              width: 200, height: 140, borderRadius: 12,
              background: 'linear-gradient(135deg, #1e88e5, #0d47a1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 36, fontWeight: 700 }}>III</div>
                <div style={{ fontSize: 14 }}>rank</div>
              </div>
            </div>
            <div className="level-badge">{currentLevel.name}</div>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', marginTop: '8px' }}>
            Продолжайте тренироваться, чтобы повысить свой уровень.
          </p>

          <p style={{ fontWeight: 600, marginBottom: '16px' }}>Сдедующий уровень:</p>
          <div className="level-card">
            <div style={{
              width: 200, height: 140, borderRadius: 12,
              background: 'linear-gradient(135deg, #29b6f6, #0277bd)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden', opacity: 0.8
            }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <div style={{ fontSize: 36, fontWeight: 700 }}>II</div>
                <div style={{ fontSize: 14 }}>rank</div>
              </div>
            </div>
            <div className="level-badge">{nextLevel.name}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
