import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebaseConfig"; // Firebase config

// Layout
import Root from "./Pages/Root";

// Pages
import Home from "./Pages/Home";

import ContactForm from "./Pages/contactform/ContactForm";
import MassageList from "./Pages/contactform/MassageList";
import Login from "./components/login/login";
import ProjectsList from "./components/projectlist/ProjectsList";
import ProjectPage from "./Pages/ProjectPage";
import BlogList from "./components/Blog/BlogList";
import BlogDetailPage from "./Pages/blog/BlogDetailPage";

function App() {
  const [user, setUser] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {/* Home */}
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          {/* Projects */}
          <Route path="projects" element={<ProjectsList />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />

          {/* Blog */}

     
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
     

          {/* Contact */}
          <Route path="contact" element={<ContactForm />} />

          {/* Admin-only messages list */}
          <Route
            path="massagelist"
            element={
              user?.email === "jamilnimbook2@gmail.com" ? (
                <MassageList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Login */}
          <Route path="login" element={<Login />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
