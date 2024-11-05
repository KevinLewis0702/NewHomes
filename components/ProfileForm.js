"use client";

import { useState } from 'react';
import ButtonAccount from "@/components/ButtonAccount";

export default function ProfileForm({ user }) {
  // Use local state to handle form inputs
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');
  const [email, setEmail] = useState(user.email || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the form submission logic here
  };

  // The form UI
  return (
    <main className="min-h-screen p-8 pb-24">
    <section className="max-w-xl mx-auto space-y-8">
      <h1 className="text-3xl md:text-4xl font-extrabold">
        My Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label>
            First Name
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            Last Name
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            Email
            <input type="email" value={email} disabled />
          </label>
        </div>
        <h2 className="text-2xl font-bold mt-8">
          Change Password
        </h2>
        <div className="space-y-4 mt-4">
          <label>
            Old Password
            <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          </label>
          <label>
            New Password
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <label>
            Confirm New Password
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
        </div>
      </form>
    </section>
  </main>
);
}