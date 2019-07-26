import React, { Suspense } from "react";
import { Loader } from "../Components/Loader";

//Lazy load the UserList so we can display the Loader while the logs are parsed.
const UserList = React.lazy(() => import("../Components/UserList"));

const Dashboard = () => {
  return (
    <div className="container">
      <Suspense fallback={<Loader />}>
        <UserList />
      </Suspense>
    </div>
  );
};

export default Dashboard;
