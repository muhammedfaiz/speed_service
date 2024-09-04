import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import logo from "../../assets/logo-transparent.png";
import { useEffect, useState } from "react";
import { getOrdersService } from "../../services/adminService";
import { Link } from "react-router-dom";

const OrdersListPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersService();
      setOrders(data.orders);
      setFilteredOrders(data.orders);
    };
    fetchOrders();
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      const filtered = orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(search.toLowerCase()) ||
          order.user.name.toLowerCase().includes(search.toLowerCase()) ||
          order.category.name.toLowerCase().includes(search.toLowerCase()) ||
          order.employee?.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
    setCurrentPage(1); // Reset to page 1 after searching
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-gray-600">List of orders done are shown.</p>
        </div>
        <div className="container max-w-5xl px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="flex space-x-2 justify-end">
              <div className="flex">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </div>

            <div className="px-4 py-4 -mx-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                {currentItems.length === 0 ? (
                  <div className="px-6 py-4 text-center text-gray-600">
                    No orders found
                  </div>
                ) : (
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Order
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Items
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Category
                        </th>
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
                          Employee
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        >
                          Total amount
                        </th>
                        <th
                          scope="col"
                          className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((order) => (
                        <tr key={order._id}>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {order.orderId}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.orderItems.map((item, index) => (
                                <span key={item._id}>
                                  {item.item?.name}
                                  {index < order.orderItems.length - 1 && ", "}
                                </span>
                              ))}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.category.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.user.name}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order?.employee?.name
                                ? order.employee.name
                                : "No employee assigned"}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {order.totalAmount}
                            </p>
                          </td>
                          <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <Link
                              to={`/admin/order/${order._id}`}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="flex justify-center items-center px-5 py-5 bg-white ">
                  {/* Pagination Controls */}
                 
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersListPage;
