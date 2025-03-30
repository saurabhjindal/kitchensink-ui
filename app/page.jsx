"use client";
import React, { useState } from 'react';
import FormComponent from './FormComponent';
import Modal from './Modal';
import "./index.css";
import LoginForm from './LoginForm';
import UserTable from './UserTable';
import EditModal from "./EditModal";


export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    });

    const [loginData, setloginData] = useState({
        memberId: '',
        password: '',
    });

    const [openModal, setOpenModal] = useState(false);
    const [isRegisteredDone ,setIsRegisteredDone] = useState(null);

    const [tableData,setTableData] = useState([])
    const [registrationError,setRegistrationError] =useState(null)
    const [loginMode,setLoginMode] = useState("")

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
    });

    console.log(editForm)
    const [selectedForEdit,setSelectedForEdit] = useState(null)
    const [openEditModal,setOpenEditModal] = useState(false)

    const [token, setToken] = useState(null)

    const handleEditClick =(data)=>{
        setSelectedForEdit(data)
        setOpenEditModal(true)
        const copyFromeEditForm = {name:data?.name, email:data?.email, phoneNumber:data?.phoneNumber}
        setEditForm(copyFromeEditForm)
    }

    const saveEdit = () => {
        fetch("http://localhost:8080/members", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({...editForm,memberId:selectedForEdit.memberId})
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err)); // Handle API errors
                }
                return res.json();
            })
            .then((res) => {
                console.log("Success:", res);
                return fetchTableData(selectedForEdit.memberId, token);
            })
            .catch((err) => {
                console.error("API Error:", err);
            })
            .finally(() => setOpenEditModal(false))
    };





    const saveFormRegistration = () => {
        //logic and api

        setIsRegisteredDone(false)
        setRegistrationError(null)
        fetch("http://localhost:8080/members", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res)
                if(res.exceptionType==="VALIDATION_ERROR"){
                    setRegistrationError(res.fieldErrors)
                }
                else if(res.exceptionType==="EXCEPTION"){
                    setRegistrationError(res.errorMessage)
                }
                else{
                    setIsRegisteredDone(res)
                }

            })
            .catch((err) => {
                console.log("API Error:", err)

            });
    }
    console.log(registrationError)
    const ShowValidationErrors = ({errors}) => {
        console.log(errors)
        let errorMessages = null
        if(typeof errors === 'object'){
             errorMessages = Object.entries(errors).map(([field, message]) => (
                <li key={field} className="capitalize">
                    <strong>{field}:</strong> {message}
                </li>
            ));
        }
        else {
                errorMessages = errors
            }

        // Render inside UI (use a state variable for controlled updates)
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong className="font-bold">Errors:</strong>
                <ul className="mt-2 list-disc list-inside">{errorMessages}</ul>
            </div>
        );
    };

    console.log(loginMode)
    function fetchTableData(id,token){
        const url = loginMode === "ALL" ? `http://localhost:8080/members/all` : `http://localhost:8080/members/${id}`
        return fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json",Authorization: `Bearer ${token}`},
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                const responseState = Array.isArray(res) ? res : [res]
                setTableData(responseState)
            })
            .catch((err) => console.error("API Error:", err));
    }

    const saveLogin=()=>{
        //logic and api
        const memberId = loginData?.memberId
        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData),
        })
            .then((res) => res.text())
            .then((res) => {
                // const token= res.json()
                console.log(res)
                setToken(res)
                return fetchTableData(memberId,res)
            })
            .then(res=>{
                console.log(res)
            })
            .catch((err) => console.error("API Error:", err))
            .finally(()=>setOpenModal(false))
    }

    const handleLoginClick = (mode)=>{
        setLoginMode(mode)
        setOpenModal(true)
    }

    console.log(formData);
    return (
        <div className="app">



            <div className="image-form-container" style={{display:"flex", gap:"100px", marginBottom:"30px", marginLeft: "100px"}}>
                <div style={{width:"50%"}}>
                    <h1 style={{fontSize:"30px",  fontWeight: 700 }}>Welcome To MongoDB Application! </h1>
                    <h3 style={{fontSize:"15px", marginBottom: "10px"}}>You have successfully deployed a Mongo DB Application.</h3>
                    {registrationError && (<ShowValidationErrors errors={registrationError}/>)}
                    {isRegisteredDone && <div style={{background:"lightgreen"}}>{`Registered Successfully with memberId : ${isRegisteredDone.memberId}!`}</div>}
                    <FormComponent className="form-register" formData={formData} setFormData={setFormData} submitCallback={saveFormRegistration}/>
                </div>
                <div className="mongo-image">
                    <div style={{height:"150px"}}>	<img src="/logo.png" alt="Logo" width="400" height="500" /></div>

                    <div style={{padding: "10px",
                        paddingLeft: "8%",background: "#dcd7d7"}}>
                        <div>Learn more about Red Hat JBoss Enterprise Application Platform.</div>
                        <div style={{

                            width: "90%",
                            padding: "10px",
                            justifyContent: "end"}}>
                            <ul>
                            <li style={{fontWeight:700, textDecoration:"underline"}}> <a href="https://www.mongodb.com/docs/">Documentation</a> </li>
                            <li style={{fontWeight:700, textDecoration:"underline"}}> <a href="https://www.mongodb.com/products">Product Information</a> </li>
                            </ul>
                            </div>
                    </div>
                </div>

            </div>
            <div
                className="view-data-btn-grp"
                style={{ display: 'flex', gap: "10px", marginLeft: "100px"}}
            >
                <button onClick={() => handleLoginClick("USER")}>View User Data</button>
                <button onClick={() => handleLoginClick("ALL")}>View All User Data</button>
            </div>
            <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
                <p>
                    <LoginForm formData={loginData} setFormData={setloginData} submitCallback={saveLogin}/>
                </p>
            </Modal>
            <UserTable users={tableData}  editCallback={handleEditClick} />
            <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
                <p>
                    <EditModal formData={editForm} setFormData={setEditForm} submitCallback={saveEdit} />
                </p>
            </Modal>
        </div>
    );

}