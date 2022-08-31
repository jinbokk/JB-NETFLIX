import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { MovieCard } from "./MovieCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
      modules={[Navigation]}
      breakpoints={{
        // when window width is >= X px
        0: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 2,
        },
        920: {
          slidesPerView: 8,
          slidesPerGroup: 4,
        },
      }}
    >
      {moviesData &&
        moviesData.map((item) => (
          <SwiperSlide key={item.id}>
            <MovieCard movie={item} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
