import LeftSideBar from "../components/Dashboard/LeftSideBar";
import RightSideBar from "../components/Dashboard/RightSideBar";

const Dashboard = () => {
  return (
    <>
      <div className="flex w-full border">
        <div className="w-[180px] lg:flex-[0.2] border-r px-2 py-2 ">
          <LeftSideBar />
        </div>
        <div className="w-full md:overflow-auto lg:flex-[0.8] px-2 py-2">
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
