import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from "./routes/Authentication/Login.jsx";
import Dashboard from "./routes/Admin/Dashboard/Dashboard.jsx";
import StaffDashboardHome from "./routes/Staff/Dashboard/Dashboard.jsx";
import AdminDashboard from "./routes/Admin/AdminDashboard.jsx";
import Billing from "./routes/Admin/Dashboard/Billing.jsx";
import Payments from "./routes/Admin/Dashboard/Payments.jsx";
import SendMessage from "./routes/Admin/Dashboard/SendMessage.jsx";
import AddUser from "./routes/Admin/Dashboard/AddUser.jsx";
import StaffDashboard from "./routes/Staff/StaffDashboard.jsx";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./providers/ThemeProvider.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import PrivateRoute from "./routes/Authentication/PrivateRoute.jsx";
import EditUser from "./routes/Admin/Dashboard/EditUser.jsx";
import ViewUser from "./routes/Admin/Dashboard/ViewUser.jsx";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "admin",
    element: <PrivateRoute><AdminDashboard /></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "message",
        element: <SendMessage />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "edit-user/:id",
        element: <EditUser />,
      },
      {
        path: "view-user/:id",
        element: <ViewUser />,
      },
    ],
  },
  {
    path: "staff",
    element: <PrivateRoute><StaffDashboard /></PrivateRoute>,
    children: [
      {
        path: "dashboard",
        element: <StaffDashboardHome />,
      },
      {
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "edit-user/:id",
        element: <EditUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
