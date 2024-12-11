import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Creators() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/users/getAllAdmin",
          {
            withCredentials: true,
          }
        );
        setAdmins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admins:", error);
        setLoading(false);
        setNotFound(true);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Heading Section */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-12 mt-16">
        Our Creators
      </h1>
      {/* Admins Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Loader for while data is fetching */}
        {loading ? (
          <div className="text-center w-full col-span-4">
            <p>
              <ClipLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </p>
          </div>
        ) : admins && admins.length > 0 ? (
          /* Display Admin Profiles */
          admins.slice(0, 4).map((admin) => {
            return (
              <div
                key={admin._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={admin.photo.url}
                    alt={admin.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-indigo-500 shadow-lg"
                  />
                  <div className="text-center mt-4">
                    <p className="text-xl font-semibold text-gray-900">{admin.name}</p>
                    <p className="text-gray-600 text-sm uppercase tracking-wider">{admin.role}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* Display when no creators are found */
          <div className="text-center w-full col-span-4">
            <p className="text-gray-600 text-lg">No creators found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Creators;
