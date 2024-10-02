import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FinePayment = () => {
  const [type, setType] = useState('Book');
  const [name, setName] = useState('');
  const [authorOrDirector, setAuthorOrDirector] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [actualReturnDate, setActualReturnDate] = useState(null); // Store as Date object
  const [fineCalculated, setFineCalculated] = useState('');
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (returnDate && actualReturnDate) {
      calculateFine();
    }
  }, [returnDate, actualReturnDate]);

  const fetchIssueDate = async () => {
    try {
      const response = await axios.post(
        'https://backend-smoky-ten-70.vercel.app/api/v1/transaction/fetch-issue-date',
        { name, authorOrDirector, serialNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      setIssueDate(response.data.issueDate);
      setReturnDate(response.data.returnDate);
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error fetching issue date');
      }
    }
  };

  const calculateFine = async () => {
    try {
      const response = await axios.post(
        'https://backend-smoky-ten-70.vercel.app/api/v1/transaction/calculate-fine',
        { returnDate, actualReturnDate: actualReturnDate.toISOString() }, // Send Date object as string
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFineCalculated(response.data.fine.toString());
      setError('');
    } catch (error) {
      setError('Error calculating fine');
    }
  };

  const handleConfirm = async () => {
    try {
      await axios.post(
        'https://backend-smoky-ten-70.vercel.app/api/v1/transaction/pay-fine',
        {
          type,
          name,
          authorOrDirector,
          serialNumber,
          issueDate,
          returnDate,
          actualReturnDate: actualReturnDate.toISOString(), // Convert to string for API
          fine: fineCalculated,
          finePaid,
          remarks,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess('Fine paid successfully');
      setError('');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('Error submitting payment');
      }
      setSuccess('');
    }
  };

  const handleActualReturnDateChange = (e) => {
    const value = e.target.value;
    setActualReturnDate(new Date(value)); // Convert the string to a Date object
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Pay Fine</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <div className="mb-4">
        <label className="block mb-2">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        >
          <option value="Book">Book</option>
          <option value="Movie">Movie</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          {type === 'Book' ? 'Author' : 'Director'}:
        </label>
        <input
          type="text"
          value={authorOrDirector}
          onChange={(e) => setAuthorOrDirector(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Serial Number:</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <button
        onClick={fetchIssueDate}
        className="bg-green-500 text-white py-2 px-6 rounded-lg mb-4"
      >
        Fetch Issue Date
      </button>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="datetime-local"
          value={issueDate ? new Date(issueDate).toISOString().substring(0, 16) : ''}
          className="w-full border p-2 rounded-lg shadow-md"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Return Date:</label>
        <input
          type="datetime-local"
          value={returnDate ? new Date(returnDate).toISOString().substring(0, 16) : ''}
          className="w-full border p-2 rounded-lg shadow-md"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Actual Return Date:</label>
        <input
          type="datetime-local"
          value={actualReturnDate ? actualReturnDate.toISOString().substring(0, 16) : ''}
          onChange={handleActualReturnDateChange} // Handle date change
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Fine Calculated:</label>
        <input
          type="text"
          value={fineCalculated}
          className="w-full border p-2 rounded-lg shadow-md"
          readOnly
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Fine Paid:</label>
        <input
          type="checkbox"
          checked={finePaid}
          onChange={(e) => setFinePaid(e.target.checked)}
          className="mr-2"
        />
        <span>Checked if paid</span>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Remarks (optional):</label>
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="bg-gray-500 text-white py-2 px-6 rounded-lg">
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default FinePayment;
