import { useState } from "react";
import API_URL from "../../../config/config";
import axios from "axios";

const User = ({ user, idx }) => {
  const [selectedRole, setSelectedRole] = useState(user.role);
  console.log({ selectedRole });
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRoleChange = async (newRole) => {
    try {
      const res = await axios.put(`${API_URL}/dashboard/users/${user._id}`, {
        role: newRole,
      });

      if (res.status === 200) {
        setSelectedRole(newRole);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr key={user._id}>
      <td>{idx + 1}</td>
      <td>{user.fullName}</td>
      <td>{user.username}</td>
      <td>{user.phoneNumber}</td>
      <td>{user.email}</td>
      <td>
        {user._id !== "650d48f4d5240398c4339ca3" ? (
          <select
            name="role"
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value={`${user.role === "admin" ? "admin" : "user"}`}>
              {user.role === "admin" ? "Admin" : "User"}
            </option>
            <option value={`${user.role === "admin" ? "user" : "admin"}`}>
              {user.role === "admin" ? "User" : "Admin"}
            </option>
          </select>
        ) : (
          <>{selectedRole}</>
        )}
      </td>
      <td>{user.gender}</td>
      <td>{formatDate(user.createdAt)}</td>
    </tr>
  );
};
export default User;
