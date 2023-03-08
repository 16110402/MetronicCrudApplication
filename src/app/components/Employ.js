import { React, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';

const Employ = () => {

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
        console.log(emailt, "emailt");

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
    const [page, setPage] = useState(1)
    const [i, setI] = useState(1)
    const [showi, setShowi] = useState(1)
    const changePage = (val) => {
         console.log(val,"val");
         setPage(val);
         FetchEmp();
    }
    const nextPage = (val) => {
            setI(++val);
    }
    const prePage = (val) => {
            if(val>=2)
            {
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
                body: JSON.stringify({page: page})
            }
        );
        const json = await response.json();
        setEmp(json);
        setShowi(page);
    }
    useEffect(() => {
        FetchEmp();
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            <Update isOpen={showModal} toggle={changeSalary} vdata={vdata} />
            
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
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
        {emp.map(emps =><tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
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
                    <p key={emps._id} onClick={() => changeSalary(emps._id)} value={emps._id} style={{cursor: "pointer"}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
                </td>
                <td className="px-6 py-4">
                    <p key={emps.email} onClick={() => removeEmp(emps.email)} value={emps.email} style={{cursor: "pointer"}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Remove</p>
                </td>
            </tr>)}
        </tbody>
    </table>
    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{(showi - 1) * 10 + 1}-{showi * 10}</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
        <ul className="inline-flex items-center -space-x-px">
            <li>
                <p onClick={() => prePage(i)} style={{cursor: "pointer"}} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </p>
            </li>
            <li>
                <p onClick={() => changePage(i)} style={{cursor: "pointer"}} className="nav-link px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i}</p>
            </li>
            <li>
                <p onClick={() => changePage(i+1)} style={{cursor: "pointer"}} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i+1}</p>
            </li>
            <li>
                <p onClick={() => changePage(i+2)} style={{cursor: "pointer"}} aria-current="page" className="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i+2}</p>
            </li>
            <li>
                <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
            </li>
            <li>
                <p onClick={() => changePage(100)} style={{cursor: "pointer"}} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</p>
            </li>
            <li>
                <p onClick={() => nextPage(i)} style={{cursor: "pointer"}} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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