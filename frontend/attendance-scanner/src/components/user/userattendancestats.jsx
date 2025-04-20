import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function UserAttendanceStats() {
  // Sample data for a single user - in a real app, this would come from your backend
  const [userData, setUserData] = useState({
    id: 1, 
    name: "John Smith", 
    role: "Member",
    presentHours: 24, 
    absentHours: 8,
    attendance: [
      { date: "2025-04-18", status: "present", hours: 2 },
      { date: "2025-04-17", status: "present", hours: 2 },
      { date: "2025-04-16", status: "present", hours: 2 },
      { date: "2025-04-15", status: "absent", hours: 2 },
      { date: "2025-04-14", status: "present", hours: 2 },
      { date: "2025-04-13", status: "present", hours: 2 },
      { date: "2025-04-12", status: "absent", hours: 2 }
    ]
  });
  
  const calculatePercentage = (presentHours, absentHours) => {
    const total = presentHours + absentHours;
    return total === 0 ? 0 : Math.round((presentHours / total) * 100);
  };
  
  const attendancePercentage = calculatePercentage(userData.presentHours, userData.absentHours);
  const meetingMinimumRequirement = attendancePercentage >= 75;
  
  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-green-400";
    if (percentage >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        {/* User attendance summary */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Attendance Statistics</h2>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-gray-600">Current Period: April 2025</span>
            </div>
            {!meetingMinimumRequirement && (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-1" />
                <span className="text-sm font-medium">Below 75% minimum requirement</span>
              </div>
            )}
          </div>
          
          {/* Attendance percentage */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Overall Attendance: {attendancePercentage}%</h3>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
              <div 
                className={`${getAttendanceColor(attendancePercentage)} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span className="bg-gray-100 px-1 rounded text-blue-600">75% Minimum</span>
              <span>100%</span>
            </div>
          </div>
          
          {/* Hours breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <h3 className="font-medium">Present Hours</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">{userData.presentHours}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <h3 className="font-medium">Absent Hours</h3>
              </div>
              <p className="text-2xl font-bold text-red-500">{userData.absentHours}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Total Hours</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">{userData.presentHours + userData.absentHours}</p>
            </div>
          </div>
        </div>

        {/* Attendance history */}
        <div>
          <h3 className="font-medium text-gray-800 mb-3">Recent Attendance History</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userData.attendance.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {record.status === 'present' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Present
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Absent
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Message about requirement */}
          <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-gray-700 border-l-4 border-blue-500">
            <p><strong>Note:</strong> Minimum attendance requirement is 75% for active club membership.</p>
            {!meetingMinimumRequirement && (
              <p className="mt-1 text-red-600">You are currently below the minimum requirement. Please improve your attendance.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}