import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPhoneAlt, FaGlobe, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const DoctorCard = (props) => {
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("jwt");
  const [direction, setDirection] = useState(false);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const handleGoToHospital = () => {
    if (jwt) {
      setDirection(true);
    } else {
      navigateToLogin();
      toast.error("Please login to use all the functions!!");
      setDirection(false);
    }
  };

  useEffect(() => {
    handleGoToHospital();
  }, [jwt]);

  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Section */}
      <div className="relative h-48 w-full">
        <img
          src={props.imageSrc}
          alt="hospital"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Rating Badge */}
        <span className="absolute top-3 left-3 bg-[#00A0AA] text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-md flex items-center gap-1">
          <FaStar className="text-yellow-300" /> {props.rating}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col justify-between h-[260px]">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{props.name}</h3>

          {/* Phone */}
          <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
            <FaPhoneAlt className="text-[#00A0AA]" />
            <p>{props.phoneNumber || "Not Available"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Website Button */}
          <button
            onClick={handleGoToHospital}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#00A0AA] hover:text-white transition-all text-sm"
          >
            <FaGlobe />{" "}
            {direction && props.website ? (
              <a href={props.website} target="_blank" rel="noopener noreferrer">
                Visit Website
              </a>
            ) : (
              "Visit Website"
            )}
          </button>

          {/* Directions Button */}
          <button
            onClick={handleGoToHospital}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#00A0AA] hover:text-white transition-all text-sm"
          >
            <FaMapMarkerAlt />{" "}
            {direction && props.directions ? (
              <a
                href={props.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
              </a>
            ) : (
              "Get Directions"
            )}
          </button>

          {/* CTA */}
          <button
            onClick={handleGoToHospital}
            className="w-full py-2 rounded-lg font-semibold bg-[#00A0AA] text-white hover:bg-[#008b95] transition-all mt-2"
          >
            Go To Hospital
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;