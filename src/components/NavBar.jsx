import React from "react";
import "./NavBar.css";

const sections = [
  { id: "about", label: "About" },
  { id: "qualifications", label: "Qualifications" },
  { id: "experience", label: "Experience" },
  { id: "research", label: "Research" },
  { id: "awards", label: "Awards" },
  { id: "patents", label: "Patents" },
  { id: "publications", label: "Publications" },
  { id: "books", label: "Books" },
  { id: "conferences", label: "Conferences" },
  { id: "projects", label: "Projects" },
  { id: "resource-person", label: "Resource Person" },
  { id: "memberships", label: "Memberships" },
  { id: "honors", label: "Honors" },
  { id: "pedagogy", label: "Pedagogy" },
  { id: "curricula", label: "Curricula" },
  { id: "econtent", label: "E-Content" },
];

export default function NavBar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {sections.map((s) => (
          <button key={s.id} className="nav-btn" onClick={() => scrollTo(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
