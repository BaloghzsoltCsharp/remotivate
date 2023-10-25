import React, { useState, useEffect } from 'react';
import './PopUpList.css';

function PopUpList({ taskItem }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleted,isDeleted]=useState(false)

    useEffect(() => {
        const getTaskItems = async () => {
            const response = await fetch(`https://localhost:7029/tasks/${taskItem.id}/users`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const items = await response.json();
            setUsers(items);
        }

        getTaskItems();

    }, [deleted]);
    
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteUser = async (e) =>{
e.id = parseInt(e.id)

    await fetch(`https://localhost:7029/tasks/user/${taskItem.id}`,{
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(e.id)
  })

  setTimeout(() => {}, 2000);
  isDeleted(!deleted)
    
  }

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="pop-up-assign">
          <div className="pop-up-assign-header">
              <input type="text" placeholder="Search Users" value={searchTerm} onChange={handleSearchTermChange} />
              
          </div>
          <div className="pop-up-assigned-body">
              {filteredUsers.map((user) => (
                  <div
                      key={user.id}
                      className={`pop-up-assigned-user`}

                  >
                   <div>{user.firstName} {user.lastName}</div>
                      <div>
                          <button className="popup-user-delete" onClick={() => deleteUser(user)}>
                              &times;
                          </button>
                      </div>
                  </div>
              ))}
          </div>
          <div className="pop-up-assign-footer">
          </div>
      </div>
  );
}

export default PopUpList;
