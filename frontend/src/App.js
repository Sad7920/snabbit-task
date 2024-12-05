import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [sport, setSport] = useState("");
  const [duration, setDuration] = useState("60"); // Default to 60
  const [dateTime, setDateTime] = useState("");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrice(null);

    const formattedDateTime = dateTime.includes(":") && dateTime.split(":").length === 2
      ? `${dateTime}:00`
      : dateTime;

    try {
      const response = await axios.post("http://127.0.0.1:5000/get-price", {
        sport,
        duration: parseInt(duration),
        date_time: formattedDateTime,
      });
      setPrice(response.data.price);
    } catch (err) {
      setError(err.message || "An error occurred");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Dynamic Pricing</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sport</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Sport</option>
              <option value="badminton">Badminton</option>
              <option value="cricket">Cricket</option>
              <option value="football">Football</option>
              <option value="tennis">Tennis</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Duration (minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="120">120</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Date and Time</label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Get Price
          </button>
        </form>

        {price && <h2 className="text-xl font-semibold text-green-600 mt-6">Price: Rs. {price}</h2>}
        {error && <h2 className="text-xl font-semibold text-red-600 mt-6">{error}</h2>}
      </div>
    </div>
  );
};

export default App;
