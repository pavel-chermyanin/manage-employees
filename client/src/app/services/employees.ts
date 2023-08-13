import { Employee } from "@prisma/client";
import { api } from "./api";

export const employeeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addEmployee: builder.mutation<Employee, Employee>({
      query: (employee) => ({
        url: "/employees/add",
        method: "POST",
        body: employee,
      }),
    }),
    editEmployee: builder.mutation<string, Employee>({
      query: (employee) => ({
        url: `/employees/edit/${employee.id}`,
        method: "PUT",
        body: employee,
      }),
    }),
    removeEmployee: builder.mutation<string, string>({
      query: (id) => ({
        url: `/employees/remove/${id}`,
        method: "POST",
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
  useEditEmployeeMutation
} = employeeApi;

export const {
  endpoints: { getAllEmployees, addEmployee, getEmployee, removeEmployee ,editEmployee},
} = employeeApi;
