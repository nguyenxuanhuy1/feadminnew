import { Navigate } from "react-router-dom";
import Path from "./path";

const PrivateRoute = (props: { children: any }) => {
  // const auth = localStorage.getItem("token");
  const auth ="xhuy"
  if (auth) {
    return props.children;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default PrivateRoute;
