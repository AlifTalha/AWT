
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SponsorCreateDto {
  fullname: string;
  username: string;
  password: string;
}

export default function AddSponsor() {
  const router = useRouter();
  const [formData, setFormData] = useState<SponsorCreateDto>({
    fullname: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SponsorCreateDto>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (formData: SponsorCreateDto): Partial<SponsorCreateDto> => {
    const validationErrors: Partial<SponsorCreateDto> = {};

    if (!formData.fullname) {
      validationErrors.fullname = "Fullname is required";
    }

    if (!formData.username) {
      validationErrors.username = "Username is required";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("Sending data to server:", formData); 
        const response = await axios.post("http://localhost:3000/sponsor/addsponsor", formData);
        if (response.status === 201) {
          alert("Sponsor added successfully!");
          router.push("/sponsors"); 
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error: any) {
        console.error("Error adding sponsor:", error);
        alert("Failed to add sponsor. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Add Sponsor</h1>
        <form onSubmit={handleSubmit}>

          {/* Fullname */}
          <div className="mb-4">
            <label htmlFor="fullname" className="block mb-2 font-bold text-gray-700">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Fullname"
            />
            {errors.fullname && (
              <p className="text-xs italic text-red-500">{errors.fullname}</p>
            )}
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold text-gray-700">
              Username
            </label>
            <input
              type="email"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Username"
            />
            {errors.username && (
              <p className="text-xs italic text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Add Sponsor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
