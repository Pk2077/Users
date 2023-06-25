import React, { useEffect, useState } from "react";
import axios from "axios";
import { HStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be more than 3 letters" })
    .max(50),
  email: z
    .string()
    .min(5, { message: "email must be more than 5 letters" })
    .max(50)
    .email("This is not a valid email"),
  phoneNumber: z
    .number({ invalid_type_error: "phone Number is required" })
    .min(10, { message: "phone Number must be more than 10 letters" }),
});

function EditUser({ id }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/contacts/${id}`)
      .then((response) => {
        setFormData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching form data:", error.message);
      });
  }, [id]);

  useEffect(() => {
    const saveFormData = async () => {
      try {
        await axios.put(`http://localhost:3000/api/contacts/${id}`, formData);
        console.log("Form data saved successfully");
      } catch (error) {
        console.error("Error saving form data:", error.message);
      }
    };
    saveFormData();
  }, [formData, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    axios
      .put(`http://localhost:3000/api/contacts/${id}`, formData)
      .then((response) => {
        console.log("Form data updated successfully");
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating form data:", error.message);
      });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          type="text"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          {...register("email")}
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          type="text"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          {...register("phoneNumber")}
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="form-control"
          type="number"
        />
        {errors.phoneNumber && (
          <p className="text-danger">{errors.phoneNumber.message}</p>
        )}
      </div>
      <br />
      <HStack>
        <button
          className="btn btn-outline-success btn-lg"
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
        >
          All Users
        </button>
        <button className="btn btn-primary btn-lg" type="submit">
          Submit
        </button>
      </HStack>
    </form>
  );
}

export default EditUser;
