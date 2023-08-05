import { Employee } from "@prisma/client";
import { Card, Form, Space } from "antd";
import React from "react";
import { CustomButton } from "../customButton";
import { CustomInput } from "../customInput";
import { ErrorMessage } from "../errorMessage";

interface Props<T> {
  onFinish: (values: T) => void;
  btnText: string;
  title: string;
  error?: string;
  employee?: T;
}
export const EmployeeForm: React.FC<Props<Employee>> = ({
  onFinish,
  btnText,
  title,
  error,
  employee,
}) => {
  return (
    <Card
      title={title}
      style={{ width: "30rem" }}
    >
      <Form
        name="employee-form"
        onFinish={onFinish}
        initialValues={employee}
      >
        <CustomInput
          type="text"
          name="firstName"
          placeholder="Имя"
        />
        <CustomInput
          type="text"
          name="lastName"
          placeholder="Фамилия"
        />
        <CustomInput
          type="number"
          name="age"
          placeholder="Возраст"
        />
        <CustomInput
          type="text"
          name="address"
          placeholder="Адрес"
        />
        <Space>
          <ErrorMessage message={error} />
          <CustomButton
            type="primary"
            htmlType="submit"
          >
            {btnText}
          </CustomButton>
        </Space>
      </Form>
    </Card>
  );
};
