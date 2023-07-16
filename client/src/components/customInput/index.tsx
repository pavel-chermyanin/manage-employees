import { Form, Input } from "antd";
import React from "react";
interface CustomInputProps {
  name: string;
  placeholder: string;
  type?: string;
}
export const CustomInput: React.FC<CustomInputProps> = ({
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
      ]}
    >
      <Input
        placeholder={placeholder}
        type={type}
        size="large"
      />
    </Form.Item>
  );
};
