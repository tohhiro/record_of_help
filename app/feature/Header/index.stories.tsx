import React from "react";
import { Header } from ".";

export default {
  title: "app/feature/Header",
  component: Header,
};

export const Default: React.FC = (): JSX.Element => {
  return <Header />;
};