import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../Auth/common/NavBar";
import "../../assets/css/talentProfile.css";
import Reviewer1 from "../../../public/Reviewer1.svg";
import Reviewer2 from "../../../public/Reviewer2.svg";
import PortfolioImage from "../../../public/PortfolioImage.svg";
import { BiLike, BiDislike, BiSlideshow } from "react-icons/bi";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { formatHumanDate } from "../../helpers/Helper";
import ApiService from "../../services/ApiService";

function TalentProfile() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id"); // Get id from URL
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [detailsUser, setdetailsUser] = useState(null);

  const avatar = location?.state?.profile || "";
  useEffect(() => {
    const fetchdetailsUser = async () => {
      try {
        setLoading(true);
        const response = await ApiService.post("admin/detailsUser", {
          id: userId,
        }); // Replace with your API endpoint
        setdetailsUser(response?.data?.data || null);
      } catch (error) {
        console.error("Error fetching detailsUser:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdetailsUser();
  }, [userId]);
  const talentTitle =
    detailsUser?.userInfo?.skills?.length > 0
      ? detailsUser.userInfo.skills.map((s) => s.name).join("/")
      : "No skills";

  const talentData = {
    id: detailsUser?.id,
    name: detailsUser?.username,
    email: detailsUser?.email,
    talentTitle,
    status: detailsUser?.is_verified == true ? "Active" : "Inactive",
    joinDate: detailsUser?.userInfo?.dataValues?.created_at,
    location: detailsUser?.country,
    avatar,
    about: detailsUser?.userInfo?.about || "",
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  const reviews = [
    {
      id: 1,
      reviewerName: "Liam Harper",
      reviewerAvatar: Reviewer1,
      date: "May 2023",
      rating: 5,
      comment:
        "Sophia is an excellent talent to work with. She provides clear instructions and is very responsive to questions. I highly recommend her for any project.",
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

  const talentHistory = [
    {
      title: "Singer",
      talent: "Sophia Carter",
      startDate: "2022-01-15",
      endDate: "2023-06-30",
      earning: "$50,000",
    },
    {
      title: "Chef",
      talent: "Sophia Carter",
      startDate: "2021-07-01",
      endDate: "2021-12-31",
      earning: "$25,000",
    },
    {
      title: "Painter",
      talent: "Sophia Carter",
      startDate: "2021-01-01",
      endDate: "2021-06-30",
      earning: "$15,000",
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rounded ? "filled" : ""}`}></span>
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
    <div className="talent-details-container">
      <NavBar />
      <div className="main-content">
        {/* Breadcrumb */}
        <div>
          <span className="breadcrumb">
            {" "}
            <span style={{ color: "#6D028E" }}>Talents</span> / Talent Details
          </span>
        </div>

        {/* Header */}
        <div className="talent-header">
          <div className="talent-profile-info">
            <div className="talent-avatar">
              <img
                src={talentData.avatar}
                alt="talent-avatar"
                className="empinfo-img"
              />
            </div>
            <div className="talent-details">
              <p className="talent-name">
                {talentData?.name
                  ? talentData.name.charAt(0).toUpperCase() +
                    talentData.name.slice(1)
                  : ""}
              </p>
              <p className="talent-title">{talentData.talentTitle}</p>
              <p className="talent-joinedDate">
                Joined {formatHumanDate(talentData.joinDate, "year")}
              </p>
            </div>
          </div>
          <button className="report-button" onClick={handleReportUser}>
            Report Talent
          </button>
        </div>

        {/* Content */}
        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-content">
              {/* About */}
              {/* <div className="about-section">
                <h2 className="talent-about">About</h2>
                <p>{talentData.about}</p>
              </div> */}

              {/* SKills */}
              <div className="skills-section">
                <h2 className="talent-skills">Skills</h2>
                <div className="skills">
                  {detailsUser?.userInfo?.skills?.length > 0 ? (
                    detailsUser?.userInfo?.skills?.map((skill, index) => (
                      <p key={index} className="skill">
                        {skill.name}
                      </p>
                    ))
                  ) : (
                    <p className="skill">No skills</p>
                  )}
                </div>
              </div>

              {/* Portfolio Section */}
              <h2 className="portfolio-title">Portfolio</h2>
              <div className="portfolio-section">
                <div className="arrow">
                  <HiOutlineArrowSmLeft />
                </div>
                <div className="Slider">
                  <Slider {...settings}>
                    {detailsUser?.mediaItems?.length > 0 ? (
                      detailsUser.mediaItems.map((media, index) => {
                        const fileUrl = media.fileUrl;
                        const extension = fileUrl
                          ?.split(".")
                          .pop()
                          ?.toLowerCase();

                        const isVideo = ["mp4", "mov", "webm", "ogg"].includes(
                          extension
                        );

                        return (
                          <div>
                            {isVideo ? (
                              <video src={fileUrl} className="empinfo-img" />
                            ) : (
                              <img
                                src={fileUrl}
                                alt={`media-${index}`}
                                className="empinfo-img"
                              />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <img src={PortfolioImage} />
                      </div>
                    )}
                  </Slider>
                </div>
                <div className="arrow">
                  <HiOutlineArrowSmRight />
                </div>{" "}
              </div>
              {/* Reviews */}
              <div className="reviews-section">
                <h2>Reviews</h2>

                {/* Rating Summary */}
                <div className="rating-summary">
                  <div className="rating-score">
                    <span className="score">{detailsUser?.rating}</span>
                    {renderStars(detailsUser?.rating)}
                    <span className="total-reviews">
                      {detailsUser?.totalReviews} reviews
                    </span>
                  </div>

                  <div className="rating-breakdown">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star}>
                        {renderRatingBar(
                          star,
                          detailsUser?.ratingBreakdown[star] || 0
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="reviews-list">
                  {detailsUser?.reviews?.length > 0 ? (
                    detailsUser.reviews.map((review) => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <div className="reviewer-info">
                            <img
                              src={
                                review.reviewer?.profile_photo ||
                                "/default-avatar.png"
                              }
                              alt={review.reviewer?.username}
                              className="reviewer-avatar"
                            />
                            <div>
                              <h4 className="reviewer-name">
                                {review.reviewer?.username}
                              </h4>
                              <span className="review-date">
                                {review.createdAtFormatted}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="review-rating">
                          {renderStars(review.rating)}
                        </div>

                        <p className="review-comment">{review.comment}</p>

                        <div className="review-actions">
                          <button
                            className={`like-button ${
                              review.userLiked ? "active" : ""
                            }`}
                          >
                            <BiLike /> {review.likesCount}
                          </button>
                          {/* if you’re also tracking dislikes */}
                          {review.dislikes > 0 && (
                            <button className="dislike-button">
                              <BiDislike /> {review.dislikes}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No reviews available</p>
                  )}
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
                <th>Client</th>
                <th>Talent</th>
                <th>Slots</th>
                <th>Earning</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {detailsUser?.bookings?.length > 0 ? (
                detailsUser.bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking?.client?.username || "N/A"}</td>
                    <td className="link">
                      {booking?.talent?.username || "N/A"}
                    </td>
                    <td>
                      {booking.slots?.length > 0 ? (
                        <ul style={{ margin: 0, paddingLeft: "15px" }}>
                          {booking.slots.map((slot) => (
                            <li key={slot.id}>
                              {slot.slot_date} ({slot.slot})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "No Slots"
                      )}
                    </td>
                    <td>
                      {booking.total_price} {booking.currency}
                    </td>
                    <td>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No Bookings Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="verification">
          <p className="block">Block User</p>
          <p className="verify">Verify Profile</p>
        </div>
      </div>
    </div>
  );
}
export default TalentProfile;
