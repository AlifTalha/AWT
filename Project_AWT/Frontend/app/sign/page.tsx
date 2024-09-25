// "use client";
// import axios from "axios";
// import { useState } from "react";

// export default function LoginForm() {
//   const [username, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [successMessage, setSuccessMessage] = useState<string>("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccessMessage("");

//     try {
//       const response = await axios.post("http://localhost:3000/sponsor/login", {
//         username,
//         password,
//       });

//       if (response.data.accessToken) {
//         setSuccessMessage(`Welcome, ${response.data.user.name}!`);
//         alert(`successfully login..., ${response.data.user.name}!`);
//         // Store token or proceed to next step (e.g., redirect to dashboard)
//         localStorage.setItem("accessToken", response.data.accessToken);
//       } else {
//         setError(response.data.message || "Invalid username or password.");
//       }
//     } catch (err) {
//       setError("Login failed. Please check your credentials and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Login
//         </h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label
//               htmlFor="username"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Enter your username"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
//           {successMessage && (
//             <p className="mt-4 text-sm text-center text-green-500">
//               {successMessage}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";
import axios from "axios";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [userDetails, setUserDetails] = useState<{
    id: number;
    name: string;
    username: string;
  } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserDetails(null); // Reset user details on new login attempt

    try {
      const response = await axios.post("http://localhost:3000/sponsor/login", {
        username,
        password,
      });

      if (response.data.accessToken) {
        // Store the token and user data
        localStorage.setItem("accessToken", response.data.accessToken);
        setUserDetails(response.data.user); // Save user details
      } else {
        setError(response.data.message || "Invalid username or password.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
        </form>

        {/* Show User Details After Login */}
        {userDetails && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold text-green-700">User Details</h3>
            <p className="text-gray-700">
              <strong>ID:</strong> {userDetails.id}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p className="text-gray-700">
              <strong>Username:</strong> {userDetails.username}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

