import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import DailyBill from "./components/DailyBill";

const Month = () => {
  //按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  console.log(monthGroup);

  //控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  const [currentMonthList, setMonthList] = useState([]);
  const [monthDayList, setDateList] = useState([]);

  const monthResult = useMemo(() => {
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);

    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    console.log("计算 month result");
    return { pay, income, total: pay + income };
  }, [currentMonthList]);

  useEffect(() => {
    const formatDate = dayjs().format("YYYY-MM");
    if (monthGroup[formatDate]) {
      setMonthList(monthGroup[formatDate]);
    }
  }, [monthGroup]);

  const onConfirm = (date) => {
    setDateVisible(false);
    const formatDate = dayjs(date).format("YYYY-MM");
    setMonthList(monthGroup[formatDate] || []);

    setCurrentDate(formatDate);
  };

  // 当前月按照日来做分组
  const dayGroup = useMemo(() => {
    const groupData = _.groupBy(currentMonthList, (item) =>
      dayjs(item.date).format("YYYY-MM-DD")
    );
    const keys = Object.keys(groupData);

    return { groupData, keys };
  }, [currentMonthList]);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div
            className="date"
            onClick={() => {
              setDateVisible(!dateVisible);
            }}
          >
            <span className="text">{currentDate + ""}月账单</span>
            {/* 根据当前弹框的打开状态来通知expand类名是否存在 */}
            <span
              className={classNames("arrow", { expand: dateVisible })}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onClose={() => setDateVisible(false)}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            // onConfirm={() => setDateVisible(false)}
            max={new Date()}
          />
          {/* 取消onClose，确定onConfirm，注释写在外面 */}
        </div>
        {/* 单日列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <DailyBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Month;
