import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import axios from "axios";

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

const User = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log("saved", data);
        axios.post("http://localhost:3000/api/contacts", data).then((res) => {
          console.log("saved", data);
          navigate("/");
          window.location.reload();
        });
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
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
          id="email"
          className="form-control"
          type="text"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>{" "}
      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          {...register("phoneNumber", { valueAsNumber: true })}
          id="phoneNumber"
          className="form-control"
          type="number"
        />
        {errors.phoneNumber && (
          <p className="text-danger">{errors.phoneNumber.message}</p>
        )}
      </div>
      <br></br>
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
};

export default User;
