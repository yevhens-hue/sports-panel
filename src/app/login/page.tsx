'use client';
import { signIn } from 'next-auth/react';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Неверный email или пароль.');
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
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
              <h4>Вход в систему</h4>
              <p>Введите ваши учетные данные для доступа к платформе. Если у вас еще нет аккаунта — вы можете зарегистрироваться.</p>
            </div>
          </div>

          {registered && (
            <div style={{ padding: '12px', background: 'rgba(40, 167, 69, 0.1)', color: '#28a745', borderRadius: '8px', marginBottom: '15px', border: '1px solid rgba(40, 167, 69, 0.2)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="bi bi-check-circle-fill"></i>
              Регистрация прошла успешно! Теперь вы можете войти.
            </div>
          )}

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="form-input-wrapper">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Введите email"
                  required
                  autoFocus
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  required
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
              <span>Запомнить меня</span>
            </label>

            <div>
              {error && <div className="error-box" style={{ marginBottom: 12 }}>{error}</div>}
              
              <button type="submit" className="btn-submit" disabled={loading}>
                <span>{loading ? 'Вход...' : 'Войти'}</span>
                {!loading && <i className="bi bi-arrow-right-circle-fill"></i>}
              </button>

              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <a href="#" style={{ fontSize: 14, color: 'var(--accent-color)' }}>Забыли пароль?</a>
              </div>

              <div className="register-link">
                <i className="bi bi-person-plus"></i>
                <span>Нет аккаунта?</span>
                <Link href="/register">Зарегистрироваться</Link>
              </div>

              <div className="secure-note">
                <i className="bi bi-shield-lock"></i>
                <span>Ваши данные защищены</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
