import React, { useState } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'
import { FaCertificate, FaPlus, FaEdit, FaTimes, FaSave, FaTrash, FaCalendarAlt, FaExternalLinkAlt, FaCheck } from 'react-icons/fa'

export default function Certificates() {
  const [certificates, setCertificates] = useState([])
  const [newCertificate, setNewCertificate] = useState({
    name: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    doesNotExpire: false
  })
  const [isAddingCertificate, setIsAddingCertificate] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingData, setEditingData] = useState({})

  const handleNewChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewCertificate({
      ...newCertificate,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditingData({
      ...editingData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const addCertificate = (e) => {
    e.preventDefault()
    const { name, issuingOrganization, issueDate } = newCertificate
    
    if (name.trim() && issuingOrganization.trim() && issueDate) {
      setCertificates([...certificates, {
        id: Date.now(),
        ...newCertificate,
        name: name.trim(),
        issuingOrganization: issuingOrganization.trim()
      }])
      
      setNewCertificate({
        name: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        credentialUrl: '',
        doesNotExpire: false
      })
      setIsAddingCertificate(false)
      alert('Certificate added successfully!')
    } else {
      alert('Please fill in the required fields (Certificate Name, Issuing Organization, and Issue Date)')
    }
  }

  const startEditing = (certificate) => {
    setEditingId(certificate.id)
    setEditingData({...certificate})
  }

  const saveEdit = () => {
    const { name, issuingOrganization, issueDate } = editingData
    
    if (name.trim() && issuingOrganization.trim() && issueDate) {
      setCertificates(certificates.map(cert => 
        cert.id === editingId 
          ? { ...editingData, name: name.trim(), issuingOrganization: issuingOrganization.trim() }
          : cert
      ))
      setEditingId(null)
      setEditingData({})
      alert('Certificate updated successfully!')
    } else {
      alert('Please fill in the required fields')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingData({})
  }

  const deleteCertificate = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(certificates.filter(cert => cert.id !== id))
      alert('Certificate deleted successfully!')
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  const isExpired = (expiryDate) => {
    return expiryDate && new Date(expiryDate) < new Date()
  }

  const getExpiryStatus = (certificate) => {
    if (certificate.doesNotExpire) {
      return <span className="text-green-600 text-sm flex items-center gap-1"><FaCheck /> Never expires</span>
    }
    if (!certificate.expiryDate) return null
    
    return isExpired(certificate.expiryDate) 
      ? <span className="text-red-600 text-sm">Expired</span>
      : <span className="text-green-600 text-sm">Valid</span>
  }

  const FormComponent = ({ data, onChange, onSubmit, onCancel, isEditing = false }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
          Certificate Name *
        </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChange}
          placeholder="e.g., AWS Certified Solutions Architect, Google Analytics Certified"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
          style={{'--tw-ring-color': '#2c3e50'}}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
          Issuing Organization *
        </label>
        <input
          type="text"
          name="issuingOrganization"
          value={data.issuingOrganization}
          onChange={onChange}
          placeholder="e.g., Amazon Web Services, Google, Microsoft"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
          style={{'--tw-ring-color': '#2c3e50'}}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
            Issue Date *
          </label>
          <input
            type="date"
            name="issueDate"
            value={data.issueDate}
            onChange={onChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
            style={{'--tw-ring-color': '#2c3e50'}}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
            Expiry Date
          </label>
          <input
            type="date"
            name="expiryDate"
            value={data.expiryDate}
            onChange={onChange}
            disabled={data.doesNotExpire}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 disabled:bg-gray-100"
            style={{'--tw-ring-color': '#2c3e50'}}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="doesNotExpire"
          checked={data.doesNotExpire}
          onChange={onChange}
          className="rounded focus:ring-1"
          style={{'--tw-ring-color': '#2c3e50'}}
        />
        <label className="text-sm" style={{color: '#2c3e50'}}>
          This certification does not expire
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
            Credential ID
          </label>
          <input
            type="text"
            name="credentialId"
            value={data.credentialId}
            onChange={onChange}
            placeholder="Certificate ID or License Number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
            style={{'--tw-ring-color': '#2c3e50'}}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
            Credential URL
          </label>
          <input
            type="url"
            name="credentialUrl"
            value={data.credentialUrl}
            onChange={onChange}
            placeholder="https://verify.certificate.com/..."
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
            style={{'--tw-ring-color': '#2c3e50'}}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
          style={{backgroundColor: '#2c3e50'}}
        >
          <FaSave />
          {isEditing ? 'Update Certificate' : 'Add Certificate'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition-all flex items-center gap-2"
        >
          <FaTimes />
          Cancel
        </button>
      </div>
    </form>
  )

  return (
    <>
      <CompleteProfileLinks/>
      <hr className="mt-3" />
      
      <div className=" mx-auto p-6 mt-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{color: '#2c3e50'}}>
            <FaCertificate />
            Certificates & Licenses
          </h1>
          <p className="text-gray-600">
            Add your professional certifications, licenses, and course completions
          </p>
        </div>

        {/* Add Button */}
        {!isAddingCertificate && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingCertificate(true)}
              className="px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center gap-2"
              style={{backgroundColor: '#2c3e50'}}
            >
              <FaPlus />
              Add New Certificate
            </button>
          </div>
        )}

        {/* Add Form */}
        {isAddingCertificate && (
          <div className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#2c3e50'}}>Add New Certificate</h3>
            <FormComponent
              data={newCertificate}
              onChange={handleNewChange}
              onSubmit={addCertificate}
              onCancel={() => setIsAddingCertificate(false)}
            />
          </div>
        )}

        {/* Certificates List */}
        {certificates.length > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#2c3e50'}}>Your Certificates</h3>
            
            <div className="space-y-4">
              {certificates.map(cert => (
                <div key={cert.id} className="border rounded-lg p-4">
                  {editingId === cert.id ? (
                    <FormComponent
                      data={editingData}
                      onChange={handleEditChange}
                      onSubmit={(e) => { e.preventDefault(); saveEdit(); }}
                      onCancel={cancelEdit}
                      isEditing={true}
                    />
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium mb-1" style={{color: '#2c3e50'}}>
                            {cert.name}
                          </h4>
                          <p className="text-gray-700 font-medium">
                            {cert.issuingOrganization}
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditing(cert)}
                            className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                          >
                            <FaEdit />
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCertificate(cert.id)}
                            className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center gap-1"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt />
                          <span>Issued: {formatDate(cert.issueDate)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <FaCalendarAlt />
                          {cert.doesNotExpire ? (
                            <span className="text-green-600">Never expires</span>
                          ) : cert.expiryDate ? (
                            <span>Expires: {formatDate(cert.expiryDate)}</span>
                          ) : (
                            <span className="text-gray-600">No expiry date</span>
                          )}
                        </div>
                      </div>

                      {(cert.credentialId || cert.credentialUrl) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          {cert.credentialId && (
                            <div className="text-sm">
                              <span className="font-medium" style={{color: '#2c3e50'}}>Credential ID: </span>
                              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                {cert.credentialId}
                              </span>
                            </div>
                          )}
                          
                          {cert.credentialUrl && (
                            <div className="text-sm">
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                <FaExternalLinkAlt />
                                Verify Certificate
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {getExpiryStatus(cert)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {certificates.length === 0 && !isAddingCertificate && (
          <div className="bg-white border rounded-lg p-8 text-center">
            <FaCertificate className="mx-auto text-4xl mb-4" style={{color: '#2c3e50'}} />
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2c3e50'}}>No Certificates Added Yet</h3>
            <p className="text-gray-600 mb-4">
              Showcase your professional certifications, licenses, and course completions to stand out to employers
            </p>
            <button
              onClick={() => setIsAddingCertificate(true)}
              className="px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
              style={{backgroundColor: '#2c3e50'}}
            >
              <FaPlus />
              Add Your First Certificate
            </button>
          </div>
        )}
      </div>
    </>
  )
}