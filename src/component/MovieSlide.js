import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import MovieCard from "./MovieCard";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function MovieSlide({ movies }) {
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
        // when window width is >= 640px
        0: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        768: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
        920: {
          slidesPerView: 8,
          slidesPerGroup: 8,
        },
        // when window width is >= 768px
        // 768: {
        //   slidesPerView: 8,
        // },
      }}
    >
      {movies &&
        movies.map((item) => (
          <SwiperSlide>
            <MovieCard movie={item} key={item.id} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
