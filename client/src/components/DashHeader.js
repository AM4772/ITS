import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
  faUsers,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const DASH_REGEX = /^\/dash(\/)?$/;
const TICKETS_REGEX = /^\/dash\/tickets(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewTicketClicked = () => navigate("/dash/tickets/new");
  const onNewUserClicked = () => navigate("/dash/users/new");
  const onTicketsClicked = () => navigate("/dash/tickets");
  const onUsersSettingsClicked = () => navigate("/dash/users");
  const onUsersClicked = () => navigate("/dash/user");
  const onAppsClicked = () => navigate("/dash/apps");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !TICKETS_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  let newTicketButton = null;
  if (TICKETS_REGEX.test(pathname)) {
    newTicketButton = (
      <button
        className="icon-button"
        title="New Ticket"
        onClick={onNewTicketClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userSettingsButton = null;
  if (isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userSettingsButton = (
        <button
          className="icon-button"
          title="User Settings"
          onClick={onUsersSettingsClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let usersButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button
          className="icon-button"
          title="User List"
          onClick={onUsersClicked}
        >
          <FontAwesomeIcon icon={faUsers} />
        </button>
      );
    }
  }

  let ticketsButton = null;
  if (!TICKETS_REGEX.test(pathname) && pathname.includes("/dash")) {
    ticketsButton = (
      <button
        className="icon-button"
        title="Tickets"
        onClick={onTicketsClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let appsButton = null;
  if (!TICKETS_REGEX.test(pathname) && pathname.includes("/dash")) {
    appsButton = (
      <button className="icon-button" title="Apps" onClick={onAppsClicked}>
        <FontAwesomeIcon icon={faShapes} />
      </button>
    );
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <PulseLoader color={"#FFF"} />;
  } else {
    buttonContent = (
      <>
        {appsButton}
        {newTicketButton}
        {newUserButton}
        {ticketsButton}
        {usersButton}
        {userSettingsButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">Bugxinator</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );

  return content;
};
export default DashHeader;
