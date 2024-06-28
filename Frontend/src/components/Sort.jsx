import { Fade, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { useState } from "react";
import {
  CLEAR_FILTERS,
  FILTER_BY_DELIVERY,
  FILTER_BY_DISCOUNT,
  FILTER_BY_RATING,
  SORT_BY_PRICE,
} from "../constants/filterConstants";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SortPop = () => {
  const [sortOpen, setSortOpen] = useState(false);
  const handleSortChange = () => {
    setSortOpen((Prev) => !Prev);
  };

  const dispatch = useDispatch();

  const filterState = useSelector((state) => state.filterState);
  const { byFreeDelivery, byRating, sort, searchQuery, byDiscount } =
    filterState;

  const isAnyFilterChecked = byFreeDelivery || byDiscount || sort !== "";

  return (
    <div className="relative">
      <div className="border flex justify-between items-baseline px-2 py-1.5 rounded">
        <p className="text-lg tracking-wide">Sort by :</p>
        { isAnyFilterChecked && (
          <button
            onClick={() =>
              dispatch({
                type: CLEAR_FILTERS,
              })
            }
            className="bg-sky-50 px-1 rounded-sm hover:underline"
          >
            CLEAR FILTERS
          </button>
        )}
        {!sortOpen ? (
          <IoIosArrowDown onClick={handleSortChange} className="mx-3" />
        ) : (
          <IoIosArrowUp onClick={handleSortChange} className="mx-3" />
        )}
      </div>
      <Fade in={sortOpen}>
        <Paper className="p-2 *:font-light *:text-lg absolute top-14 left-0 w-full z-10 ">
          <span className="">
            <Form.Check
              inline
              label={<span className="ml-2">Price: Low to High</span>}
              name="group1"
              type="radio"
              id={`inline-1`}
              onChange={() =>
                dispatch({
                  type: SORT_BY_PRICE,
                  payload: "lowToHigh",
                })
              }
              checked={sort === "lowToHigh" ? true : false}
            />
          </span>

          <span>
            <Form.Check
              inline
              label={<span className="ml-2">Price: High to Low</span>}
              name="group1"
              type="radio"
              id={`inline-2`}
              onChange={() =>
                dispatch({
                  type: SORT_BY_PRICE,
                  payload: "highToLow",
                })
              }
              checked={sort === "highToLow" ? true : false}
            />
          </span>

          <span>
            <Form.Check
              inline
              label={<span className="ml-2">Free Delivery Only</span>}
              name="group1"
              type="checkbox"
              id={`inline-4`}
              onChange={() =>
                dispatch({
                  type: FILTER_BY_DELIVERY,
                })
              }
              checked={byFreeDelivery}
            />
          </span>

          <span>
            <Form.Check
              inline
              label={<span className="ml-2">Discount</span>}
              name="group1"
              type="checkbox"
              id={`inline-6`}
              onChange={() =>
                dispatch({
                  type: FILTER_BY_DISCOUNT,
                })
              }
              checked={byDiscount}
            />
          </span>

          <span>
            <Form.Check
              inline
              label={<span className="ml-2">Rating</span>}
              name="group1"
              type="checkbox"
              id={`inline-7`}
              onChange={() =>
                dispatch({
                  type: FILTER_BY_RATING,
                  payload: "",
                })
              }
              //   checked={byFreeDelivery}
            />
          </span>
        </Paper>
      </Fade>
    </div>
  );
};

export default SortPop;
