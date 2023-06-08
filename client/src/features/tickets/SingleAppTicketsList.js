import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetSortedTicketsQuery } from "./ticketsApiSlice";
import SingleAppTicket from "./SingleAppTicket";
import { SORTOPTIONS } from "../../config/sortOptions";

const SingleAppTicketsList = () => {
  let content;

  let [searchParams] = useSearchParams();

  const appName = searchParams.get("appname");

  const [sortArg, setSortArg] = useState();

  const {
    data: tickets,
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
      entities[tickets].application === appName ? (
        <SingleAppTicket
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
          <label htmlFor="sorted">Sorted by: </label>
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

export default SingleAppTicketsList;
