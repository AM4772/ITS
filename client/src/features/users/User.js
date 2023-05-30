import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import useAuth from "../../hooks/useAuth";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  const { status } = useAuth();

  const navigate = useNavigate();

  let canEdit;
  if (status === "Admin") {
    canEdit = true;
  }

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${userId}`);

    // const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    const userStatus = user.active ? "Active" : "Inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell user__fullname ${cellStatus}`}>
          {user.name + " " + user.surname}
        </td>
        <td className={`table__cell user__email ${cellStatus}`}>
          {user.email}
        </td>
        <td className={`table__cell user__roles ${cellStatus}`}>{user.role}</td>
        <td className={`table__cell ${cellStatus}`}>{userStatus}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            className="icon-button table__button"
            onClick={handleEdit}
            disabled={!canEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedUser = memo(User);

export default memoizedUser;
