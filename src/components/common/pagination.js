import { utils } from "@/core/helper";
import ReactPaginate from "react-paginate";

const Pagination = (props) => {
  const { pageCount, onPageChange, initialPage } = props;

  return (
    <div className="pagination__area">
      <nav className="pagination justify-content-center">
        <ReactPaginate
          initialPage={initialPage}
          pageCount={pageCount}
          pageRangeDisplayed={1}
          onPageChange={onPageChange}
          containerClassName="pagination__wrapper d-flex align-items-center justify-content-center"
          activeClassName="pagination__item"
          breakClassName="page-link"
          pageClassName="pagination__list"
          nextClassName="pagination__list"
          previousClassName="pagination__list"
          previousLabel={utils.panginatePrevIcon(18, 15)}
          nextLabel={utils.panginateNextIcon(18, 15)}
          pageLinkClassName="pagination__item link"
          disabledClassName="pagination_disabled"
          // breakLinkClassName="pagination__list"
          // previousLinkClassName="pagination__list"
          // nextLinkClassName="pagination__list"
          activeLinkClassName={"pagination__item pagination__item--current"}
        />
      </nav>
    </div>
  );
};

export default Pagination;
