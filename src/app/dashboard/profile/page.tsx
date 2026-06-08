'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import ImageUploadButton from '@/components/ImageUploadButton';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const user = session?.user as any;
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    city: '',
    birthDate: '',
    gender: 'Мужской',
    height: '',
    weight: '',
    newEmail: '',
    lastMedical: '',
    avatar: '',
    teamPhoto: '',
  });

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        patronymic: user.patronymic ?? '',
        phone: user.phone ?? '',
        city: user.city ?? '',
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        gender: user.gender ?? 'Мужской',
        height: user.height?.toString() ?? '',
        weight: user.weight?.toString() ?? '',
        avatar: user.avatar ?? '',
        teamPhoto: user.teamPhoto ?? '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await updateSession();
        alert('Профиль успешно обновлен!');
        router.refresh();
      } else {
        alert('Ошибка при сохранении');
      }
    } catch (e) {
      alert('Ошибка при сохранении');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мой Профиль</h1>
          <p>Обновите информацию о вашем аккаунте.</p>
        </div>

        {/* Photos */}
        <div className="content-card">
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            <ImageUploadButton 
              label="Фото профиля" 
              icon="bi-person-fill"
              currentUrl={form.avatar}
              onUploadSuccess={(url) => setForm(f => ({ ...f, avatar: url }))}
            />
            <ImageUploadButton 
              label="Фото команды" 
              icon="bi-people-fill"
              width={180}
              currentUrl={form.teamPhoto}
              onUploadSuccess={(url) => setForm(f => ({ ...f, teamPhoto: url }))}
            />
          </div>
        </div>

        {/* Main Info */}
        <div className="content-card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Мой email</label>
              <input className="form-input" value={user?.email ?? ''} disabled />
            </div>
            <div className="form-group">
              <label className="form-label">Баллы</label>
              <input className="form-input" value={user?.points ?? 0} disabled />
            </div>
            <div className="form-group">
              <label className="form-label">Ранг</label>
              <input className="form-input" value={user?.rank ?? '—'} disabled />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Имя</label>
              <input className="form-input" name="firstName" value={form.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Фамилия</label>
              <input className="form-input" name="lastName" value={form.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Отчество</label>
              <input className="form-input" name="patronymic" value={form.patronymic} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Телефон</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="form-input" value="+38" disabled style={{ width: 60 }} />
                <input className="form-input" name="phone" value={form.phone} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Город</label>
              <input className="form-input" name="city" value={form.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Дата рождения</label>
              <input className="form-input" type="date" name="birthDate" value={form.birthDate} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Пол</label>
              <select className="form-input" name="gender" value={form.gender} onChange={handleChange}>
                <option>Мужской</option>
                <option>Женский</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Рост</label>
              <input className="form-input" name="height" value={form.height} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Вес</label>
              <input className="form-input" name="weight" value={form.weight} onChange={handleChange} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <div className="form-group">
              <label className="form-label">Адрес Новой Почты</label>
              <input className="form-input" name="newEmail" value={form.newEmail} onChange={handleChange} placeholder="Введите адрес" />
            </div>
            <div className="form-group">
              <label className="form-label">Дата последнего медосмотра</label>
              <input className="form-input" type="date" name="lastMedical" value={form.lastMedical} onChange={handleChange} />
            </div>
          </div>

          <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
              <i className="bi bi-check2 me-2"></i>
            )}
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
