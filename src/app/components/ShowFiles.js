import { React, useEffect, useState } from 'react'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const FormData = require("form-data");

const ShowFiles = (props) => {

    const [myfile, setMyfile] = useState({ empFile: '', email: '' });
    const uploadFile = async () => {
        const fl = myfile.empFile;
        const formdata = new FormData();
        formdata.append('myfile', myfile.empFile, myfile.empFile.name);
        formdata.append('email', props.file_email);
        let url = 'http://localhost:5000/api/emp/uploadfile';
        console.log("Yesno");
        try {
            let response = await axios.post(url, formdata);
            toast.success("Inserted Successfully");
            console.log(response);
        }
        catch (e) {
            toast.error("Something Went Wrong");
        }
    }
    const imageUpload = (e) => {
        console.log(e.target.files[0]);
        setMyfile({ ...myfile, empFile: e.target.files[0] });
    }
    const downloadFile = async () => {
        const response = await fetch(
            `http://localhost:5000/api/emp/downloadfile`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({})
            }
        );
    }
    useEffect(() => {
    }, []);
    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <Modal
                isOpen={props.showOpen}
                contentLabel="Example Modal" >
                <div style={{ marginTop: "400px", marginLeft: "300px" }}>
                    {(props.vdata) ?
                        (props.vdata).map(em_file => <div className="row my-2">
                            <div className="col my-4" style={{ width: "200px" }}>
                                {em_file.emp_file}
                            </div>
                            <div className="col mx-2">
                                <button style={{ width: "200px" }} type="submit" onClick={downloadFile} className="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    </span>
                                    Download
                                </button>
                            </div>
                        </div>) : <h3>No File Upload</h3>}
                    <div className="row my-2">
                        <div className="col my-4" style={{ width: "200px" }}>
                            <input type="file" onChange={imageUpload} id="myFile" name="myfile" />
                        </div>
                        <div className="col">
                            <button style={{ width: "200px" }} type="submit" onClick={uploadFile} className="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                </span>
                                Upload
                            </button>
                        </div>
                    </div>
                    <button className="btn btn-danger text-center my-5" onClick={props.filetoggle}>close</button>
                </div>
            </Modal>
        </div>
    )
}

export default ShowFiles