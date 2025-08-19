import React, { useState } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'

export default function JobDetailsInfo() {
  const [jobList, setJobList] = useState([])
  const [currentJob, setCurrentJob] = useState({
    jobTitle: '',
    company: '',
    employmentType: '',
    location: '',
    locationType: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false,
    industry: '',
    description: '',
    skills: '',
    achievements: ''
  })

  const employmentTypes = [
    'Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer', 
    'Internship', 'Apprenticeship', 'Freelance', 'Self-employed'
  ]

  const locationTypes = [
    'On-site', 'Remote', 'Hybrid'
  ]

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing',
    'Retail', 'Consulting', 'Marketing', 'Real Estate', 'Government',
    'Non-profit', 'Media', 'Entertainment', 'Construction', 'Transportation',
    'Energy', 'Agriculture', 'Hospitality', 'Legal', 'Other'
  ]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentJob(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddJob = (e) => {
    e.preventDefault()
    if (currentJob.jobTitle && currentJob.company) {
      setJobList(prev => [...prev, { ...currentJob, id: Date.now() }])
      setCurrentJob({
        jobTitle: '',
        company: '',
        employmentType: '',
        location: '',
        locationType: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false,
        industry: '',
        description: '',
        skills: '',
        achievements: ''
      })
    }
  }

  const handleRemoveJob = (id) => {
    setJobList(prev => prev.filter(job => job.id !== id))
  }

  const handleEditJob = (job) => {
    setCurrentJob(job)
    handleRemoveJob(job.id)
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const calculateDuration = (startDate, endDate, isCurrentJob) => {
    if (!startDate) return ''
    
    const start = new Date(startDate)
    const end = isCurrentJob ? new Date() : new Date(endDate)
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth())
    
    if (months < 1) return '1 month'
    if (months < 12) return `${months} months`
    
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    
    if (remainingMonths === 0) {
      return years === 1 ? '1 year' : `${years} years`
    }
    
    return `${years} year${years > 1 ? 's' : ''} ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`
  }

  return (
    <>
      <CompleteProfileLinks/>
      <hr className="mt-3" />
      
      <div className=" mx-auto p-6 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Details & Experience</h1>
          <p className="text-gray-600">Add your work experience and professional background</p>
        </div>

        {/* Job Form */}
        <div className="bg-white rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Work Experience</h2>
          
          <form onSubmit={handleAddJob} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={currentJob.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={currentJob.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Google Inc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={currentJob.employmentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                >
                  <option value="">Select Employment Type</option>
                  {employmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  name="industry"
                  value={currentJob.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={currentJob.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, NY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Type
                </label>
                <select
                  name="locationType"
                  value={currentJob.locationType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                >
                  <option value="">Select Location Type</option>
                  {locationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={currentJob.startDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  name="endDate"
                  value={currentJob.endDate}
                  onChange={handleInputChange}
                  disabled={currentJob.isCurrentJob}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isCurrentJob"
                checked={currentJob.isCurrentJob}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                I am currently working in this role
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Used
              </label>
              <input
                type="text"
                name="skills"
                value={currentJob.skills}
                onChange={handleInputChange}
                placeholder="e.g., JavaScript, React, Node.js, Project Management"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
                placeholder="Describe your responsibilities, daily tasks, and what you did in this role..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Achievements
              </label>
              <textarea
                name="achievements"
                value={currentJob.achievements}
                onChange={handleInputChange}
                placeholder="Highlight your major accomplishments, awards, or impact in this role..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#2c3e50] text-white font-medium rounded-md focus:ring-[#2c3e50] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              >
                Add Experience
              </button>
            </div>
          </form>
        </div>

        {/* Job List */}
        {jobList.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Work Experience</h2>
            <div className="space-y-6">
              {jobList.map((job) => (
                <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.jobTitle}</h3>
                      <p className="text-blue-600 font-medium text-lg">{job.company}</p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                        {job.employmentType && (
                          <span className="bg-gray-100 px-2 py-1 rounded">{job.employmentType}</span>
                        )}
                        {job.locationType && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{job.locationType}</span>
                        )}
                        {job.industry && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{job.industry}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditJob(job)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveJob(job.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    {(job.startDate || job.endDate) && (
                      <div>
                        <span className="font-medium">Duration: </span>
                        {formatDate(job.startDate)}
                        {job.startDate && (job.endDate || job.isCurrentJob) && ' - '}
                        {job.isCurrentJob ? 'Present' : formatDate(job.endDate)}
                        {job.startDate && (
                          <span className="text-gray-500 ml-2">
                            ({calculateDuration(job.startDate, job.endDate, job.isCurrentJob)})
                          </span>
                        )}
                      </div>
                    )}
                    {job.location && (
                      <div>
                        <span className="font-medium">Location: </span>
                        {job.location}
                      </div>
                    )}
                  </div>

                  {job.skills && (
                    <div className="mb-4">
                      <span className="text-sm font-medium text-gray-700">Skills: </span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {job.skills.split(',').map((skill, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.description && (
                    <div className="mb-4 text-sm text-gray-700">
                      <span className="font-medium">Description: </span>
                      <p className="mt-1">{job.description}</p>
                    </div>
                  )}

                  {job.achievements && (
                    <div className="text-sm text-gray-700">
                      <span className="font-medium">Key Achievements: </span>
                      <p className="mt-1">{job.achievements}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {jobList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No work experience added yet. Use the form above to add your professional background.</p>
          </div>
        )}
      </div>
    </>
  )
}