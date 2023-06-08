import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  useTitle(`Bugxinator: ${username}`);
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/tickets">View Bugs</Link>
      </p>

      <p>
        <Link to="/dash/apps">View Bugs by Application</Link>
      </p>

      <p>
        <Link to="/dash/tickets/new">Add New Bug</Link>
      </p>

      {isAdmin && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <>
          <p>
            <Link to="/dash/user">Users List and Bugs</Link>
          </p>
          <p>
            <Link to="/dash/users/new">Add New User</Link>
          </p>
        </>
      )}
    </section>
  );
  return content;
};

export default Welcome;
