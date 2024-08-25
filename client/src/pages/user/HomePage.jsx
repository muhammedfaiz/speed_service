import Banner from "../../components/user/Banner"
import CategoryCarousel from "../../components/user/CategoryCarousel"
import Footer from "../../components/user/Footer"
import HowItWorks from "../../components/user/HowItWorks"
import Navbar from "../../components/user/Navbar"
import ServicesHome from "../../components/user/ServicesHome"
import Testimonials from "../../components/user/Testimonials"

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
    <CategoryCarousel/>
    <HowItWorks/>
    <ServicesHome/>
    <Testimonials/>
    <Footer/>
    </>
  )
}
export default HomePage