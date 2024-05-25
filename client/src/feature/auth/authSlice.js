// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: "1", token: 1 },
//   reducers: {
//     //setCredentials:đặt thông tin xác thực
//     setCredentials: (state, action) => {
//       //Nhận user và accessToken từ action
//       console.log(state);
//       const { user, accessToken } = action.payload; //pay load= tham số của action truyền lên
//       state.user = user;
//       state.token = accessToken;
//     },
//     logOut: (state, action) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });
// export const { setCredentials, logOut } = authSlice.actions;

// export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
