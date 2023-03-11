import { React, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './employee.css';
import Update from './Update';

const Employ = () => {

    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [vdata, setVdata] = useState("");
    const changeSalary = (ids) => {
        setVdata(ids);
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }
    const removeEmp = async (emailt) => {

        const response = await fetch(
            `http://localhost:5000/api/emp/rememp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: emailt })
            }
        );
        const json = await response.json();
        if (json.acknowledged == true) {
            toast.success('Deleted Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error('Deleted Failed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const [emp, setEmp] = useState([])
    const [svalue, setSvalue] = useState("");
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [i, setI] = useState(1)
    const [nextE, setNextE] = useState(9)
    const [showi, setShowi] = useState(1)
    const changePage = (val) => {
        setPage(val);
        FetchEmp();
    }
    const nextPage = (val) => {
        if(val<=1000)
        {
          setI(++val);
        }
    }
    const prePage = (val) => {
        if (val >= 2) {
            setI(--val);
        }
    }
    const FetchEmp = async () => {
        const response = await fetch(
            `http://localhost:5000/api/emp/fetchemployee`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page: page, pageLimit: limit })
            }
        );
        const json = await response.json();
        setEmp(json);
        setShowi((page - 1) * limit + 1);
        setNextE(limit-1);
        if (json.length < 10) {
            setNextE(json.length - 1);
        }
        if (json.length == 0) {
            setShowi(0);
            setNextE(0);
        }
    }
    const searchEmp = async (e) => {
        e.preventDefault();
        let searchValue = svalue.search;
        const response = await fetch(
            `http://localhost:5000/api/emp/searchemp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchValue: svalue })
            }
        );
        const json = await response.json();
        setEmp(json);
        setShowi((page - 1) * limit + 1);
        if (json.length < limit) {
            setNextE(json.length - 1);
        }
        if (json.length == 0) {
            setShowi(0);
            setNextE(0);
        }
    }
    const onChange = (e) => {
        setSvalue(e.target.value);
    }
    const changeLimit = async (lt) => {
        setLimit(lt);
        FetchEmp();
    }
    const logout = () => {
        localStorage.removeItem('token');
        // setEmail_id("");
        navigate("/index");
        // props.sucReg(3);
    }
    useEffect(() => {
        FetchEmp();
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <Update isOpen={showModal} toggle={changeSalary} vdata={vdata} />

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="input-group">
                    <input type="search" onChange={onChange} name="search" id="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                    <button type="button" onClick={searchEmp} className="btn btn-outline-primary">search</button>
                    <button type="button" onClick={logout} className="btn btn-primary">Logout</button>
                    {/* <button type="button" className="btn btn-primary">Primary</button> */}
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Employ Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-3">
                                State
                            </th>
                            <th scope="col" className="px-6 py-3">
                                City
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Update
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp.map(emps => <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {emps.name}
                            </th>
                            <td className="px-6 py-4">
                                {emps.age}
                            </td>
                            <td className="px-6 py-4">
                                {emps.email}
                            </td>
                            <td className="px-6 py-4">
                                {emps.salary}
                            </td>
                            <td className="px-6 py-4">
                                {emps.country}
                            </td>
                            <td className="px-6 py-4">
                                {emps.state}
                            </td>
                            <td className="px-6 py-4">
                                {emps.city}
                            </td>
                            <td className="px-6 py-4">
                                <p key={emps.email} onClick={() => changeSalary(emps.email)} value={emps.email} style={{ cursor: "pointer" }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
                            </td>
                            <td className="px-6 py-4">
                                <p key={emps.email} onClick={() => removeEmp(emps.email)} value={emps.email} style={{ cursor: "pointer" }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</p>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
                <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
                    <div class="dropup">
                        <button class="dropbtn">Change Page Limit</button>
                        <div class="dropup-content">
                            <p onClick={() => changeLimit(5)}>5</p>
                            <p onClick={() => changeLimit(10)}>10</p>
                            <p onClick={() => changeLimit(15)}>15</p>
                        </div>
                    </div>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{showi}-{showi + nextE}</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul className="inline-flex items-center -space-x-px">
                        <li>
                            <p onClick={() => prePage(i)} style={{ cursor: "pointer" }} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            </p>
                        </li>
                        <li>
                            <p onClick={() => changePage(i)} style={{ cursor: "pointer" }} className="nav-link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</p>
                        </li>
                        <li>
                            <p onClick={() => changePage(i + 1)} style={{ cursor: "pointer" }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i + 1}</p>
                        </li>
                        <li>
                            <p onClick={() => changePage(i + 2)} style={{ cursor: "pointer" }} className="px-3 py-2 leading-tight text-gray-500 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i + 2}</p>
                        </li>
                        <li>
                            <p className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</p>            </li>
                        <li>
                            <p onClick={() => changePage(100)} style={{ cursor: "pointer" }} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</p>
                        </li>
                        <li>
                            <p onClick={() => nextPage(i)} style={{ cursor: "pointer" }} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Next</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            </p>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Employ