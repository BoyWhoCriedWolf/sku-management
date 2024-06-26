import { Backdrop, Box, LinearProgress, Typography } from "@mui/material";
import Logo from "components/logo";
import { APP_NAME } from "constants/strings";
import React, { FC, PropsWithChildren } from "react";

const PageLoading: FC<
  PropsWithChildren<{ open?: boolean; onClose?: () => void }>
> = ({ open = false, onClose = () => null }) => {
  return (
    <Backdrop
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: (th) => th.palette.text.primary,
      }}
      open={open}
      onClick={onClose}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
      >
        <Logo />
        <Typography fontSize={30} fontWeight={700} align="center">
          {APP_NAME}
        </Typography>
        <Typography align="center">Loading ...</Typography>

        <Box sx={{ width: 200 }}>
          <LinearProgress color="inherit" />
        </Box>
      </Box>
    </Backdrop>
  );
};

export default PageLoading;
