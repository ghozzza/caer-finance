"use client";

import { useState } from "react";
import { createFormLPFactory } from "@/actions/CreateFormLPFactory";

export default function LPFactoryForm() {
  const [formData, setFormData] = useState({
    sender: "",
    collateralToken: "",
    borrowToken: "",
    lpAddress: "",
    ltv: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate Ethereum addresses
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(formData.sender)) {
      setError("Invalid sender address format");
      setLoading(false);
      return;
    }
    if (!ethAddressRegex.test(formData.collateralToken)) {
      setError("Invalid collateral token address format");
      setLoading(false);
      return;
    }
    if (!ethAddressRegex.test(formData.borrowToken)) {
      setError("Invalid borrow token address format");
      setLoading(false);
      return;
    }
    if (!ethAddressRegex.test(formData.lpAddress)) {
      setError("Invalid LP address format");
      setLoading(false);
      return;
    }

    // Validate LTV
    const ltv = parseInt(formData.ltv);
    if (isNaN(ltv) || ltv < 0 || ltv > 100) {
      setError("LTV must be a number between 0 and 100");
      setLoading(false);
      return;
    }

    try {
      const formDataObj = new FormData();
      console.log(formData);
      formDataObj.append("sender", formData.sender);
      formDataObj.append("collateralToken", formData.collateralToken);
      formDataObj.append("borrowToken", formData.borrowToken);
      formDataObj.append("lpAddress", formData.lpAddress);
      formDataObj.append("ltv", ltv.toString());

      const result = await createFormLPFactory(formDataObj);
      
      if (result.success) {
        setSuccess(true);
        setFormData({
          sender: "",
          collateralToken: "",
          borrowToken: "",
          lpAddress: "",
          ltv: "",
        });
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error("Full error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while saving the data"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label
          htmlFor="sender"
          className="block text-sm font-medium text-gray-700"
        >
          Sender Address
        </label>
        <input
          type="text"
          id="sender"
          name="sender"
          value={formData.sender}
          onChange={handleChange}
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0x..."
        />
      </div>

      <div>
        <label
          htmlFor="collateralToken"
          className="block text-sm font-medium text-gray-700"
        >
          Collateral Token Address
        </label>
        <input
          type="text"
          id="collateralToken"
          name="collateralToken"
          value={formData.collateralToken}
          onChange={handleChange}
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0x..."
        />
      </div>

      <div>
        <label
          htmlFor="borrowToken"
          className="block text-sm font-medium text-gray-700"
        >
          Borrow Token Address
        </label>
        <input
          type="text"
          id="borrowToken"
          name="borrowToken"
          value={formData.borrowToken}
          onChange={handleChange}
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0x..."
        />
      </div>

      <div>
        <label
          htmlFor="lpAddress"
          className="block text-sm font-medium text-gray-700"
        >
          LP Address
        </label>
        <input
          type="text"
          id="lpAddress"
          name="lpAddress"
          value={formData.lpAddress}
          onChange={handleChange}
          required
          pattern="^0x[a-fA-F0-9]{40}$"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="0x..."
        />
      </div>

      <div>
        <label
          htmlFor="ltv"
          className="block text-sm font-medium text-gray-700"
        >
          LTV (Loan-to-Value)
        </label>
        <input
          type="number"
          id="ltv"
          name="ltv"
          value={formData.ltv}
          onChange={handleChange}
          required
          min="0"
          max="100"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="75"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && (
        <div className="text-red-600 text-sm mt-2 p-2 bg-red-50 rounded">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="text-green-600 text-sm mt-2 p-2 bg-green-50 rounded">
          Successfully added LP Factory record!
        </div>
      )}
    </form>
  );
}
