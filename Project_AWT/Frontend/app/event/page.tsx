"use client";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowData() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/sponsor/geteventdetails");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);


  const filteredData = data.filter((event: any) =>
    event.id.toString().includes(searchTerm)
  );

  return (
    <div className="flex items-center justify-center flex-auto min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          Show Event Details
        </h2>

        
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by event ID..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
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
              {filteredData.length > 0 ? (
                filteredData.map((event: any, index: number) => (
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
