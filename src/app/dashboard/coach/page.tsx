'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function CoachPage() {
  const coach = {
    email: 'swim.play.win@gmail.com',
    points: 3,
    firstName: 'Дмитрий',
    lastName: 'Москат',
    patronymic: 'Леонидович',
    phone: '+380990449473',
    city: 'Киев',
    birthDate: '16.03.1980',
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мой тренер</h1>
        </div>

        <div className="content-card">
          <div className="info-card-title">Изображения</div>

          <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Аватар</p>
              <div style={{
                width: 140, height: 140, borderRadius: 10,
                background: '#e5e7eb', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <i className="bi bi-person-fill" style={{ fontSize: 60, color: '#9ca3af' }}></i>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Фото команды</p>
              <div style={{
                width: 200, height: 140, borderRadius: 10,
                background: '#e5e7eb', overflow: 'hidden',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <i className="bi bi-people-fill" style={{ fontSize: 50, color: '#9ca3af' }}></i>
              </div>
            </div>
          </div>

          <div className="info-cards-row">
            <div className="info-card">
              <div className="info-card-title">Основное</div>
              <div className="info-row">
                <strong>Email:</strong>
                <span>{coach.email}</span>
              </div>
              <div className="info-row">
                <strong>Баллы:</strong>
                <span>{coach.points}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">ФИО</div>
              <div className="info-row">
                <strong>Имя:</strong>
                <span>{coach.firstName}</span>
              </div>
              <div className="info-row">
                <strong>Фамилия:</strong>
                <span>{coach.lastName}</span>
              </div>
              <div className="info-row">
                <strong>Отчество:</strong>
                <span>{coach.patronymic}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">Контакты</div>
              <div className="info-row">
                <strong>Телефон:</strong>
                <span>{coach.phone}</span>
              </div>
              <div className="info-row">
                <strong>Город:</strong>
                <span>{coach.city}</span>
              </div>
              <div className="info-row">
                <strong>Дата рождения:</strong>
                <span>{coach.birthDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
