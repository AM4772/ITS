import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { useGetSortedTicketsQuery } from "./ticketsApiSlice";
import SingleUserTicket from "./SingleUserTicket.js";
import { SORTOPTIONS } from "../../config/sortOptions";

const SingleUserTicketsList = () => {
  let content;
  let userName;

  const { id } = useParams();

  const { user, isLoading: isLoadingUser } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id].username,
    }),
  });

  userName = user ?? isLoadingUser;

  const [sortArg, setSortArg] = useState();

  const {
    data: tickets = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSortedTicketsQuery(
    { sortArg },
    {
      pollingInterval: 15000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) content = <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = tickets;
    let ticketsIds = [...ids];
    const tableContent = ticketsIds.map((tickets) =>
      entities[tickets].userId === Number(id) ||
      entities[tickets].author === userName ? (
        <SingleUserTicket
          key={entities[tickets].id}
          ticketId={entities[tickets].id}
        />
      ) : null
    );

    const clear = (e) => {
      e.target.value = "";
    };

    function handleOrdChange(e) {
      e.preventDefault();
      if (e.target.value) {
        setSortArg(e.target.value);
      }
      if (!e.nativeEvent.inputType) {
        e.target.blur();
      }
    }

    const sortOptions = Object.values(SORTOPTIONS).map((optSort) => {
      return (
        <option key={optSort} value={optSort}>
          {" "}
          {optSort}
        </option>
      );
    });

    content = (
      <section>
        <div className="ticket--sort">
          <label htmlFor="sorted">Sort: </label>
          <input
            id="sorted"
            type="input"
            name="sorted"
            list="sort"
            onChange={handleOrdChange}
            onClick={clear}
            onFocus={clear}
            value={sortArg}
            placeholder="Asc/Desc"
          />
          <datalist id="sort">{sortOptions}</datalist>
        </div>
        <br />
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
              <th scope="col" className="table__th ticket__timeago">
                Time Open
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
      </section>
    );
  }

  return content;
};

export default SingleUserTicketsList;
