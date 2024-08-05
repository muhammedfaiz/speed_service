import { useNavigate } from "react-router-dom";
import Banner1 from "../../assets/Banner.png";
import Banner2 from "../../assets/banner-2.jpeg";
import Banner3 from "../../assets/banner-3.jpg";
import Banner4 from "../../assets/banner-4.jpeg";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[30rem] max-md:h-auto w-full flex justify-between items-center bg-gray-50">
      <div className="text-left mt-12 p-12">
        <motion.h3
          animate={{ x: [300, 0] }}
          transition={{ duration: 2 }}
          className="font-bold text-5xl text-black mb-3"
        >
          Speed Service.
        </motion.h3>
        <motion.p
          animate={{ x: [-300, 0] }}
          transition={{ duration: 2 }}
          className="mt-2 text-primay-blue text-lg"
        >
          Let&apos;s maintain our future together?
        </motion.p>
        <div className="mt-11 flex justify-start space-x-8">
          <button
            onClick={() => navigate("/employee/application")}
            className="text-primary-blue font-medium ring-1 ring-primary-blue p-3 rounded-lg hover:bg-primary-blue hover:text-white ease-in-out "
          >
            Provide Service
          </button>
          <button
            onClick={() => navigate("/services")}
            className="text-white font-medium bg-primary-blue p-3 rounded-lg hover:bg-secondary-blue hover:text-black"
          >
            Get Service
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center w-1/2 px-4 space-x-5 space-y-5 transition-all max-md:hidden">
        <div className="flex-col w-1/2 space-y-14">
          <motion.img
            animate={{ y: [-300, 0] }}
            transition={{ duration: 2 }}
            className="object-cover rounded-md"
            src={Banner1}
            alt="Speed Service"
          />
          <motion.img
            animate={{ y: [300, 0] }}
            transition={{ duration: 2 }}
            className="object-cover rounded-md"
            src={Banner2}
            alt="Speed Service"
          />
        </div>

        <div className="flex-col space-y-4 hover:w-1/2 hover:space-y-14">
          <motion.img
            animate={{ x: [300, 0] }}
            transition={{ duration: 2 }}
            className="object-cover rounded-md"
            src={Banner3}
            alt="Speed Service"
          />
          <motion.img
           animate={{ y: [300, 0] }}
           transition={{ duration: 2 }}
            className="object-cover rounded-md"
            src={Banner4}
            alt="Speed Service"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
