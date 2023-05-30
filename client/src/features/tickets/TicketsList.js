import React from "react";
import { useGetTicketsQuery } from "./ticketsApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Ticket from "./Ticket";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

const TicketsList = () => {
  const { username, isManager, isAdmin, isDeveloper } = useAuth();
  let content;
  let userID;
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

  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useGetUsersQuery("usersList", {
    // pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // USERS QUERY
  if (isLoadingUsers) userID = <PulseLoader color={"#FFF"} />;

  if (isErrorUsers) {
    userID = <p className="errmsg">{errorUsers?.data?.message}</p>;
  }

  if (isSuccessUsers) {
    const { ids, entities } = users;

    let usersIds = [...ids];

    userID = usersIds.filter((user) =>
      entities[user].username === username ? entities[user].id : null
    );
  }

  // TICKETS QUERY
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = tickets;

    let filteredIds;
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else if (isDeveloper) {
      filteredIds = ids.filter(
        (ticketId) =>
          entities[ticketId].userId === userID[0] ||
          entities[ticketId].author === username
      );
    } else {
      filteredIds = ids.filter(
        (ticketId) => entities[ticketId].author === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map((ticketId) => (
        <Ticket key={ticketId} ticketId={ticketId} userID={ticketId.id} />
      ));

    content = (
      <table className="table table--tickets">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th ticket__status">
              Status
            </th>
            <th scope="col" className="table__th ticket__app">
              App
            </th>
            <th scope="col" className="table__th ticket__created">
              Created
            </th>
            <th scope="col" className="table__th ticket__updated">
              Updated
            </th>
            <th scope="col" className="table__th ticket__title">
              Title
            </th>
            <th scope="col" className="table__th ticket__author">
              Created by
            </th>
            <th scope="col" className="table__th ticket__assignee">
              Assigned to
            </th>
            <th scope="col" className="table__th ticket__updated">
              Time Open
            </th>
            <th scope="col" className="table__th ticket__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default TicketsList;
