import Link from 'next/link';

export default function Home() {
  return (
    <main className="dashboard-layout" style={{ justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '600px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 700 }}>
          Welcome to <span style={{ color: 'var(--accent-color)' }}>Sports Panel</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem' }}>
          The modern platform for athletes, coaches, parents, and sponsors to track progress and manage teams.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link href="/login" className="btn btn-primary">
            Sign In to Dashboard
          </Link>
          <a href="#" className="btn" style={{ background: 'rgba(255,255,255,0.1)' }}>
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
