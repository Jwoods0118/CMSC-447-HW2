import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");

  useEffect(() => {
    axios.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleCreate = () => {
    axios.post("/add_user", { name, points }).then((response) => {
      setUsers([...users, response.data]);
    });
  };

  const handleUpdate = (id) => {
    axios.put(`/users/update/${id}`, { name, points }).then((response) => {
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/users/${id}`).then((response) => {
      setUsers(users.filter((user) => user._id !== id));
    });
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.points}</td>
              <td>
                <button onClick={() => handleUpdate(user._id)}>Update</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add/Update User</h2>
        <form>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Points:</label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
          />
          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserList;
