import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../../assets/css/clients.css";
import "../../assets/css/skill.css";
import NavBar from "../Auth/common/NavBar";
import Swal from "sweetalert2";
import { formatHumanDate } from "../../helpers/Helper";
import ApiService from "../../services/ApiService";
import viewIcon from "../../../public/view.svg";
import deleteIcon from "../../../public/delete.svg";

function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDate, setSortDate] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [viewClient, setViewClient] = useState(null);

  // Fetch contacts
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await ApiService.get("admin/contactList");
      setClients(response?.data?.data?.data ?? []);
    } catch (error) {
      Swal.fire("Error!", "Failed to fetch contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filters + sorting (FULL logic from your first file)
  const filteredClients = clients
    .filter((client) => {
      const name = client?.contact_name?.toLowerCase() || "";
      const email = client?.contact_email?.toLowerCase() || "";
      const date = formatHumanDate(client?.createdAt, "date")?.toLowerCase() || "";
      const q = searchTerm.toLowerCase();

      return (
        name.includes(q) ||
        email.includes(q) ||
        date.includes(q)
      );
    })
    .filter((client) => {
      if (statusFilter === "All") return true;
      return client?.status === statusFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a?.createdAt || 0);
      const dateB = new Date(b?.createdAt || 0);
      return sortDate === "desc" ? dateB - dateA : dateA - dateB;
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Contact will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await ApiService.delete(`admin/contact/${id}`);
          if (response?.data?.status == true) {
            fetchClients();
            Swal.fire("Deleted!", "Contact has been deleted.", "success");
          } else {
            Swal.fire("Success!", response?.data?.message || "Something went wrong.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message || error.message, "error");
        }
      }
    });
  };

  const openModal = (client) => {
    setViewClient(client);
    setShowModal(true);
  };

  return (
    <div className="clients-container">
      <NavBar />
      <div className="main-content">
        <div className="clients-title d-flex justify-content-between align-items-center">
          <span>Contact Messages</span>
        </div>

        {/* Search + Filters */}
        <div className="control-section d-flex gap-3">

          {/* Search */}
          <div className="search-box">
            <CiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search Contact"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Status Filter */}


          {/* Date Sorting */}

        </div>

        {/* Table */}
        <div className="table-container">
          {loading ? (
            <p>Loading contacts...</p>
          ) : (
            <table className="clients-table table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.map((client) => (
                  <tr key={client?.id}>
                    <td>#{client?.id}</td>
                    <td>{client?.contact_name || "N/A"}</td>
                    <td>{client?.contact_email || "N/A"}</td>
                    <td>{formatHumanDate(client?.createdAt, "date") || "N/A"}</td>

                    <td className="action-button">
                      <button className="me-2" onClick={() => openModal(client)} title="View">
                        <img src={viewIcon} alt="View" width={20} />
                      </button>
                      <button className="me-2" onClick={() => handleDelete(client?.id)} title="Delete">
                        <img src={deleteIcon} alt="Delete" width={20} />
                      </button>
                    </td>
                  </tr>
                ))}

                {paginatedClients.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center">No contacts found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination with Dots (Same as your first file) */}
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
              {(() => {
                let pages = [];
                const start = Math.max(2, currentPage - 2);
                const end = Math.min(totalPages - 1, currentPage + 2);

                pages.push(
                  <button
                    key={1}
                    className={`pagination-number ${currentPage === 1 ? "active" : ""}`}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                );

                if (start > 2) pages.push(<span key="dots1" className="pagination-dots">...</span>);

                for (let i = start; i <= end; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`pagination-number ${currentPage === i ? "active" : ""}`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }

                if (end < totalPages - 1) pages.push(<span key="dots2" className="pagination-dots">...</span>);

                if (totalPages > 1) {
                  pages.push(
                    <button
                      key={totalPages}
                      className={`pagination-number ${currentPage === totalPages ? "active" : ""}`}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  );
                }
                return pages;
              })()}
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

      {/* View Modal */}
{showModal && viewClient && (
  <div className="modal-overlay-modern">
    <div className="modal-box-modern animate__animated animate__zoomIn">
      
      <div className="modal-top">
        <h3 className="modal-title-modern">
          Contact Details
        </h3>
        <button className="modal-close-modern" onClick={() => setShowModal(false)}>×</button>
      </div>

      <div className="modal-body-modern">

        <div className="modal-row">
          <label>ID</label>
          <span>#{viewClient?.id}</span>
        </div>

        <div className="modal-row">
          <label>Name</label>
          <span>{viewClient?.contact_name}</span>
        </div>

        <div className="modal-row">
          <label>Email</label>
          <span>{viewClient?.contact_email}</span>
        </div>

        <div className="modal-row">
          <label>Subject</label>
          <span>{viewClient?.subject}</span>
        </div>

        <div className="modal-row">
          <label>Message</label>
          <span>{viewClient?.message}</span>
        </div>

        <div className="modal-row">
          <label>Submitted By</label>
          <span>{viewClient?.username}</span>
        </div>

        <div className="modal-row">
          <label>Created At</label>
          <span>{formatHumanDate(viewClient?.createdAt, "dateTime")}</span>
        </div>

        <div className="modal-row">
          <label>Updated At</label>
          <span>{formatHumanDate(viewClient?.updatedAt, "dateTime")}</span>
        </div>

      </div>

      <div className="modal-footer-modern">
        <button className="btn btn-success float-end p-2 my-2" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>

    </div>
  </div>
)}
<style
  dangerouslySetInnerHTML={{
    __html: `
      .modal-overlay-modern {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.45);
        backdrop-filter: blur(3px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
      }

      .modal-box-modern {
        width: 500px;
        max-width: 90%;
        background: #ffffffdd;
        backdrop-filter: blur(10px);
        padding: 20px 25px;
        border-radius: 18px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        animation-duration: 0.4s;
      }

      .modal-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .modal-title-modern {
        font-size: 22px;
        font-weight: 600;
        margin: 0;
      }

      .modal-close-modern {
        background: #ff4d4d;
        color: #fff;
        border: none;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        transition: 0.2s;
      }

      .modal-close-modern:hover {
        background: #e60000;
      }

      .modal-body-modern {
        margin-top: 18px;
      }

      .modal-row {
        display: flex;
        justify-content: space-between;
        margin: 8px 0;
        padding: 10px 12px;
        background: #f6f6f6;
        border-radius: 8px;
      }

      .modal-row label {
        font-weight: 600;
        color: #444;
      }

      .modal-row span {
        font-weight: 500;
        color: #222;
      }

      .modal-footer-modern {
        margin-top: 20px;
        text-align: right;
      }

      .modal-btn-close {
        background: #4a5568;
        color: white;
        padding: 8px 18px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: 0.2s;
      }

      .modal-btn-close:hover {
        background: #2d3748;
      }
    `,
  }}
/>

    </div>
  );
}

export default Clients;
