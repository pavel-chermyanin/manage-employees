import { PlusCircleOutlined } from "@ant-design/icons";
import { Employee } from "@prisma/client";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllEmployeesQuery } from "../../app/services/employees";
import { CustomButton } from "../../components/customButton";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
// import styles from './style.module.scss'
const columns: ColumnsType<Employee> = [
  {
    title: "Имя",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Возраст",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
  },
];

interface EmployeesProps {}
export const Employees: React.FC<EmployeesProps> = () => {

  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { data, isLoading } = useGetAllEmployeesQuery();

  useEffect(() => {
    if (!user) {
      navigate(Paths.login);
    }
  }, [user, navigate]);

    const gotToAddUser = () => {
      navigate(Paths.employeeAdd)
    };
  return (
    <Layout>
      <CustomButton
        type="primary"
        onClick={gotToAddUser}
        icon={<PlusCircleOutlined />}
      >
        Добавить
      </CustomButton>
      <Table
        loading={isLoading}
        dataSource={data}
        pagination={false}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => {
          return {
            onClick: () => navigate(`${Paths.employee}/${record.id}`),
          };
        }}
      />
    </Layout>
  );
};
