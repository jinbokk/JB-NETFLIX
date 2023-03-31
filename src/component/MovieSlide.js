import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";
import { MovieCard } from "./MovieCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

export default function MovieSlide({ movies }) {
  let moviesData = movies
    .filter((item) => item.poster_path !== null)
    .slice(0, 8);

  return (
    <Swiper
      slidesPerView={8}
      spaceBetween={10}
      slidesPerGroup={2}
      speed={800}
      loop={true}
      loopFillGroupWithBlank={false}
      navigation={true}
      modules={[Navigation, Lazy]}
      lazy={true}
      breakpoints={{
        0: {
          slidesPerView: 4,
          slidesPerGroup: 1,
        },
        450: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        920: {
          slidesPerView: 8,
          slidesPerGroup: 2,
        },
      }}
    >
      {moviesData &&
        moviesData.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard movie={item} key={index} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
