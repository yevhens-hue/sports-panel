import Link from 'next/link';
import styles from './landing.module.css';

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      
      {/* ─── Hero Section ─── */}
      <section className={styles.hero}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.heroVideo}
          poster="https://images.pexels.com/videos/8533110/pexels-photo-8533110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
        >
          <source src="https://videos.pexels.com/video-files/8533110/8533110-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.heroSubtitle}>Professional Performance</span>
            <h1 className={styles.heroTitle}>Elevate Your <span>Game</span></h1>
            <p className={styles.heroDescription}>
              The modern ecosystem for athletes, coaches, and parents to track progress and achieve excellence through data-driven insights.
            </p>
            <div className={styles.heroActions}>
              <Link href="/login" className="btn btn-primary">
                Start Free Trial
              </Link>
              <a href="#" className="btn btn-outline" style={{ border: '1px solid white', color: 'white' }}>
                Watch Demo
              </a>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <img 
              src="https://images.pexels.com/photos/5607008/pexels-photo-5607008.jpeg" 
              alt="Dashboard Mockup" 
              className={styles.heroMockup} 
            />
          </div>
        </div>
        <div className={styles.overturn} />
      </section>

      {/* ─── Features Grid ─── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Platform Capabilities</span>
          <h2 className={styles.sectionTitle}>Meliorate Your Performance</h2>
        </div>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="bi bi-graph-up"></i>
            </div>
            <h3>Advanced Analytics</h3>
            <p>Real-time tracking of performance metrics with detailed growth charts and predictive modeling.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="bi bi-chat-dots"></i>
            </div>
            <h3>Team Sync</h3>
            <p>Seamless communication channels between coaches, athletes, and support staff.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="bi bi-calendar-check"></i>
            </div>
            <h3>Smart Scheduling</h3>
            <p>Interactive training calendars with automated reminders and availability management.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="bi bi-shield-lock"></i>
            </div>
            <h3>Parental Oversight</h3>
            <p>Secure monitoring for parents to stay updated on their child's athletic journey and safety.</p>
          </div>
        </div>
      </section>

      {/* ─── Audience Sections ─── */}
      <section className={`${styles.section} ${styles.audience}`}>
        {/* Row 1: Athletes */}
        <div className={`${styles.audienceRow} ${styles.athleteRow}`}>
          <div className={styles.audienceImageContainer}>
            <img 
              src="https://images.unsplash.com/photo-1623503071332-fffb3b632cda?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBhdGhsZXRlJTIwaG9sZGluZyUyMGElMjBiYXNrZXRiYWxsfGVufDB8fHx8MTc4MTAzNzYyNHww&ixlib=rb-4.1.0&q=85" 
              alt="Athlete" 
              className={styles.audienceImage} 
            />
          </div>
          <div className={styles.audienceContent}>
            <h3>Built for Performance</h3>
            <p>Athletes get a centralized hub to track every metric, from sprint speeds to recovery times, with automated highlight generation.</p>
            <div className={styles.audienceList}>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> Personal highlight reels</div>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> AI-powered progress insights</div>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> Recruitment profile builder</div>
            </div>
          </div>
        </div>

        {/* Row 2: Coaches */}
        <div className={`${styles.audienceRow} ${styles.coachRow}`}>
          <div className={styles.audienceContent}>
            <h3>Strategic Leadership</h3>
            <p>Coaches can manage entire rosters, design tactical plans, and award performance points to motivate continuous improvement.</p>
            <div className={styles.audienceList}>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> Roster management</div>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> Point-based reward system</div>
              <div className={styles.audienceListItem}><i className="bi bi-check-circle-fill"></i> Tactical board & planning</div>
            </div>
          </div>
          <div className={styles.audienceImageContainer}>
            <img 
              src="https://images.pexels.com/photos/6767013/pexels-photo-6767013.jpeg" 
              alt="Coach" 
              className={styles.audienceImage} 
            />
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className={`${styles.section} ${styles.testimonials}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Passionate Voices</span>
          <h2 className={styles.sectionTitle}>Trusted by Champions</h2>
        </div>
        <div className={styles.testimonialGrid}>
          <div className={styles.testimonialCard}>
            <i className={`bi bi-quote ${styles.quoteIcon}`}></i>
            <div className={styles.stars}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <p className={styles.testimonialText}>
              "Sports Panel has completely changed how I track my training. The insights are incredibly accurate and keep me motivated every single day."
            </p>
            <div className={styles.testimonialUser}>
              <div className="profile-avatar">AM</div>
              <div>
                <strong>Alex Morgan</strong>
                <span className="badge badge-primary" style={{ marginLeft: '10px' }}>ATHLETE</span>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <i className={`bi bi-quote ${styles.quoteIcon}`}></i>
            <div className={styles.stars}>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
              <i className="bi bi-star-fill"></i>
            </div>
            <p className={styles.testimonialText}>
              "Managing a team of 30 athletes used to be a logistical nightmare. Now, everything from scheduling to performance reviews is in one place."
            </p>
            <div className={styles.testimonialUser}>
              <div className="profile-avatar" style={{ backgroundColor: 'var(--accent-color)' }}>RK</div>
              <div>
                <strong>Ryan Klopp</strong>
                <span className="badge badge-primary" style={{ marginLeft: '10px' }}>COACH</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Transform Your Season?</h2>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <Link href="/login" className="btn btn-primary" style={{ background: 'var(--heading-color)', padding: '15px 40px' }}>
            Get Started Now
          </Link>
          <a href="#" className="btn btn-outline" style={{ border: '2px solid var(--heading-color)', color: 'var(--heading-color)', padding: '15px 40px' }}>
            Contact Sales
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerLogo}>
            <h2>Sports Panel</h2>
            <p>The definitive platform for athletic management and performance optimization.</p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}><i className="bi bi-twitter-x"></i></a>
              <a href="#" className={styles.socialIcon}><i className="bi bi-instagram"></i></a>
              <a href="#" className={styles.socialIcon}><i className="bi bi-youtube"></i></a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h4>Product</h4>
            <div className={styles.footerLinks}>
              <a href="#">Analytics</a>
              <a href="#">Scheduling</a>
              <a href="#">Team Hub</a>
              <a href="#">Security</a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h4>Company</h4>
            <div className={styles.footerLinks}>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Partners</a>
              <a href="#">Contact</a>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h4>Support</h4>
            <div className={styles.footerLinks}>
              <a href="#">Help Center</a>
              <a href="#">Guides</a>
              <a href="#">API Docs</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Sports Management Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
