import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/main/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PageLoader } from "@/components/common/page-loader";

// Lazy load all pages
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Categories = lazy(() => import("@/pages/categories"));
const Products = lazy(() => import("@/pages/products"));
const Cart = lazy(() => import("@/pages/cart"));
const Wishlist = lazy(() => import("@/pages/wishlist"));
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const Error = lazy(() => import("@/pages/error"));

// Wrap component with Suspense
const withSuspense = (
  Component: React.LazyExoticComponent<React.ComponentType>
) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: withSuspense(Error),
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "/about",
        element: withSuspense(About),
      },
      {
        path: "/categories",
        element: withSuspense(Categories),
      },
      {
        path: "/products/:prefix",
        element: withSuspense(Products),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "/cart",
        element: withSuspense(Cart),
      },
      {
        path: "/wishlist",
        element: withSuspense(Wishlist),
      },
      {
        path: "/login",
        element: withSuspense(Login),
      },
      {
        path: "/register",
        element: withSuspense(Register),
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
