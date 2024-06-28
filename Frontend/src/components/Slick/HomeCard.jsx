import React from "react";
import { Button, Card } from "react-bootstrap";

const HomeCard = ({ prod, category }) => {

  return (
    <>
      <div className="m-2  shadow-sm hover:translate-y- rounded overflow-hidden">
          <img
            src={prod.image}
            alt={prod.name}
            className="h-[30vh] bg-red-200 w-full object-cover object-center"
          />
        <div className="p-2">
          <div className="py-1 flex flex-col">
            <span>{prod.name}</span>

            <div className="space-x-2">
              <span>{prod.price}</span>
              <s>{prod.morePrice}</s>
              <span className="text-green-500">{prod.discount} %</span>
            </div>
          </div>
          <div className="flex space-x-2">
          <Button variant="danger" className="" >Remove from Cart</Button>
          <Button variant="primary" >Add To Cart</Button>

          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
