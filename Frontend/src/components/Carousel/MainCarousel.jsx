
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCarouselData } from './MainCarouselImages';



const MainCarousel = () => {
    
    
    const items = mainCarouselData.map((item) => 
    <img src={item.image} className=' -z-20 w-full h-[50vh] cursor-pointer object-cover object-center' />)
    
    return(
    <AliceCarousel
       
        items={items}
        disableButtonsControls
        autoPlay 
        autoPlayInterval={3000}
        infinite
    
    />

    )
};
export default MainCarousel;