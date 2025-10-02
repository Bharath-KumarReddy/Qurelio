import AboutImageCard from "../Components/AboutImageCard";
import { useState } from "react";

const About = (props) => {
  const [aboutImageProps] = useState([
    {
      imgUrl: "/assets/image 41.svg",
      docTitle: "Pediatrician",
    },
    {
      imgUrl: "/assets/image 42.svg",
      docTitle: "Cardiologist",
    },
    {
      imgUrl: "/assets/image 43.svg",
      docTitle: "Dermatologist",
    },
  ]);

  return (
    <section
      className="font-Satoshi w-full bg-gradient-to-br from-white to-blue-50 py-16"
      id="About"
      ref={props.AboutSection}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-[46px] font-bold text-gray-800 text-start">
          Dedicated to provide best diagnosis.
        </h2>

        {/* Description */}
        <p className="text-[20px] font-medium mt-[45px] mb-[60px] text-gray-600 md:w-[750px] leading-relaxed">
          A wonderful serenity has taken possession of my entire soul, like these
          sweet mornings of spring which I enjoy with my whole heart. I am alone,
          and feel the charm of existence in this spot, which was created for the
          bliss of souls like mine.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {aboutImageProps.map((detail, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
            >
              {/* Image with hover zoom effect */}
              <img
                src={detail.imgUrl}
                alt={detail.docTitle}
                className="w-full h-72 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-lg font-semibold">
                  {detail.docTitle}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;