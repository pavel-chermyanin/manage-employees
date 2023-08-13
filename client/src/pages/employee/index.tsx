import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Descriptions, Divider, Modal, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { CustomButton } from "../../components/customButton";
import { ErrorMessage } from "../../components/errorMessage";
import { Layout } from "../../components/layout";
import { selectUser } from "../../features/auth/authSlice";
import { Paths } from "../../paths";
import { isErrorWithMessage } from "../../utils/is-error-with-message";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  if (isLoading) {
    return <span>Загрузка</span>;
  }
  if (!data) {
    return <Navigate to="/" />;
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async () => {
    hideModal();
    try {
      await removeEmployee(data.id).unwrap();
      navigate(`${Paths.status}/deleted`);
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
      <Descriptions
        title="Информация о сотруднике"
        bordered
      >
        <Descriptions.Item
          label="Имя"
          span={3}
        >
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item
          label="Возраст"
          span={3}
        >
          {data.age}
        </Descriptions.Item>
        <Descriptions.Item
          label="Адрес"
          span={3}
        >
          {data.address}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Действия</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Редактировать
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              icon={<DeleteOutlined />}
              onClick={showModal}
            >
              Удалить
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Потвердите удаление"
        open={isModalOpen}
        onOk={handleDelete}
        onCancel={hideModal}
        okText="Потвердить"
        cancelText="Отменить"
      >
        Вы действительно хотите удалить сотрудника из таблицы?
      </Modal>
    </Layout>
  );
};
