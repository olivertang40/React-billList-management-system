import { Link, Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { useDispatch, useSelector } from "react-redux";
import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";

const Layout = () => {
  const { billList } = useSelector((state) => state.bill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

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
