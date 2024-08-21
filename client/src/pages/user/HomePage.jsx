import Banner from "../../components/user/Banner"
import CategoryCarousel from "../../components/user/CategoryCarousel"
import Footer from "../../components/user/Footer"
import Navbar from "../../components/user/Navbar"
import ServicesHome from "../../components/user/ServicesHome"

const HomePage = () => {
  return (
    <>
    <Navbar/>
    <Banner/>
    <CategoryCarousel/>
    <ServicesHome/>
    <Footer/>
    </>
  )
}
export default HomePage