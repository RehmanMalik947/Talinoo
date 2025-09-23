import React, { useState, useEffect } from "react";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/tasks.css";
import { CiSearch } from "react-icons/ci";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [tasks, settasks] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ added missing state
  const navigate = useNavigate();
  const handleView = (talent_id, profile_photo) =>
    navigate(`/talentprofile?id=${talent_id}`, {
      state: { profile: profile_photo },
    });

  // 🔹 Fetch tasks API
  useEffect(() => {
    const fetchtasks = async () => {
      try {
        setLoading(true);
        const response = await ApiService.post("admin/talent"); // ✅ API endpoint
        settasks(response?.data?.data?.talents || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchtasks();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleStatusFilter = (e) => setStatusFilter(e.target.value);

  const filteredtasks = tasks
    .filter((t) =>
      `${t.title || ""} ${t.client || ""} ${t.name || ""}`
        .toLowerCase()
        .includes(searchTerm?.toLowerCase())
    )
    .filter((t) => statusFilter === "All" || t.status === statusFilter);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredtasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedtasks = filteredtasks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="tasks-container">
      <NavBar />
      <div className="main-content">
        <div className="tasks-title">Tasks</div>

        <div className="control-section">
          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="filter">
            <button
              value="All"
              onClick={handleStatusFilter}
              className="filter-select"
            >
              All
            </button>
            <button
              value="Pending"
              onClick={handleStatusFilter}
              className="filter-select"
            >
              Pending
            </button>
            <button
              value="Completed"
              onClick={handleStatusFilter}
              className="filter-select"
            >
              Completed
            </button>
          </div>
        </div>

        <div className="table-container">
          {loading ? ( // ✅ optional: show loading state
            <p>Loading tasks...</p>
          ) : (
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Task Type</th>
                  <th>Client</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th style={{ color: "#6d028e" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedtasks.map((talent) => (
                  <tr key={talent.id}>
                    <td>{talent.full_name}</td>
                    <td className="tasks-client">{talent.gender}</td>
                    <td className="tasks-name">{talent.country}</td>
                    <td className="tasks-name">{talent?.user?.email}</td>

                    <td>
                      <div
                        className={`status-badge ${
                          talent.status ? talent.status.toLowerCase() : ""
                        }`}
                      >
                        {talent.status || "N/A"}
                      </div>
                    </td>
                    {/* <td className="tasks-date">{talent.date}</td> */}
                    <td className="action-button">
                      <button
                        onClick={() =>
                          handleView(talent?.user?.id, talent.profile_photo)
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
                className={`pagination-number ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="pagination-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
