import Navbar from "../../components/employee/Navbar";
import Banner from "../../components/employee/Banner";
import StatisticsOverview from "../../components/employee/StatisticsOverview";
import UpcomingTasks from "../../components/employee/UpcomingTasks";
import Notifications from "../../components/employee/Notifications";
import RecentActivities from "../../components/employee/RecentActivities";
import Footer from "../../components/employee/Footer";

const EmployeeDashboard = () => {
  return (
    <>
      <Navbar />
      <Banner />

      <div className="px-6 py-8 space-y-8">
        <StatisticsOverview />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UpcomingTasks />
          <Notifications />
        </div>
        <RecentActivities />
      </div>

      <Footer />
    </>
  );
};

export default EmployeeDashboard;
