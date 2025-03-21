"use client";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to show toast
export const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};

const ToastProvider = () => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};

export default ToastProvider;
