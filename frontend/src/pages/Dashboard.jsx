import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const readinessBreakdown = [
  { label: 'Skills', value: 82, tone: 'blue' },
  { label: 'Projects', value: 70, tone: 'purple' },
  { label: 'Resume', value: 88, tone: 'green' },
  { label: 'GitHub', value: 64, tone: 'blue' },
  { label: 'DSA', value: 52, tone: 'amber' },
  { label: 'Interview', value: 60, tone: 'purple' },
];

const skillGraph = [
  { type: 'root', label: 'Frontend' },
  { type: 'branch', label: 'HTML' },
  { type: 'branch', label: 'CSS' },
  { type: 'branch', label: 'JavaScript' },
  { type: 'leaf', label: 'React' },
  { type: 'leaf', label: 'TypeScript' },
  { type: 'branch', label: 'Backend' },
  { type: 'leaf', label: 'Node.js' },
  { type: 'leaf', label: 'Express' },
  { type: 'branch', label: 'Database' },
  { type: 'leaf', label: 'MongoDB' },
];

const dailyTasks = [
  { title: 'Complete React Hooks challenge', time: '20 min', priority: 'High', impact: 'Frontend' },
  { title: 'Add authentication to Expense Analyzer', time: '35 min', priority: 'High', impact: 'Portfolio' },
  { title: 'Improve GitHub README', time: '15 min', priority: 'Medium', impact: 'Proof' },
  { title: 'Practice 5 DSA questions', time: '30 min', priority: 'High', impact: 'Interview' },
  { title: 'Apply to 2 matching internships', time: '25 min', priority: 'High', impact: 'Opportunity' },
];

const weeklyMission = [
  'Complete 2 project tasks',
  'Learn TypeScript fundamentals',
  'Solve 20 DSA problems',
  'Improve resume',
  'Apply to 5 opportunities',
  'Complete 1 mock interview',
];

const opportunities = [
  { title: 'Python Developer Intern', match: 86, company: 'NovaLabs', location: 'Bangalore', stage: 'Internship' },
  { title: 'Frontend Engineer', match: 82, company: 'BrightCart', location: 'Remote', stage: 'Full-time' },
  { title: 'Full Stack Developer', match: 78, company: 'SkillForge', location: 'Hyderabad', stage: 'Full-time' },
];

const applications = [
  { label: 'Saved', value: 6 },
  { label: 'Applied', value: 12 },
  { label: 'Assessment', value: 4 },
  { label: 'Interview', value: 3 },
  { label: 'Offer', value: 1 },
];

const timeline = [
  { year: '2025', event: 'Started Python learning and built my first mini-projects.' },
  { year: '2026', event: 'Built ML project and completed an internship internship.' },
  { year: '2026', event: 'Started applying for developer roles and improving GitHub proof.' },
];

const achievements = [
  '🏗 First Production Project',
  '💻 10 GitHub Projects',
  '🎯 Career Goal Defined',
  '🔥 7-Day Learning Streak',
  '📄 Resume Optimized',
  '🎤 First Mock Interview',
  '🚀 First Application',
  '🏆 First Interview',
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.name ? user.name.split(' ')[0] : 'Alex';

  return (
    <div className="careerpilot-dashboard">
      <header className="dashboard-hero glass-panel">
        <div>
          <p className="eyebrow">Good morning, {userName} 👋</p>
          <h1>Your Career Mission</h1>
          <div className="mission-row">Become a Full Stack Developer</div>
        </div>

        <div className="hero-metrics">
          <div className="mini-metric">
            <label>Career Readiness</label>
            <strong>72%</strong>
          </div>
          <div className="mini-metric">
            <label>Current Phase</label>
            <strong>Building</strong>
          </div>
          <div className="mini-metric">
            <label>Days Active</label>
            <strong>42</strong>
          </div>
        </div>
      </header>

      <section className="stats-strip">
        <article className="stat-box glass-panel">
          <span className="stat-label">Skill Level</span>
          <strong>Intermediate</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Target Role</span>
          <strong>Full Stack Developer</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Career Score</span>
          <strong>74 / 100</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Weekly Mission</span>
          <strong>4 / 6 complete</strong>
        </article>
      </section>

      <section className="dashboard-grid dashboard-top-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>Career Readiness</h2>
            <span className="pill">72% ready</span>
          </div>

          <div className="readiness-layout">
            <div className="readiness-ring">
              <div className="ring-inner">
                <div>
                  <strong>72%</strong>
                  <small>Ready</small>
                </div>
              </div>
            </div>

            <div className="readiness-breakdown">
              {readinessBreakdown.map((item) => (
                <div key={item.label} className="breakdown-row">
                  <div className="breakdown-meta">
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div className="progress-track">
                    <span className={`progress-fill ${item.tone}`} style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>Skill Graph</h2>
            <span className="pill light">Linked skills</span>
          </div>

          <div className="skill-tree">
            <div className="node node-root">Frontend</div>
            <div className="tree-branch">
              <div className="node-parent node">HTML</div>
              <div className="node-parent node">CSS</div>
              <div className="node-parent node">JavaScript</div>
            </div>
            <div className="tree-branch">
              <div className="node-cluster">
                <div className="node">React</div>
                <div className="node">TypeScript</div>
              </div>
            </div>
            <div className="tree-branch">
              <div className="node-parent node">Backend</div>
              <div className="node-parent node">Node.js</div>
              <div className="node-parent node">Express</div>
            </div>
            <div className="tree-branch">
              <div className="node-parent node">Database</div>
              <div className="node">MongoDB</div>
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-mid-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>Proof of Skill</h2>
            <span className="pill">84% proof strength</span>
          </div>

          <div className="skill-summary">
            <div className="mission-target">
              <span className="mission-tag">React</span>
              <h3>Advanced track</h3>
            </div>

            <div className="mission-metrics">
              <div>
                <label>Current</label>
                <strong>72%</strong>
              </div>
              <div>
                <label>Target</label>
                <strong>90%</strong>
              </div>
            </div>

            <div className="tag-list">
              <span>✓ E-commerce project</span>
              <span>✓ GitHub repository</span>
              <span>✓ 12 challenges</span>
              <span>✓ Certificate</span>
            </div>

            <button className="ghost-btn">Add Evidence</button>
          </div>
        </article>

        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>🎯 Today’s Mission</h2>
            <span className="pill light">5 priorities</span>
          </div>

          <div className="skill-summary">
            {dailyTasks.map((task) => (
              <div className="task-item" key={task.title}>
                <div className="task-copy">
                  <strong>{task.title}</strong>
                  <span>{task.time} • {task.impact}</span>
                </div>
                <span className="task-priority">{task.priority}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-bottom-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>🚀 Project Intelligence</h2>
            <span className="pill">Smart recommendations</span>
          </div>

          <div className="project-box">
            <div className="project-header">
              <h3>Smart Expense Analyzer</h3>
              <span>82%</span>
            </div>

            <div className="tag-list">
              <span>Python</span>
              <span>Machine Learning</span>
              <span>React</span>
              <span>MongoDB</span>
            </div>

            <p>Skills demonstrated: Python, Machine Learning, React, MongoDB, Data Visualization.</p>
            <div className="insight-box">
              AI Recommendation: “Add authentication and deployment to demonstrate production-level development.”
            </div>

            <div className="button-row">
              <button className="primary-btn small-btn">Improve Project</button>
              <button className="secondary-btn small-btn">View Project</button>
            </div>
          </div>
        </article>

        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>🔥 Weekly Mission</h2>
            <span className="pill">4 / 6 complete</span>
          </div>

          <ul className="mission-list">
            {weeklyMission.map((item, index) => (
              <li key={item}> {index < 4 ? '✓' : '□'} {item}</li>
            ))}
          </ul>

          <div className="weekly-summary">
            AI Weekly Summary: “You improved your frontend readiness by 8% this week.”
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-bottom-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>📡 Opportunity Radar</h2>
            <span className="pill light">Match focused</span>
          </div>

          <div className="project-box">
            {opportunities.map((opportunity) => (
              <div key={opportunity.title} className="opportunity-box">
                <div className="opportunity-header">
                  <h3>{opportunity.title}</h3>
                  <span>{opportunity.match}%</span>
                </div>
                <div className="opportunity-meta">
                  <span>{opportunity.company}</span>
                  <span>{opportunity.location}</span>
                  <span>{opportunity.stage}</span>
                </div>
                <p>You meet most technical requirements. Improving Docker could increase your match.</p>
                <div className="button-row">
                  <button className="secondary-btn small-btn">View</button>
                  <button className="secondary-btn small-btn">Save</button>
                  <button className="primary-btn small-btn">Apply</button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>📬 Application Pipeline</h2>
            <span className="pill">24 apps</span>
          </div>

          <div className="kanban">
            {applications.map((item) => (
              <div className="kanban-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-bottom-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>🧭 My Career Journey</h2>
            <span className="pill">Growth story</span>
          </div>

          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.year + item.event}>
                <span>{item.year}</span>
                <p>{item.event}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>🏆 Achievements</h2>
            <span className="pill light">Milestones</span>
          </div>

          <div className="achievement-list">
            {achievements.map((achievement) => (
              <div className="achievement-item" key={achievement}>{achievement}</div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
