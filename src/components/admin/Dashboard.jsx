import React from "react";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/dashboard.css";
function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        {/* Navbar */}
        <div>
          <NavBar />
        </div>

        {/* Main content */}
        <main className="main-content">
          <h1 className="dashboard-title">Dashboard</h1>
          <div className="stats-grid">
            <div className="stat-card talents">
              <h3 className="stat-title">Total Talents</h3>
              <p className="stat-number">1,234</p>
            </div>
            <div className="stat-card tasks">
              <h3 className="stat-title">Total Tasks</h3>
              <p className="stat-number">1,234</p>
            </div>
            <div className="stat-card clients">
              <h3 className="stat-title">Total Clients</h3>
              <p className="stat-number">1,234</p>
            </div>
          </div>

          <div className="content-grid">
            {/* Recent activity */}
            <h2 className="card-title">Recent Acivity</h2>
            <div className="card">
              <div className="card-content">
                <div className="activity-header">
                  <div className="activity-header-cell">Activity</div>
                  <div className="activity-header-cell">Date</div>
                  <div className="activity-header-cell">User</div>
                </div>

                <div className="activity-row">
                  <div className="activity-cell">
                    Talent 'Software Engineer' created
                  </div>
                  <div className="activity-cell secondary">2023-09-20</div>
                  <div className="activity-cell secondary">Alex Harper</div>
                </div>

                <div className="activity-row">
                  <div className="activity-cell">
                    Talent 'Emily Carter' invited
                  </div>
                  <div className="activity-cell secondary">2023-09-19</div>
                  <div className="activity-cell secondary">Jordan Bennett</div>
                </div>

                <div className="!border-none activity-row ">
                  <div className="activity-cell">
                    Client 'Tech Innovators Inc.' added
                  </div>
                  <div className="activity-cell secondary">2023-09-18</div>
                  <div className="activity-cell secondary">Taylor Hayes</div>
                </div>
              </div>
            </div>

            {/* Alert content */}
            <h2 className="card-title">System Alerts</h2>
            
              <div className="card-content">
                <div className="alert-container">
                  <div className="alert">
                    <div className="alert-icon"></div>
                    <div className="alert-content">
                      <div className="alert-title">
                        Payment processing delay
                      </div>
                      <div className="alert-date">2023-1-1</div>
                    </div>
                  </div>
                  <div className="alert">
                    <div className="alert-icon"></div>
                    <div className="alert-content">
                      <div className="alert-title">
                        New Talent application pending review
                      </div>
                      <div className="alert-date">2023-2-2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        </main>
      </div>
    </>
  );
}

export default Dashboard;
