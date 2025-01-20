import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./Pages/NotFound";
import Home from "./Pages/Home";
import Artists from "./Pages/Artists";
import Events from "./Pages/Events";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import AdminRoute from "./utils/AdminRoute";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminArtist from "./Pages/Admin/Artist";
import AdminEvents from "./Pages/Admin/Events";
import AddArtist from "./Pages/Admin/AddArtist";
import EditArtist from "./Pages/Admin/EditArtist";
import AddEvent from "./Pages/Admin/AddEvent";
import EditEvent from "./Pages/Admin/EditEvent";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/events" element={<Events />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/artist"
          element={
            <AdminRoute>
              <AdminArtist />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/add-artist"
          element={
            <AdminRoute>
              <AddArtist />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/edit-artist/:id"
          element={
            <AdminRoute>
              <EditArtist />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/events"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard/add-event"
          element={
            <AdminRoute>
              <AddEvent />
            </AdminRoute>
          }
        />
         <Route
          path="/dashboard/edit-event/:id"
          element={
            <AdminRoute>
              <EditEvent />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
