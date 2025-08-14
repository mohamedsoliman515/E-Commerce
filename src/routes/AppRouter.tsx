import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageSuspenseFallBack } from "@components/feedBack";

// const HomePage = lazy(() => import("./pages/HomePage"));
// pages

const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
const Home = lazy(() => import("@pages/Home"));
const Cart = lazy(() => import("@pages/Cart"));
const Wishlist = lazy(() => import("@pages/Wishlist"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Profile = lazy(() => import("@pages/Profile"));
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
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallBack>
              <Profile />
            </PageSuspenseFallBack>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
// import { Suspense, lazy } from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { MainLayout } from "@layouts/index";

// // Lazy-loaded pages
// const Home = lazy(() => import("@pages/Home"));
// const Cart = lazy(() => import("@pages/Cart"));
// const Wishlist = lazy(() => import("@pages/Wishlist"));
// const AboutUs = lazy(() => import("@pages/AboutUs"));
// const Categories = lazy(() => import("@pages/Categories"));
// const Products = lazy(() => import("@pages/Products"));
// const Login = lazy(() => import("@pages/Login"));
// const Register = lazy(() => import("@pages/Register"));
// const Error = lazy(() => import("@pages/Error"));

// // Helper fallback
// const loading = <div>Loading, please wait...</div>;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     errorElement: (
//       <Suspense fallback={loading}>
//         <Error />
//       </Suspense>
//     ),
//     children: [
//       {
//         index: true,
//         element: (
//           <Suspense fallback={loading}>
//             <Home />
//           </Suspense>
//         ),
//       },
//       {
//         path: "about-us",
//         element: (
//           <Suspense fallback={loading}>
//             <AboutUs />
//           </Suspense>
//         ),
//       },
//       {
//         path: "cart",
//         element: (
//           <Suspense fallback={loading}>
//             <Cart />
//           </Suspense>
//         ),
//       },
//       {
//         path: "wishlist",
//         element: (
//           <Suspense fallback={loading}>
//             <Wishlist />
//           </Suspense>
//         ),
//       },
//       {
//         path: "categories",
//         element: (
//           <Suspense fallback={loading}>
//             <Categories />
//           </Suspense>
//         ),
//       },
//       {
//         path: "categories/products/:prefix",
//         element: (
//           <Suspense fallback={loading}>
//             <Products />
//           </Suspense>
//         ),
//         loader: ({ params }) => {
//           if (
//             typeof params.prefix !== "string" ||
//             !/^[a-z]+$/i.test(params.prefix)
//           ) {
//             throw new Response("Bad Request", {
//               statusText: "Products of this Category not found",
//               status: 400,
//             });
//           }
//           return true;
//         },
//       },
//       {
//         path: "login",
//         element: (
//           <Suspense fallback={loading}>
//             <Login />
//           </Suspense>
//         ),
//       },
//       {
//         path: "register",
//         element: (
//           <Suspense fallback={loading}>
//             <Register />
//           </Suspense>
//         ),
//       },
//     ],
//   },
// ]);

// const AppRouter = () => {
//   return <RouterProvider router={router} />;
// };

// export default AppRouter;
