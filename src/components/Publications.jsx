import React, { useState } from "react";
import { profileData } from "../data/profileData";
import Section from "./Section";
import "./Publications.css";

const PAGE_SIZE = 10;

export default function Publications() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = profileData.publications.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.journal.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase()) ||
      String(p.year).includes(search)
  );

  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <Section id="publications" title="Notable Publications (SCI Journals)" icon="📄">
      <div className="pub-stats">
        <span className="pub-count-badge">{profileData.publications.length} SCI Publications</span>
        <div className="pub-links">
          <a href={profileData.profileLinks.webOfScience} target="_blank" rel="noreferrer" className="pub-link-btn wos">
            Web of Science Profile
          </a>
          <a href={profileData.profileLinks.scopus} target="_blank" rel="noreferrer" className="pub-link-btn scopus">
            Scopus Profile
          </a>
        </div>
      </div>
      <input
        className="pub-search"
        type="text"
        placeholder="Search by title, journal, author, or year..."
        value={search}
        onChange={handleSearch}
      />
      {filtered.length === 0 ? (
        <p className="pub-no-results">No publications match your search.</p>
      ) : (
        <>
          <div className="pub-table-wrapper">
            <table className="pub-table">
              <thead>
                <tr>
                  <th className="col-sno">S.No</th>
                  <th className="col-title">Title</th>
                  <th className="col-authors">Authors</th>
                  <th className="col-journal">Journal</th>
                  <th className="col-year">Year</th>
                  <th className="col-index">Indexed</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((pub) => (
                  <tr key={pub.sno} className="pub-row">
                    <td className="col-sno">{pub.sno}</td>
                    <td className="col-title pub-title">{pub.title}</td>
                    <td className="col-authors pub-authors">{pub.authors}</td>
                    <td className="col-journal pub-journal">{pub.journal}</td>
                    <td className="col-year">
                      <span className="pub-year-badge">{pub.year}</span>
                    </td>
                    <td className="col-index">
                      <span className="pub-indexed">SCI</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="pub-pagination">
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`page-btn ${p === page ? "active" : ""}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </div>
          )}
          <p className="pub-info">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} results
          </p>
        </>
      )}
    </Section>
  );
}
