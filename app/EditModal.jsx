import React, { useState } from 'react';

const EditModal = ({ formData, setFormData,submitCallback }) => {

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
        setFormData({ memberId: '', password: '' });
        setErrors({});
    };

    return (
        <div className="form-container">
            <h2>Edit User Details</h2>
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
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                        <span className="error">{errors.phoneNumber}</span>
                    )}
                </div>
                <button type="submit">Save Edit</button>
            </form>
        </div>
    );
};

export default EditModal;