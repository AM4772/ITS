import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isDeveloper = false;
  let isManager = false;
  let isAdmin = false;
  let status = "EndUser";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, role } = decoded.UserInfo;

    isDeveloper = role.includes("Developer");
    isManager = role.includes("Manager");
    isAdmin = role.includes("Admin");

    if (isDeveloper) status = "Developer";
    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return {
      username,
      role,
      status,
      isDeveloper,
      isManager,
      isAdmin,
    };
  }

  return {
    username: "",
    role: "",
    isDeveloper,
    isManager,
    isAdmin,
  };
};
export default useAuth;
