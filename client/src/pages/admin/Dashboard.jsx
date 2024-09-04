import { useEffect, useState } from "react";
import logo from "../../assets/logo-transparent.png";
import Navbar from "../../components/admin/Navbar";
import ProfileDropdown from "../../components/admin/ProfileDropdown";
import { Line } from "react-chartjs-2";
import { getDashboardDataService, getOrdersService } from "../../services/adminService";
import "chart.js/auto";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); // Set rows per page to a fixed value

  useEffect(() => {
    const fetchDashboardData = async () => {
      const data = await getDashboardDataService();
      setDashboardData(data);
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const data = await getOrdersService();
      setOrders(data.orders);
    };
    fetchRecentOrders();
  }, []);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentOrders = orders.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const salesData = {
    labels: dashboardData?.sales?.map((sale) => sale.day),
    datasets: [
      {
        label: "Sales Revenue",
        data: dashboardData?.sales?.map((sale) => sale.revenue),
        backgroundColor: "rgba(76, 81, 191, 0.5)",
        borderColor: "#4c51bf",
        fill: true,
      },
    ],
  };

  const ordersData = {
    labels: dashboardData?.orders?.map((order) => order.day),
    datasets: [
      {
        label: "Total Orders",
        data: dashboardData?.orders?.map((order) => order.count),
        backgroundColor: "rgba(72, 187, 120, 0.5)",
        borderColor: "#48bb78",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <aside className="w-full lg:w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar />
      </aside>
      <main className="flex-grow p-10 relative overflow-auto">
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>

        {/* KPIs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-500">${dashboardData?.totalRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
            <p className="text-2xl font-bold text-blue-500">{dashboardData?.totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
            <p className="text-2xl font-bold text-purple-500">{dashboardData?.totalOrders}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Sales Revenue</h3>
            <Line data={salesData} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Total Orders</h3>
            <Line data={ordersData} />
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                    Order ID
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                    Customer
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                    Services
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{order.orderId}</td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{order.user.name}</td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {order.orderItems.map((item) => item.item.name).join(", ")}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">{order.status}</td>
                    <td className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700">
                      {new Date(order.createdAt).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-end mt-4">
            <nav>
              <ul className="flex space-x-2">
                {Array.from({ length: Math.ceil(orders.length / rowsPerPage) }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
