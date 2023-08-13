import { Employee } from "@prisma/client";
import { Row } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditEmployeeMutation,
  useGetEmployeeQuery,
} from "../../app/services/employees";
import { EmployeeForm } from "../../components/employeeForm";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

const EditEmployee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [editEmployee] = useEditEmployeeMutation();
  if (isLoading) {
    return <span>Загрузка</span>;
  }
  const handleEditEmployee = async (employee: Employee) => {
    try {
      const editedEmployee = {
        ...data,
        ...employee,
      };
      await editEmployee(editedEmployee).unwrap();
      navigate(`${Paths.status}/updated`);
    } catch (error) {
      const maybeError = isErrorWithMessage(error);

      if (maybeError) {
        setError(error.data.message);
      } else {
        setError("Неизвестная ошибка");
      }
    }
  };
  return (
    <Layout>
      <Row
        align="middle"
        justify="center"
      >
        <EmployeeForm
          title="Редактировать сотрудника"
          btnText="Редактировать"
          onFinish={handleEditEmployee}
          error={error}
          employee={data}
        />
      </Row>
    </Layout>
  );
};

export default EditEmployee;
