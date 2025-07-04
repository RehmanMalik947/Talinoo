import React, { useState } from "react";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/talents.css";
import { CiSearch } from "react-icons/ci";

const Talent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const talents = [
  {
    id: 11,
    title: "DevOps Engineer",
    client: "CloudWorks Inc.",
    name: "Benjamin Carter",
    status: "Active",
    date: "2023-08-02",
  },
  {
    id: 12,
    title: "Mobile App Developer",
    client: "Appify Labs",
    name: "Chloe Morgan",
    status: "Inactive",
    date: "2023-06-19",
  },
  {
    id: 13,
    title: "Technical Writer",
    client: "DocuMentors",
    name: "Lucas Hall",
    status: "Active",
    date: "2023-07-25",
  },
  {
    id: 14,
    title: "Cybersecurity Analyst",
    client: "SecureNet Ltd.",
    name: "Amelia Scott",
    status: "Active",
    date: "2023-09-08",
  },
  {
    id: 15,
    title: "AI Engineer",
    client: "FutureTech AI",
    name: "James Lewis",
    status: "Inactive",
    date: "2023-08-30",
  },
  {
    id: 16,
    title: "Graphic Designer",
    client: "DesignStudio",
    name: "Grace Adams",
    status: "Active",
    date: "2023-06-28",
  },
  {
    id: 17,
    title: "Network Administrator",
    client: "IT Connects",
    name: "Daniel Ramirez",
    status: "Active",
    date: "2023-07-14",
  },
  {
    id: 18,
    title: "SEO Specialist",
    client: "RankBoost Media",
    name: "Ella Rivera",
    status: "Inactive",
    date: "2023-08-07",
  },
  {
    id: 19,
    title: "Business Analyst",
    client: "Insight Corp",
    name: "Henry Wood",
    status: "Active",
    date: "2023-09-02",
  },
  {
    id: 20,
    title: "Frontend Developer",
    client: "Pixel Perfect Co.",
    name: "Sofia Bennett",
    status: "Active",
    date: "2023-07-21",
  },
  {
    id: 21,
    title: "Backend Developer",
    client: "CodeBase Ltd.",
    name: "Jackson Hughes",
    status: "Inactive",
    date: "2023-06-25",
  },
  {
    id: 22,
    title: "Systems Engineer",
    client: "SysOps Group",
    name: "Avery Brooks",
    status: "Active",
    date: "2023-08-14",
  },
  {
    id: 23,
    title: "Project Coordinator",
    client: "ManageIt Solutions",
    name: "Sebastian Rivera",
    status: "Inactive",
    date: "2023-09-01",
  },
  {
    id: 24,
    title: "Quality Assurance Engineer",
    client: "BugFree Co.",
    name: "Lily Price",
    status: "Active",
    date: "2023-07-30",
  },
  {
    id: 25,
    title: "UI Developer",
    client: "UserFirst Designs",
    name: "Owen Bailey",
    status: "Active",
    date: "2023-06-18",
  },
  {
    id: 26,
    title: "Social Media Manager",
    client: "BuzzWave Media",
    name: "Layla Cooper",
    status: "Inactive",
    date: "2023-07-05",
  },
  {
    id: 27,
    title: "Database Administrator",
    client: "DataHub Inc.",
    name: "Matthew Kelly",
    status: "Active",
    date: "2023-08-11",
  },
  {
    id: 28,
    title: "Full Stack Developer",
    client: "DevHouse",
    name: "Zoey Jenkins",
    status: "Inactive",
    date: "2023-07-27",
  },
  {
    id: 29,
    title: "Content Strategist",
    client: "ThinkContent",
    name: "Caleb Bryant",
    status: "Active",
    date: "2023-09-09",
  },
  {
    id: 30,
    title: "Cloud Architect",
    client: "SkyNet Global",
    name: "Scarlett Ward",
    status: "Active",
    date: "2023-08-03",
  },
  {
    id: 31,
    title: "IT Consultant",
    client: "SmartTech Advisors",
    name: "Wyatt Russell",
    status: "Inactive",
    date: "2023-07-11",
  },
  {
    id: 32,
    title: "Recruiter",
    client: "TalentWorks",
    name: "Nora Foster",
    status: "Active",
    date: "2023-06-29",
  },
  {
    id: 33,
    title: "Solutions Architect",
    client: "ArchitectureX",
    name: "Logan Hamilton",
    status: "Active",
    date: "2023-07-08",
  },
  {
    id: 34,
    title: "Penetration Tester",
    client: "HackShield Ltd.",
    name: "Victoria Hayes",
    status: "Inactive",
    date: "2023-09-06",
  },
  {
    id: 35,
    title: "Instructional Designer",
    client: "LearnPro Systems",
    name: "Levi Patterson",
    status: "Active",
    date: "2023-08-09",
  },
  {
    id: 36,
    title: "Technical Recruiter",
    client: "HireLoop",
    name: "Hannah Jenkins",
    status: "Active",
    date: "2023-07-24",
  },
  {
    id: 37,
    title: "Data Scientist",
    client: "DataMine Inc.",
    name: "Grayson Simmons",
    status: "Inactive",
    date: "2023-06-16",
  },
  {
    id: 38,
    title: "Information Security Officer",
    client: "CyberWall",
    name: "Zoey Torres",
    status: "Active",
    date: "2023-09-03",
  },
  {
    id: 39,
    title: "Web Developer",
    client: "NetDev Co.",
    name: "Elijah Murphy",
    status: "Active",
    date: "2023-08-17",
  },
  {
    id: 40,
    title: "Analytics Consultant",
    client: "InsightEdge",
    name: "Natalie Brooks",
    status: "Inactive",
    date: "2023-07-15",
  }
];


  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const filteredTalents = talents
    .filter((t) =>
      `${t.title} ${t.client} ${t.name}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((t) => statusFilter === "All" || t.status === statusFilter);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredTalents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTalents = filteredTalents.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="talent-container">
      <NavBar />
      <div className="main-content">
        <div className="talent-title">Talents</div>

        <div className="control-section">
          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search talents"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="filter">
            
            <button value="All" onClick={handleStatusFilter} className="filter-select">All</button>
            <button value="Active" onClick={handleStatusFilter} className="filter-select" >Active</button>
            <button value="Inactive" onClick={handleStatusFilter} className="filter-select" >Inactive</button>
          </div>
        </div>

        <div className="table-container">
          <table className="talent-table">
            <thead>
              <tr>
                <th>Talent Title</th>
                <th>Client</th>
                <th>Talent</th>
                <th>Status</th>
                <th>Posted Date</th>
                <th style={{color: "#6d028e"}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTalents.map((talent) => (
                <tr key={talent.id}>
                  <td>{talent.title}</td>
                  <td className="talent-client">{talent.client}</td>
                  <td className="talent-name">{talent.name}</td>
                  <td>
                    <div className={`status-badge ${talent.status.toLowerCase()}`}>
                      {talent.status}
                    </div>
                  </td>
                  <td className="talent-date">{talent.date}</td>
                  <td className="action-button">
                    <button onClick={() => console.log("View", talent.id)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &#60;
          </button>
          <div className="pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Talent;
