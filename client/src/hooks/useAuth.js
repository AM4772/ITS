import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isDeveloper = false;
  let isManager = false;
  let isAdmin = false;
  let status = "Customer";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role } = decoded.UserInfo;

    isDeveloper = role.includes("Developer");
    isManager = role.includes("Manager");
    isAdmin = role.includes("Admin");

    if (isDeveloper) status = "Developer";
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, role, status, isDeveloper, isManager, isAdmin };
  }

  return { username: "", role: "", isDeveloper, isManager, isAdmin, status };
};
export default useAuth;
