import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from "../../app/services/employees";
import { selectUser } from "../../features/auth/authSlice";

export const Employee = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetEmployeeQuery(params.id || "");
  const [removeEmployee] = useRemoveEmployeeMutation();
  const user = useSelector(selectUser);

  return <h1>Employee</h1>;
};
