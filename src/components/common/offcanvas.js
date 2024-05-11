import { Offcanvas } from "react-bootstrap";

const OffCanvasCommon = (props) => {
  const {
    children,
    onHide,
    offcanvasHeader,
    show,
    placement,
    className,
    close,
    responsive,
  } = props;
  return (
    <Offcanvas
      className={className}
      show={show}
      onHide={onHide}
      placement={placement}
      responsive={responsive}
    >
      <Offcanvas.Header closeButton={close}>
        {offcanvasHeader ? offcanvasHeader : ""}
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvasCommon;
