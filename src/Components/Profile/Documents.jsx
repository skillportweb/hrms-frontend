import React, { useState, useRef } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'
import { 
  FaFilePdf, 
  FaFileWord, 
  FaFileImage, 
  FaFileAlt, 
  FaFolder,
  FaCloudUploadAlt,
  FaDownload,
  FaEye,
  FaTimes,
  FaFileUpload
} from 'react-icons/fa'

export default function Documents() {
  const [documents, setDocuments] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const documentTypes = [
    'Resume/CV',
    'Cover Letter',
    'Portfolio',
    'Certificate',
    'Diploma',
    'Transcript',
    'License',
    'ID Document',
    'Passport',
    'Work Permit',
    'Reference Letter',
    'Other'
  ]

  const allowedFileTypes = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'text/plain': 'TXT'
  }

  const maxFileSize = 10 * 1024 * 1024 // 10MB

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FaFilePdf className="text-red-500" />
    if (fileType.includes('word') || fileType.includes('document')) return <FaFileWord className="text-blue-500" />
    if (fileType.includes('image')) return <FaFileImage className="text-green-500" />
    if (fileType.includes('text')) return <FaFileAlt className="text-gray-500" />
    return <FaFolder style={{color: '#2c3e50'}} />
  }

  const validateFile = (file) => {
    const errors = []
    
    if (!allowedFileTypes[file.type]) {
      errors.push(`File type ${file.type} is not supported`)
    }
    
    if (file.size > maxFileSize) {
      errors.push(`File size exceeds ${formatFileSize(maxFileSize)} limit`)
    }
    
    return errors
  }

  const handleFileSelect = (files) => {
    const fileArray = Array.from(files)
    const newDocuments = []
    const errors = []

    fileArray.forEach(file => {
      const fileErrors = validateFile(file)
      if (fileErrors.length === 0) {
        const document = {
          id: Date.now() + Math.random(),
          file: file,
          name: file.name,
          size: file.size,
          type: file.type,
          documentType: '',
          description: '',
          uploadDate: new Date().toISOString(),
          url: URL.createObjectURL(file)
        }
        newDocuments.push(document)
      } else {
        errors.push(`${file.name}: ${fileErrors.join(', ')}`)
      }
    })

    if (errors.length > 0) {
      alert('Some files could not be uploaded:\n' + errors.join('\n'))
    }

    setDocuments(prev => [...prev, ...newDocuments])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files)
      e.target.value = '' // Reset input
    }
  }

  const handleDocumentTypeChange = (id, documentType) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, documentType } : doc
    ))
  }

  const handleDescriptionChange = (id, description) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, description } : doc
    ))
  }

  const handleRemoveDocument = (id) => {
    setDocuments(prev => {
      const docToRemove = prev.find(doc => doc.id === id)
      if (docToRemove && docToRemove.url) {
        URL.revokeObjectURL(docToRemove.url)
      }
      return prev.filter(doc => doc.id !== id)
    })
  }

  const handleDownloadDocument = (document) => {
    const link = document.createElement('a')
    link.href = document.url
    link.download = document.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const groupedDocuments = documents.reduce((groups, doc) => {
    const type = doc.documentType || 'Uncategorized'
    if (!groups[type]) {
      groups[type] = []
    }
    groups[type].push(doc)
    return groups
  }, {})

  return (
    <>
      <CompleteProfileLinks/>
      <hr className="mt-3" />
      
      <div className=" mx-auto p-6 mt-4 bg-white">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{color: '#2c3e50'}}>Documents</h1>
          <p className="text-gray-600">Upload and manage your important documents</p>
        </div>

        {/* Upload Area */}
        <div className="mb-8">
            <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInputChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt"
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="text-6xl flex justify-center">
                <FaCloudUploadAlt style={{color: '#2c3e50'}} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2" style={{color: '#2c3e50'}}>
                  Drop your documents here, or click to browse
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Supports: PDF, DOC, DOCX, JPG, PNG, GIF, TXT (Max: 10MB)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all flex items-center gap-2 mx-auto"
                  style={{backgroundColor: '#2c3e50', focusRingColor: '#2c3e50'}}
                >
                  <FaFileUpload />
                  Choose Files
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        {documents.length > 0 ? (
          <div>
            <h2 className="text-xl font-semibold mb-6" style={{color: '#2c3e50'}}>
              Your Documents ({documents.length})
            </h2>
            
            {Object.entries(groupedDocuments).map(([category, categoryDocs]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium mb-4 flex items-center" style={{color: '#2c3e50'}}>
                  <span className="px-3 py-1 rounded-full text-sm mr-2" style={{backgroundColor: '#2c3e50', color: 'white'}}>
                    {categoryDocs.length}
                  </span>
                  {category}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryDocs.map((document) => (
                    <div key={document.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center flex-1 min-w-0">
                          <span className="text-2xl mr-3 flex-shrink-0">
                            {getFileIcon(document.type)}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium truncate" title={document.name} style={{color: '#2c3e50'}}>
                              {document.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(document.size)} • {allowedFileTypes[document.type]}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveDocument(document.id)}
                          className="text-gray-400 hover:text-red-500 ml-2 flex-shrink-0"
                          title="Remove document"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{color: '#2c3e50'}}>
                            Document Type
                          </label>
                          <select
                            value={document.documentType}
                            onChange={(e) => handleDocumentTypeChange(document.id, e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-transparent"
                            style={{'--tw-ring-color': '#2c3e50'}}
                          >
                            <option value="">Select type...</option>
                            {documentTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium mb-1" style={{color: '#2c3e50'}}>
                            Description
                          </label>
                          <textarea
                            value={document.description}
                            onChange={(e) => handleDescriptionChange(document.id, e.target.value)}
                            placeholder="Brief description..."
                            rows={2}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:border-transparent resize-none"
                            style={{'--tw-ring-color': '#2c3e50'}}
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownloadDocument(document)}
                            className="flex-1 px-3 py-1 text-xs text-white rounded hover:opacity-90 transition-all flex items-center justify-center gap-1"
                            style={{backgroundColor: '#2c3e50'}}
                          >
                            <FaDownload />
                            Download
                          </button>
                          {document.type.startsWith('image/') && (
                            <button
                              onClick={() => window.open(document.url, '_blank')}
                              className="flex-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
                            >
                              <FaEye />
                              View
                            </button>
                          )}
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          Uploaded: {new Date(document.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4 flex justify-center">
              <FaFolder style={{color: '#2c3e50'}} />
            </div>
            <h3 className="text-lg font-medium mb-2" style={{color: '#2c3e50'}}>No documents uploaded yet</h3>
            <p>Start by uploading your important documents using the area above</p>
          </div>
        )}

        {/* File Type Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3" style={{color: '#2c3e50'}}>Supported File Types & Guidelines:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
            <div>
              <p className="font-medium mb-1" style={{color: '#2c3e50'}}>Document Files:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <FaFilePdf className="text-red-500" />
                  PDF documents (.pdf)
                </li>
                <li className="flex items-center gap-2">
                  <FaFileWord className="text-blue-500" />
                  Microsoft Word (.doc, .docx)
                </li>
                <li className="flex items-center gap-2">
                  <FaFileAlt className="text-gray-500" />
                  Plain text files (.txt)
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1" style={{color: '#2c3e50'}}>Image Files:</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-2">
                  <FaFileImage className="text-green-500" />
                  JPEG images (.jpg, .jpeg)
                </li>
                <li className="flex items-center gap-2">
                  <FaFileImage className="text-green-500" />
                  PNG images (.png)
                </li>
                <li className="flex items-center gap-2">
                  <FaFileImage className="text-green-500" />
                  GIF images (.gif)
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              <strong>Maximum file size:</strong> 10MB per file • 
              <strong> Security:</strong> All files are processed locally in your browser
            </p>
          </div>
        </div>
      </div>
    </>
  )
}



