import React, { useEffect, useState } from "react";
import Login from "./pages/login/Login";
import { Navigate, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Management from "./pages/management/Management";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { ref, onValue } from "firebase/database";
import { signOut } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [user] = useAuthState(auth);
  const [userTypeError, setUserTypeError] = useState(0);

  useEffect(() => {
    if (user == null) {
      localStorage.removeItem("gmail");
      setIsLoggedIn(false);
    } else {
      //checking the user type is match or not
      const adminRef = ref(db, `admins/${user.uid}/type`);
      onValue(adminRef, (snapshot) => {
        if (snapshot.exists()) {
          const userType = snapshot.val();
          // Redirect based on user role
          if (userType === "company") {
            const _user = JSON.parse(localStorage.getItem("gmail"));
            console.log(_user);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
            console.log("User type isn't match!");
            setUserTypeError(1);
            signOut(auth);
          }
        }
      });
    }
  }, [user]);

  return (
    <>
      <Router>
        <div className="flex h-screen w-screen overflow-hidden">
          {/* side bar */}
          {isLoggedIn && (
            <div className="h-full w-1/4 bg-primary-blue dark:bg-black dark:opacity-90">
              <Sidebar />
            </div>
          )}
          {/* nav and body */}
          <div className="flex flex-col w-full h-full bg-ternary-blue dark:bg-dark-secondary">
            {/* nav */}
            {isLoggedIn && (
              <div className="flex bg-red-800 w-full h-1/6 bg-primary-blue opacity-60 dark:bg-black dark:opacity-100">
                <Navbar />
              </div>
            )}

            {/* body */}
            <div className=" w-full h-full flex items-center justify-center dark:text-white">
              {/* Conditional rendering for admin routes */}

              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? <Navigate to={"admin/dashboard"} /> : <Login userTypeError={userTypeError} />
                  }
                />
                <Route path="/admin">
                  <Route
                    index
                    path="dashboard"
                    element={isLoggedIn ? <Dashboard /> : <Navigate to={"/"} />}
                  />
                  <Route
                    path="management"
                    element={
                      isLoggedIn ? <Management /> : <Navigate to={"/"} />
                    }
                  />
                  <Route
                    path="profile"
                    element={isLoggedIn ? <Profile /> : <Navigate to={"/"} />}
                  />
                  <Route
                    path="settings"
                    element={isLoggedIn ? <Settings /> : <Navigate to={"/"} />}
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
