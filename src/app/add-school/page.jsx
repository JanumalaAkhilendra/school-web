"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    // 👇 Append file correctly
    formData.append("image", data.image[0]);

    const res = await fetch("/api/add-school", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message || "Error");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        <input {...register("name")} placeholder="School Name" className="border p-2 w-full rounded" />
        <input {...register("address")} placeholder="Address" className="border p-2 w-full rounded" />
        <input {...register("city")} placeholder="City" className="border p-2 w-full rounded" />
        <input {...register("state")} placeholder="State" className="border p-2 w-full rounded" />
        <input type="tel" {...register("contact")} placeholder="Contact Number" className="border p-2 w-full rounded" />
        <input type="email" {...register("email_id")} placeholder="Email" className="border p-2 w-full rounded" />
        <input type="file" {...register("image")} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
