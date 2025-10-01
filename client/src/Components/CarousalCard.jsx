import { FaStar, FaQuoteLeft } from "react-icons/fa";

const CarousalCard = ({ count, comment, name }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-full flex flex-col justify-between max-w-sm">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-[#00A0AA] text-3xl mb-3" />

      {/* Comment */}
      <p className="text-gray-700 text-base leading-relaxed whitespace-normal break-words">
        {comment}
      </p>

      {/* Rating */}
      <div className="flex mt-4 text-yellow-500">
        {Array(count).fill().map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>

      {/* Name */}
      <p className="mt-3 font-semibold text-gray-900">{name}</p>
    </div>
  );
};

export default CarousalCard;