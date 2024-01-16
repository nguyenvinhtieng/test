import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import RootLayout from "./layouts/Root/Root";
import AuthLayout from "./layouts/Auth/Auth";
import HomePage from "./pages/Homepage/HomePage";
import Login from "./pages/Login/LoginPage";
import Signup from "./pages/Signup/SignupPage";
import Verify from "./pages/Verify/VerifyPage";
import Projects from "./pages/Workspace/MyProjects";
import Project from "./pages/Workspace/ProjectPage";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
    
     </BrowserRouter>
    // <BrowserRouter>
    //   <Layout style={{ minHeight: "100vh" }}>
    //     <Sidebar />
    //     <Layout>
    //       <Content style={{ margin: "24px 16px 0" }}>
    //         {/* <Routes>
    //           <Route
    //             path="/"
    //             element={
    //               <RootLayout>
    //                 <Route path="/" element={<HomePage />} />
    //                 <Route path="/projects" element={<Projects />} />
    //                 <Route path="/workspace/:projectId" element={<Project />} />
    //               </RootLayout>
    //             }
    //           />
    //           <Route
    //             path="/auth"
    //             element={
    //               <AuthLayout>
    //                 <Route path="login" element={<Login />} />
    //                 <Route path="signup" element={<Signup />} />
    //                 <Route path="verify" element={<Verify />} />
    //               </AuthLayout>
    //             }
    //           />
    //         </Routes> */}
    //       </Content>
    //     </Layout>
    //   </Layout>
    // </BrowserRouter>


    // <BrowserRouter>
    //   <div className="container">
    //     <Routes>
    //       <Route path="/" element={<HomePage />} />
    //     </Routes>
    //   </div>
    // </BrowserRouter>
  );
}

export default App;
