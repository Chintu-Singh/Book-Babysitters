import React from "react";
import ScrollToTop from "./ScrollToTop";
import Nav from "./Navbar/Nav";
import Landing from "./Landing Page/Landing";
import LoginPage from "./Login/LoginPage";
import RegisterPage from "./Login/RegisterPage";
import AccountPage from "./Account/AccountPage";
import LocationSearchPage from "./Map/LocationSearchPage";
import SearchPage from "./Search/SearchPage";
import UserProfilePage from "./Profiles/UserProfile/UserProfilePage";
import BabyProfilePage from "./Profiles/BabyProfile/BabyProfilePage";
import SecureRoute from "./Routes/SecureRoute";
import ForgetPassword from "./Login/ForgetPassword";
import LoggedInRoute from "./Routes/LoggedInRoute";
import UpdatePassword from "./Login/UpdatePassword";
import { AppContextProvider } from "./context/AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VideoChat from "./VideoChat/VideoChat";

const App = () => {
  return (
    <AppContextProvider>
      <Router>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/userprofile/:id" element={<UserProfilePage />} />
          <Route path="/petprofile/:id" element={<BabyProfilePage />} />
          <Route path="/password" element={<ForgetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/login"
            element={
              <LoggedInRoute>
                <LoginPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoggedInRoute>
                <RegisterPage />
              </LoggedInRoute>
            }
          />
          <Route
            path="/account"
            element={
              <SecureRoute>
                <AccountPage />
              </SecureRoute>
            }
          />
          <Route
            path="/map"
            element={
              <SecureRoute>
                <LocationSearchPage />
              </SecureRoute>
            }
          />
          <Route
            path="/videochat"
            element={
              <SecureRoute>
                <VideoChat />
              </SecureRoute>
            }
          />
        </Routes>
      </Router>
    </AppContextProvider>
  );
};

export default App;
