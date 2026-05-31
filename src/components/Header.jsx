import React from "react";
import { profileData } from "../data/profileData";
import "./Header.css";

export default function Header() {
  const { name, designation, affiliation, institution, contact } = profileData;
  return (
    <header className="header">
      <div className="header-bg-pattern" />
      <div className="header-inner">
        <div className="header-info">
          <h1 className="header-name">{name}</h1>
          <p className="header-designation">
            {designation}
            <span className="header-affiliation"> ({affiliation})</span>
          </p>
          <p className="header-dept">{institution.department}</p>
          <p className="header-inst">{institution.name}, {institution.location}</p>
          <div className="header-row">
            <div className="header-contact">
              <a href={`mailto:${contact.email}`} className="contact-chip">
                <span className="chip-icon">✉</span> {contact.email}
              </a>
              <span className="contact-chip">
                <span className="chip-icon chip-phone">📞</span> {contact.phone}
              </span>
            </div>
          </div>
          <div className="header-profile-links">
            <a href={profileData.profileLinks.webOfScience} target="_blank" rel="noreferrer" className="profile-link-badge wos">
              Web of Science
            </a>
            <a href={profileData.profileLinks.scopus} target="_blank" rel="noreferrer" className="profile-link-badge scopus">
              Scopus
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
