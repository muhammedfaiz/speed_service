import { Link } from "react-router-dom";
import logo from "../../../public/logo-svg.svg";
const Footer = () => {
  return (
    <footer className="mt-20 bg-black px-4 pt-20">
  <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
    <Link to="/employee/dashboard" className="font-medium text-white">Dashboard</Link>
    <Link to="/services" className="font-medium text-white">services</Link>
    <Link to="" className="font-medium text-white">Privacy Policy</Link>
    <Link to="" className="font-medium text-white">Terms & Conditions</Link>
  </nav>
  <p className="py-10 text-center text-gray-300">© 2024 Speed Service | All Rights Reserved</p>
</footer>

  )
}
export default Footer