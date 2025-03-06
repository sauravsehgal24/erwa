import React from "react";

export default function ConfirmationPage({ expenseNumber, status }) {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="border-2 border-black rounded-lg p-8 w-96 text-center shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Company Name</h1>
        <p className="text-lg mb-4">Successfully submitted</p>
        <p className="text-lg mb-4">
          Your Expense Report number is: <span className="font-bold">{expenseNumber}</span>
        </p>
        <p className="text-lg mb-6">You can track the status on this page</p>
        <p className="text-xl font-bold">Status: <span className="text-gray-800">{status}</span></p>
      </div>
    </div>
  );
}
