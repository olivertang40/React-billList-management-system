import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: "billList",
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
    // 同步添加账单方法
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

const { setBillList, addBill } = billStore.actions;

const getBillList = () => {
  return async (dispatch) => {
    // 编写异步请求
    const res = await axios.get("http://localhost:8824/ka");
    // 触发同步reducer
    dispatch(setBillList(res.data));
  };
};

const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8824/ka", data);
    dispatch(addBill(res.data));
  };
};

export { getBillList, addBillList };

const reducer = billStore.reducer;

export default reducer;
