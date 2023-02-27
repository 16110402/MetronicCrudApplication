import React, { useState } from 'react'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = (props) => {

    const [credentials, setCredentials] = useState({ salary: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { salary } = credentials;
        const response = await fetch(`http://localhost:5000/api/emp/updateemp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ vdata: props.vdata, salary: salary })
        });
        const json = await response.json()
        if (json.success) {
            toast.success('Upadated Successfully', {
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
            toast.error('Upadated Failed', {
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
    const onChange = (e) => {
        // setCredentials({name:"e.target.name" , district:"e.target.email", place:"e.target.district", nearground:"e.target.nearground", distance:"e.target.distance" ,password:"e.target.password",confirmpassword:"e.target.confirmpassword"})
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <Modal
                isOpen={props.isOpen}
                contentLabel="Example Modal" >
                    <div style={{ marginTop: "100px", marginLeft: "200px" }}>
                <section className="text-gray-600 body-font">
                    <ToastContainer />
                    <h2>UPDATE SALARY OF EMPLOYEE</h2>
                    <div className="mb-3">
                        <label htmlFor="salary" className="form-label">Salary</label>
                        <input style={{ width: "300px" }} type="number" onChange={onChange} className="form-control" id="salary" name="salary" />
                    </div>
                    <button className="btn btn-primary text-center item-center" onClick={handleSubmit}>Update</button>
                </section>
                <button className="btn btn-danger text-center my-5" onClick={props.toggle}>close</button>
                </div>
            </Modal>
        </div>
    )
}

export default Update