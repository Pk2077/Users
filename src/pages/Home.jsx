import { React } from "react";
import { Button, Heading, VStack } from "@chakra-ui/react";
import { navigate } from "@reach/router";
import UserTable from "../components/UserTable";

const Home = () => {
  const handleClick = () => {
    navigate("/new");
    window.location.reload();
  };
  return (
    <div>
      <VStack>
        <Heading size="3xl">Users Contacts</Heading>
        <UserTable />
        <Button
          value={"NewUser"}
          width={"100px"}
          colorScheme="green"
          marginTop={"15px"}
          onClick={handleClick}
        >
          New User
        </Button>
      </VStack>
    </div>
  );
};

export default Home;
