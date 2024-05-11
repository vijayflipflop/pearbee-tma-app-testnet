import { Modal } from "react-bootstrap";

const ModalCommon = (props) => {
  const {
    show,
    onHide,
    size,
    modalTitle,
    children,
    centered,
    scrollable,
    btn,
    className
  } = props;
  return (
    <Modal
      scrollable={scrollable}
      centered={centered}
      size={size}
      show={show}
      onHide={onHide}
      keyboard={true}
      className={className}
    >
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
        {btn && (
          <button type="button" onClick={onHide} className="close">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
        )}
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default ModalCommon;
