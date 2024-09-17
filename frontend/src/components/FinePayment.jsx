import React, { useState } from 'react';

const FinePayment = () => {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [actualReturnDate, setActualReturnDate] = useState('');
  const [fineCalculated, setFineCalculated] = useState(0); // Default zero
  const [finePaid, setFinePaid] = useState(false); // Default unchecked
  const [remarks, setRemarks] = useState('');

  const handleConfirm = () => {
    // Handle fine payment confirmation logic
    console.log({
      bookName,
      author,
      serialNo,
      issueDate,
      returnDate,
      actualReturnDate,
      fineCalculated,
      finePaid,
      remarks,
    });
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Pay Fine</h2>

      <div className="mb-4">
        <label className="block mb-2">Enter Book Name:</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Enter Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Serial No:</label>
        <input
          type="text"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Issue Date:</label>
        <input
          type="date"
          value={issueDate}
          onChange={(e) => setIssueDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Return Date:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Actual Return Date:</label>
        <input
          type="date"
          value={actualReturnDate}
          onChange={(e) => setActualReturnDate(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-md"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Fine Calculated:</label>
        <input
          type="text"
          value={fineCalculated}
          onChange={(e) => setFineCalculated(e.target.value)}
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
        <button className="bg-gray-500 text-white py-2 px-6 rounded-lg">Cancel</button>
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
