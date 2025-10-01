import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/clients.css";
import "../../assets/css/skill.css";
import NavBar from "../Auth/common/NavBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../../public/delete.svg";
import editIcon from "../../../public/edit-file.svg";
import { formatHumanDate } from "../../helpers/Helper";
import ApiService from "../../services/ApiService";

function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDate, setSortDate] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // For Create/Update Modal
  const [showModal, setShowModal] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [formData, setFormData] = useState({ name: "", status: "pending" });

  const navigate = useNavigate();

  // Fetch clients
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get("admin/skill-All"); // Fixed endpoint - was "admin/skill-All"
      setClients(response?.data?.data?.skills || response?.data?.data || []); // Fixed data path
    } catch (error) {
      console.error("Error fetching clients:", error);
      Swal.fire("Error!", "Failed to fetch clients", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filter + sort
  const filteredClients = clients
    .filter((client) => {
      const name = client?.name || client?.username || "";
      const email = client?.email || "";
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .filter((client) => statusFilter === "All" || client?.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt || a?.userInfo?.created_at || a?.date || 0);
      const dateB = new Date(b?.createdAt || b?.userInfo?.created_at || b?.date || 0);
      return sortDate === "desc" ? dateB - dateA : dateA - dateB;
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Create / Update form open
  const openModal = (client = null) => {
    if (client) {
      setEditClient(client);
      setFormData({
        name: client.name || client.username || "",
        status: client.status || "pending"
      });
    } else {
      setEditClient(null);
      setFormData({ name: "", status: "pending" });
    }
    setShowModal(true);
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editClient) {
        response = await ApiService.put(`admin/clients/${editClient.id}`, formData); // Fixed to use PUT for update
      } else {
        response = await ApiService.post("admin/clients", formData);
      }

      if (response?.data?.success) {
        Swal.fire("Success!", editClient ? "Client updated" : "Client created", "success");
        setShowModal(false);
        fetchClients();
      } else {
        Swal.fire("Error!", response?.data?.message || "Something went wrong.", "error");
      }
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || err.message || "Something went wrong", "error");
    }
  };

  const handleView = (client_id, profile_photo) => {
    navigate(`/clientdetails?id=${client_id}`, { state: { profile_photo } });
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This client will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await ApiService.delete(`admin/clients/${id}`); // Fixed to use DELETE method
          if (response?.data?.success) {
            Swal.fire("Deleted!", "Client has been deleted.", "success");
            fetchClients();
          } else {
            Swal.fire("Error!", response?.data?.message || "Something went wrong.", "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message || error.message || "API request failed.", "error");
        }
      }
    });
  };

  return (
    <div className="clients-container">
      <NavBar />
      <div className="main-content">
        <div className="clients-title d-flex justify-content-between align-items-center">
          <span>Clients</span>
          <button className="btn btn-primary" onClick={() => openModal()}>
            + Add Client
          </button>
        </div>

        {/* Search + Filters */}
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
              <option value="All">All</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="blocked">Blocked</option>
            </select>
            <select
              value={sortDate}
              onChange={(e) => setSortDate(e.target.value)}
              className="filter-select"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="table-container">
          {loading ? (
            <p>Loading clients...</p>
          ) : (
            <table className="clients-table table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>CreatedAt</th>
                  <th>UpdatedAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((client) => (
                  <tr key={client?.id}>
                    <td>#{client?.id}</td>
                    <td>{client?.name || client?.username || "N/A"}</td>
                    <td>
                      <span className={`status-badge status-${client?.status || "unknown"}`}>
                        {client?.status || "N/A"}
                      </span>
                    </td>
                    <td>{formatHumanDate(client?.createdAt || client?.userInfo?.created_at, "date") || "N/A"}</td>
                    <td>{formatHumanDate(client?.updatedAt || client?.userInfo?.updated_at, "date") || "N/A"}</td>
                    <td className="action-button">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => openModal(client)}
                        title="Edit"
                      >
                        <img src={editIcon} alt="Edit" width={20} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger me-2"
                        onClick={() => handleDelete(client?.id)}
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" width={20} />
                      </button>
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleView(client?.id, client?.profile_photo)}
                        title="View"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedClients.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">No clients found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
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
                  className={`pagination-number ${currentPage === page ? "active" : ""}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              className="pagination-btn next-btn"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              &#62;
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content-custom">
            <div className="modal-header">
              <h5 className="modal-title">{editClient ? "Edit Client" : "Add Client"}</h5>
              <button type="button" className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {editClient ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;