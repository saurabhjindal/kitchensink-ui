import React, { useState } from 'react';

const FormComponent = ({ formData, setFormData,submitCallback }) => {
    // const [formData, setFormData] = useState({
    //   name: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    // });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        // Simple validation
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) newErrors[key] = 'This field is required';
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form Submitted:', formData);
        submitCallback()
        //alert('Registration Successful!');
        setFormData({ name: '', email: '', phoneNumber: '', password: '' });
        setErrors({});
    };

    return (
        <div className="form-container">
            <h2 style={{fontSize: "18px"}}>Register</h2>
            {/*<div className="form-banner">*/}
            {/*    Enforce annotation-based constraints defined on the model class*/}
            {/*</div>*/}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Phone (+91-):</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                        <span className="error">{errors.phoneNumber}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default FormComponent;