import React, { useState } from "react";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Section from "./components/Section";
import Publications from "./components/Publications";
import { profileData } from "./data/profileData";
import "./App.css";

function App() {
  const [selectedPdf, setSelectedPdf] = useState(null);

  const {
    name,
    personal,
    institution,
    contact,
    researchInterests,
    qualifications,
    experience,
    awards,
    patents,
    books,
    projects,
    memberships,
    conferencesOrganized,
    honors,
    resourcePersonSessions,
    pedagogyAndCurricula,
    eContent,
  } = profileData;

  const handleViewContent = (url) => {
    if (!url) return;
    
    const isPdf = /\.pdf($|[?#])/i.test(url);
    
    // For relative paths (local PDFs)
    if (url.startsWith('/')) {
      if (isPdf) {
        setSelectedPdf(url);
      }
      return;
    }
    
    // For external URLs (Google Drive, YouTube, etc.)
    if (url.startsWith('http://') || url.startsWith('https://')) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    
    // Fallback
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app">
      <Header />
      <NavBar />
      <main className="main-content">

        {/* About */}
        <Section id="about" title="About" icon="👤">
          <div className="about-grid">
            <div className="about-item">
              <span className="about-label">Full Name</span>
              <span className="about-value">{name}</span>
            </div>
            <div className="about-item">
              <span className="about-label">Date of Birth</span>
              <span className="about-value">{personal.dob}</span>
            </div>
            <div className="about-item">
              <span className="about-label">Gender</span>
              <span className="about-value">{personal.gender}</span>
            </div>
            <div className="about-item">
              <span className="about-label">Institute</span>
              <span className="about-value">{institution.name}</span>
            </div>
            <div className="about-item">
              <span className="about-label">Department</span>
              <span className="about-value">{institution.department}</span>
            </div>
            <div className="about-item">
              <span className="about-label">Email</span>
              <span className="about-value">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </span>
            </div>
            <div className="about-item">
              <span className="about-label">Phone</span>
              <span className="about-value">{contact.phone}</span>
            </div>
            <div className="about-item about-item-full">
              <span className="about-label">Address</span>
              <span className="about-value">{contact.address}</span>
            </div>
          </div>
        </Section>

        {/* Research Interests */}
        <Section id="research" title="Research Interests" icon="🔬">
          <div className="tags-container">
            {researchInterests.map((r) => (
              <span key={r} className="tag">{r}</span>
            ))}
          </div>
        </Section>

        {/* Qualifications */}
        <Section id="qualifications" title="Academic Qualifications" icon="🎓">
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Year</th>
                  <th>Subject</th>
                  <th>University</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {qualifications.map((q) => (
                  <tr key={q.degree}>
                    <td><span className="degree-badge">{q.degree}</span></td>
                    <td>{q.year}</td>
                    <td>{q.subject}</td>
                    <td>{q.university}</td>
                    <td>
                      {q.marks && <span>{q.marks}</span>}
                      {q.thesis && (
                        <div>
                          <small><strong>Thesis:</strong> {q.thesis}</small><br />
                          <small><strong>Guide:</strong> {q.guide}</small>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Work Experience" icon="💼">
          <div className="timeline">
            {experience.map((e, i) => (
              <div key={i} className={`timeline-item ${e.to === "Present" ? "current" : ""}`}>
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h3 className="timeline-position">{e.position}</h3>
                  <p className="timeline-inst">{e.institution}</p>
                  <span className="timeline-period">{e.from} – {e.to}</span>
                  {e.to === "Present" && <span className="current-badge">Current</span>}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Awards */}
        <Section id="awards" title="Awards & Recognitions" icon="🏆">
          <div className="awards-grid">
            {awards.map((a, i) => (
              <div key={i} className="award-card">
                <div className="award-year">{a.year}</div>
                <div className="award-body">
                  <h4 className="award-name">{a.name}</h4>
                  <p className="award-agency">{a.agency}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Patents */}
        <Section id="patents" title="Patents Filed / Granted" icon="📋">
          <div className="patents-list">
            {patents.map((p, i) => (
              <div key={i} className="patent-card">
                <div className="patent-header">
                  <span className={`patent-status ${p.status.toLowerCase()}`}>{p.status}</span>
                  <span className="patent-date">{p.date}</span>
                  <span className="patent-country">{p.country}</span>
                </div>
                <h4 className="patent-title">{p.title}</h4>
                <p className="patent-applicants">Applicants: {p.applicants}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Publications */}
        <Publications />

        {/* Books */}
        <Section id="books" title="Books / Reports / Chapters" icon="📚">
          <div className="books-list">
            {books.map((b, i) => (
              <div key={i} className="book-card">
                <div className="book-num">{i + 1}</div>
                <div>
                  <h4 className="book-title">{b.title}</h4>
                  <p className="book-meta">{b.publisher} · {b.year}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Conferences & Programs Organized */}
        <Section id="conferences" title="Programs Organized as Convener / Chair / Coordinator" icon="🎤">
          <div className="conf-cards">
            {conferencesOrganized.map((c, i) => (
              <div key={i} className="conf-card">
                <div className="conf-role-badge">{c.role}</div>
                <h4 className="conf-event">{c.event}</h4>
                <div className="conf-details">
                  <span className="conf-dates">📅 {c.dates}</span>
                  <span className="conf-venue">📍 {c.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Research Grants & Projects" icon="🧪">
          {projects.map((p, i) => (
            <div key={i} className="project-card">
              <div className="project-status-badge">{p.status}</div>
              <h4 className="project-title">{p.title}</h4>
              <div className="project-meta-grid">
                <span><strong>Funding Agency:</strong> {p.agency}</span>
                <span><strong>Role:</strong> {p.role}</span>
                <span><strong>Duration:</strong> {p.duration}</span>
                <span><strong>Cost:</strong> {p.cost}</span>
              </div>
            </div>
          ))}
        </Section>

        {/* Resource Person Sessions */}
        <Section id="resource-person" title="Resource Person for Various Programs (CSIR / AICTE / NAAC)" icon="🎙️">
          <div className="rp-table-wrapper">
            <table className="rp-table">
              <thead>
                <tr>
                  <th className="rp-col-no">S.No</th>
                  <th className="rp-col-topic">Topic Delivered</th>
                  <th className="rp-col-event">Program / Event</th>
                  <th className="rp-col-date">Date</th>
                  <th className="rp-col-org">Organizer</th>
                </tr>
              </thead>
              <tbody>
                {resourcePersonSessions.map((s, i) => (
                  <tr key={i} className="rp-row">
                    <td className="rp-col-no">{i + 1}</td>
                    <td className="rp-col-topic rp-topic">{s.topic}</td>
                    <td className="rp-col-event rp-event">{s.event}</td>
                    <td className="rp-col-date rp-date">{s.date}</td>
                    <td className="rp-col-org rp-org">{s.organizer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Memberships */}
        <Section id="memberships" title="Professional Memberships" icon="🎖️">
          <div className="memberships-list">
            {memberships.map((m, i) => (
              <div key={i} className="membership-item">
                <span className="membership-body">{m.body}</span>
                <span className="membership-id">{m.id}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Honors */}
        <Section id="honors" title="Honors & Distinctions" icon="⭐">
          <ul className="honors-list">
            {honors.map((h, i) => (
              <li key={i} className="honors-item">{h}</li>
            ))}
          </ul>
        </Section>

        {/* Innovative Pedagogy */}
        <Section id="pedagogy" title="Development Of Innovative Pedagogy" icon="📖">
          <div className="pedagogy-table-wrapper">
            <table className="pedagogy-table">
              <thead>
                <tr>
                  <th className="ped-col-no">S.No</th>
                  <th className="ped-col-title">Title of the Pedagogy</th>
                  <th className="ped-col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {pedagogyAndCurricula?.innovativePedagogies?.map((p, i) => (
                  <tr key={i} className="ped-row">
                    <td className="ped-col-no">{p.sno}</td>
                    <td className="ped-col-title ped-title">{p.title}</td>
                    <td className="ped-col-action">
                      <button
                        type="button"
                        className="ped-view-btn"
                        onClick={() => handleViewContent(p.hostedOn)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Design of New Curricula */}
        <Section id="curricula" title="Design of New Curricula / Course" icon="🎯">
          <div className="curricula-table-wrapper">
            <table className="curricula-table">
              <thead>
                <tr>
                  <th className="cur-col-no">S.No</th>
                  <th className="cur-col-title">Title of Curricula / Course</th>
                  <th className="cur-col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {pedagogyAndCurricula?.newCurricula?.map((c, i) => (
                  <tr key={i} className="cur-row">
                    <td className="cur-col-no">{c.sno}</td>
                    <td className="cur-col-title cur-title">{c.title}</td>
                    <td className="cur-col-action">
                      <button
                        type="button"
                        className="cur-view-btn"
                        onClick={() => handleViewContent(c.hostedOn)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* E-Content */}
        <Section id="econtent" title="E-Content" icon="💻">
          <div className="econtent-table-wrapper">
            <table className="econtent-table">
              <thead>
                <tr>
                  <th className="ec-col-no">S.No</th>
                  <th className="ec-col-type">E-Content</th>
                  <th className="ec-col-title">Title of the E-Content Module</th>
                  <th className="ec-col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {eContent.map((e, i) => (
                  <tr key={i} className="ec-row">
                    <td className="ec-col-no">{i + 1}</td>
                    <td className="ec-col-type ec-type">{e.type}</td>
                    <td className="ec-col-title ec-title">{e.title}</td>
                    <td className="ec-col-action">
                      <button
                        type="button"
                        className="ec-view-btn"
                        onClick={() => handleViewContent(e.url)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedPdf && (
            <div className="ec-pdf-viewer">
              <div className="ec-pdf-header">
                <span className="ec-pdf-label">Selected PDF Preview</span>
                <button
                  type="button"
                  className="ec-close-btn"
                  onClick={() => setSelectedPdf(null)}
                >
                  Close
                </button>
              </div>
              <iframe
                className="ec-pdf-frame"
                src={selectedPdf}
                title="E-Content PDF Preview"
              />
            </div>
          )}
        </Section>

      </main>

      <footer className="footer">
        <p>© 2026 All rights reserved. Developed by AtriDatta Lanka</p>
      </footer>
    </div>
  );
}

export default App;
