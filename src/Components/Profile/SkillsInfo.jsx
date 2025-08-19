import React, { useState } from 'react'
import CompleteProfileLinks from '../MainComponents/CompleteProfileLinks'
import { FaCogs, FaPlus, FaEdit, FaTimes, FaSave, FaTrash } from 'react-icons/fa'

export default function SkillsInfo() {
  const [skills, setSkills] = useState([])
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Beginner',
    category: 'Technical'
  })
  const [isAddingSkill, setIsAddingSkill] = useState(false)
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [editingSkill, setEditingSkill] = useState({})

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  const skillCategories = ['Technical', 'Creative', 'Management', 'Communication', 'Analytical', 'Other']

  const handleNewSkillChange = (e) => {
    setNewSkill({...newSkill, [e.target.name]: e.target.value})
  }

  const handleEditSkillChange = (e) => {
    setEditingSkill({...editingSkill, [e.target.name]: e.target.value})
  }

  const addSkill = (e) => {
    e.preventDefault()
    if (newSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        ...newSkill,
        name: newSkill.name.trim()
      }
      setSkills([...skills, skill])
      setNewSkill({
        name: '',
        level: 'Beginner',
        category: 'Technical'
      })
      setIsAddingSkill(false)
      alert('Skill added successfully!')
    } else {
      alert('Please enter a skill name')
    }
  }

  const startEditing = (skill) => {
    setEditingSkillId(skill.id)
    setEditingSkill({...skill})
  }

  const saveEdit = () => {
    if (editingSkill.name.trim()) {
      setSkills(skills.map(skill => 
        skill.id === editingSkillId 
          ? {...editingSkill, name: editingSkill.name.trim()}
          : skill
      ))
      setEditingSkillId(null)
      setEditingSkill({})
      alert('Skill updated successfully!')
    } else {
      alert('Please enter a skill name')
    }
  }

  const cancelEdit = () => {
    setEditingSkillId(null)
    setEditingSkill({})
  }

  const deleteSkill = (skillId) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter(skill => skill.id !== skillId))
      alert('Skill deleted successfully!')
    }
  }

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800'
      case 'Intermediate': return 'bg-green-100 text-green-800'
      case 'Advanced': return 'bg-orange-100 text-orange-800'
      case 'Expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Technical': return 'bg-purple-100 text-purple-800'
      case 'Creative': return 'bg-pink-100 text-pink-800'
      case 'Management': return 'bg-indigo-100 text-indigo-800'
      case 'Communication': return 'bg-yellow-100 text-yellow-800'
      case 'Analytical': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <CompleteProfileLinks/>
      <hr className="mt-3" />
      
      <div className=" mx-auto p-6 mt-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{color: '#2c3e50'}}>
            <FaCogs />
            Skills & Expertise
          </h1>
          <p className="text-gray-600">
            Showcase your skills and expertise to potential employers
          </p>
        </div>

        {/* Add Skill Button */}
        {!isAddingSkill && (
          <div className="mb-6">
            <button
              onClick={() => setIsAddingSkill(true)}
              className="px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center gap-2"
              style={{backgroundColor: '#2c3e50'}}
            >
              <FaPlus />
              Add New Skill
            </button>
          </div>
        )}

        {/* Add Skill Form */}
        {isAddingSkill && (
          <form onSubmit={addSkill} className="bg-white border rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#2c3e50'}}>Add New Skill</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                  Skill Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={newSkill.name}
                  onChange={handleNewSkillChange}
                  placeholder="e.g., React.js, Project Management, Data Analysis"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                  style={{'--tw-ring-color': '#2c3e50'}}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                    Proficiency Level
                  </label>
                  <select
                    name="level"
                    value={newSkill.level}
                    onChange={handleNewSkillChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                    style={{'--tw-ring-color': '#2c3e50'}}
                  >
                    {skillLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={newSkill.category}
                    onChange={handleNewSkillChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                    style={{'--tw-ring-color': '#2c3e50'}}
                  >
                    {skillCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
                style={{backgroundColor: '#2c3e50'}}
              >
                <FaSave />
                Add Skill
              </button>
              <button
                type="button"
                onClick={() => setIsAddingSkill(false)}
                className="px-4 py-2 bg-gray-500 text-white font-medium rounded-md hover:bg-gray-600 transition-all flex items-center gap-2"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Skills List */}
        {skills.length > 0 && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4" style={{color: '#2c3e50'}}>Your Skills</h3>
            
            <div className="space-y-4">
              {skills.map(skill => (
                <div key={skill.id} className="border rounded-lg p-4">
                  {editingSkillId === skill.id ? (
                    /* Edit Mode */
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                          Skill Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={editingSkill.name}
                          onChange={handleEditSkillChange}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                          style={{'--tw-ring-color': '#2c3e50'}}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                            Proficiency Level
                          </label>
                          <select
                            name="level"
                            value={editingSkill.level}
                            onChange={handleEditSkillChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                            style={{'--tw-ring-color': '#2c3e50'}}
                          >
                            {skillLevels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1" style={{color: '#2c3e50'}}>
                            Category
                          </label>
                          <select
                            name="category"
                            value={editingSkill.category}
                            onChange={handleEditSkillChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1"
                            style={{'--tw-ring-color': '#2c3e50'}}
                          >
                            {skillCategories.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 text-sm text-white rounded hover:opacity-90 transition-all flex items-center gap-1"
                          style={{backgroundColor: '#2c3e50'}}
                        >
                          <FaSave />
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-all flex items-center gap-1"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Display Mode */
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-medium" style={{color: '#2c3e50'}}>
                            {skill.name}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(skill.category)}`}>
                            {skill.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(skill)}
                          className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors flex items-center gap-1"
                        >
                          <FaEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors flex items-center gap-1"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {skills.length === 0 && !isAddingSkill && (
          <div className="bg-white border rounded-lg p-8 text-center">
            <FaCogs className="mx-auto text-4xl mb-4" style={{color: '#2c3e50'}} />
            <h3 className="text-lg font-semibold mb-2" style={{color: '#2c3e50'}}>No Skills Added Yet</h3>
            <p className="text-gray-600 mb-4">Start building your skills profile by adding your expertise and competencies</p>
            <button
              onClick={() => setIsAddingSkill(true)}
              className="px-4 py-2 text-white font-medium rounded-md hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
              style={{backgroundColor: '#2c3e50'}}
            >
              <FaPlus />
              Add Your First Skill
            </button>
          </div>
        )}
      </div>
    </>
  )
}