import { Grid, Typography } from "@mui/material";
import React, { FC, PropsWithChildren, ReactNode } from "react";
import { ColorVariant } from "types/ui-types";

const PageHeading: FC<
  PropsWithChildren<{
    title?: string;
    actions?: ReactNode;
    color?: ColorVariant;
    mb?: number;
  }>
> = ({
  children = null,
  title = "",
  actions = null,
  color = "primary",
  mb = 2,
}) => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      justifyItems={"center"}
      sx={{ mb: mb }}
    >
      <Grid item>
        <Typography variant="h3" color={color} fontSize={24} fontWeight={600}>
          {children ?? title}
        </Typography>
      </Grid>
      <Grid item>{actions}</Grid>
    </Grid>
  );
};

export default PageHeading;
