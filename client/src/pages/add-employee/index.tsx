import { Employee } from "@prisma/client";
import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { EmployeeForm } from "../../components/employeeForm";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

interface AddEmployeeProps {}
export const AddEmployee: React.FC<AddEmployeeProps> = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation()
  useEffect(() => {
    if(!user) {
        navigate(Paths.login)
    }
  },[])
  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()

      navigate(`${Paths.status}/created`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if(maybeError) {
        setError(error.data.message)
      } else{
        setError('Неизестная ошибка')

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
          title="Добавить сотрудника"
          btnText="Добавить"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  );
};
