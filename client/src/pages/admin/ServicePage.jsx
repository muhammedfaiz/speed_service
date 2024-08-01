import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import logo from "../../assets/logo-transparent.png";
import { useState } from "react";
import ServiceList from "../../components/admin/ServiceList";
import AddService from "../../components/admin/AddService";
import ServiceEdit from "../../components/admin/ServiceEdit";

const ServicePage = () => {
  const [serviceAdd, setServiceAdd] = useState(false);
  const [editId,setEditId]=useState('');
  const [editToggle,setEditToggle]=useState(false);
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
          <h1 className="text-3xl font-bold">Service</h1>
          <p className="text-gray-600">Manage your services here.</p>
        </div>
        {!serviceAdd && !editToggle && (
          <>
            <div className="w-full mt-8 flex justify-end px-28">
              <button
                onClick={() => setServiceAdd(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-base"
              >
                Add Service
              </button>
            </div>
            <ServiceList setEditToggle={setEditToggle} setEditId={setEditId}/>
          </>
        )}
        {serviceAdd && (
            <>
            <div className="w-full mt-8 flex justify-end px-28">
              <button
                onClick={() => setServiceAdd(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-base"
              >
                Back
              </button>
            </div>
            <AddService/>
            </>
        )}
        {
          editToggle && editId && (
           <>
            <div className="w-full mt-8 flex justify-end px-28">
              <button
                onClick={() => setEditToggle(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-base"
              >
                Back
              </button>
            </div>
            <ServiceEdit id={editId}/>
           </>
          )
        }
      </main>
    </div>
  );
};
export default ServicePage;
