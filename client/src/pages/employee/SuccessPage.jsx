import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-950 min-h-screen flex items-center">
        <div className="max-w-4xl p-6 mx-auto bg-gray-800 rounded-md shadow-md dark:bg-gray-800">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">
        Application Submitted Successfully!
      </h1>
      <p className="mt-4 text-white dark:text-gray-200">
        Thank you for submitting your application. We will review it and get back to you soon.
      </p>
      <div className="flex justify-end mt-6">
        <Link
          to="/"
          className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-gray-600 font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
    </div>
  );
};

export default SuccessPage;
