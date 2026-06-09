'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ATHLETE', // default
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка при регистрации');
      }

      // Success
      router.push('/login?registered=true');
      router.refresh();
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

      <div className="auth-page">
        <div className="auth-form-card animate-fade-in">
          <div className="auth-form-header">
            <img src="https://panel.userswim.pro/assets/img/logo-2.jpg" alt="UserSwim Logo" />
            <div>
              <h4>Регистрация</h4>
              <p>Создайте новый аккаунт для доступа к платформе.</p>
            </div>
          </div>

          {error && <div className="error-box" style={{ marginBottom: 15 }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Имя</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    className="form-input"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Фамилия</label>
                <div className="form-input-wrapper">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    className="form-input"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Ваша фамилия"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Роль в системе</label>
              <div className="form-input-wrapper">
                <i className="bi bi-people"></i>
                <select 
                  className="form-input" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  required
                >
                  <option value="ATHLETE">Спортсмен</option>
                  <option value="PARENT">Родитель</option>
                  <option value="COACH">Тренер</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input-wrapper">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Пароль</label>
              <div className="form-input-wrapper">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Придумайте пароль"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Повторите пароль</label>
              <div className="form-input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  className="form-input"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Повторите пароль"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div style={{ marginTop: 10 }}>
              <button type="submit" className="btn-submit" disabled={loading}>
                <span>{loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}</span>
                {!loading && <i className="bi bi-arrow-right-circle-fill"></i>}
              </button>

              <div className="register-link" style={{ marginTop: 15 }}>
                <i className="bi bi-box-arrow-in-right"></i>
                <span>Уже есть аккаунт?</span>
                <Link href="/login">Войти</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
