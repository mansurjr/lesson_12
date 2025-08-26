import React from "react";
import Footer from "./components/footer/footer";
import Main from "./components/main/Main";
import UserApp from "./components/User";
import Container from "./components/container/Container";
import "@fontsource-variable/roboto";

const App = () => {
  return (
    <>
        <Container>
        <UserApp />
      </Container>
    </>
  );
};

export default App;
