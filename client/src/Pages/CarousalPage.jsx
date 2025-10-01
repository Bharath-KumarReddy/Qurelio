import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import CarousalCard from "../Components/CarousalCard";
import "swiper/css";
import "swiper/css/autoplay";
import "../App.css";
import { Autoplay } from "swiper/modules";

const CarousalPage = (props) => {
  const [carousalDetails] = useState([
    {
      count: 5,
      comment: `"Qurelio is a lifesaver! It helped me understand my symptoms and get a diagnosis quickly. Thanks for the peace of mind!"`,
      name: "Aditi Sharma",
    },
    {
      count: 4,
      comment: `"I was worried about my health, but Qurelio provided a clear diagnosis and valuable information. I can't thank you enough!"`,
      name: "Ravi Kumar",
    },
    {
      count: 5,
      comment: `"What a fantastic resource! The accurate diagnosis I received from Qurelio saved me from unnecessary stress and doctor visits."`,
      name: "Sophia Lee",
    },
    {
      count: 5,
      comment: `"I'm impressed with the accuracy of the diagnoses on Qurelio. It's like having a virtual doctor at my fingertips!"`,
      name: "Arjun Mehta",
    },
    {
      count: 4,
      comment: `"The interface is so smooth and user-friendly. I felt guided every step of the way while using Qurelio."`,
      name: "Neha Kapoor",
    },
    {
      count: 5,
      comment: `"I live in a remote area, but Qurelio made healthcare advice accessible to me instantly. This is the future!"`,
      name: "David Johnson",
    },
  ]);

  return (
    <section
      className="my-[100px] px-6 md:px-16 lg:px-24"
      id="CarousalPage"
      ref={props.CarousalPageSection}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={40}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 0, // continuous
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // 🟢 Pause on hover
        }}
        speed={6000} // slower, smoother
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1440: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {carousalDetails.map((details, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <div className="max-w-md w-full">
              <CarousalCard
                count={details.count}
                comment={details.comment}
                name={details.name}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CarousalPage;
