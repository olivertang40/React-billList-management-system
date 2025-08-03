const { default: Layout } = require("@/pages/Layout");
const { default: Month } = require("@/pages/Month");
const { default: New } = require("@/pages/New");
const { default: Year } = require("@/pages/Year");
const { createBrowserRouter } = require("react-router-dom");

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
