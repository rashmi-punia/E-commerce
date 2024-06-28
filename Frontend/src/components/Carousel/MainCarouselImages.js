import { faker } from "@faker-js/faker";

const randomImage = (name) => {
  const query = encodeURIComponent(name);
  return `https://source.unsplash.com/featured/?${query}`;
};

export const mainCarouselData = Array.from({ length: 6 }, () => ({
    image: randomImage(faker.commerce.productName())
}));
