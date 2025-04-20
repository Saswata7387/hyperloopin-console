import React from 'react';
import AttendanceScanner from '../components/admin/AttendanceScanner';

function AdminPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <AttendanceScanner />
    </div>
  );
}

export default AdminPage;