'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useState } from 'react';

export default function SettingsPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (form.newPassword !== form.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (form.newPassword.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSuccess('Пароль успешно изменён!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
    }, 800);
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Настройки</h1>
          <p>Управление вашим аккаунтом.</p>
        </div>

        <div className="content-card" style={{ maxWidth: 500 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20 }}>Смена пароля</h3>

          {error && <div className="error-box" style={{ marginBottom: 16 }}>{error}</div>}
          {success && <div style={{ background: '#dcfce7', color: 'var(--success-color)', padding: '10px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16 }}>{success}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="form-group">
              <label className="form-label">Текущий пароль</label>
              <input type="password" className="form-input" name="currentPassword" value={form.currentPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Новый пароль</label>
              <input type="password" className="form-input" name="newPassword" value={form.newPassword} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Подтвердите новый пароль</label>
              <input type="password" className="form-input" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Сохранение...' : <><i className="bi bi-lock"></i> Изменить пароль</>}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
