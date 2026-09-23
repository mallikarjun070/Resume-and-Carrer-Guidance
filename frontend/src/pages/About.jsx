import React from 'react';
import './About.css'; 

const About = () => {
    return (
        <div className="about-page">
            <header className="about-header">
                <h1>About CareerPilot</h1>
                <p>Your command center for navigating the future of tech careers.</p>
            </header>

            <section className="about-section application-info">
                <h2>About the Application</h2>
                <p>
                    CareerPilot is an AI-powered career command center designed to help students and career switchers turn skills into clear, measurable career momentum. The platform combines AI-driven career guidance, learning roadmaps, skill proof building, resume support, and interview preparation into a single system built for action.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    CareerPilot helps users choose the right technology path, build job-ready evidence, track momentum, and move from exploration to application with confidence. The goal is to reduce career uncertainty and help users become visible to employers through proof, preparation, and strategic execution.
                </p>
            </section>

        </div>
    );
};

export default About;