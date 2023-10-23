import axios from "axios";
import { useState } from "react";
import API_URL from "../../config/config";
import { useNavigate } from "react-router-dom";

const UserProfileUpdateForm = ({ userId, initialData, onProfileUpdate }) => {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/user/${userId}`, formData);
      onProfileUpdate(response.data); // Notify the parent component about the update
    } catch (error) {
      console.error(error);
    }
  };

  const handleDiscard = () => {
    navigate("/admin/profile");
  };
  return (
    <form onSubmit={handleFormSubmit} className="secondCont form">
      <div className="prodetailcont">
        <div htmlFor="fullName">Full Name:</div>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="prodetailcont">
        <div htmlFor="email">Email:</div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="prodetailcont">
        <div htmlFor="phoneNumber">Phone Number:</div>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="prodetailcont">
        <div htmlFor="gender">Gender:</div>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button type="submit" className="SaveChangeBtn">
        Save Changes
      </button>
      <button className="DiscardeBtn" onClick={handleDiscard}>
        Discard
      </button>
    </form>
  );
};
export default UserProfileUpdateForm;
