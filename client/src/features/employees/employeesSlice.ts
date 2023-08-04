import { employeeApi } from "./../../app/services/employees";
import { RootState } from "./../../app/store";
import { Employee } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  employees: Employee[] | null;
  //   isAuthenticated: boolean;
}

const initialState: InitialState = {
  employees: null,
  //   isAuthenticated: false,
};

const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      //   .addMatcher(employeeApi.endpoints.login.matchFulfilled, (state, action) => {
      //     state.user = action.payload;
      //     state.isAuthenticated = true;
      //   })
      // .addMatcher(
      //   employeeApi.endpoints.addEmployee.matchFulfilled,
      //   (state, action) => {
      //     state.employees = action.payload;
      //   }
      // )
      .addMatcher(
        employeeApi.endpoints.getAllEmployees.matchFulfilled,
        (state, action) => {
          state.employees = action.payload;
          // state.isAuthenticated = true;
        }
      );
  },
});
export const { logout } = slice.actions;

export default slice.reducer;

// export const selectIsAuthenticated = (state: RootState) =>
//   state.auth.isAuthenticated;
// export const selectUser = (state: RootState) => state.auth.user;
