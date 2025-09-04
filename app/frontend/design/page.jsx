import React from "react";
import { Toaster } from "react-hot-toast";

export default function MainPage() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h1>Job Portal</h1>
      <h1>Welcome</h1>
    </div>
  );
}
