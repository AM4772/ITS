import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import TicketsList from "./features/tickets/TicketsList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditTicket from "./features/tickets/EditTicket";
import NewTicket from "./features/tickets/NewTicket";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import SingleUserTicketsList from "./features/tickets/SingleUserTicketsList";
import UsersListing from "./features/users/UsersListing";

function App() {
  useTitle("Bugxinator");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* PUBLIC ROUTES */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* PROTECTED ROUTES */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Welcome />} />
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route
                      element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                    >
                      <Route path=":id" element={<EditUser />} />
                    </Route>
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                  <Route path="user">
                    <Route index element={<UsersListing />} />
                    <Route path=":id" element={<SingleUserTicketsList />} />
                  </Route>
                </Route>

                <Route path="tickets">
                  <Route index element={<TicketsList />} />
                  <Route path=":id" element={<EditTicket />} />
                  <Route path="new" element={<NewTicket />} />
                </Route>
              </Route>
              {/* End DashLayout */}
            </Route>
          </Route>
        </Route>
        {/* END PROTECTED ROUTES */}
      </Route>
      {/* End Layout */}
    </Routes>
  );
}

export default App;
