import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const RESUME_KEYS = [
  'careerPilotResumeProfile',
  'resumeProfile',
  'resumeData',
  'careerProfile',
  'userResume',
  'dashboardResume',
];

const normalizeList = (value) => {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => normalizeList(entry))
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/[\n,;]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (value && typeof value === 'object') {
    return Object.values(value)
      .flatMap((entry) => normalizeList(entry))
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  return [];
};

const readResumeProfile = () => {
  if (typeof window === 'undefined') return null;

  for (const key of RESUME_KEYS) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    } catch (error) {
      console.warn('Resume profile parse failed:', error);
    }
  }

  return null;
};

const deriveResumeFacts = (resume) => {
  const source = resume && typeof resume === 'object' ? resume : {};

  const educationList = normalizeList(
    source.education ||
    source.educationHistory ||
    source.academicBackground ||
    source.degree ||
    source.degreeDetails
  );

  const degree = Array.isArray(source.degree)
    ? source.degree.join(', ')
    : typeof source.degree === 'string'
      ? source.degree
      : educationList[0] || 'Not specified';

  const technicalSkills = normalizeList(
    source.technicalSkills ||
    source.technical_skills ||
    source.skills ||
    source.keySkills ||
    source.skillSet ||
    source.technical_skills_list
  );

  const programmingLanguages = normalizeList(
    source.programmingLanguages ||
    source.programming_languages ||
    source.languages ||
    source.languagesKnown ||
    source.primaryLanguages
  );

  const frameworks = normalizeList(
    source.frameworks ||
    source.frameworksUsed ||
    source.frameworksList
  );

  const databases = normalizeList(
    source.databases ||
    source.databaseSkills ||
    source.storage ||
    source.databaseList
  );

  const aiMlSkills = normalizeList(
    source.aiMlSkills ||
    source.ai_ml_skills ||
    source.machineLearning ||
    source.aiSkills ||
    source.mlSkills ||
    source.aiAndMl
  );

  const projects = normalizeList(
    source.projects ||
    source.projectExperience ||
    source.projectList ||
    source.portfolio
  );

  const internships = normalizeList(
    source.internships ||
    source.internshipExperience ||
    source.experience ||
    source.relevantExperience
  );

  const certifications = normalizeList(
    source.certifications ||
    source.certification ||
    source.certs ||
    source.coursework
  );

  const achievements = normalizeList(
    source.achievements ||
    source.accomplishments ||
    source.highlights ||
    source.awards
  );

  const careerInterests = normalizeList(
    source.careerInterests ||
    source.career_interest ||
    source.interests ||
    source.targetRole ||
    source.targetRoles ||
    source.preferredRole
  );

  const resumeEvidence = [
    ...educationList,
    ...technicalSkills,
    ...programmingLanguages,
    ...frameworks,
    ...databases,
    ...aiMlSkills,
    ...projects,
    ...internships,
    ...certifications,
    ...achievements,
  ];

  const allSkills = Array.from(new Set([
    ...technicalSkills,
    ...programmingLanguages,
    ...frameworks,
    ...databases,
    ...aiMlSkills,
  ])).filter(Boolean);

  const focusRole = careerInterests[0] || source.targetRole || 'Career Mission';
  const currentStage = educationList.length || allSkills.length ? 'Building' : 'Profile pending';

  return {
    degree,
    educationList,
    technicalSkills,
    programmingLanguages,
    frameworks,
    databases,
    aiMlSkills,
    projects,
    internships,
    certifications,
    achievements,
    careerInterests,
    focusRole,
    currentStage,
    allSkills,
    resumeEvidence,
  };
};

const calculateReadiness = (profile) => {
  const skillWeight = profile.allSkills.length ? Math.min(100, 30 + profile.allSkills.length * 8) : 0;
  const projectWeight = profile.projects.length ? Math.min(100, 18 + profile.projects.length * 12) : 0;
  const experienceWeight = profile.internships.length || profile.educationList.length ? 40 + (profile.internships.length * 18) + (profile.educationList.length * 8) : 0;
  const certWeight = profile.certifications.length ? Math.min(100, 20 + profile.certifications.length * 15) : 0;
  const readiness = Math.max(
    0,
    Math.min(100, Math.round((skillWeight + projectWeight + experienceWeight + certWeight) / 4))
  );

  return {
    readiness,
    skillWeight,
    projectWeight,
    experienceWeight,
    certWeight,
  };
};

const buildDashboardContent = (resumeProfile) => {
  const profile = deriveResumeFacts(resumeProfile);
  const readiness = calculateReadiness(profile);

  const firstSkill = profile.allSkills[0] || 'Resume data';
  const firstProject = profile.projects[0] || 'No project details yet';
  const focusRole = profile.focusRole || 'Career Mission';

  const readinessBreakdown = [
    { label: 'Skills', value: profile.allSkills.length ? Math.min(100, readiness.skillWeight) : 0, tone: 'blue' },
    { label: 'Projects', value: profile.projects.length ? Math.min(100, readiness.projectWeight) : 0, tone: 'purple' },
    { label: 'Resume', value: profile.resumeEvidence.length ? Math.min(100, readiness.readiness) : 0, tone: 'green' },
    { label: 'GitHub', value: profile.projects.length ? Math.min(100, readiness.projectWeight) : 0, tone: 'blue' },
    { label: 'DSA', value: profile.technicalSkills.length ? Math.min(100, readiness.experienceWeight) : 0, tone: 'amber' },
    { label: 'Interview', value: profile.achievements.length || profile.certifications.length ? Math.min(100, readiness.certWeight) : 0, tone: 'purple' },
  ];

  const skillGraph = [
    { type: 'root', label: focusRole },
    ...profile.allSkills.slice(0, 10).map((skill) => ({ type: 'leaf', label: skill })),
  ];

  const dailyTasks = [
    {
      title: profile.allSkills.length
        ? `Strengthen ${firstSkill} fundamentals`
        : 'Add resume details to personalize your task plan',
      time: '20 min',
      priority: 'High',
      impact: profile.allSkills.length ? 'Core skill' : 'Profile'
    },
    {
      title: profile.projects.length
        ? `Refine ${firstProject}`
        : 'Add a project to your resume',
      time: profile.projects.length ? '35 min' : '15 min',
      priority: 'High',
      impact: 'Portfolio'
    },
    {
      title: profile.certifications.length ? 'Update certification evidence' : 'Capture certifications and credentials',
      time: '15 min',
      priority: 'Medium',
      impact: 'Proof'
    },
    {
      title: profile.technicalSkills.length ? 'Practice 5 targeted technical questions' : 'Review your skills and role fit',
      time: '30 min',
      priority: 'High',
      impact: 'Interview'
    },
    {
      title: profile.careerInterests.length ? `Apply to 2 ${focusRole} opportunities` : 'Add career interests to match opportunities',
      time: '25 min',
      priority: 'High',
      impact: 'Opportunity'
    },
  ];

  const weeklyMission = [
    profile.projects.length ? `Complete 2 project tasks for ${firstProject}` : 'Add project evidence to your resume',
    profile.allSkills.length ? `Deepen ${profile.allSkills[0]} skill depth` : 'List your top technical skills',
    profile.educationList.length ? `Align your ${profile.degree || 'education'} with target roles` : 'Add your education details',
    'Improve resume clarity and proof points',
    profile.careerInterests.length ? `Apply to 5 ${focusRole} opportunities` : 'Clarify your target role',
    'Complete 1 mock interview',
  ];

  const opportunities = [
    {
      title: focusRole || 'Target role',
      match: readiness.readiness,
      company: profile.certifications.length ? 'Resume-matched fit' : 'Role fit',
      location: profile.educationList.length ? 'Based on your profile' : 'Add location details',
      stage: profile.internships.length ? 'Relevant experience' : 'Career target'
    },
    {
      title: profile.allSkills.length ? `${profile.allSkills[0]} Focus` : 'Skill-aligned role',
      match: Math.max(0, readiness.skillWeight - 10),
      company: 'Profile fit',
      location: 'Based on resume',
      stage: 'Career path'
    },
    {
      title: profile.projects.length ? 'Portfolio opportunity' : 'Add project evidence',
      match: profile.projects.length ? readiness.projectWeight : 0,
      company: 'Portfolio strength',
      location: 'Resume-based',
      stage: profile.projects.length ? 'Ready to showcase' : 'Needs evidence'
    },
  ];

  const applications = [
    { label: 'Saved', value: profile.careerInterests.length ? 4 : 0 },
    { label: 'Applied', value: profile.projects.length ? 6 : 0 },
    { label: 'Assessment', value: profile.technicalSkills.length ? 3 : 0 },
    { label: 'Interview', value: profile.certifications.length ? 2 : 0 },
    { label: 'Offer', value: profile.achievements.length ? 1 : 0 },
  ];

  const timeline = profile.educationList.length || profile.projects.length || profile.internships.length
    ? [
        ...(profile.educationList.length ? [{ year: 'Education', event: `${profile.educationList[0]}${profile.degree ? ` — ${profile.degree}` : ''}` }] : []),
        ...(profile.internships.length ? [{ year: 'Experience', event: profile.internships[0] }] : []),
        ...(profile.projects.length ? [{ year: 'Projects', event: profile.projects[0] }] : []),
      ]
    : [{ year: 'Resume', event: 'Add your education, projects, and experience to personalize this section.' }];

  const achievementsList = profile.achievements.length
    ? profile.achievements.slice(0, 8)
    : ['📄 Resume details not yet added'];

  return {
    mission: focusRole && focusRole !== 'Career Mission' ? `Become a ${focusRole}` : 'Career Mission',
    readiness: readiness.readiness,
    stage: profile.currentStage,
    skillLevel: profile.allSkills.length ? 'Intermediate' : 'Profile pending',
    targetRole: focusRole,
    careerScore: `${readiness.readiness} / 100`,
    weeklyMissionFinish: `${Math.min(6, Math.max(0, profile.resumeEvidence.length ? 4 : 0))} / 6 complete`,
    readinessBreakdown,
    skillGraph,
    dailyTasks,
    weeklyMission,
    opportunities,
    applications,
    timeline,
    achievements: achievementsList,
    proofTags: [
      profile.projects.length ? firstProject : 'No project details yet',
      profile.allSkills.length ? profile.allSkills[0] : 'Skills not yet added',
      profile.certifications.length ? profile.certifications[0] : 'Certifications pending',
      profile.educationList.length ? profile.educationList[0] : 'Education pending',
    ],
    projectTitle: profile.projects.length ? profile.projects[0] : 'Project evidence',
    projectStrength: profile.projects.length ? Math.max(50, readiness.projectWeight) : 0,
    projectSummary: profile.projects.length
      ? `Skills demonstrated: ${profile.allSkills.slice(0, 5).join(', ') || 'resume skills'}.`
      : 'Add project details to show skill proof and impact.',
  };
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const userName = user?.name ? user.name.split(' ')[0] : 'Alex';
  const dashboardContent = buildDashboardContent(
    user?.resume ||
    user?.resumeProfile ||
    user?.resumeData ||
    readResumeProfile()
  );

  return (
    <div className="careerpilot-dashboard">
      <header className="dashboard-hero glass-panel">
        <div>
          <p className="eyebrow">Good morning, {userName} 👋</p>
          <h1>Your Career Mission</h1>
          <div className="mission-row">{dashboardContent.mission}</div>
        </div>

        <div className="hero-metrics">
          <div className="mini-metric">
            <label>Career Readiness</label>
            <strong>{dashboardContent.readiness}%</strong>
          </div>
          <div className="mini-metric">
            <label>Current Phase</label>
            <strong>{dashboardContent.stage}</strong>
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
          <strong>{dashboardContent.skillLevel}</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Target Role</span>
          <strong>{dashboardContent.targetRole}</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Career Score</span>
          <strong>{dashboardContent.careerScore}</strong>
        </article>
        <article className="stat-box glass-panel">
          <span className="stat-label">Weekly Mission</span>
          <strong>{dashboardContent.weeklyMissionFinish}</strong>
        </article>
      </section>

      <section className="dashboard-grid dashboard-top-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>Career Readiness</h2>
            <span className="pill">{dashboardContent.readiness}% ready</span>
          </div>

          <div className="readiness-layout">
            <div className="readiness-ring">
              <div className="ring-inner">
                <div>
                  <strong>{dashboardContent.readiness}%</strong>
                  <small>{dashboardContent.readiness ? 'Ready' : 'Neutral'}</small>
                </div>
              </div>
            </div>

            <div className="readiness-breakdown">
              {dashboardContent.readinessBreakdown.map((item) => (
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
            <div className="node node-root">{dashboardContent.skillGraph[0]?.label || 'Career Focus'}</div>
            <div className="tree-branch">
              {dashboardContent.skillGraph.slice(1, 4).map((node, index) => (
                <div key={`${node.label}-${index}`} className="node-parent node">{node.label}</div>
              ))}
            </div>
            <div className="tree-branch">
              <div className="node-cluster">
                {dashboardContent.skillGraph.slice(4, 6).map((node, index) => (
                  <div key={`${node.label}-${index}`} className="node">{node.label}</div>
                ))}
              </div>
            </div>
            <div className="tree-branch">
              {dashboardContent.skillGraph.slice(6, 9).map((node, index) => (
                <div key={`${node.label}-${index}`} className="node-parent node">{node.label}</div>
              ))}
            </div>
            <div className="tree-branch">
              {dashboardContent.skillGraph.slice(9, 11).map((node, index) => (
                <div key={`${node.label}-${index}`} className={index === 0 ? 'node-parent node' : 'node'}>{node.label}</div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-mid-grid">
        <article className="panel-card glass-panel">
          <div className="panel-header">
            <h2>Proof of Skill</h2>
            <span className="pill">{dashboardContent.projectStrength}% proof strength</span>
          </div>

          <div className="skill-summary">
            <div className="mission-target">
              <span className="mission-tag">{dashboardContent.proofTags[1]}</span>
              <h3>{dashboardContent.projectTitle}</h3>
            </div>

            <div className="mission-metrics">
              <div>
                <label>Current</label>
                <strong>{dashboardContent.projectStrength}%</strong>
              </div>
              <div>
                <label>Target</label>
                <strong>90%</strong>
              </div>
            </div>

            <div className="tag-list">
              {dashboardContent.proofTags.map((tag, index) => (
                <span key={`${tag}-${index}`}>✓ {tag}</span>
              ))}
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
            {dashboardContent.dailyTasks.map((task) => (
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
              <h3>{dashboardContent.projectTitle}</h3>
              <span>{dashboardContent.projectStrength}%</span>
            </div>

            <div className="tag-list">
              {dashboardContent.proofTags.map((tag, index) => (
                <span key={`${tag}-${index}`}>{tag}</span>
              ))}
            </div>

            <p>{dashboardContent.projectSummary}</p>
            <div className="insight-box">
              AI Recommendation: “Use your actual resume evidence to strengthen the project narrative and add measurable impact.”
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
            <span className="pill">{dashboardContent.weeklyMissionFinish}</span>
          </div>

          <ul className="mission-list">
            {dashboardContent.weeklyMission.map((item, index) => (
              <li key={item}> {index < 4 ? '✓' : '□'} {item}</li>
            ))}
          </ul>

          <div className="weekly-summary">
            AI Weekly Summary: “Your resume-driven plan is aligned with the skills and projects currently visible in your profile.”
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
            {dashboardContent.opportunities.map((opportunity) => (
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
                <p>{opportunity.title === 'Add project evidence' ? 'Add project details to improve visibility and match strength.' : 'Your resume evidence supports this career direction and indicates a good fit based on visible skills.'}</p>
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
            <span className="pill">{dashboardContent.applications.reduce((total, item) => total + item.value, 0)} apps</span>
          </div>

          <div className="kanban">
            {dashboardContent.applications.map((item) => (
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
            {dashboardContent.timeline.map((item) => (
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
            {dashboardContent.achievements.map((achievement) => (
              <div className="achievement-item" key={achievement}>{achievement}</div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Dashboard;
