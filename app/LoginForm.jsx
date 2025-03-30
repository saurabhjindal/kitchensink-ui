import React, { useState } from 'react';

const LoginForm = ({ formData, setFormData,submitCallback }) => {

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
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="memberId"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.memberId && <span className="error">{errors.memberId}</span>}
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

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;