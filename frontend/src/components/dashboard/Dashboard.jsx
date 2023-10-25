import React, { useState }from 'react';
import './Dashboard.css'
import Header from './DashboardHeader'
import {Link, useLocation} from "react-router-dom";

const Dashboard = ({ user, handleLogout }) => {
    const [activeButton, setActiveButton] = useState('dashboard');

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    // const location = useLocation();
    //
    // const { pathname } = location;
    //
    // const splitLocation = pathname.split("/");
    // console.log(splitLocation[1])

    return (
        <>
            <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} handleLogout={handleLogout} user={user}/>
            <div className={`dashboard-container ${sidebarOpen ? '' : 'sidebar-closed'}`}>
                <div className="minimize-menu">
                    <button className="minimize-menu-button" onClick={toggleSidebar} type="button">
                        <svg className="dashboard-menu-icon">
                            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z">
                            </path>
                        </svg>
                        {/*<div className="dashboard-menu-icon">*/}
                        {/*    <a >&#8249; </a>*/}
                        {/*</div>*/}
                    </button>
                </div>
                <div className="dashboard-menu-container">
                    <nav>
                        {user && user['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin" &&

                            <Link to="/admin"
                                  className={`dashboard-button-container ${activeButton === 'admin' ? 'active' : ''}`}
                                  onClick={() => setActiveButton('admin')} role="button">
                               
                                    <div className="dashboard-icon-container">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                             className="bi bi-person-lock" viewBox="0 0 16 16">
                                            <path
                                                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z"/>
                                        </svg>
                                        {/*className="dashboard-menu-icon"*/}
                                    </div>
                                    <div className="dashboard-menu-text">
                                        <span>Admin</span>
                                    </div>
                             
                            </Link>
                        }
                        <Link to="/dashboard" className={`dashboard-button-container ${activeButton === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveButton('dashboard')} role="button">
                            <div className="dashboard-icon-container">
                                {/*<div className="dashboard-menu-icon">*/}
                                {/*    <img src={require('../../assets/dashboard.png')} className="dashboard-icon" alt="dashboard" />*/}
                                {/*</div>*/}
                                <svg className="dashboard-menu-icon" focusable="false"
                                     aria-hidden="true" viewBox="0 0 24 24" data-testid="DashboardIcon">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z">
                                    </path>
                                </svg>
                            </div>
                            <div className="dashboard-menu-text">
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <Link to="/projects" className={`dashboard-button-container ${activeButton === 'projects' ? 'active' : ''}`} onClick={() => setActiveButton('projects')} role="button">
                            <div className="dashboard-icon-container">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6e6e6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                                {/*className="dashboard-menu-icon"*/}
                            </div>
                            <div className="dashboard-menu-text">
                                <span>Projects</span>
                            </div>
                        </Link>
                        <Link to="/tasks/my-tasks" className={`dashboard-button-container ${activeButton === 'tasks' ? 'active' : ''}`} onClick={() => setActiveButton('tasks')} role="button">
                            <div className="dashboard-icon-container">
                                <svg className="dashboard-menu-icon">
                                    <path
                                        d="m11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z">
                                    </path>
                                </svg>
                            </div>
                            <div className="dashboard-menu-text">
                                <span>Tasks</span>
                            </div>
                        </Link> 
                        <Link to="/reports" className={`dashboard-button-container ${activeButton === 'reports' ? 'active' : ''}`} onClick={() => setActiveButton('reports')} role="button">
                            <div className="dashboard-icon-container">
                                <svg className="dashboard-menu-icon">
                                    <path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z">
                                    </path>
                                </svg>
                            </div>
                            <div className="dashboard-menu-text">
                                <span>Reports</span>
                            </div>
                        </Link>
                        <div className="dashboard-button-container" role="button">
                            <div className="dashboard-icon-container">
                                <svg className="dashboard-menu-icon">
                                    <path
                                        d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z">
                                    </path>
                                </svg>
                            </div>
                            <div className="dashboard-menu-text">
                                <span>Chat</span>
                            </div>
                        </div>
                        <div className="saved-reports">
                            <div className="sub-menu-title ">
                                Saved reports
                            </div>
                            <div className="dashboard-button-container" role="button">
                                <div className="dashboard-icon-container">
                                    <svg className="dashboard-menu-icon">
                                        <path
                                            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="dashboard-menu-text">
                                    <span>Current month</span>
                                </div>
                            </div>
                            <div className="dashboard-button-container" role="button">
                                <div className="dashboard-icon-container">
                                    <svg className="dashboard-menu-icon">
                                        <path
                                            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="dashboard-menu-text">
                                    <span>Last quarter</span>
                                </div>
                            </div>
                            <div className="dashboard-button-container" role="button">
                                <div className="dashboard-icon-container">
                                    <svg className="dashboard-menu-icon">
                                        <path
                                            d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z">
                                        </path>
                                    </svg>
                                </div>
                                <div className="dashboard-menu-text">
                                    <span>Last Year</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
