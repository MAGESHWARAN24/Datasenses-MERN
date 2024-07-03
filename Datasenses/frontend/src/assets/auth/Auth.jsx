import React from "react";
import Layout from "./layout/Layout";
import {Outlet} from "react-router-dom";

export default function Auth() {
  return (
    <Layout>
      <div className="w-full h-full flex items-center justify-center">
        <Outlet />
      </div>
    </Layout>
  );
}
