import Header from "components/common/Header";
import MobileMenu from "components/common/mobileMenu";
import DashComponents from "components/dashboard";

const Dashboard = () => {
  return (
    <div className="page_container">
      <Header />
      <DashComponents />
      <MobileMenu/>
    </div>
  );
};

export default Dashboard;
