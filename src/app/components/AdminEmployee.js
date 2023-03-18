import { React, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Update from './Update';

const AdminEmployee = () => {

    const [credential, setCredential] = useState({name: "", age: "", salary: "", email: "", country: "", state: "", city: ""});
    const [user, setUser] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [vdata, setVdata] = useState("");
    const changeSalary = async() => {
        // setVdata(ids);
    if (showModal) {
        FetchEmp();
        setShowModal(false);
    } else {
        const response = await fetch(
            `http://localhost:5000/api/emp/getemp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: vdata })
            }
        );
        const json = await response.json();
        credential.email = vdata;
        credential.name = json.name;
        credential.age = json.age;
        credential.salary = json.salary;
        credential.country = json.country;
        credential.state = json.state;
        credential.city = json.city;
        console.log(credential,"c");
        setShowModal(true);
    }
}
    const FetchEmp = async () => {
        let p2 = localStorage.getItem('token');
        setVdata(p2);
        const response = await fetch(
            `http://localhost:5000/api/emp/getemp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: p2 })
            }
        );
        const json = await response.json();
        setUser(json);
    }
    let navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate("/index");
    }
    const downloadFile = async() => {
        const response = await fetch(
            `http://localhost:5000/api/emp/downloadfile`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ file: user.file })
            }
        );
    }
    useEffect(() => {
        FetchEmp();
    }, []);
    return (
        <div className="container">
            <Update isOpen={showModal} toggle={changeSalary} vdata={credential} />
              <h2>Admin Logged In</h2>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10 py-4">
                    {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Age - {user.age}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Salary - {user.salary}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Country - {user.country}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">State - {user.state}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">City - {user.city}</span>
                    {(user.file) ? <div className="row my-2">
                        <div className="col my-4" style={{ width: "200px" }}>
                            {user.file}
                        </div>
                        <div className="col mx-2">
                            <button type="submit" onClick={downloadFile} className="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>
                                Download
                            </button>
                        </div>
                    </div> : <p>No File Uploaded</p>}
                    <div className="flex mt-4 space-x-3 md:mt-6">
                    <p style={{ cursor: "pointer" }} onClick={() => changeSalary()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</p>
                        <p style={{ cursor: "pointer" }} onClick={logout} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Logout</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminEmployee