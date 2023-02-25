import { React, useEffect, useState } from 'react'
import { GrDocumentUpdate } from 'react-icons/gr'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';

const Employ = () => {

    const [showModal, setShowModal] = useState(false);
    const [vdata, setVdata] = useState("");
    const changeSalary = (event) => {
        let ids = event.target.value;
        setVdata(ids);
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    }
    const removeEmp = async (event) => {
        let emailt = event.target.value;

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
    const FetchEmp = async () => {
        const response = await fetch(
            `http://localhost:5000/api/emp/fetchemployee`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({})
            }
        );
        const json = await response.json();
        setEmp(json);
    }
    useEffect(() => {
        FetchEmp();
    }, []);

    return (
        <div className="container">
            <Update isOpen={showModal} toggle={changeSalary} vdata={vdata} />
            <div className="row">
                {emp.map(emps => <div className="col-md-3 my-4">
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                <div>
                                    <a className="block relative rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-cover object-center block" src="https://images.unsplash.com/photo-1466112928291-0903b80a9466?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80/200x100/d4d4d4/000000" style={{ width: "250px", height: "130px" }} />
                                    </a>
                                    <div className="card-body" style={{ width: "250px" }}>
                                        <button type="button" className="btn btn-secondary my-2 mx-2">{emps.name}</button>
                                        <button type="button" className="btn btn-secondary my-2 mx-2">Age {emps.age}</button>
                                        <button type="button" className="btn btn-secondary my-2 mx-2" key={emps._id} onClick={changeSalary} value={emps._id} style={{ width: "220px" }}>Salary {emps.salary} <GrDocumentUpdate style={{ marginRight: "0px", marginTop: "4px" }} /> </button>
                                        <button type="button" className="btn btn-secondary my-2 mx-2" style={{ width: "220px" }}>Country {emps.country}</button>
                                        <button type="button" className="btn btn-secondary my-2 mx-2" style={{ width: "220px" }}>State {emps.state}</button>
                                        <button type="button" className="btn btn-secondary my-2 mx-2" style={{ width: "220px" }}>City {emps.city}</button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <span className="justify-center items-center"><button type="button" className="btn btn-primary my-2" key={emps.email} onClick={removeEmp} value={emps.email} style={{ width: "100px" }}>Delete</button></span>
                                        <div className="mt-1">
                                        </div>
                                        <div className="mt-1">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>)}
            </div>
        </div>
    )
}

export default Employ