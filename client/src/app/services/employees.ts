import { Employee } from "@prisma/client";
import { api } from "./api";

// export type EmployeeData = Omit<Employee, "id">;
// type ResponseLoginData = Employee;

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // login: builder.mutation<ResponseLoginData, UserData>({
    //   query: (userData) => ({
    //     url: "/user/login",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),
    // register: builder.mutation<ResponseLoginData, UserData>({
    //   query: (userData) => ({
    //     url: "/user/register",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees/",
        method: "GET",
      }),
    }),
  }),
});

export const {  useGetAllEmployeesQuery} = employeeApi;

export const {
  endpoints: { getAllEmployees },
} = employeeApi;
