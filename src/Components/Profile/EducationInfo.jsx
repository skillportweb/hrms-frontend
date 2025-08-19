import React, { useState } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'

export default function EducationInfo() {
  const [educationList, setEducationList] = useState([])
  const [currentEducation, setCurrentEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    grade: '',
    activities: '',
    description: '',
    isCurrentlyStudying: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setCurrentEducation(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddEducation = (e) => {
    e.preventDefault()
    if (currentEducation.institution && currentEducation.degree) {
      setEducationList(prev => [...prev, { ...currentEducation, id: Date.now() }])
      setCurrentEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        grade: '',
        activities: '',
        description: '',
        isCurrentlyStudying: false
      })
    }
  }

  const handleRemoveEducation = (id) => {
    setEducationList(prev => prev.filter(edu => edu.id !== id))
  }

  const handleEditEducation = (education) => {
    setCurrentEducation(education)
    handleRemoveEducation(education.id)
  }

  return (
    <>
      <CompleteProfileLinks />
        <hr className="mt-3" />
      <div className=" mx-auto p-6 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Education Information</h1>
          <p className="text-gray-600">Add your educational background and qualifications</p>
        </div>

        {/* Education Form */}
        <div className="bg-white rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Education</h2>
          
          <form onSubmit={handleAddEducation} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution/School <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="institution"
                  value={currentEducation.institution}
                  onChange={handleInputChange}
                  placeholder="e.g., Harvard University"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={currentEducation.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                  required
                >
                  <option value="">Select Degree</option>
                  <option value="High School">High School Diploma</option>
                  <option value="Associate">Associate Degree</option>
                  <option value="Bachelor's">Bachelor's Degree</option>
                  <option value="Master's">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={currentEducation.fieldOfStudy}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade/GPA
                </label>
                <input
                  type="text"
                  name="grade"
                  value={currentEducation.grade}
                  onChange={handleInputChange}
                  placeholder="e.g., 3.8/4.0 or First Class"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  name="startDate"
                  value={currentEducation.startDate}
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
                  value={currentEducation.endDate}
                  onChange={handleInputChange}
                  disabled={currentEducation.isCurrentlyStudying}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isCurrentlyStudying"
                checked={currentEducation.isCurrentlyStudying}
                onChange={handleInputChange}
                className="mr-2 h-4 w-4 text-[#2c3e50] focus:ring-[#2c3e50] border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-gray-700">
                I am currently studying here
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities and Societies
              </label>
              <input
                type="text"
                name="activities"
                value={currentEducation.activities}
                onChange={handleInputChange}
                placeholder="e.g., Student Council, Drama Club, Sports Team"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={currentEducation.description}
                onChange={handleInputChange}
                placeholder="Describe your education, achievements, relevant coursework..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#2c3e50] text-white font-medium rounded-md hover:bg-[#384b5e] focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:ring-offset-2 transition-colors"
              >
                Add Education
              </button>
            </div>
          </form>
        </div>

        {/* Education List */}
        {educationList.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Education</h2>
            <div className="space-y-4">
              {educationList.map((education) => (
                <div key={education.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{education.degree}</h3>
                      <p className="text-blue-600 font-medium">{education.institution}</p>
                      {education.fieldOfStudy && (
                        <p className="text-gray-600">{education.fieldOfStudy}</p>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditEducation(education)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemoveEducation(education.id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    {(education.startDate || education.endDate) && (
                      <div>
                        <span className="font-medium">Duration: </span>
                        {education.startDate && new Date(education.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        {education.startDate && (education.endDate || education.isCurrentlyStudying) && ' - '}
                        {education.isCurrentlyStudying ? 'Present' : education.endDate && new Date(education.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    )}
                    {education.grade && (
                      <div>
                        <span className="font-medium">Grade: </span>
                        {education.grade}
                      </div>
                    )}
                  </div>

                  {education.activities && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Activities: </span>
                      {education.activities}
                    </div>
                  )}

                  {education.description && (
                    <div className="mt-3 text-sm text-gray-700">
                      <span className="font-medium">Description: </span>
                      {education.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {educationList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No education entries added yet. Use the form above to add your educational background.</p>
          </div>
        )}
      </div>
    </>
  )
}