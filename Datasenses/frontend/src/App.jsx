import React from "react";
import {Route, Routes} from "react-router-dom";
import LandingPage from "./assets/landingpage/LandingPage";
import Auth from "./assets/auth/Auth";
import LogIn from "./assets/auth/login/LogIn";
import SignUp from "./assets/auth/signup/SignUp";
import Dashboard from "./assets/Dashboard/Dashboard";
import Form from "./assets/form/Form";
import Builder from "./assets/builder/Builder";
import Layout from "./assets/layout/Layout";
import Repository from "./assets/repository/Repository";
import DataTable from "./assets/repository/datatable/DataTable";
import ResponseForm from "./assets/responseformpage/ResponseForm";
import Middleware from "./assets/auth/Middleware";

function App() {
  return (
    <Middleware>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forms" element={<Form />} />
          <Route path="forms/builder/:id" element={<Builder />} />
          <Route path="/repository" element={<Repository />} />
          <Route path="/repository/:id" element={<DataTable />} />
        </Route>
        <Route path="/submit/:id/" element={<ResponseForm />} />
      </Routes>
    </Middleware>
  );
}

export default App;
