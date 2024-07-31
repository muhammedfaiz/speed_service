import logo from "../../assets/logo-transparent.png";
import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import { useEffect, useState } from "react";
import { changeUserStatus, fetchUsers } from "../../services/adminService";
import { toast } from "react-toastify";

const UserList = () => {
  const [data,setData]=useState([]);
  const [filteredUsers,setFilteredUsers]=useState(data);
  const [search,setSearch]=useState('');
  const [fetchTrigger,setFetchTrigger]=useState(0);
  useEffect(()=>{
    const getUsers = async()=>{
      try {
        const response = await fetchUsers();
        setData(response);
        setFilteredUsers(response);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getUsers();
  },[fetchTrigger]);


  const handleSearch = () => {
    if(search===""){
        setFilteredUsers(data);
    }else{
        const users = data.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()));
        setFilteredUsers(users);
    }
  };

  const handleStatusChange = async(userId,status) =>{
    try{
       await changeUserStatus({userId,status});
       toast.success("User status changed !")
    }catch(error){
      toast.error(error.message)
    }
  }

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
        <div className="mt-10">
          <div className="container max-w-3xl px-4 mx-auto sm:px-8">
            {data && (
              <div className="py-8">
                <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                  <h2 className="text-2xl leading-tight">Users</h2>
                  <div className="text-end">
                    <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
                      <div className=" relative ">
                        <input
                          type="text"
                          id='"form-subscribe-Filter'
                          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="Search"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                      <button
                        className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                        type="button"
                        onClick={() => handleSearch()}
                      >
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                  <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            User
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            Created at
                          </th>
                          <th
                            scope="col"
                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                          >
                            status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers &&
                          filteredUsers.map((user) => {
                            return (
                              <tr key={user._id}>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                  <div className="flex items-center">
                                    <div className="ml-3">
                                      <p className="text-gray-900 whitespace-no-wrap">
                                        {user.name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.email}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.phone}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.createdAt}
                                  </p>
                                </td>
                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                  {user.status ? (
                                    <span
                                      className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 hover:cursor-pointer"
                                      onClick={() =>
                                        handleStatusChange(
                                          user._id,
                                          !user.status
                                        )
                                      }
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-green-400 rounded-full opacity-50"
                                      ></span>
                                      <span className="relative">active</span>
                                    </span>
                                  ) : (
                                    <span
                                      className="relative inline-block px-3 py-1 font-semibold leading-tight text-red-900 hover:cursor-pointer"
                                      onClick={() =>{
                                        handleStatusChange(
                                          user._id,
                                          !user.status
                                        )
                                        setFetchTrigger(prevState=>prevState+1);
                                      }
                                      }
                                    >
                                      <span
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-red-400 rounded-full opacity-50"
                                      ></span>
                                      <span className="relative">Blocked</span>
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
                        >
                          1
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                        >
                          2
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
                        >
                          3
                        </button>
                        <button
                          type="button"
                          className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
                        >
                          4
                        </button>
                        <button
                          type="button"
                          className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
                        >
                          <svg
                            width="9"
                            fill="currentColor"
                            height="8"
                            className=""
                            viewBox="0 0 1792 1792"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserList;
