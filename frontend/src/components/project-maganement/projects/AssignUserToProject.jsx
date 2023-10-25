import React, { useState, useEffect } from 'react';
import './PopUpAssign.css';

function AssignUserToProject({ onClose, taskItem }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    fetch('https://localhost:7029/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter((prevSelectedUser) => prevSelectedUser !== user);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const addUsers = async (e) =>{
    for (let user of selectedUsers){
        console.log(taskItem.id)
      await fetch(`https://localhost:7029/projects/${taskItem.id}`, {
          method: 'PUT',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(user)
      })
    }
          
    onClose();
  }

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="pop-up-assign">
          <div className="pop-up-assign-header">
              <input type="text" placeholder="Search Users" value={searchTerm} onChange={handleSearchTermChange} />
              <button className="popup-close" onClick={onClose}>
                  Close
              </button>
          </div>
          <div className="pop-up-assign-body">
              {filteredUsers.map((user) => (
                  <div
                      key={user.id}
                      className={`pop-up-assign-user ${selectedUsers.includes(user) ? 'selected' : ''}`}
                      onClick={() => handleUserClick(user)}
                  >
                      {user.firstName} {user.lastName}
                  </div>
              ))}
          </div>
          <div className="pop-up-assign-footer">
              <button className="pop-up-assign-add-button" onClick={addUsers}>
                  Add
              </button>
          </div>
      </div>
  );
}

export default AssignUserToProject;
