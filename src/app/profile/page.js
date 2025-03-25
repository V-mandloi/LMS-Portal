"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { showToast } from "../components/showToaster";
import { FaUserTie, FaBuilding } from "react-icons/fa";
import { useFetchImage } from "@/app/hooks/usefetchimages";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    post: "",
    speciality: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode
  const router = useRouter();
  const token = sessionStorage.getItem("token");

  const { imageUrl: profileUrl, error: profileError } =
    useFetchImage("profile.png");

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        showToast("No authentication token found");
        router.push("/auth/login");
        return;
      }
      try {
        const res = await axios.get("/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        showToast("Failed to fetch user data");
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, router]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/api/profile", user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("Successfully updated!");
      setIsEditing(false); // Hide form after saving
    } catch (err) {
      showToast("Failed to update user data");
    }
  };

  if (loading) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 text-white shadow-lg rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 border-b pb-4">
        {profileUrl ? (
          <img
            alt="User Profile"
            src={profileUrl}
            className="w-20 h-20 rounded-full border object-cover"
          />
        ) : (
          <p>Loading profile...</p>
        )}
        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-400">{user.email}</p>
          <div className="flex items-center text-gray-500">
            <FaUserTie className="mr-2" /> {user.post}
          </div>
          <div className="flex items-center text-gray-500">
            <FaBuilding className="mr-2" /> {user.speciality}
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        {isEditing ? "Cancel" : "Edit Profile"}
      </button>

      {/* Show form only when isEditing is true */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Post</label>
            <input
              type="text"
              name="post"
              value={user.post}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Speciality</label>
            <input
              type="text"
              name="speciality"
              value={user.speciality}
              onChange={handleChange}
              className="w-full border p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
