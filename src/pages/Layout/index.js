import { Link, Outlet } from "react-router-dom";
import { Button } from "antd-mobile";

const Layout = () => {
  return (
    <div>
      {/* 配置二级路由的出口 */}
      <Outlet />
      我是layout
      <Link to="/">Month</Link>
      <Link to="/year">Year</Link>
      <Button color="primary">测试全局</Button>
      <div className="purple">
        <Button color="primary">测试局部</Button>
      </div>
    </div>
  );
};

export default Layout;
