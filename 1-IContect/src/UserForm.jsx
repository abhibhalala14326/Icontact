import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    imageUrl: "",
    isAdmin: false,
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    fetch("http://127.0.0.1:9977/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    // You can send `formData` to an API here
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">User Form</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => {
            let name = e.target.value;

            setFormData((prev) => ({ ...prev, username: name }));
          }}
          className="p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            let email = e.target.value;

            setFormData((prev) => ({ ...prev, email: email }));
          }}
          className="p-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            let password = e.target.value;

            setFormData((prev) => ({ ...prev, password: password }));
          }}
          className="p-2 border rounded"
          required
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => {
            let img = e.target.value;

            setFormData((prev) => ({ ...prev, imageUrl: img }));
          }}
          className="p-2 border rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={(e) => {
              let Admin = e.target.value;

              setFormData((prev) => ({ ...prev, isAdmin: Admin }));
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
