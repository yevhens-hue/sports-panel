'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

type Athlete = { id: string; name: string; email: string; points: number };

export default function AwardPointsPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [amount, setAmount] = useState('3');
  const [type, setType] = useState('Тренировка');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/coach/athletes').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setAthletes(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!selectedId) { setError('Выберите спортсмена'); return; }
    const pts = parseInt(amount);
    if (!pts || pts <= 0) { setError('Укажите корректное количество баллов'); return; }
    setLoading(true);

    const res = await fetch('/api/coach/award-points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ athleteId: selectedId, amount: pts, type }),
    });

    setLoading(false);
    if (res.ok) {
      const athlete = athletes.find(a => a.id === selectedId);
      setSuccess(`Успешно начислено ${pts} баллов для ${athlete?.name ?? 'спортсмена'}!`);
      setAthletes(prev => prev.map(a => a.id === selectedId ? { ...a, points: a.points + pts } : a));
      setAmount('3');
    } else {
      setError('Ошибка при начислении баллов');
    }
  };

  const selectedAthlete = athletes.find(a => a.id === selectedId);

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Начислить баллы</h1>
          <p>Начислите баллы спортсмену за тренировку или достижение</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
          {/* Form */}
          <div className="content-card">
            {success && (
              <div style={{
                background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 10,
                padding: '12px 16px', marginBottom: 20, color: '#15803d', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <i className="bi bi-check-circle-fill"></i> {success}
              </div>
            )}
            {error && (
              <div style={{
                background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 10,
                padding: '12px 16px', marginBottom: 20, color: '#dc2626', fontWeight: 500,
              }}>
                <i className="bi bi-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-group">
                <label className="form-label">Спортсмен *</label>
                <select className="form-input" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                  <option value="">— Выберите спортсмена —</option>
                  {athletes.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.points} баллов)</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Тип начисления *</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['Тренировка', 'Соревнование', 'Бонус', 'Медицинский осмотр', 'Спортивное достижение'].map(t => (
                    <button
                      key={t} type="button"
                      onClick={() => setType(t)}
                      style={{
                        padding: '8px 14px', borderRadius: 20, border: '1.5px solid',
                        fontSize: 13, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500,
                        background: type === t ? 'var(--accent-color)' : 'white',
                        borderColor: type === t ? 'var(--accent-color)' : 'var(--border-color)',
                        color: type === t ? 'white' : 'var(--text-primary)',
                      }}
                    >{t}</button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Количество баллов *</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {[1, 2, 3, 5, 10].map(n => (
                    <button
                      key={n} type="button"
                      onClick={() => setAmount(String(n))}
                      style={{
                        width: 48, height: 48, borderRadius: 12, border: '1.5px solid',
                        fontSize: 15, cursor: 'pointer', transition: 'all 0.2s', fontWeight: 700,
                        background: amount === String(n) ? 'var(--accent-color)' : 'white',
                        borderColor: amount === String(n) ? 'var(--accent-color)' : 'var(--border-color)',
                        color: amount === String(n) ? 'white' : 'var(--text-primary)',
                      }}
                    >{n}</button>
                  ))}
                  <input
                    type="number" min="1" max="100"
                    className="form-input" placeholder="Другое"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    style={{ maxWidth: 120 }}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: 'flex-start', padding: '12px 32px', fontSize: 15 }}>
                {loading ? 'Начисление...' : <><i className="bi bi-plus-circle-fill"></i>&nbsp; Начислить баллы</>}
              </button>
            </form>
          </div>

          {/* Preview */}
          <div>
            {selectedAthlete ? (
              <div className="content-card">
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Предпросмотр</h3>
                <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'var(--accent-color)', color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, fontWeight: 700, margin: '0 auto 12px',
                  }}>
                    {(selectedAthlete.name?.[0] ?? '?').toUpperCase()}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedAthlete.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>{selectedAthlete.email}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--accent-color)' }}>{selectedAthlete.points}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Сейчас</div>
                    </div>
                    <div style={{ fontSize: 22, color: 'var(--text-secondary)', alignSelf: 'center' }}>→</div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#16a34a' }}>
                        {selectedAthlete.points + parseInt(amount || '0')}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>После</div>
                    </div>
                  </div>
                </div>
                <div style={{
                  background: '#f8f9fa', borderRadius: 10, padding: '10px 14px',
                  fontSize: 13, color: 'var(--text-secondary)',
                }}>
                  <div><strong>Тип:</strong> {type}</div>
                  <div><strong>+{amount} баллов</strong></div>
                </div>
              </div>
            ) : (
              <div className="content-card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px 20px' }}>
                <i className="bi bi-person-plus" style={{ fontSize: 40, display: 'block', marginBottom: 10 }}></i>
                Выберите спортсмена для предпросмотра
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
