import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import New from "@/pages/New";
import Year from "@/pages/Year";
import { createBrowserRouter } from "react-router-dom";

// 创建路由实例 绑定 path element
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "month",
        element: <Month />,
      },
      {
        path: "year",
        element: <Year />,
      },
    ],
  },
  {
    path: "/new",
    element: <New />,
  },
]);

export default router;
