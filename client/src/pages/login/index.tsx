import { Card, Form, Row, Space, Typography } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation, UserData } from "../../app/services/auth";
import { CustomButton } from "../../components/customButton";
import { CustomInput } from "../../components/customInput";
import { CustomPasswordInput } from "../../components/customPasswordInput";
import { ErrorMessage } from "../../components/errorMessage";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
interface LoginProps {}
export const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')

  const login = async(data:UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate('/');
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if(maybeError) {
        setError(error.data.message);
      } else {
        setError('Неизвестная ошибка');
      }
    }
  }
  return (
    <Layout>
      <Row
        align="middle"
        justify="center"
      >
        <Card
          title="Войдите"
          style={{ width: "30rem" }}
        >
          <Form onFinish={login}>
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
            />
            <CustomPasswordInput
              name="password"
              placeholder="Пароль"
            />
            <CustomButton
              type="primary"
              htmlType="submit"
            >
              Войти
            </CustomButton>
          </Form>
          <Space
            direction="vertical"
            size="large"
          >
            <Typography.Text>
              Нет аккаунта? <Link to={Paths.register}>Зарегистрируйтесь</Link>
            </Typography.Text>
            <ErrorMessage message={error}/>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
