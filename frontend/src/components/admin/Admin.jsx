import React, {useState} from 'react';
import './Admin.css'

const Admin = ({  }) => {
    const[registerForm, setRegisterForm] = useState({
        "firstName": "",
        "lastName": "",
        "role": "",
        "email": "",
        "username": "",
        "password": "",
        "confirmPassword": ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response = await fetch('https://localhost:7029/register',{
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerForm)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.errorMessages[0];
            alert(errorMessage)
            console.log(errorMessage);
            return
        }
        
        setRegisterForm({
            "firstName": '',
            "lastName": '',
            "role": '',
            "email": '',
            "username": '',
            "password": '',
            "confirmPassword": ''
        });
        // setShowSuccessText(true)

        if(response.ok) alert("User Successfully Registered")
        setTimeout(() => {
            // setShowSuccessText(false)
            
        }, 1000);
    }
    
return (
    <div className="admin-container">
        <div className="register-container">
            <div className="title">Register new user</div>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">First Name</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                                   type="text"
                                   value={registerForm.firstName}
                                   placeholder="Enter your name" required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Last Name</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                                   type="text"
                                   value={registerForm.lastName}
                                   placeholder="Enter your name" required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                                   type="text"
                                   value={registerForm.username}
                                   placeholder="Enter your username" required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                                   type="text"
                                   value={registerForm.email}
                                   placeholder="Enter your email" required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                                   type="password"
                                   value={registerForm.password}
                                   placeholder="Enter your password" required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                                   type="password"
                                   value={registerForm.confirmPassword}
                                   placeholder="Confirm your password" required />
                        </div>
                        <div className="input-box">
                            <span className="details">Select Role</span>
                            {/*<input type="text" placeholder="Enter Role" required/>*/}
                            <select onChange={(e) => setRegisterForm({...registerForm, role: e.target.value})}
                                    value={registerForm.role}
                                    className="task-status-dropdown">
                                <option value='select'></option>
                                <option value='user'>User</option>
                                <option value='Admin'>Admin</option>
                                <option value='ProjectManager'>Project Manager</option>
                            </select>
                        </div>
                    </div>
                    <div className="button">
                        <input type="submit" value="Register" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default Admin