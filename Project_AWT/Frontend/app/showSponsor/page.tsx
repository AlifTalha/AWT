
"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ShowAllSponsors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchSponsors = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:3000/sponsor/showAllSponsors");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching sponsor data:", error);
      setError("Failed to fetch data. Please check the server and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const filteredData = data.filter((sponsor: any) =>
    sponsor.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sponsor.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center flex-auto min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
          List of Sponsors
        </h2>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Full Name or Username..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading && <p className="mt-4 text-center text-gray-700">Loading...</p>}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-white">ID</th>
                <th className="px-4 py-2 text-left text-white">Full Name</th>
                <th className="px-4 py-2 text-left text-white">Username</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((sponsor: any, index: number) => (
                  <tr
                    key={sponsor.sponsorid}
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b hover:bg-gray-200`}
                  >
                    <td className="px-4 py-2 text-gray-700">{sponsor.sponsorid}</td>
                    <td className="px-4 py-2 text-gray-700">{sponsor.fullname}</td>
                    <td className="px-4 py-2 text-gray-700">{sponsor.username}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                    No sponsors found.
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
