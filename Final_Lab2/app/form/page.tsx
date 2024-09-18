'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
};

export default function Home() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();
  const [formData, setFormData] = useState<FormData | null>(null);

  const onSubmit = (data: FormData) => {
    setFormData(data);
    console.log(data); 
  };

  const password = watch('password');

  return (
    <div>
      <div className="border border-black p-1 rounded-md w-40">
        <h1 className="font-bold text-black mb-2">Form</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {}
        <div>
          <label>Full Name:</label>
          <input
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="text"
            placeholder="Enter your full name"
            {...register('fullName', {
              required: 'Full Name is required',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Full Name can only contain alphabets'
              }
            })}
          />
          {errors.fullName && <p className="text-red-700">{errors.fullName.message}</p>}
        </div>

        {}
        <div>
          <label>Email:</label>
          <input
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="email"
            placeholder="Enter your email address"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-700">{errors.email.message}</p>}
        </div>

        {}
        <div>
          <label>Password:</label>
          <input
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="password"
            placeholder="Enter a password"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              maxLength: { value: 20, message: 'Password must be no more than 20 characters' }
            })}
          />
          {errors.password && <p className="text-red-700">{errors.password.message}</p>}
        </div>

        {}
        <div>
          <label>Confirm Password:</label>
          <input
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="password"
            placeholder="Confirm your password"
            {...register('confirmPassword', {
              validate: (value) => value === password || 'The passwords do not match',
            })}
          />
          {errors.confirmPassword && <p className="text-red-700">{errors.confirmPassword.message}</p>}
        </div>

        {}
        <div>
          <label>Date of Birth:</label>
          <input
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="date"
            {...register('dateOfBirth', { required: 'Date of Birth is required' })}
          />
          {errors.dateOfBirth && <p className="text-red-700">{errors.dateOfBirth.message}</p>}
        </div>

        {}
        <div>
          <label>Gender:</label>
          <select
            className="px-2 py-1 mb-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            {...register('gender', { required: 'Gender is required' })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-700">{errors.gender.message}</p>}
        </div>

        {}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 border border-black rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      
      {}
    </div>
  );
}
