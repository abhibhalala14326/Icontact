import axios from "axios";
import React, { useState } from "react";

function ContactForm() {
  // Register State
  const [formData, setFormData] = useState({
    user: "",
    name: "",
    imageUrl: "",
    mobile: "",
    email: "",
    company: "",
    title: "",
    groupId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    try {
      // Contect Api call
      const response = await axios.post(
        "http://127.0.0.1:9977/contect",
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg- shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* User  */}
        <input
          type="text"
          name="user"
          placeholder="User "
          value={formData.user}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, user: e.target.value }))
          }
          className="p-2 border rounded"
        />
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="p-2 border rounded"
          required
        />
        {/* IMGURL */}
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
          }
          className="p-2 border rounded"
        />
        {/* Mobile Number */}
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, mobile: e.target.value }))
          }
          className="p-2 border rounded"
          required
        />

        {/* user Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="p-2 border rounded"
          required
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, company: e.target.value }))
          }
          className="p-2 border rounded"
        />
        {/* title */}
        <input
          type="text"
          name="title"
          placeholder=" Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          className="p-2 border rounded"
        />
        {/* Group ID */}
        <input
          type="text"
          name="groupId"
          placeholder="Group name"
          value={formData.groupId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, groupId: e.target.value }))
          }
          className="p-2 border rounded"
        />
        {/* Submit Button */}
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
