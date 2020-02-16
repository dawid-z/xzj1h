import React from "react";
import Portal from "@material-ui/core/Portal";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";

export function ModalBox() {
  const container = React.useRef(null);
  const {
    title,
    ModalBody,
    onClose,
    onEntering,
    open,
    ...modalProps
  } = useSelector((state: any) => state.modal || {});

  const handleClose = () => {
    if (typeof modalProps.handleClose === "function") {
      modalProps.handleClose();
    }
  };

  const handleEntering = () => {
    if (typeof onEntering === "function") {
      onEntering();
    }
  };

  return open ? (
    <Portal container={container.current}>
      <Dialog
        onClose={handleClose}
        onEncrypted={handleEntering}
        open={open}
        disableEscapeKeyDown
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <ModalBody {...modalProps} />
      </Dialog>
    </Portal>
  ) : null;
}
