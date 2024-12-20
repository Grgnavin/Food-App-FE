import Login from "./auth/Login";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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
import { useUserStore } from "./store/useUserStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace/>
  }
  if (!user?.isVerified) {
    return <Navigate to={'/verify-email'} replace/>
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to={'/'} replace/>
  }
  return children;
}

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace/>
  }
  if (!user?.admin) {
    return <Navigate to={'/'} replace/>
  }
  return children;
}

const appRouter = createBrowserRouter([ {
    path: "/",
    element: 
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>,
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
            element: 
              <AdminRoute>
                <Resturant />
              </AdminRoute>
          },
          {
            path: "/admin/menu",
            element: 
              <AdminRoute>
                <AddMenu />
              </AdminRoute>
          },
          {
            path: "/admin/orders",
            element: 
              <AdminRoute>
                <Orders />
              </AdminRoute>
          },
        ]
      },
      {
        path: "/login",
        element: 
          <AuthenticatedUser>
            <Login /> 
          </AuthenticatedUser>
      },
      {
        path: "/signup",
        element: 
            <AuthenticatedUser>
              <Signup /> 
            </AuthenticatedUser>
      },
      {
        path: "/forgot-password",
        element: 
            <AuthenticatedUser>
              <ForgotPassword /> 
            </AuthenticatedUser>
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
  const { initializeTheme } = useThemeStore();
  //check user everytime the page reloads
  useEffect(() => {
    initializeTheme();
  },[]);

  return (
    <main>
      <RouterProvider router={appRouter}>
      </RouterProvider>
    </main>
  );
}

export default App;
