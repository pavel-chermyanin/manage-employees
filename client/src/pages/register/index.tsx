import { Card, Form, Row, Space, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../../components/customButton";
import { CustomInput } from "../../components/customInput";
import { CustomPasswordInput } from "../../components/customPasswordInput";
import { Layout } from "../../components/layout";
import { Paths } from "../../paths";
interface RegisterProps {}
export const Register: React.FC<RegisterProps> = () => {
  return (
    <Layout>
      <Row
        align="middle"
        justify="center"
      >
        <Card
          title="Зарегистрируйтесь"
          style={{ width: "30rem" }}
        >
          <Form onFinish={() => null}>
            <CustomInput
              name="name"
              placeholder="Имя"
            />
            <CustomInput
              type="email"
              name="email"
              placeholder="Email"
            />
            <CustomPasswordInput
              name="password"
              placeholder="Пароль"
            />
            <CustomPasswordInput
              name="confirmPassword"
              placeholder="Повторите пароль"
            />
            <CustomButton
              type="primary"
              htmlType="submit"
            >
              Зарегистрироваться
            </CustomButton>
          </Form>
          <Space
            direction="vertical"
            size="large"
          >
            <Typography.Text>
              Уже зарегистрированы? <Link to={Paths.login}>Войдите</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
