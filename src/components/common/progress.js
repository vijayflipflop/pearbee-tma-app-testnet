import { ProgressBar } from "react-bootstrap";

function Progress(props) {
  const { variant, percent, onClick, label, className } = props;
  return (
    <ProgressBar
      onClick={onClick}
      variant={variant}
      now={percent}
      label={label}
      className={className}
    />
  );
}

export default Progress;
