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
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
    getAllEmployees: builder.query<Employee[], void>({
      query: () => ({
        url: "/employees/",
        method: "GET",
      }),
    }),
    getEmployee: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} = employeeApi;

export const {
  endpoints: { getAllEmployees, addEmployee, getEmployee, removeEmployee },
} = employeeApi;
