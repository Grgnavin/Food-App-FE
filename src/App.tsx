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
import Cart from "./components/Cart";
import Resturant from "./admin/Resturant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import SuccessPage from "./components/SuccessPage";

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
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "/order/status",
        element: <SuccessPage />
      },
      //admin servies start from here
      {
        path: "/admin/resturant",
        element: <Resturant />
      },
      {
        path: "/admin/menu",
        element: <AddMenu />
      },
      {
        path: "/admin/orders",
        element: <Orders />
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
