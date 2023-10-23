import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import generateNewAccessToken from "../../config/generateRefreshToken";
import Cookies from "js-cookie";
import API_URL from "../../config/config";
import axios from "axios";
import UserProfileUpdateForm from "./UserProfileUpdateForm";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchProfileData = async () => {
    try {
      await generateNewAccessToken();

      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.log("accessToken misiing");
      }

      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleProfileUpdate = (updatedProfile) => {
    console.log({ updatedProfile });
    setProfile(updatedProfile);
    setIsEditMode(false); // Exit edit mode after successful update
  };

  const handleLogout = async () => {
    Cookies.remove("role");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    navigate("/login");
  };

  const navigate = useNavigate();
  return (
    <div className="profileWrapper">
      {profile && !isEditMode && (
        <div className="profileCont">
          <div className="profileandUsernameCont">
            <img
              className="imageProfile"
              src="https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg"
              alt=""
            />
            <div>
              User Name:
              <span className="secondaryTxtProfile">{profile.username}</span>
            </div>
          </div>
          <div className="secondCont">
            <div className="prodetailcont">
              <div> Full Name</div>
              <span className="secondaryTxtProfile"> {profile.fullName}</span>
            </div>
            <div className="prodetailcont">
              <div>Email</div>

              <span className="secondaryTxtProfile">{profile.email}</span>
            </div>
            <div className="prodetailcont">
              <div>Gender</div>

              <span className="secondaryTxtProfile">{profile.gender}</span>
            </div>
            <div className="prodetailcont">
              <div>Phone</div>

              <span className="secondaryTxtProfile">{profile.phoneNumber}</span>
            </div>

            <div className="prodetailcont">
              <div>Joined</div>

              <span className="secondaryTxtProfile">
                {formatDate(profile.createdAt)}
              </span>
            </div>
            <div className="UpdateBtn">
              <button onClick={() => setIsEditMode(true)}>Edit</button>
            </div>
          </div>
          <div className="logout">
            <button className="logoutBtn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
      {isEditMode && (
        <div className="profileEditCont">
          {/* Render the profile update form in edit mode */}
          <UserProfileUpdateForm
            userId={profile._id}
            initialData={profile} // Pass current user data to the form
            onProfileUpdate={handleProfileUpdate}
          />
        </div>
      )}
    </div>
  );
};
export default UserProfile;
