"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface SponsorUpdateDto {
  fullname?: string;
  username?: string;
  password?: string;
}

export default function UpdateSponsor() {
  const router = useRouter();
  const [formData, setFormData] = useState<SponsorUpdateDto>({
    fullname: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<SponsorUpdateDto>>({});
  const sponsorId = 9; 

  useEffect(() => {
    const fetchSponsor = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/sponsor/${sponsorId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching sponsor:", error);
      }
    };

    fetchSponsor();
  }, [sponsorId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = (formData: SponsorUpdateDto): Partial<SponsorUpdateDto> => {
    const validationErrors: Partial<SponsorUpdateDto> = {};

    if (!formData.fullname) {
      validationErrors.fullname = "Fullname is required";
    }
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (formData.password && formData.password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.put(`http://localhost:3000/sponsor/updatesponsor/${sponsorId}`, formData);
        if (response.status === 200) {
          alert("Sponsor updated successfully!");
          router.push("/sponsors"); 
        }
      } catch (error: any) {
        console.error("Error during update:", error);
        alert("Update failed. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Update Sponsor</h1>
        <form onSubmit={handleSubmit}>
        
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

         
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold text-gray-700">
              Username
            </label>
            <input
              type="text"
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

        
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold text-gray-700">
              Password (Leave blank to keep current password)
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
              Update Sponsor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
