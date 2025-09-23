import React, { useEffect, useState } from "react";
import "../../assets/css/feed.css";
import ApiService from "../../services/ApiService";
import { formatHumanDate } from "../../helpers/Helper";
import NavBar from "../Auth/common/NavBar";
const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [detailsFeed, setdetailsUser] = useState(null);

  useEffect(() => {
    const fetchdetailsUser = async () => {
      try {
        setLoading(true);
        const response = await ApiService.get("/feed"); // Replace with your API endpoint
        setdetailsUser(response?.data?.data || null);
      } catch (error) {
        console.error("Error fetching detailsUser:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdetailsUser();
  }, []);

  return loading == true ? (
    <p>Loading</p>
  ) : (
    <div>
      <NavBar />
      <div className="table-container">
        <table className="feed-table">
          <thead>
            <tr>
              {/* Top-level keys */}

              <th>id</th>

              <th>userId</th>

              <th>title</th>

              <th>description</th>

              <th>fileUrl</th>

              <th>type</th>

              <th>visibility</th>

              <th>likes</th>

              <th>shares</th>

              <th>skill_id</th>

              <th>createdAt</th>

              <th>updatedAt</th>

              <th>TalentRate</th>

              <th>likes_count</th>

              <th>is_liked</th>

              {/* Inside talent */}

              <th>username</th>

              <th>full_name</th>

              <th>talent_type</th>

              <th>location</th>

              <th>city</th>

              <th>country</th>

              <th>profile_photo</th>

              <th>video_url</th>

              <th>jobs</th>

              <th>rating</th>

              <th>ratinginnumber</th>

              <th>likes_count</th>

              <th>unlikes_count</th>

              <th>reaction</th>

              <th>is_liked</th>

              <th>is_unliked</th>

              <th>views</th>

              <th>is_wishlisted</th>

              <th>wishlist_count</th>

              <th>availability</th>

              {/* Inside each talentSkills object */}

              <th>id</th>

              <th>name</th>

              <th>rate</th>
            </tr>
          </thead>
          <tbody>
            {detailsFeed?.feed.length > 0
              ? detailsFeed?.feed.map((feedItem, index) => (
                  <tr key={index}>
                    {/* Top-level */}
                    <td>{feedItem?.id}</td>
                    <td>{feedItem?.userId}</td>
                    <td>{feedItem?.title}</td>
                    <td>{feedItem?.description}</td>
                    <td>{feedItem?.fileUrl}</td>
                    <td>{feedItem?.type}</td>
                    <td>
                      {feedItem?.visibility == 1 ? "Visible" : "Not Visible"}
                    </td>
                    <td>{feedItem?.likes}</td>
                    <td>{feedItem?.shares}</td>
                    <td>{feedItem?.skill_id}</td>
                    <td>{formatHumanDate(feedItem?.createdAt)}</td>
                    <td>{formatHumanDate(feedItem?.updatedAt)}</td>
                    <td>{feedItem?.TalentRate}</td>
                    <td>{feedItem?.likes_count}</td>
                    <td>
                      {feedItem?.is_liked === false ? "notliked" : "liked"}
                    </td>

                    {/* talent object */}

                    <td>{feedItem?.talent?.username}</td>
                    <td>{feedItem?.talent?.full_name}</td>
                    <td>{feedItem?.talent?.talent_type || "N/A"}</td>
                    <td>{feedItem?.talent?.location}</td>
                    <td>{feedItem?.talent?.city}</td>
                    <td>{feedItem?.talent?.country}</td>
                    <td className="profile_photo">
                      <img
                        src={feedItem?.talent?.profile_photo || ""}
                        alt="profile_photo"
                      />
                    </td>
                    <td>{feedItem?.talent?.video_url || "N/A"}</td>
                    <td>{feedItem?.talent?.jobs}</td>
                    <td>{feedItem?.talent?.rating}</td>
                    <td>{feedItem?.talent?.ratinginnumber}</td>
                    <td>{feedItem?.talent?.likes_count}</td>
                    <td>{feedItem?.talent?.unlikes_count}</td>
                    <td>{feedItem?.talent?.reaction || "N/A"}</td>
                    <td>{feedItem?.talent?.is_liked == true ? "Yes" : "No"}</td>
                    <td>
                      {feedItem?.talent?.is_unliked == true ? "yes" : "No"}
                    </td>
                    <td>{feedItem?.talent?.views}</td>
                    <td>
                      {feedItem?.talent?.is_wishlisted == true ? "Yes" : "No"}
                    </td>
                    <td>{feedItem?.talent?.wishlist_count}</td>
                    <td>{feedItem?.talent?.availability || "N/A"}</td>

                    {/* talentSkills (array) */}

                    {(feedItem?.talent?.talentSkills).map((item, index) => (
                      <>
                        <td>{item?.id || "N/A"}</td>
                        <td>{item?.name || "N/A"}</td>
                        <td>{item?.rate || "N/A"}</td>
                      </>
                    ))}
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Feed;
