import Link from 'next/link';
import styles from './landing.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

      {/* ─── Navbar ─── */}
      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.navLogo}>
            <i className="bi bi-water"></i>
            <span>Sports Panel</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Можливості</a>
            <a href="#coaches">Тренерам</a>
            <a href="#athletes">Спортсменам</a>
          </div>
          <div className={styles.navActions}>
            <Link href="/login" className={styles.navLogin}>Увійти</Link>
            <Link href="/register" className={styles.navRegister}>Реєстрація</Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <img
          src="https://images.pexels.com/photos/8688160/pexels-photo-8688160.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Swimmers racing underwater"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>УПРАВЛІННЯ ПЛАВАЛЬНИМ КЛУБОМ</span>
          <h1 className={styles.heroTitle}>
            Сучасна платформа<br />
            <span className={styles.heroAccent}>для вашого клубу</span>
          </h1>
          <p className={styles.heroDesc}>
            Управляйте спортсменами, призначайте тренерів, нараховуйте бали та відстежуйте розряди — все в одному місці.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/register" className={styles.btnPrimary}>
              Розпочати безкоштовно <i className="bi bi-arrow-right"></i>
            </Link>
            <Link href="/login" className={styles.btnOutline}>
              Увійти до панелі
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats Strip ─── */}
      <div className={styles.statsStrip}>
        <div className={styles.statItem}>
          <i className="bi bi-person-badge"></i>
          <div>
            <strong>3 ролі</strong>
            <span>Адмін · Тренер · Спортсмен</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <i className="bi bi-coin"></i>
          <div>
            <strong>Система балів</strong>
            <span>Мотивація через досягнення</span>
          </div>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <i className="bi bi-award"></i>
          <div>
            <strong>Розряди та рейтинги</strong>
            <span>Від юніора до майстра</span>
          </div>
        </div>
      </div>

      {/* ─── Features ─── */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>МОЖЛИВОСТІ ПЛАТФОРМИ</span>
            <h2 className={styles.sectionTitle}>Все що потрібно клубу</h2>
            <p className={styles.sectionDesc}>Комплексне рішення для управління плавальним клубом будь-якого масштабу</p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="bi bi-people-fill"></i>
              </div>
              <h3>Реєстр спортсменів</h3>
              <p>Повний список усіх атлетів з їхніми даними, містом, баловою системою та поточним розрядом.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="bi bi-coin"></i>
              </div>
              <h3>Нарахування балів</h3>
              <p>Тренери нараховують бали за тренування та досягнення. Спортсмени бачать свій прогрес в реальному часі.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="bi bi-award-fill"></i>
              </div>
              <h3>Розряди та рейтинг</h3>
              <p>Система спортивних розрядів від початківця до дорослого. Автоматичне оновлення рейтингу.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="bi bi-person-check-fill"></i>
              </div>
              <h3>Управління тренерами</h3>
              <p>Контролюйте склад тренерського штабу, розподіляйте спортсменів між тренерами.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── For Coaches ─── */}
      <section id="coaches" className={styles.audienceSection}>
        <div className={styles.sectionInner}>
          <div className={styles.audienceRow}>
            <div className={styles.audienceImage}>
              <img
                src="https://images.pexels.com/photos/8028683/pexels-photo-8028683.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Coaches and swimmers at pool edge"
              />
            </div>
            <div className={styles.audienceContent}>
              <span className={styles.sectionTag}>ДЛЯ ТРЕНЕРІВ</span>
              <h2 className={styles.audienceTitle}>Управляйте командою ефективно</h2>
              <p className={styles.audienceDesc}>
                Тренери отримують повний інструментарій для роботи зі своїми спортсменами — від обліку відвідувань до нарахування балів.
              </p>
              <ul className={styles.featureList}>
                <li><i className="bi bi-check-circle-fill"></i> Перегляд списку своїх спортсменів</li>
                <li><i className="bi bi-check-circle-fill"></i> Нарахування балів за тренування</li>
                <li><i className="bi bi-check-circle-fill"></i> Відстеження прогресу атлетів</li>
                <li><i className="bi bi-check-circle-fill"></i> Зручний пошук по імені та місту</li>
              </ul>
              <Link href="/register" className={styles.btnPrimary}>
                Почати як тренер <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── For Athletes ─── */}
      <section id="athletes" className={`${styles.audienceSection} ${styles.audienceDark}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.audienceRow} ${styles.audienceRowReverse}`}>
            <div className={styles.audienceContent}>
              <span className={styles.sectionTagLight}>ДЛЯ СПОРТСМЕНІВ</span>
              <h2 className={`${styles.audienceTitle} ${styles.audienceTitleLight}`}>Стежте за своїм прогресом</h2>
              <p className={`${styles.audienceDesc} ${styles.audienceDescLight}`}>
                Спортсмени мають власний кабінет для відстеження балів, перегляду свого розряду та активності тренувань.
              </p>
              <ul className={`${styles.featureList} ${styles.featureListLight}`}>
                <li><i className="bi bi-check-circle-fill"></i> Власна балова таблиця</li>
                <li><i className="bi bi-check-circle-fill"></i> Поточний спортивний розряд</li>
                <li><i className="bi bi-check-circle-fill"></i> Історія всіх нарахувань</li>
                <li><i className="bi bi-check-circle-fill"></i> Профіль з унікальним ID</li>
              </ul>
              <Link href="/register" className={styles.btnAccent}>
                Зареєструватись <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className={styles.audienceImage}>
              <img
                src="https://images.pexels.com/photos/9030298/pexels-photo-9030298.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Swimmer underwater"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Готові розпочати?</h2>
          <p className={styles.ctaDesc}>Приєднуйтесь до платформи та спростіть управління вашим клубом вже сьогодні.</p>
          <div className={styles.ctaButtons}>
            <Link href="/register" className={styles.btnDark}>
              Зареєструватись безкоштовно <i className="bi bi-arrow-right"></i>
            </Link>
            <Link href="/login" className={styles.btnDarkOutline}>
              Увійти
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <i className="bi bi-water"></i>
              <span>Sports Panel</span>
            </div>
            <p>Платформа управління плавальним клубом для тренерів, спортсменів та адміністраторів.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Платформа</h4>
              <a href="#features">Можливості</a>
              <a href="#coaches">Для тренерів</a>
              <a href="#athletes">Для спортсменів</a>
            </div>
            <div className={styles.footerCol}>
              <h4>Акаунт</h4>
              <Link href="/login">Увійти</Link>
              <Link href="/register">Реєстрація</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Sports Panel. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
}
