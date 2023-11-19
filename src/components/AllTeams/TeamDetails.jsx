/* eslint-disable react/prop-types */
// src/components/TeamDetails.js


const TeamDetails = ({ teamName, selectedUsers }) => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">{teamName} Team Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="bg-gray-200 p-4 rounded hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {/* Add more user details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;
