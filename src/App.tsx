import Login from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassowrd from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import HeroSection from "./components/HeroSection";
import MainLayout from "./layout/MainLayout";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import ResturantDetail from "./components/ResturantDetail";

const appRouter = createBrowserRouter([ {
    path: "/",
    element: <MainLayout />, 
    children: [
      {
        path: "/",
        element: <HeroSection />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/search/:text",
        element: <SearchPage />
      },
      {
        path: "/resturant/:id",
        element: <ResturantDetail />
      },
    ]
  },
  {
    path: "/login",
    element: <Login /> 
  },
  {
    path: "/signup",
    element: <Signup /> 
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword /> 
  },
  {
    path: "/reset-password",
    element: <ResetPassowrd /> 
  },
  {
    path: "/verify-email",
    element: <VerifyEmail /> 
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </main>
  );
}

export default App;
