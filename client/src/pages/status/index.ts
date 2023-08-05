
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { selectUser } from "../../features/auth/authSlice";

const Statuses: Record<string,string> ={
    created: 'Пользователь успешно создан',
    updated: 'Пользователь успешно обновлен',
    deleted: 'Пользователь успешно удален'
}

export const Status = () => {
    const {status} = useParams()
  const navigate = useNavigate();

  return <Row;
};
