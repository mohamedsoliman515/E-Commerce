import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageSuspenseFallBack } from "@components/feedBack";

// const HomePage = lazy(() => import("./pages/HomePage"));
// pages

const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("@layouts/ProfileLayout/ProfileLayout")
);

const Home = lazy(() => import("@pages/Home"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Account = lazy(() => import("@pages/Account"));
const Orders = lazy(() => import("@pages/Orders"));


import Error from "@pages/Error";
// protected routes
import ProtectedRoute from "@components/Auth/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Error type="loading" />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error type="error" />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallBack>
            <Home />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFallBack>
            <AboutUs />
          </PageSuspenseFallBack>
        ),
      },

      {
        path: "/cart",
        element: (
          <PageSuspenseFallBack>
            <Cart />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallBack>
              <Wishlist />
            </PageSuspenseFallBack>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspenseFallBack>
            <Categories />
          </PageSuspenseFallBack>
        ),
      },

      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspenseFallBack>
            <Products />
          </PageSuspenseFallBack>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Products of this Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallBack>
            <Login />
          </PageSuspenseFallBack>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallBack>
            <Register />
          </PageSuspenseFallBack>
        ),
      },
      // <ProtectedRoute>  i don't need protect children because parent (<ProfileLayout />) protected then all children will be protected
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallBack>
              <ProfileLayout />
            </PageSuspenseFallBack>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallBack>
                <Account />
              </PageSuspenseFallBack>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspenseFallBack>
                <Orders />
              </PageSuspenseFallBack>
            ),
          },
        ],
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

