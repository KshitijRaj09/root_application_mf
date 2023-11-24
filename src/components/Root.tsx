import React, { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MainPage } from "./MainPage";
const HomepageLazy = lazy(() => import("./Homepage/Homepage"));
const PeopleLazy = lazy(() => import("People/People"));
const MessengerLazy = lazy(() => import("Messenger/Messenger"));
const AccountLazy = lazy(() => import("Account/Account"));
import { AuthRoute } from "./AuthRoute/AuthRoute";
const PeopleDetailPage = lazy(()=> import("People/PeopleDetailPage"));
import NotFoundPage from "./ErrorPages/404NotFound";

const router = createBrowserRouter([
   {
      path: "", // blank in case of github pages else "/"
      element: <MainPage />,
   },
   {
      path: "/homepage",
      element: <AuthRoute Component={HomepageLazy} />,
   },
   {
      path: "/people",
      element: <AuthRoute Component={PeopleLazy} />,
   },
   {
      path: "/account/:id",
      element: <>User account Page</>,
   },
   {
      path: "/people/:id",
      element: <AuthRoute Component={PeopleDetailPage} />,
   },
   {
      path: "/account",
      element: <AuthRoute Component={AccountLazy} />,
   },
   {
      path: "/messenger",
      element: <AuthRoute Component={MessengerLazy} />,
   },
   {
      path: "*",
      element: <AuthRoute Component={NotFoundPage} />
   }
],
   { basename: '/root_application_mf' } // basename added for github pages
);
export const Root = () => <RouterProvider router={router} />;
