import React, {useState} from 'react'
import './Dashboard.css'
import {useLocation} from "react-router-dom";

function Header({ sidebarOpen, toggleSidebar, handleLogout, user }) {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.charAt(1).toUpperCase() + pathname.slice(2).split("/").join(" / ");
    function menuToggle() {
        const toggleMenu = document.querySelector(".menu");
        toggleMenu.classList.toggle("active");
    }
    return (
        <div className={`dashboard-header-container ${sidebarOpen ? 'dashboard-header-minimize' : '' }`}>
            <div className="dashboard-notification">
                <button onClick={toggleSidebar} className={`dashboard-hamburger-button ${sidebarOpen ? 'none' : '' }`}>
                    <svg className="dashboard-menu-icon">
                        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z">
                        </path>
                    </svg>
                </button>
                <h1 className="dashboard-header-text">
                    {splitLocation}
                </h1>
  
                {splitLocation === "Projects" || splitLocation === "Tasks" ?
                    <div className="search-container">
                    <span>
                        <input className="search-input" type="text" placeholder="Search"/>
                        <div className="search-btn">
                            <div className="dashboard-menu-icon">
                                <i className="fa fa-search"></i>
                            </div>
                            
                        </div>
                    </span>
                    </div>

                    :
                    ""
                }
                <button className="dashboard-notification-icon">
                      <span className="dashboard-notification-number">
                          <svg className="dashboard-menu-icon">
                              <path
                                  d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z">
                              </path>
                          </svg>
                          <span className="dashboard-notification-text">+1</span>
                      </span>
                </button>
                <div className="action dashboard-notification">
                    <div className="profile" onClick={menuToggle}>
                        {/*<img src="./assets/avatar.jpg"/>*/}
                        {user && user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].toString().charAt(0).toUpperCase()}
                    </div>
                    <div className="menu">
                        <h3>{user && user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'].toString()}<br/>
                            <span> {user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']}</span>
                        </h3>
                        <ul>
                            <li>
                                <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">My profile</a>
                            </li>
                            <li>
                                <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">Edit profile</a>
                            </li>
                            <li>
                                <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">Inbox</a>
                            </li>
                            <li>
                                <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">Setting</a>
                            </li>
                            <li><img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">Help</a></li>
                            <li onClick={handleLogout}>
                                <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" /><a href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Header;