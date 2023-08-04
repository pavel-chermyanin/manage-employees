import React from "react";
import { useCurrentQuery } from "../../app/services/auth";
interface AuthProps {
  children: JSX.Element;
}
export const Auth: React.FC<AuthProps> = ({ children }) => {
  const { isLoading } = useCurrentQuery();
  if (isLoading) {
    return <span>Загрузка</span>;
  }
  return children
};
