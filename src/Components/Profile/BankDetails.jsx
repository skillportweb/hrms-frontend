import React, { useState } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'
import { FaUniversity, FaSave, FaEdit, FaTimes } from 'react-icons/fa'

export default function BankDetails() {
  const [bankData, setBankData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  })
  const [isSaved, setIsSaved] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = (e) => {
    setBankData({...bankData, [e.target.name]: e.target.value})
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (bankData.accountHolderName && bankData.accountNumber && bankData.ifscCode) {
      setIsSaved(true)
      setIsEditing(false)
      alert('Bank details saved successfully!')
    } else {
      alert('Please fill required fields')
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const maskAccountNumber = (accountNumber) => {
    if (accountNumber.length <= 4) return accountNumber
    return '*'.repeat(accountNumber.length - 4) + accountNumber.slice(-4)
  }

  return (
    <>
      <CompleteProfileLinks/>
      <hr className="mt-3" />
      
      <div className=" mx-auto p-6 mt-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{color: '#2c3e50'}}>
            <FaUniversity />
            Bank Details
          </h1>
          <p className="text-gray-600">
            {isSaved && !isEditing ? 'Your bank account information' : 'Add your Indian bank account information'}
          </p>
        </div>

        {/* Show Form when not saved or editing */}
        {(!isSaved || isEditing) && (
          <form onSubmit={handleSave} className="bg-white border rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                Account Holder Name *
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={bankData.accountHolderName}
                onChange={handleChange}
                placeholder="As per bank records"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                style={{'--tw-ring-color': '#2c3e50'}}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                  Account Number *
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                  style={{'--tw-ring-color': '#2c3e50'}}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  value={bankData.ifscCode}
                  onChange={handleChange}
                  placeholder="e.g., SBIN0001234"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                  style={{'--tw-ring-color': '#2c3e50'}}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={bankData.bankName}
                onChange={handleChange}
                placeholder="e.g., State Bank of India"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                style={{'--tw-ring-color': '#2c3e50'}}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                Branch Name
              </label>
              <input
                type="text"
                name="branchName"
                value={bankData.branchName}
                onChange={handleChange}
                placeholder="Branch location"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                style={{'--tw-ring-color': '#2c3e50'}}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{backgroundColor: '#2c3e50'}}
              >
                <FaSave />
                Save Bank Details
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition-all flex items-center gap-2"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* Show Details when saved and not editing */}
        {isSaved && !isEditing && (
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold" style={{color: '#2c3e50'}}>Saved Bank Account</h3>
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
              >
                <FaEdit />
                Edit
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium" style={{color: '#2c3e50'}}>Account Holder:</span>
                <span>{bankData.accountHolderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium" style={{color: '#2c3e50'}}>Account Number:</span>
                <span className="font-mono">{maskAccountNumber(bankData.accountNumber)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium" style={{color: '#2c3e50'}}>IFSC Code:</span>
                <span className="font-mono">{bankData.ifscCode}</span>
              </div>
              {bankData.bankName && (
                <div className="flex justify-between">
                  <span className="font-medium" style={{color: '#2c3e50'}}>Bank Name:</span>
                  <span>{bankData.bankName}</span>
                </div>
              )}
              {bankData.branchName && (
                <div className="flex justify-between">
                  <span className="font-medium" style={{color: '#2c3e50'}}>Branch:</span>
                  <span>{bankData.branchName}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}