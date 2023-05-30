import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { priorityName } from "../../config/priority";
import { severityName } from "../../config/severity";

const SingleAppTicketsList = () => {
  let content;

  let [searchParams] = useSearchParams();

  const appName = searchParams.get("appname");

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities,
    }),
  });

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
      entities[tickets].application === appName ? (
        <tr key={entities[tickets].id} className="table__row app">
          <td className="table__cell">{entities[tickets].application}</td>
          <td className="table__cell">
            <Link to={`/dash/tickets/${entities[tickets].id}`}>
              {entities[tickets].name}
            </Link>
          </td>
          <td className="table__cell ticket__status">
            {entities[tickets].status ? (
              <span className="ticket__status--completed">Closed</span>
            ) : (
              <span className="ticket__status--open">Open</span>
            )}
          </td>
          <td className="table__cell ticket__assignee">
            {user[entities[tickets].userId].username}
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
      <table className="table__appbuglist">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th">
              App
            </th>
            <th scope="col" className="table__th">
              Bugs
            </th>
            <th scope="col" className="table__th ticket__status">
              Status
            </th>
            <th scope="col" className="table__th ticket__assignee">
              Assigned to:
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

export default SingleAppTicketsList;
