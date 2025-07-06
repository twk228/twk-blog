import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import WelcomeLayout from "../views/Welcome";
import { AuthRouter } from "./AuthRouter";
const Home = lazy(() => import("../views/Home/Home"));
const Detail = lazy(() => import("../views/Detail/Detail"));
const Nav = lazy(() => import("../views/Nav/Nav"));
const About = lazy(() => import("../views/About/About"));
const Front = lazy(() => import("../views/Front/Front"));
const Admin = lazy(() => import("../views/admin/Admin"));
const AdminHome = lazy(() => import("../views/admin/AdminHome/AdminHome"));
const AdminLogin = lazy(() => import("../views/admin/AdminLogin/AdminLogin"));
const AdminAbout = lazy(() => import("../views/admin/AdminAbout/AdminAbout"));
const AdminNav = lazy(() => import("../views/admin/AdminNav/AdminNav"));
const AdminNavDetail = lazy(() =>
  import("../views/admin/AdminNav/AdminNavDetail")
);
const AdminProject = lazy(() => import("../views/admin/AdminProject/AdminProject"));
const AdminActionProject = lazy(() => import("../views/admin/AdminProject/actionProject"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/front"} />,
  },
  // 后台登录路由
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<Loading />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  // 前台页面路由
  {
    path: "/front",
    element: (
      <Suspense fallback={<Loading />}>
        <Front />
      </Suspense>
    ),
    children: [
      // 首页
      {
        path: "/front",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      // 详情页面
      {
        path: "/front/detail",
        element: (
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        ),
      },
      // 我的导航页面
      {
        path: "/front/nav",
        element: (
          <Suspense fallback={<Loading />}>
            <Nav />
          </Suspense>
        ),
      },
      // 关于我页面
      {
        path: "/front/about",
        children: [
          {
            path: "/front/about",
            element: <WelcomeLayout />,
          },
          {
            path: "/front/about/index",
            element: (
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  // 后台管理页面
  {
    path: "/admin",
    element: (
      <Suspense fallback={<Loading />}>
        <AuthRouter>
          <Admin />
        </AuthRouter>
      </Suspense>
    ),
    children: [
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminHome />
          </Suspense>
        ),
      },
      {
        path: "/admin/about",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminAbout />
          </Suspense>
        ),
      },
      {
        path: "/admin/nav",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminNav />
          </Suspense>
        ),
      },
      {
        path: "/admin/project",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminProject />
          </Suspense>
        ),
      },
      {
        path: "/admin/action-project",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminActionProject />
          </Suspense>
        ),
      },
      {
        path: "/admin/nav/detail",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminNavDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
