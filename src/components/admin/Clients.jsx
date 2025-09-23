import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/clients.css";
import NavBar from "../Auth/common/NavBar";

import { useNavigate } from "react-router";
import deleteIcon from "../../../public/delete.svg";
import viewIcon from "../../../public/view.svg";
import { formatHumanDate } from "../../helpers/Helper";
import ApiService from "../../services/ApiService"; // Make sure your ApiService is correctly imported

function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDate, setSortDate] = useState("Date");
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await ApiService.post("admin/client"); // Replace with your API endpoint
        setClients(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Filter and sort clients safely
  const filteredClients = clients
    .filter(
      (client) =>
        (client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (client?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (client) => statusFilter === "All" || client?.is_verified === statusFilter
    )
    .sort((a, b) =>
      sortDate === "desc"
        ? new Date(b?.date || 0) - new Date(a?.date || 0)
        : new Date(a?.date || 0) - new Date(b?.date || 0)
    );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleView = (client_id, profile_photo) => {
    navigate(`/clientdetails?id=${client_id}`, { state: { profile_photo } });
  };

  const handleDelete = (id) => console.log("Deleted", id);

  return (
    <div className="clients-container">
      <NavBar />
      <div className="main-content">
        <div className="clients-title">Clients</div>

        <div className="control-section">
          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search clients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
              className="filter-select"
            >
              <option value="All">Date</option>
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>
        </div>

        <div className="table-container">
        {loading ? ( // ✅ optional: show loading state
            <p>Loading clients...</p>
          ) :
          (<table className="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Email</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.map((client) => (
                <tr key={client?.id || Math.random()}>
                  <td>{client?.username || "N/A"}</td>
                  <td>{client?.email || "N/A"}</td>
                  <td>
                    <div
                      className={`status-badge ${
                        client?.is_verified === true ||
                        client?.is_verified === "Active"
                          ? "active"
                          : "inactive"
                      }`}
                    >
                      {client?.is_verified != null
                        ? client?.is_verified === true
                          ? "Active"
                          : client?.is_verified === false
                          ? "Inactive"
                          : client?.is_verified
                        : "Unknown"}
                    </div>
                  </td>
                  <td>
                    {formatHumanDate(client?.userInfo?.created_at, "date") ||
                      "N/A"}
                  </td>
                  <td className="action-button">
                    <button onClick={() => handleDelete(client?.id)}>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                    <button
                      onClick={() =>
                        handleView(client?.id, client?.userInfo?.profile_photo)
                      }
                    >
                      <img src={viewIcon} alt="View" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedClients.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No clients found
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>)}
        </div>

        <div className="pagination-container">
          <button
            className="pagination-btn prev-btn"
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
            className="pagination-btn next-btn"
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
}

export default Clients;
