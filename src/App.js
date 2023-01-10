import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const UserDetail = (props) => {
  const { user } = props;
  const { name, picture, registered } = user;
  const fullName = `${name.first} ${name.last}`;
  const largePicture = picture.large;
  const dateRegistered = new Date(registered.date);
  const yearsSinceRegistering = Math.abs(
    new Date().getFullYear() - dateRegistered.getFullYear()
  );

  return (
    <div>
      <h1>{fullName}</h1>
      <img src={largePicture} alt={fullName} />
      <p>Date Registered: {dateRegistered.toDateString()}</p>
      <p>Years Since Registering: {yearsSinceRegistering}</p>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://randomuser.me/api?results=10");
      setUsers(response.data.results);
    };

    fetchData();
  }, []);

  const handleRowClick = (user) => {
    if (selectedUser === null && showUserDetail === false) {
      setSelectedUser(user);
      setShowUserDetail(true);
    } else {
      setSelectedUser(null);
      setShowUserDetail(false);
    }
  };

  const handleHideButtonClick = () => {
    setSelectedUser(null);
    setShowUserDetail(false);
  };

  return (
    <div className="table_content">
      <div>{showUserDetail ? <UserDetail user={selectedUser} /> : null}</div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Picture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const { name, email, phone, picture } = user;
              return (
                <tr key={email}>
                  <td>{`${name.first} ${name.last}`}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <img
                      src={picture.thumbnail}
                      alt={`${name.first} ${name.last}`}
                    />
                  </td>
                  <td>
                    <button className="button" onClick={() => handleRowClick(user)}>
                      {showUserDetail && selectedUser === user
                        ? "Hide"
                        : "Show"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
