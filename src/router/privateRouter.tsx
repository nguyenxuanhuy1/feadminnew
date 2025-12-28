import { Navigate } from "react-router-dom";
import Path from "./path";

const PrivateRoute = (props: { children: any }) => {
  const auth = localStorage.getItem("role");
  if (auth === 'ADMIN' || auth ==='POST') {
    return props.children;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default PrivateRoute;
