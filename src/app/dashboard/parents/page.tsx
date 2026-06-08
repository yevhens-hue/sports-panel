'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function ParentsPage() {
  const parent1 = {
    relation: 'Мать',
    email: 'moskatekaterina85@gmail.com',
    points: 9,
    firstName: 'Екатерина',
    lastName: 'Москат',
    patronymic: 'Владимировна',
    phone: '—',
    city: 'Киев',
    birthDate: '23.11.1985',
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="page-header">
          <h1>Мои родители</h1>
        </div>

        <div className="content-card">
          <div className="relation-badge">{parent1.relation}</div>

          <div className="info-cards-row">
            <div className="info-card">
              <div className="info-card-title">Основное</div>
              <div className="info-row">
                <strong>Email:</strong>
                <span>{parent1.email}</span>
              </div>
              <div className="info-row">
                <strong>Баллы:</strong>
                <span>{parent1.points}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">ФИО</div>
              <div className="info-row">
                <strong>Имя:</strong>
                <span>{parent1.firstName}</span>
              </div>
              <div className="info-row">
                <strong>Фамилия:</strong>
                <span>{parent1.lastName}</span>
              </div>
              <div className="info-row">
                <strong>Отчество:</strong>
                <span>{parent1.patronymic}</span>
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-title">Контакты</div>
              <div className="info-row">
                <strong>Телефон:</strong>
                <span>{parent1.phone}</span>
              </div>
              <div className="info-row">
                <strong>Город:</strong>
                <span>{parent1.city}</span>
              </div>
              <div className="info-row">
                <strong>Дата рождения:</strong>
                <span>{parent1.birthDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="no-parent-box">Второй родитель не привязан</div>
      </div>
    </DashboardLayout>
  );
}
