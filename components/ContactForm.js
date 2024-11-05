// components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submissionStatus, setSubmissionStatus] = useState({
        submitted: false,
        success: false,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/contact/', formData);
            setSubmissionStatus({
                submitted: true,
                success: true,
                message: 'Email sent successfully!',
            });
            // Optionally reset form here if desired
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            setSubmissionStatus({
                submitted: true,
                success: false,
                message: 'Failed to send email. Please try again later.',
            });
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 my-6 max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                {submissionStatus.submitted && (
                    <div
                        className={`mb-4 p-4 text-center text-sm font-semibold ${
                            submissionStatus.success ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                        } rounded-lg`}
                    >
                        {submissionStatus.message}
                    </div>
                )}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="johndoe@example.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Hello, I would like to..."
                        required
                    ></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
