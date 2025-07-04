import React, { useState } from "react";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/clientDetails.css";
import clientImage from "../../../public/clientImage.svg";
import Reviewer1 from "../../../public/Reviewer1.svg";
import Reviewer2 from "../../../public/Reviewer2.svg";
import { BiLike, BiDislike } from "react-icons/bi";

function ClientDetails() {
  const [activeTab, setActiveTab] = useState("overview");

  const clientData = {
    id: 1,
    name: "Sohpia Baaji",
    email: "sohpiaBaaji@example.com",
    status: "Active",
    joinDate: "2002",
    location: "New York, USA",
    avatar: clientImage,
    about:
      "She is a very good lady and very punctual about her work. She is respectful and highly collaborative.",
    rating: 4.8,
    totalReviews: 12,
    ratingBreakdown: {
      5: 75,
      4: 15,
      3: 5,
      2: 3,
      1: 2,
    },
  };

  const reviews = [
    {
      id: 1,
      reviewerName: "Liam Harper",
      reviewerAvatar: Reviewer1,
      date: "May 2023",
      rating: 5,
      comment:
        "Sophia is an excellent client to work with. She provides clear instructions and is very responsive to questions. I highly recommend her for any project.",
      likes: 5,
      dislikes: 1,
    },
    {
      id: 2,
      reviewerName: "Olivia Bennett",
      reviewerAvatar: Reviewer2,
      date: "April 2023",
      rating: 4,
      comment:
        "Working with Sophia was a pleasant experience. She is organized and communicates effectively. I would definitely work with her again.",
      likes: 3,
      dislikes: 0,
    },
  ];

  const bookingHistory = [
    {
      title: "Singer",
      client: "Sophia Carter",
      startDate: "2022-01-15",
      endDate: "2023-06-30",
      spending: "$50,000",
    },
    {
      title: "Chef",
      client: "Sophia Carter",
      startDate: "2021-07-01",
      endDate: "2021-12-31",
      spending: "$25,000",
    },
    {
      title: "Painter",
      client: "Sophia Carter",
      startDate: "2021-01-01",
      endDate: "2021-06-30",
      spending: "$15,000",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rounded ? "filled" : ""}`}>
          ★
        </span>
      );
    }
    return <div className="stars-container">{stars}</div>;
  };

  const renderRatingBar = (starCount, percentage) => {
    return (
      <div className="rating-bar-container">
        <span className="rating-number">{starCount}</span>
        <div className="rating-bar">
          <div
            className="rating-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="rating-percentage">{percentage}%</span>
      </div>
    );
  };

  const handleReportUser = () => {
    console.log("HandleReportUser clicked");
  };

  return (
    <div className="client-details-container">
      <NavBar />
      <div className="main-content">
        {/* Breadcrumb */}
        <div>
          <span className="breadcrumb">Clients / Client Details</span>
        </div>

        {/* Header */}
        <div className="client-header">
          <div className="client-info">
            <div className="client-avatar">
              <img src={clientData.avatar} alt="client-avatar" className="avatar" />
            </div>
            <div className="client-details">
              <h2 className="client-name">{clientData.name}</h2>
              <p className="client-meta">Client Since {clientData.joinDate}</p>
              <p className="client-location">{clientData.location}</p>
            </div>
          </div>
          <button className="report-button" onClick={handleReportUser}>
            Report User
          </button>
        </div>

        {/* Tabs */}
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-content">
              {/* About */}
              <div className="about-section">
                <h2 className="client-about">About</h2>
                <p>{clientData.about}</p>
              </div>

              {/* Reviews */}
              <div className="reviews-section">
                <h2>Reviews</h2>

                {/* Rating Summary */}
                <div className="rating-summary">
                  <div className="rating-score">
                    <span className="score">{clientData.rating}</span>
                    {renderStars(clientData.rating)}
                    <span className="total-reviews">
                      {clientData.totalReviews} reviews
                    </span>
                  </div>

                  <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star}>
                        {renderRatingBar(
                          star,
                          clientData.ratingBreakdown[star] || 0
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img
                            src={review.reviewerAvatar}
                            alt={review.reviewerName}
                            className="reviewer-avatar"
                          />
                          <div>
                            <h4 className="reviewer-name">{review.reviewerName}</h4>
                            <span className="review-date">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="review-rating">{renderStars(review.rating)}</div>

                      <p className="review-comment">{review.comment}</p>

                      <div className="review-actions">
                        <button className="like-button">
                          <BiLike /> {review.likes}
                        </button>
                        {review.dislikes > 0 && (
                          <button className="dislike-button">
                            <BiDislike /> {review.dislikes}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="pagination-container">
                  <button className="pagination-btn prev-btn">&#60;</button>
                  <div className="pagination-numbers">
                    <button className="pagination-number active">1</button>
                    <button className="pagination-number">2</button>
                    <button className="pagination-number">3</button>
                    <span className="pagination-dots">...</span>
                    <button className="pagination-number">10</button>
                  </div>
                  <button className="pagination-btn next-btn">&#62;</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking History Section */}
          <h2 className="section-heading">Booking History</h2>
        <div className="booking-history">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Talent Title</th>
                <th>Client</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Spending</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.title}</td>
                  <td className="link">{booking.client}</td>
                  <td className="link">{booking.startDate}</td>
                  <td className="link">{booking.endDate}</td>
                  <td className="link">{booking.spending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
