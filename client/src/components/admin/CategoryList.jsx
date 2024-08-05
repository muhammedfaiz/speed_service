import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  deleteCategoryService,
  getCategoriesService,
} from "../../services/adminService";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesService();
        setData(response.categories);
        setFilteredData(response.categories);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchCategories();
  }, []);

  function handleSearch() {
    if (search == "") {
      setFilteredData(data);
    } else {
      const categories = data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(categories);
    }
  }

  async function handleDelete(id) {
    try {
      Swal.fire({
        title: "Are you sure ?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCategoryService(id);
          setFilteredData(filteredData.filter(category => category._id !== id));
          setFetchTrigger(!fetchTrigger);
          toast.success("category deleted");
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-4">
        <div className="flex w-1/2 space-x-4">
          <input
            type="text"
            id='"form-subscribe-Filter'
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="name"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => handleSearch()}
            className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-indigo-700 rounded-lg shadow-md hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
          >
            Search
          </button>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          {data?.length > 0 ? (
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData?.map((category) => {
                      return (
                        <tr key={category._id}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="relative block">
                                  <img
                                    alt="profil"
                                    src={category.imageUrl}
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                  />
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {category.name}
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <a
                              onClick={() => handleDelete(category._id)}
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                            >
                              Delete
                            </a>
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
          ) : (
            <div className="font-semibold text-center text-lg mt-8 text-red-600">
              No Categories Found...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryList;
