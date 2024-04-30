import { Fragment, useState } from "react";
import {Routes, Route } from "react-router-dom";
import {publicRoutes } from "./routes";
import DefaultLayout from "./components/Layout/DefaultLayout";
function App() {

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout></DefaultLayout>}></Route>
      <Route path="Home" element={<DefaultLayout></DefaultLayout>}></Route>
      <Route path="Support"></Route>
      <Route path="SignIn"></Route>
    </Routes>
  );

}

export default App;
