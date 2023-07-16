import { Form, Input } from "antd";
import { NamePath } from "antd/es/form/interface";
import React from "react";
interface CustomPasswordInputProps {
  name: string;
  placeholder: string;
  dependencies?: NamePath[];
}
export const CustomPasswordInput: React.FC<CustomPasswordInputProps> = ({
  name,
  placeholder,
  dependencies,
}) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback={true}
      rules={[
        {
          required: true,
          message: "Обязательное поле",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve();
            }
            if (name == "confirmPassword") {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Пароли должны совпадать"));
            } else {
              if (value.length < 3) {
                return Promise.reject(
                  new Error("Пароли должен содержать больше 2 символов")
                );
              }
              return Promise.resolve();
            }
          },
        }),
      ]}
    >
      <Input.Password
        placeholder={placeholder}
        size="large"
      />
    </Form.Item>
  );
};
