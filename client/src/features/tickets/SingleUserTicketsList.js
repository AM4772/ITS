import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { priorityName } from "../../config/priority";
import { severityName } from "../../config/severity";

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
        <tr
          key={entities[tickets].id}
          className="table__row
        "
        >
          <td className="table__cell">
            <Link to={`/dash/tickets/${entities[tickets].id}`}>
              {entities[tickets].name}
            </Link>
          </td>
          <td className="table__cell">{entities[tickets].application}</td>
          <td className="table__cell ticket__status">
            {entities[tickets].status ? (
              <span className="ticket__status--completed">Closed</span>
            ) : (
              <span className="ticket__status--open">Open</span>
            )}
          </td>
          <td className="table__cell ticket__priority">
            {priorityName(entities[tickets].priority)}
          </td>
          <td className="table__cell ticket__severity">
            {severityName(entities[tickets].severity)}
          </td>
          <td className="table__cell ticket__nature">
            {entities[tickets].nature}
          </td>
        </tr>
      ) : null
    );

    content = (
      <table className="table__userbugs">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th">
              {userName}'s Bugs
            </th>
            <th scope="col" className="table__th ticket__app">
              App
            </th>
            <th scope="col" className="table__th ticket__status">
              Status
            </th>
            <th scope="col" className="table__th ticket__priority">
              Priority
            </th>
            <th scope="col" className="table__th ticket__severity">
              Severity
            </th>
            <th scope="col" className="table__th ticket__nature">
              Nature
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
