'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';

type Athlete = {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  points: number;
  rank?: string;
  city?: string;
  phone?: string;
  birthDate?: string;
};

export default function AthletesPage() {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Athlete | null>(null);

  useEffect(() => {
    fetch('/api/coach/athletes')
      .then(r => r.json())
      .then(data => {
        setAthletes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = athletes.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.name ?? '').toLowerCase().includes(q) ||
      (a.email ?? '').toLowerCase().includes(q) ||
      (a.city ?? '').toLowerCase().includes(q)
    );
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мои спортсмены</h1>
          <p>Список всех спортсменов под вашим руководством</p>
        </div>

        {/* Search */}
        <div className="content-card" style={{ marginBottom: 16 }}>
          <div className="form-input-wrapper" style={{ maxWidth: 420 }}>
            <i className="bi bi-search"></i>
            <input
              className="form-input"
              placeholder="Поиск по имени, email или городу..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="content-card" style={{ padding: 0, overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              Загрузка...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <i className="bi bi-people" style={{ fontSize: 40, display: 'block', marginBottom: 10 }}></i>
              Спортсмены не найдены
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid var(--border-color)' }}>
                  {['#', 'Спортсмен', 'Email', 'Город', 'Баллы', 'Ранг', 'Действия'].map(h => (
                    <th key={h} style={{
                      padding: '12px 16px', textAlign: 'left', fontSize: 13,
                      fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
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
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>ID: {a.id.slice(0, 6).toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text-secondary)' }}>{a.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{a.city ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: '#dcfce7', color: '#16a34a',
                        padding: '3px 10px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                      }}>{a.points}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13 }}>{a.rank ?? '—'}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelected(a)}
                      >
                        <i className="bi bi-plus-circle"></i> Баллы
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Award points modal */}
        {selected && (
          <AwardPointsModal athlete={selected} onClose={() => setSelected(null)} onSuccess={(pts) => {
            setAthletes(prev => prev.map(a => a.id === selected.id ? { ...a, points: a.points + pts } : a));
            setSelected(null);
          }} />
        )}
      </div>
    </DashboardLayout>
  );
}

function AwardPointsModal({ athlete, onClose, onSuccess }: {
  athlete: Athlete;
  onClose: () => void;
  onSuccess: (pts: number) => void;
}) {
  const [amount, setAmount] = useState('3');
  const [type, setType] = useState('Тренировка');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const pts = parseInt(amount);
    if (!pts || pts <= 0) { setError('Укажите корректное количество баллов'); return; }
    setLoading(true);

    const res = await fetch('/api/coach/award-points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ athleteId: athlete.id, amount: pts, type }),
    });

    if (res.ok) {
      onSuccess(pts);
    } else {
      setError('Ошибка при начислении баллов');
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 32,
        width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Начислить баллы</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <div style={{ background: '#f8f9fa', borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
          <div style={{ fontWeight: 600 }}>{athlete.name}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{athlete.email}</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>
            Текущий баланс: <strong>{athlete.points} баллов</strong>
          </div>
        </div>

        {error && <div className="error-box" style={{ marginBottom: 16 }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Тип начисления</label>
            <select className="form-input" value={type} onChange={e => setType(e.target.value)}>
              <option>Тренировка</option>
              <option>Соревнование</option>
              <option>Бонус</option>
              <option>Медицинский осмотр</option>
              <option>Спортивное достижение</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Количество баллов</label>
            <input
              type="number" min="1" max="100"
              className="form-input"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Начисление...' : <><i className="bi bi-plus-circle"></i> Начислить</>}
            </button>
            <button type="button" className="btn btn-outline" onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
}
