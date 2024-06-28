import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeCard from './HomeCard';
import { CartState } from '../Context';

const SliderBy = ({category}) => {

  const {products} = CartState()
  var settings = {
    // dots: true,
    infinite: true,
    speed: 400,
    slidesToScroll: 3,
    slidesToShow: 5,
  };

  const filteredProducts = products.filter(product => product.category === category);


console.log('====================================');
console.log(filteredProducts);
console.log('====================================');
  return (
    <Slider
        {...settings}
        className=" mx-auto px-6 w-[92vw] bg-white"
      >
       

        {
        products.map((prod) => (
            <HomeCard key={prod.id} prod={prod}  />
          ))
        }
      </Slider>
  )
}

export default SliderBy
