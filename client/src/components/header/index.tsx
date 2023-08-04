import React, { useEffect } from "react";
import { Layout, Space, Typography } from "antd";
import styles from "./index.module.css";
import { LoginOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { CustomButton } from "../customButton";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../../paths";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/auth/authSlice";
interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const onLogoutClick = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate(Paths.login)
  }

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);
  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Сотрудники</Typography.Title>
          </CustomButton>
        </Link>
      </Space>

      {user ? (
        <CustomButton
          type="ghost"
          icon={<LoginOutlined />}
          onClick={() => onLogoutClick}
        >
          Выйти
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton
              type="ghost"
              icon={<UserOutlined />}
            >
              Зарегистироваться
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton
              type="ghost"
              icon={<LoginOutlined />}
            >
              Войти
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  );
};
