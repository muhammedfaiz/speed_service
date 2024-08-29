import Navbar from "../../components/admin/Navbar"
import ProfileDropdown from "../../components/admin/ProfileDropdown"
import logo from "../../assets/logo-transparent.png"
import EditCategoryForm from "../../components/admin/EditCategoryForm"
import { useParams } from "react-router-dom"

const EditCategoryPage = () => {
    const {id}=useParams();
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col lg:h-screen">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar />
      </aside>
      <main className="flex-grow p-10 relative overflow-auto">
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-600">Manage your categories here.</p>
        </div>
        <EditCategoryForm id={id}/>
        </main>
        </div>
  )
}
export default EditCategoryPage