
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import { mainCarouselData } from './MainCarouselImages';

// const getRandomUnsplashImage = () => {
//   const randomNum = Math.floor(Math.random() * 1000);
//   return `https://source.unsplash.com/random/${randomNum}`;
// };

// export const mainCarouselData = Array.from({ length: 6 }, () => ({
//   image: getRandomUnsplashImage()
// }));

const mainCarouselData = [
  {
    id: "1",
    image: "https://images.meesho.com/images/products/191005346/mocgn_512.webp",
  },
  {
    id: "2",
    image: "https://images.meesho.com/images/products/85630166/cisnh_512.webp",
  },
  {
    id: "3",
    image: "https://images.meesho.com/images/products/110760066/mfqkw_512.webp",
  },
  {
    id: "4",
    image: "https://images.meesho.com/images/products/336728238/2xh96_512.webp",
  },
  {
    id: "5",
    image: "https://images.meesho.com/images/products/415828474/7jn8o_512.webp",
  },
  {
    id: "6",
    image: "https://images.meesho.com/images/products/223629773/y0dv1_512.webp",
  },
];


const items = mainCarouselData.map((item,i) => 
<img key={i} src={item.image}  className='min-w-[46vw] -z-10 w-ful mx-auto object-cover cursor-pointer' />)

const MainCarousel = () => {
    
    
    return(
        <div className='mt-16 bg-pink-800/20 mx- borde h-[54vh] overflow-hidden object-cover object-center'>

    <AliceCarousel
       
        items={items}
        disableButtonsControls
        autoPlay 
        autoPlayInterval={3000}
        infinite
        
    
    />

        </div>
    )
};
export default MainCarousel;