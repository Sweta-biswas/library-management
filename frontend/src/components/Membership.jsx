import React from 'react';

const Membership = () => {
  // Sample data for the membership details (replace with actual data from props or an API)
  const members = [
    {
      membershipId: 'M01',
      name: 'RAM',
      contactNo: '9876543210',
      address: '123 Street, City',
      aadharNo: '1234-5678-9012',
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      status: 'Active',
      fine: '$5',
    },
    {
      membershipId: 'M02',
      name: 'SHYAM',
      contactNo: '9123456780',
      address: '456 Avenue, City',
      aadharNo: '4321-8765-2109',
      startDate: '2023-02-01',
      endDate: '2024-02-01',
      status: 'Inactive',
      fine: '$0',
    },
    {
      membershipId: 'M03',
      name: 'JADDU',
      contactNo: '9988776655',
      address: '789 Road, City',
      aadharNo: '1111-2222-3333',
      startDate: '2023-03-01',
      endDate: '2024-03-01',
      status: 'Active',
      fine: '$2',
    },
    // Add more member data here...
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">List of Active Members</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Membership Id</th>
              <th className="py-2 px-4 border">Name of Member</th>
              <th className="py-2 px-4 border">Contact No</th>
              <th className="py-2 px-4 border">Contact Address</th>
              <th className="py-2 px-4 border">Aadhar Card No</th>
              <th className="py-2 px-4 border">Start Date of Membership</th>
              <th className="py-2 px-4 border">End Date of Membership</th>
              <th className="py-2 px-4 border">Status (Active/Inactive)</th>
              <th className="py-2 px-4 border">Active Fine</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border">{member.membershipId}</td>
                <td className="py-2 px-4 border">{member.name}</td>
                <td className="py-2 px-4 border">{member.contactNo}</td>
                <td className="py-2 px-4 border">{member.address}</td>
                <td className="py-2 px-4 border">{member.aadharNo}</td>
                <td className="py-2 px-4 border">{member.startDate}</td>
                <td className="py-2 px-4 border">{member.endDate}</td>
                <td className={`py-2 px-4 border ${member.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                  {member.status}
                </td>
                <td className="py-2 px-4 border">{member.fine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      
      
    </div>
  );
};

export default Membership;
