import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddEmployeeMutation } from "../../app/services/employees";
import { EmployeeForm } from "../../components/employeeForm";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";

interface AddEmployeeProps {}
export const AddEmployee: React.FC<AddEmployeeProps> = () => {
  const [error, setError] = useState();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [addEmployee] = useAddEmployeeMutation()
  useEffect(() => {
    if(!user) {
        navigate(Paths.login)
    }
  },[])
  const handleAddEmployee = () => {};
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
