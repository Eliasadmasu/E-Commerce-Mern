import { useState } from "react";
import axios from "axios";
import API_URL from "../../../config/config";
import { useEffect } from "react";
import User from "./User";
import "./user.css";
import Sort from "./Sort";

const Customers = () => {
  const [users, setUsers] = useState(null);
  const [sortBy, setSortBy] = useState("role"); // State to track sorting criteria
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const FetchUsers = async () => {
      try {
        const usersResponse = await axios.get(`${API_URL}/dashboard/users`, {
          params: {
            sortBy,
            sortOrder,
          },
        });
        console.log(usersResponse);
        if (usersResponse.status === 200) {
          setUsers(usersResponse.data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    FetchUsers();
  }, [sortBy, sortOrder]);

  return (
    <div>
      <div>
        <Sort
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={setSortBy}
          onSortChangeOrder={setSortOrder}
        />
      </div>
      <table className="ordersTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Gender</th>
            <th>Date</th>
          </tr>
        </thead>
        {users && (
          <tbody>
            {users.map((user, idx) => (
              <User user={user} idx={idx} key={user._id} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};
export default Customers;
