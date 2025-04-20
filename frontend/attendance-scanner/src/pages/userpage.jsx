import React from 'react';
import UserAttendanceStats from '../components/user/userattendancestats';

function UserPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Club Member Dashboard</h1>
      <UserAttendanceStats />
    </div>
  );
}

export default UserPage;