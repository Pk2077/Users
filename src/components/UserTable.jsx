import React, { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import axios from "axios";
import { navigate } from "@reach/router";

const UserTable = () => {
  const [array, setArr] = useState([]);
  const handleEditButtonClick = (id) => {
    navigate(`/articles/${id}/edit`);
    window.location.reload();
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/contacts/${id}`);
      setArr((prevData) => prevData.filter((formData) => formData.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting form data:", error);
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/contacts")
      .then((res) => setArr(res.data))
      .catch((err) => console.log("Could not get" + err.message));
  }, []);

  if (array.length === 0) return null;
  return (
    <div key={2077} className="mb-3">
      {array.map((arr) => (
        <Box
          key={arr._id}
          width="300px"
          height={"200px"}
          borderRadius={10}
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.08)"
          margin={"10px"}
        >
          <h1 className="mb-1" key={arr._id}>
            {arr.name}
          </h1>
          <p key={arr._id}>{arr.email}</p>
          <div key={arr._id} className="text-muted mb-2">
            {arr.phoneNumber + ""}
          </div>
          <HStack margin={"5px"}>
            <button
              className="btn btn-primary "
              key={arr._id}
              onClick={() => handleEditButtonClick(arr._id)}
            >
              Edit User
            </button>
            <button
              key={arr._id}
              className="btn btn-outline-danger"
              onClick={() => handleDelete(arr._id)}
            >
              Delete
            </button>
          </HStack>
        </Box>
      ))}
    </div>
  );
};

export default UserTable;
