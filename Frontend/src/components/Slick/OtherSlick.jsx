import React from "react";
import SliderBy from "./Slider";
import { CartState } from "../Context";

const OtherSlick = () => {
  const {products} = CartState()

  const categories = ["Men","Women","Baby"]

  // const uniqueCategories = [...new Set(products.map(product => product.category))];

 
  return (
    <div className=" space-y-8 mt-8 overflow-hidden">
    
    {categories.map((category,i) => {

      return (
      <div key={i} className="">
      <p className="text-xl text-blue-800 font-semibold mx-16">{category} -</p>
          <SliderBy category={category} />
        </div>

      )
    })}
   
    </div>
  );
};

export default OtherSlick;
