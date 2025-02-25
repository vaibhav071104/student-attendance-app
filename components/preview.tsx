"use client"

import type React from "react"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Upload, X, AlertCircle } from "lucide-react"

export function AttendanceAppPreview() {
  const [selectedDate, setSelectedDate] = useState("2025-02-25")
  const [selectedMonth, setSelectedMonth] = useState("2")
  const [students, setStudents] = useState<{ name: string; status: number }[]>([])
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [currentFileName, setCurrentFileName] = useState<string>("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setCurrentFileName(file.name)
      setTimeout(() => {
        const mockStudentData = [
          { name: "John Doe", status: 1 },
          { name: "Jane Smith", status: 1 },
          { name: "Alice Johnson", status: 1 },
          { name: "Bob Williams", status: 1 },
          { name: "Charlie Brown", status: 1 },
        ]
        setStudents(mockStudentData)
        setIsFileUploaded(true)
      }, 1000)
    }
  }

  const handleRemoveFile = () => {
    setShowConfirmDialog(true)
  }

  const confirmRemoveFile = () => {
    setStudents([])
    setIsFileUploaded(false)
    setCurrentFileName("")
    setShowConfirmDialog(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Main content */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-t-2xl shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6 tracking-tight">Student Attendance App</h1>
          <div className="flex justify-center gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-3 pr-8 text-indigo-800 border-0 focus:ring-0 text-lg font-medium appearance-none cursor-pointer bg-indigo-100 rounded-md"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-3 text-indigo-800 border-0 focus:ring-0 text-lg font-medium bg-indigo-100 rounded-md"
            />
          </div>
        </div>

        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            {!isFileUploaded ? (
              <div>
                <label
                  htmlFor="file-upload"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                >
                  <Upload className="w-5 h-5" />
                  Upload Excel File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  <label
                    htmlFor="file-upload"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-5 h-5" />
                    Upload New File
                  </label>
                  <button
                    onClick={handleRemoveFile}
                    className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Remove File
                  </button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {!isFileUploaded ? (
            <div className="text-center text-gray-500 text-lg py-12">
              Please upload an Excel file to view student list and mark attendance.
            </div>
          ) : (
            <div className="space-y-6">
              {students.map((student, index) => (
                <div key={index} className="p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-lg">{student.name}</span>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        student.status === 1
                          ? "bg-green-100 text-green-800"
                          : student.status === 0
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {student.status === 1 ? "Present" : student.status === 0 ? "Absent" : "N/A"}
                    </span>
                  </div>
                  <div className="max-w-[300px] mx-auto">
                    <Slider
                      min={0}
                      max={2}
                      step={1}
                      value={[student.status]}
                      onValueChange={(value) => {
                        const newStudents = [...students]
                        newStudents[index].status = value[0]
                        setStudents(newStudents)
                      }}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600 font-medium">
                      <span>Absent</span>
                      <span>Present</span>
                      <span>N/A</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog - Only shows when showConfirmDialog is true */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Confirm Remove File</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove the current Excel file? This will clear all current attendance data.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRemoveFile}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-colors"
              >
                Remove File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

