import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // login: builder.mutation<ResponseLoginData, UserData>({
    //   query: (userData) => ({
    //     url: "/user/login",
    //     method: "POST",
    //     body: userData,
    //   }),
    // }),
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: "/employees/add",
        method: "POST",
        body: employee,
      }),
    }),
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllEmployeesQuery, useAddEmployeeMutation } = employeeApi;

export const {
  endpoints: { getAllEmployees, addEmployee },
} = employeeApi;
