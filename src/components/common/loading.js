import { Spinner } from "react-bootstrap";

export const Loading = (props) => {
  const { variant } = props;
  return (
    <div className={"loading_wrapper"}>
      <Spinner animation="border" variant={variant} />
    </div>
  );
};

export const SubmitLoading = () => {
  return <Spinner animation="border" size="sm" className="mx-1 opacity-75" />;
};

//named-export
export const Loader = { Loading, SubmitLoading };

export default Loader;
