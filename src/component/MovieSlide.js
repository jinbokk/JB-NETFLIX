import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Lazy } from "swiper";
import { MovieCard } from "./MovieCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/lazy";

export default function MovieSlide({ movies }) {
  let moviesData = movies.filter((item) => item.poster_path !== null);

  return (
    <Swiper
      slidesPerView={8}
      spaceBetween={10}
      slidesPerGroup={4}
      speed={1000}
      loop={true}
      loopFillGroupWithBlank={false}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation, Lazy]}
      breakpoints={{
        0: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        450: {
          slidesPerView: 6,
          slidesPerGroup: 3,
        },
        920: {
          slidesPerView: 8,
          slidesPerGroup: 4,
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
