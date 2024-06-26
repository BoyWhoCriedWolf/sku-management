import { Close, Done } from "@mui/icons-material";
import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { FC, PropsWithChildren, ReactNode } from "react";
import { ColorVariant } from "types/ui-types";

export interface ConfirmButtonProps {
  label?: string;
  color?: ColorVariant;
}

const ConfirmModal: FC<
  PropsWithChildren<{
    open?: boolean;
    onOk?: () => void;
    onClose?: () => void;
    title?: string;
    message?: ReactNode;
    maxWidth?: Breakpoint;
    confirmButton?: ConfirmButtonProps;
    cancelButton?: ConfirmButtonProps;
  }>
> = ({
  open = false,
  onOk,
  onClose = () => null,
  title = "Are you sure",
  message = "",
  maxWidth = "sm",
  confirmButton = { label: "Yes", color: "primary" },
  cancelButton = { label: "No", color: "error" },
}) => {
  const handleClose = () => onClose();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<Close />}
          color={cancelButton.color || "error"}
          variant="text"
          onClick={handleClose}
        >
          {cancelButton.label || "No"}
        </Button>
        {onOk ? (
          <Button
            startIcon={<Done />}
            onClick={handleOk}
            autoFocus
            color={confirmButton?.color || "primary"}
            variant="contained"
          >
            {confirmButton?.label || "Yes"}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
