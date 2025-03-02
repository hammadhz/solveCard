import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Input } from "../form";
import { toast } from "react-toastify";

const AddProfileModal = ({ onClose, onProfileAdded }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        card_title: "",
        name: "",
        company: "",
        job_title: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { card_title, name, company, job_title } = formData;

        if (!card_title || !name || !company || !job_title) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const response = await axiosInstance.post("/addProfile", formData);
            if (response.status === 200) {
                toast.success(response?.data?.message);
                setLoading(false);
                onProfileAdded(); // Trigger the callback to reload profiles
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white rounded-lg shadow w-full max-w-lg">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900 ">
                        {"Add Card"}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center "
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card_title">
                            Card Title
                        </label>
                        <Input
                            type={"text"}
                            name={"card_title"}
                            intent={"primary"}
                            id={"card-title"}
                            size={"md"}
                            value={formData.card_title}
                            classes={"w-full block p-2.5"}
                            roundness={"round-sm"}
                            placeholder={"Card Title"}
                            custom={"custom"}
                            eventAction={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            eventAction={handleChange}
                            intent="primary"
                            size="md"
                            classes="w-full block p-2.5"
                            roundness="round-sm"
                            placeholder="Name"
                            custom="custom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
                            Company
                        </label>
                        <Input
                            type="text"
                            name="company"
                            value={formData.company}
                            eventAction={handleChange}
                            intent="primary"
                            size="md"
                            classes="w-full block p-2.5"
                            roundness="round-sm"
                            placeholder="Company"
                            custom="custom"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="job_title">
                            Job Title
                        </label>
                        <Input
                            type="text"
                            name="job_title"
                            value={formData.job_title}
                            eventAction={handleChange}
                            intent="primary"
                            size="md"
                            classes="w-full block p-2.5"
                            roundness="round-sm"
                            placeholder="Job Title"
                            custom="custom"
                            required
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            type="button"
                            intent="secondary"
                            size="md"
                            children="Close"
                            classes=""
                            eventAction={onClose}
                        />
                        <Button
                            type="submit"
                            intent="primary"
                            size="md"
                            children="Submit"
                            classes="ml-2"
                            loading={loading}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProfileModal;