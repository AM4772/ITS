import React from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const UsersListing = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users;

    const tableContent =
      ids?.length &&
      ids.map((id) => (
        <tr key={id} className="table__row user">
          <td className="table__cell">
            <Link to={`/dash/user/${id}`} singleUser={entities[id]}>
              {entities[id].name + " " + entities[id].surname}
            </Link>
          </td>
        </tr>
      ));

    content = (
      <table className="table__userlisting">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Users
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersListing;
