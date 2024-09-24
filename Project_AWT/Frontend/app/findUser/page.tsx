"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowData() {
  const [data, setData] = useState([]);
  const [eventId, setEventId] = useState<string>("");
  const [eventName, setEventName] = useState<string>("");


  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event", {
        params: {
          id: eventId,
          name: eventName,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-auto min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Retrieve Event Details
        </h2>

        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Event ID"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Event Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <button
          onClick={fetchEvents}
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
        >
          Retrieve Events
        </button>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-white">ID</th>
                <th className="px-4 py-2 text-left text-white">Name</th>
                <th className="px-4 py-2 text-left text-white">Email</th>
                <th className="px-4 py-2 text-left text-white">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((event: any, index: number) => (
                  <tr
                    key={event.id}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}
                  >
                    <td className="px-4 py-2 text-gray-700">{event.id}</td>
                    <td className="px-4 py-2 text-gray-700">{event.name}</td>
                    <td className="px-4 py-2 text-gray-700">{event.email}</td>
                    <td className="px-4 py-2 text-gray-700">{event.phoneNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
