import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const journeySteps = ['Discover', 'Build', 'Prove', 'Apply', 'Interview', 'Launch'];

const featureCards = [
  {
    icon: '🧭',
    title: 'Career Mission',
    description: 'Define your target role and let the system shape a daily roadmap around your strengths and gaps.',
  },
  {
    icon: '📈',
    title: 'Career Readiness',
    description: 'Track readiness across skills, projects, resume strength, GitHub proof, DSA, and interview preparation.',
  },
  {
    icon: '🧠',
    title: 'Skill Graph',
    description: 'Understand the exact relationship between foundational skills, advanced tools, and job-ready evidence.',
  },
  {
    icon: '✅',
    title: 'Proof of Skill',
    description: 'Turn project experience and certificates into employer-ready proof that you can deliver real work.',
  },
  {
    icon: '🚀',
    title: 'Project Intelligence',
    description: 'Analyze each project for impact, employer relevance, and what to improve next to close skill gaps.',
  },
  {
    icon: '📡',
    title: 'Opportunity Radar',
    description: 'Compare your profile with live opportunity requirements and discover the roles you are closest to matching.',
  },
];

const evidenceCards = [
  { title: 'Skill Growth', value: '82%', subtitle: 'Frontend strength' },
  { title: 'Project Proof', value: '70%', subtitle: 'Portfolio confidence' },
  { title: 'Job Match', value: '86%', subtitle: 'Python Developer Intern' },
  { title: 'Weekly Momentum', value: '+8%', subtitle: 'Readiness increase' },
];

const valueCards = [
  {
    icon: '🎯',
    title: 'Career intelligence',
    description: 'Moves beyond generic learning advice and helps you focus on the work that matters most for your next role.',
  },
  {
    icon: '🚀',
    title: 'Build proof, not just plans',
    description: 'Every lesson and project is tied back to actual evidence employers care about: portfolio, experience, and outcomes.',
  },
  {
    icon: '📬',
    title: 'Apply with confidence',
    description: 'From opportunities to application pipeline to interview prep, CareerPilot keeps your next steps visible and measurable.',
  },
];

const stats = [
  { value: '72%', label: 'readiness' },
  { value: '14', label: 'active priorities' },
  { value: '4x', label: 'faster decision-making' },
];

const Home = () => {
  return (
    <div className="careerpilot-home">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="hero-badge">CAREERPILOT AI</span>
          <h1>
            Turn your skills
            <span className="gradient-text"> into a career.</span>
          </h1>
          <p className="hero-subtitle">
            Build the skills employers need, prove what you can do, and track your journey from student to job-ready professional.
          </p>

          <div className="hero-actions">
            <Link to="/dashboard" className="primary-btn">
              Start Career Scan
            </Link>
            <Link to="/roadmaps" className="secondary-btn">
              Explore My Career
            </Link>
          </div>

          <div className="hero-stats">
            {stats.map((stat) => (
              <div className="stat-pill" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Career growth visualization">
          <div className="journey-panel">
            <div className="visual-glow glow-one" />
            <div className="visual-glow glow-two" />

            <div className="floating-chip chip-a">Student</div>
            <div className="floating-chip chip-b">Skills</div>
            <div className="floating-chip chip-c">Resume</div>
            <div className="floating-chip chip-d">Projects</div>
            <div className="floating-chip chip-e">Job</div>

            <div className="career-scene">
              <div className="scene-orbit orbit-one" />
              <div className="scene-orbit orbit-two" />
              <div className="ai-core">
                <span>AI</span>
              </div>

              <div className="person">
                <div className="head" />
                <div className="hair" />
                <div className="torso" />
                <div className="arm arm-left" />
                <div className="arm arm-right" />
                <div className="leg leg-left" />
                <div className="leg leg-right" />
              </div>

              <div className="laptop">
                <div className="screen">
                  <span className="screen-line short" />
                  <span className="screen-line medium" />
                  <span className="screen-line long" />
                  <span className="screen-line medium" />
                </div>
                <div className="keyboard" />
              </div>
            </div>

            <div className="career-path">
              <span>Student</span>
              <span className="path-arrow">→</span>
              <span>Skills</span>
              <span className="path-arrow">→</span>
              <span>Resume</span>
              <span className="path-arrow">→</span>
              <span>Job</span>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-section">
        <div className="section-heading">
          <p className="section-kicker">Career Intelligence</p>
          <h2>From scattered effort to a clear career system.</h2>
        </div>

        <div className="signal-grid">
          {evidenceCards.map((card) => (
            <article className="signal-card" key={card.title}>
              <span>{card.title}</span>
              <strong>{card.value}</strong>
              <small>{card.subtitle}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading center">
          <p className="section-kicker">CareerPilot OS</p>
          <h2>Everything you need to move from learning to earning.</h2>
        </div>

        <div className="feature-grid">
          {featureCards.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof-section">
        <div className="proof-copy">
          <p className="section-kicker">Proof of skill</p>
          <h2>Stop saying “I know React” and start proving it.</h2>
          <p>
            CareerPilot evaluates the evidence behind your skills and highlights exactly what employers need to see before they trust you with a role.
          </p>
          <ul>
            <li>GitHub repositories and production projects</li>
            <li>Certificates, challenges, and hackathons</li>
            <li>Portfolio projects tied to real skill outcomes</li>
          </ul>
        </div>

        <div className="proof-panel">
          <div className="proof-header">
            <span className="proof-badge">React</span>
            <span className="proof-level">Skill Level: Advanced</span>
          </div>

          <div className="proof-metric">
            <label>Proof Strength</label>
            <strong>84%</strong>
          </div>

          <div className="proof-list">
            <span>✓ E-commerce project</span>
            <span>✓ GitHub repository</span>
            <span>✓ React certificate</span>
            <span>✓ 12 completed challenges</span>
          </div>

          <Link to="/profile" className="inline-btn">Add Evidence</Link>
        </div>
      </section>

      <section className="value-section">
        <div className="section-heading center">
          <p className="section-kicker">Why CareerPilot?</p>
          <h2>Built for the real journey from student to job-ready professional.</h2>
        </div>

        <div className="value-grid">
          {valueCards.map((card) => (
            <article className="value-card" key={card.title}>
              <div className="value-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card">
          <p className="section-kicker">CareerPilot AI</p>
          <h2>Launch your next career move with clarity.</h2>
          <p>Scan your journey. Build proof. Match the right opportunities. Interview with confidence.</p>
          <Link to="/assessment" className="primary-btn large-btn">
            Start Career Scan
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
