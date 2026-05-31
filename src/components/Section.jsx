import React from "react";
import "./Section.css";

export default function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="section-card">
      <div className="section-header">
        {icon && <span className="section-icon">{icon}</span>}
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
