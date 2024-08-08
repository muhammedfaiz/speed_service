import { Link } from "react-router-dom";
import logo from "/logo-svg.svg";
const Footer = () => {
  return (
    <footer className="mt-20 bg-black px-4 pt-20">
  <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-primary-blue bg-white p-2"><img className="h-full object-contain" src={logo} alt="" /></div>
  <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
    <Link to="/" className="font-medium text-white">Home</Link>
    <Link to="/services" className="font-medium text-white">services</Link>
    <Link to="" className="font-medium text-white">Privacy Policy</Link>
    <Link to="" className="font-medium text-white">Terms & Conditions</Link>
  </nav>
  <p className="py-10 text-center text-gray-300">© 2024 Speed Service | All Rights Reserved</p>
</footer>

  )
}
export default Footer