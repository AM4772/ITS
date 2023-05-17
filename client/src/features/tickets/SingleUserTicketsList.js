import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

const SingleUserTicketsList = () => {
  let content;
  let userName;

  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id].username,
    }),
  });

  userName = user;

  const {
    data: tickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery("ticketsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = tickets;

    let ticketsIds = [...ids];

    const tableContent = ticketsIds.map((tickets) =>
      entities[tickets].userId === Number(id) ||
      entities[tickets].author === userName ? (
        <tr key={entities[tickets].id} className="table__row user">
          <td className="table__cell">
            <Link to={`/dash/tickets/${entities[tickets].id}`}>
              {entities[tickets].name}
            </Link>
          </td>
        </tr>
      ) : null
    );

    content = (
      <table className="table__userlisting">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th">
              {userName}'s Bugs
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};

export default SingleUserTicketsList;
