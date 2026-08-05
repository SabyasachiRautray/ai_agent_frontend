import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const jarvisApi = createApi({
  reducerPath: "jarvisApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    converse: builder.mutation({
      // args: { audioBlob, history, pendingBooking, currentBooking }
      query: ({ audioBlob, history, pendingBooking, currentBooking }) => {
        const formData = new FormData();
        formData.append("audio", audioBlob, "query.wav");
        formData.append("history_json", JSON.stringify(history));
        formData.append("pending_booking", String(pendingBooking));
        if (currentBooking) {
          formData.append("current_booking_json", JSON.stringify(currentBooking));
        }
        return { url: "/api/converse", method: "POST", body: formData };
      },
    }),
  }),
});

export const { useConverseMutation } = jarvisApi;