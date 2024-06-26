import { Container } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <Container sx={{ py: 4 }}>{children}</Container>;
};

export default Layout;
