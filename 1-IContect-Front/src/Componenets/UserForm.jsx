import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserForm() {
  const navigate = useNavigate();
  // inserData State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    isAdmin: false,
  });

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // register Api Call
    const response = await axios.post(
      "http://127.0.0.1:9977/user/register",
      formData
    );
    console.log("User registered :", response.data);
    //  Navigate to Login Page
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Registration </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* UserName */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, username: e.target.value }));
          }}
          className="p-2 border rounded"
          required
        />
        {/* Emial */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
          className="p-2 border rounded"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, password: e.target.value }));
          }}
          className="p-2 border rounded"
          required
        />
        {/* ImgUrl */}
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
          }}
          className="p-2 border rounded"
        />

        {/* admin */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, isAdmin: e.target.checked }));
            }}
          />
          Admin
        </label>

        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserForm;
