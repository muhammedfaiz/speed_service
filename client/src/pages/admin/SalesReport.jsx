import { useEffect, useState } from 'react';
import logo from '../../assets/logo-transparent.png';
import Navbar from '../../components/admin/Navbar';
import ProfileDropdown from '../../components/admin/ProfileDropdown';
import { salesDataService } from '../../services/adminService';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';

const SalesReport = () => {
  const [salesData, setSalesData] = useState({});
  const [filteredSalesData, setFilteredSalesData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(null); 
  const [maxDate, setMaxDate] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5); 

  useEffect(() => {
    const fetchSalesData = async () => {
      const data = await salesDataService();
      setSalesData(data.salesData);
      setFilteredSalesData(data.salesData.salesPerDay);
      
      if (data.salesData.salesPerDay?.length > 0) {
        const firstOrderDate = new Date(data.salesData.salesPerDay[0].day);
        const lastOrderDate = new Date(data.salesData.salesPerDay[data.salesData.salesPerDay.length - 1].day);
        lastOrderDate.setHours(23, 59, 59, 999);
        setMinDate(firstOrderDate);
        setMaxDate(lastOrderDate);
      }
    };
    fetchSalesData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate).toISOString().split('T')[0];
      const end = new Date(endDate).toISOString().split('T')[0];
      const filtered = salesData?.salesPerDay?.filter((data) => {
        const date = data.day;
        return date >= start && date <= end;
      });
      setFilteredSalesData(filtered);
    } else {
      setFilteredSalesData(salesData?.salesPerDay);
    }
  }, [startDate, endDate, salesData]);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredSalesData?.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-indigo-950 text-white flex flex-col h-screen">
        <div className="pl-10 pt-10 flex justify-center lg:justify-start">
          <img src={logo} alt="speed service" className="w-36" />
        </div>
        <Navbar />
      </aside>

      <main className="flex-grow p-6 relative overflow-auto">
        <div className="absolute top-4 right-4">
          <ProfileDropdown />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-left mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Sales Report</h1>
            <p className="text-gray-500 text-sm">Overview of recent sales.</p>
          </div>

          <div className="flex space-x-4 mb-8">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={minDate} 
              maxDate={maxDate}
              placeholderText="Start Date"
              className="p-2 border border-gray-300 rounded"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || minDate} 
              placeholderText="End Date"
              className="p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-500">${salesData?.totalRevenue}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Total Sales</h3>
              <p className="text-2xl font-bold text-blue-500">{salesData?.totalSales}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <h3 className="text-md font-semibold text-gray-700">Total Orders</h3>
              <p className="text-2xl font-bold text-purple-500">{salesData?.totalOrders}</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Details</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  <th className="px-2 py-2 border-b border-gray-200">Date</th>
                  <th className="px-2 py-2 border-b border-gray-200">Total Sales</th>
                  <th className="px-2 py-2 border-b border-gray-200">Total Orders</th>
                  <th className="px-2 py-2 border-b border-gray-200">Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentRows?.map((data, index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 border-b border-gray-200">{data.day}</td>
                    <td className="px-2 py-2 border-b border-gray-200">{data.totalSales}</td>
                    <td className="px-2 py-2 border-b border-gray-200">{data.totalOrders}</td>
                    <td className="px-2 py-2 border-b border-gray-200">${data.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <nav>
                <ul className="flex space-x-2">
                  {Array.from({ length: Math.ceil(filteredSalesData?.length / rowsPerPage) }, (_, index) => (
                    <li key={index}>
                      <button
                        onClick={() => paginate(index + 1)}
                        className={`px-3 py-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SalesReport;
