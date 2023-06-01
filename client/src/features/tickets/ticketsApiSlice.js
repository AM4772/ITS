import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ticketsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => (a.status === b.status ? 0 : a.status ? 1 : -1),
});

const initialState = ticketsAdapter.getInitialState();

export const ticketsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query({
      query: () => ({
        url: "/tickets",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      /* keepUnusedDataFor: 5,*/
      transformResponse: (responseData) => {
        return ticketsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Ticket", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Ticket", id })),
          ];
        } else return [{ type: "Ticket", id: "LIST" }];
      },
    }),
    addNewTicket: builder.mutation({
      query: (initialTicket) => ({
        url: "/tickets",
        method: "POST",
        body: {
          ...initialTicket,
        },
      }),
      invalidatesTags: [{ type: "Ticket", id: "LIST" }],
    }),
    updateTicket: builder.mutation({
      query: (initialTicket) => ({
        url: "/tickets",
        method: "PUT",
        body: {
          ...initialTicket,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
    deleteTicket: builder.mutation({
      query: ({ id }) => ({
        url: `/tickets`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Ticket", id: arg.id }],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useAddNewTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketsApiSlice;

// returns the query result object
export const selectTicketsResult =
  ticketsApiSlice.endpoints.getTickets.select();

// creates memoized selector
const selectTicketsData = createSelector(
  selectTicketsResult,
  (ticketsResult) => ticketsResult.data // normalized state object with ids & entities
);

// The entity adapter's getSelectors() fn creates 5 selectors: the ones below plus selectEntities and selectTotal
// We rename them with aliases using destructuring to avoid having to change the code in the different components
export const {
  selectAll: selectAllTickets,
  selectById: selectTicketById,
  selectIds: selectTicketIds,
  // Pass in a selector as argument to return the tickets slice of state
  // If no argument is passed, it returns an unglobalized set of selector functions that assume their state argument
  // is the actual entity state object to read from.
} = ticketsAdapter.getSelectors(
  (state) => selectTicketsData(state) ?? initialState
);

export const selectTicketsByUser = createSelector(
  [selectAllTickets, (state, userId) => userId],
  (tickets, userId) => tickets.filter((ticket) => ticket.userId === userId)
);

// export const selectSortedTickets = createSelector(
//   [selectAllTickets, (state, sortArg) => sortArg],
//   (tickets, sortArg) => {
//     if (sortArg === "Priority") {
//       tickets.sort((a, b) => b.priority - a.priority);
//     } else if (sortArg === "Severity") {
//       tickets.sort((a, b) => b.severity - a.severity);
//     } else if (sortArg === "Application") {
//       tickets.sort((a, b) => {
//         const nameA = a.application.toUpperCase();
//         const nameB = b.application.toUpperCase();
//         if (nameA < nameB) return -1;
//         if (nameA > nameB) return 1;
//         return 0;
//       });
//     } else if (sortArg === "Nature") {
//       tickets.sort((a, b) => {
//         const nameA = a.nature.toUpperCase();
//         const nameB = b.nature.toUpperCase();
//         if (nameA < nameB) return -1;
//         if (nameA > nameB) return 1;
//         return 0;
//       });
//     } else if (sortArg === "Assignee") {
//       tickets.sort((a, b) => b.userId - a.userId);
//     } else {
//       tickets.sort((a, b) => b.status - a.status);
//     }
//   }
// );
