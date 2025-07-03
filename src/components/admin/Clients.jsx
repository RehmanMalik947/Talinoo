import React, { useState } from "react";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/clients.css";
import { CiSearch } from "react-icons/ci";

import deleteIcon from "../../../public/delete.svg";
import viewIcon from "../../../public/view.svg";

function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDate, setSortDate] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSortDate = (e) => {
    setSortDate(e.target.value);
  };

  const [clients] = useState([
  {
    id: 1,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    status: "Active",
    date: "2023-01-15",
  },
  {
    id: 2,
    name: "Global Innovations",
    email: "info@globalinnovations.com",
    status: "Inactive",
    date: "2023-02-20",
  },
  {
    id: 3,
    name: "Tech Solutions Inc.",
    email: "support@techsolutions.com",
    status: "Active",
    date: "2023-03-10",
  },
  {
    id: 4,
    name: "Creative Minds LLC",
    email: "hello@creativeminds.com",
    status: "Active",
    date: "2023-04-05",
  },
  {
    id: 5,
    name: "Dynamic Systems",
    email: "admin@dynamicsystems.com",
    status: "Inactive",
    date: "2023-05-12",
  },
  {
    id: 6,
    name: "Innovative Designs",
    email: "team@innovativedesigns.com",
    status: "Active",
    date: "2023-06-18",
  },
  {
    id: 7,
    name: "Strategic Ventures",
    email: "contact@strategicventures.com",
    status: "Inactive",
    date: "2023-07-22",
  },
  {
    id: 8,
    name: "Future Tech Group",
    email: "info@futuretechgroup.com",
    status: "Active",
    date: "2023-08-30",
  },
  {
    id: 9,
    name: "Elite Solutions",
    email: "support@elitesolutions.com",
    status: "Active",
    date: "2023-09-15",
  },
  {
    id: 10,
    name: "Pinnacle Enterprises",
    email: "hello@pinnacleenterprises.com",
    status: "Inactive",
    date: "2023-10-01",
  },
  {
    id: 11,
    name: "Cloud Matrix",
    email: "support@cloudmatrix.com",
    status: "Active",
    date: "2023-03-12",
  },
  {
    id: 12,
    name: "Byte Logic",
    email: "info@bytelogic.com",
    status: "Inactive",
    date: "2023-02-09",
  },
  {
    id: 13,
    name: "Quantum Leap",
    email: "team@quantumleap.com",
    status: "Active",
    date: "2023-05-25",
  },
  {
    id: 14,
    name: "NexaTech",
    email: "hello@nexatech.com",
    status: "Inactive",
    date: "2023-04-17",
  },
  {
    id: 15,
    name: "DataCore Solutions",
    email: "info@datacoresolutions.com",
    status: "Active",
    date: "2023-01-30",
  },
  {
    id: 16,
    name: "AlphaGrid",
    email: "contact@alphagrid.com",
    status: "Active",
    date: "2023-03-14",
  },
  {
    id: 17,
    name: "Blue Ocean Ltd",
    email: "info@blueocean.com",
    status: "Inactive",
    date: "2023-04-10",
  },
  {
    id: 18,
    name: "VisionSoft",
    email: "team@visionsoft.com",
    status: "Active",
    date: "2023-06-05",
  },
  {
    id: 19,
    name: "RedPoint Technologies",
    email: "contact@redpointtech.com",
    status: "Inactive",
    date: "2023-05-09",
  },
  {
    id: 20,
    name: "SmartEdge",
    email: "support@smartedge.com",
    status: "Active",
    date: "2023-07-01",
  },
  {
    id: 21,
    name: "NextEra Solutions",
    email: "info@nexterasolutions.com",
    status: "Inactive",
    date: "2023-08-15",
  },
  {
    id: 22,
    name: "CoreFusion",
    email: "hello@corefusion.com",
    status: "Active",
    date: "2023-09-18",
  },
  {
    id: 23,
    name: "ZenithWorks",
    email: "team@zenithworks.com",
    status: "Active",
    date: "2023-10-11",
  },
  {
    id: 24,
    name: "SkyNet Labs",
    email: "support@skynetlabs.com",
    status: "Inactive",
    date: "2023-11-05",
  },
  {
    id: 25,
    name: "UltraNode",
    email: "contact@ultranode.com",
    status: "Active",
    date: "2023-12-01",
  },
  {
    id: 26,
    name: "Infinity Corp",
    email: "team@infinitycorp.com",
    status: "Inactive",
    date: "2023-11-12",
  },
  {
    id: 27,
    name: "ApexLogic",
    email: "info@apexlogic.com",
    status: "Active",
    date: "2023-09-30",
  },
  {
    id: 28,
    name: "NetSphere",
    email: "hello@netsphere.com",
    status: "Active",
    date: "2023-06-20",
  },
  {
    id: 29,
    name: "Bright Solutions",
    email: "support@brightsolutions.com",
    status: "Inactive",
    date: "2023-05-27",
  },
  {
    id: 30,
    name: "CodeCraft Ltd",
    email: "contact@codecraft.com",
    status: "Active",
    date: "2023-04-14",
  },
]);


  const filteredClients = clients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (client) => statusFilter === "All" || client.status === statusFilter
    )
    .sort((a, b) => {
      if (sortDate === "desc") {
        return new Date(b.date) - new Date(a.date);
      }
      return new Date(a.date) - new Date(b.date);
    });

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleDelete=()=>{
    console.log("data deleted")
  }

  const handleView=()=>{
    console.log("data viewd")
  }

  return (
    <>
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
                onChange={handleSearch}
                className="search-input"
              />
            </div>

            <div className="filter">
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="filter-select"
              >
                <option value="All">Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={sortDate}
                onChange={handleSortDate}
                className="filter-select"
              >
                <option value="All">Date </option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
          <div className="table-container">
            <table className="clients-table">
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
                  <tr key={client.id}>
                    <td className="client-name">{client.name}</td>
                    <td className="client-email">{client.email}</td>
                    <td className="status-cell">
                      <div
                        className={`status-badge ${client.status.toLowerCase()}`}>
                        {client.status}
                      </div>
                    </td>

                    <td>
                      <span className="client-date">{client.date}</span>
                    </td>
                    <td className="action-button">
                      <button className="delete-button" onClick={()=>handleDelete(client.id)}>
                        <img src={deleteIcon} alt="Delete" />
                      </button>
                      <button className="view-button " onClick={()=>handleView(client.id)}>
                        <img src={viewIcon} alt="View" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clients;
