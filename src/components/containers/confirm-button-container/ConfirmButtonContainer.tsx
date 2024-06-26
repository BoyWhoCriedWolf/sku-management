import { Box } from "@mui/material";
import ConfirmModal from "components/containers/confirm-modal";
import { ConfirmButtonProps } from "components/containers/confirm-modal/ConfirmModal";
import { FC, PropsWithChildren, ReactNode, useState } from "react";

const ConfirmButtonContainer: FC<
  PropsWithChildren<{
    onClick?: () => void;
    title?: string;
    message?: ReactNode;
    confirmButton?: ConfirmButtonProps;
    cancelButton?: ConfirmButtonProps;
  }>
> = ({
  onClick,
  title = "Are you sure",
  message = "",
  children,
  confirmButton = { label: "Yes", color: "primary" },
  cancelButton = { label: "No", color: "error" },
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOk = () => {
    if (onClick) {
      onClick();
    }
    handleClose();
  };

  return (
    <Box>
      <Box onClick={handleOpen}>{children}</Box>
      <ConfirmModal
        open={open}
        onClose={handleClose}
        onOk={handleOk}
        title={title}
        message={message}
        confirmButton={confirmButton}
        cancelButton={cancelButton}
      />
    </Box>
  );
};

export default ConfirmButtonContainer;
