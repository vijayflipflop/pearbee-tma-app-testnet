import { utils } from "core/helper";
import { CATEGORIES } from "pages/routes/routes";
import { Col, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const CategoryLinks = (props) => {
  const { categoryData } = props;
  const index = categoryData?.findIndex((obj) => obj.id === 7);
  // Move the object with id: 7 to the beginning of the array
  if (index !== -1) {
    const element = categoryData?.splice(index, 1)[0];
    categoryData?.unshift(element);
  }

  const handleClickedCategory = () => {
    utils.mixPannelEvent(
      "category_page",
      "CATEGORY_PAGE_VIEWED",
      "category_page"
    );
  };

  return (
    <Row className="my-2 my-lg-5">
      <Col sm={12} className="d-flex justify-content-center align-item-center">
        <Nav variant="pills" className="pbee_home_tabs">
          {categoryData?.map((ele, ind) => {
            const { icon, name, id } = ele;
            return (
              <Nav.Item key={ind}>
                <Nav.Link
                  onClick={handleClickedCategory}
                  as={Link}
                  to={`${CATEGORIES}/${id}`}
                >
                  <img src={icon} width={24} height={24} alt="" />
                  <span>{name}</span>
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
      </Col>
    </Row>
  );
};

export default CategoryLinks;
