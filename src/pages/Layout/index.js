import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* 配置二级路由的出口 */}
      <Outlet />
      我是layout
      <Link to="/">Month</Link>
      <Link to="/year">Year</Link>
    </div>
  );
};

export default Layout;
