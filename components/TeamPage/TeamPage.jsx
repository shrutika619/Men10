"use client";
import React, { useState, useMemo, useCallback } from 'react';
import { Filter, Search, Plus, SquarePen, Trash2, Bell, UserCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// --- Mock Data ---
const initialTeamData = [
  { id: 12345, name: 'Pranjal Tidke', email: 'Pranjal.Tidke@gmail.com', isActive: true, createdAt: '12/04/2025', lastIP: '111.22.1.2', lastLogin: '17 Mar 2025 17:24' },
  { id: 12346, name: 'Aditya Sharma', email: 'aditya.sharma@gmail.com', isActive: true, createdAt: '11/20/2024', lastIP: '192.168.0.1', lastLogin: '1 Nov 2025 09:30' },
  { id: 12347, name: 'Kavita Singh', email: 'kavita.singh@gmail.com', isActive: false, createdAt: '01/01/2025', lastIP: '10.0.0.5', lastLogin: '28 Oct 2025 14:00' },
  { id: 12348, name: 'Rajesh Kumar', email: 'rajesh.kumar@gmail.com', isActive: true, createdAt: '05/15/2025', lastIP: '203.0.113.10', lastLogin: '5 Nov 2025 11:15' },
  { id: 12349, name: 'Priya Verma', email: 'priya.verma@gmail.com', isActive: false, createdAt: '06/20/2025', lastIP: '172.16.0.2', lastLogin: '10 May 2025 08:45' },
];

// --- Custom Toggle Component ---
const StatusToggle = ({ memberId, isActive, onToggle }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={isActive}
      onChange={() => onToggle(memberId)}
      className="sr-only peer"
    />
    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
  </label>
);

// --- Main Component ---
const TeamPage = () => {
  const router = useRouter();
  const [teamMembers, setTeamMembers] = useState(initialTeamData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'

  // --- Handlers ---
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleStatusToggle = useCallback((id) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === id ? { ...member, isActive: !member.isActive } : member
      )
    );
    console.log(`Toggled status for member ID: ${id}`);
  }, []);

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  const handleFilterToggle = useCallback(() => {
    setIsFilterOpen(prev => !prev);
  }, []);

  const handleStatusFilter = useCallback((status) => {
    setStatusFilter(status);
    setIsFilterOpen(false);
  }, []);

  const handleCreate = () => {
    router.push('/addteam');
  };

  // ✅ FIX: Edit now opens the `/teamrole` page
  const handleEdit = (id) => {
    console.log(`Navigating to Team Role page for user ID: ${id}`);
    router.push('/teamrole');
  };

  const handleDelete = (id) => {
    setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== id));
  };

  // --- Filtered list ---
  const filteredMembers = useMemo(() => {
    let result = teamMembers;
    const lowercasedTerm = searchTerm.toLowerCase();

    if (searchTerm) {
      result = result.filter(member =>
        Object.values(member).some(value =>
          String(value).toLowerCase().includes(lowercasedTerm)
        )
      );
    }

    if (statusFilter === 'active') {
      result = result.filter(member => member.isActive);
    } else if (statusFilter === 'inactive') {
      result = result.filter(member => !member.isActive);
    }

    return result;
  }, [teamMembers, searchTerm, statusFilter]);

  // --- Table Headers ---
  const tableHeaders = [
    { key: '#', label: '#' },
    { key: 'status', label: 'Status' },
    { key: 'id', label: 'Id' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'action', label: 'Action' },
    { key: 'createdAt', label: 'Created AT' },
    { key: 'lastIP', label: 'Last IP' },
    { key: 'lastLogin', label: 'Last Login' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
      {/* Header */}
      <header className="flex justify-between items-center pb-6">
        <h1 className="text-3xl font-bold text-gray-800">Team</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-xs text-white justify-center items-center">
                <span className='absolute -top-1 right-0 text-[10px] font-bold'>10</span>
              </span>
            </span>
          </div>
          <UserCircle className="w-8 h-8 text-gray-500 cursor-pointer" />
        </div>
      </header>
      
      {/* Content */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
        {/* Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="flex w-full sm:w-auto space-x-2">
            <button onClick={handleBack} className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-150">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>

            {/* Filter */}
            <div className="relative">
              <button
                onClick={handleFilterToggle}
                className={`p-3 bg-white border border-gray-300 rounded-lg shadow-sm transition duration-150 ${isFilterOpen ? 'ring-2 ring-indigo-500 bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>

              {isFilterOpen && (
                <div className="absolute z-10 top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                  {['all', 'active', 'inactive'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`w-full text-left px-4 py-2 text-sm capitalize transition duration-150 ${
                        statusFilter === status
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreate}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 transform hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5" />
            <span>Create</span>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map(header => (
                  <th
                    key={header.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.key === 'id' ? 'hidden sm:table-cell' : ''} ${header.key === 'lastIP' || header.key === 'lastLogin' ? 'hidden md:table-cell' : ''}`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredMembers.map((member, index) => (
                <tr key={member.id} className="hover:bg-gray-50 transition duration-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4"><StatusToggle memberId={member.id} isActive={member.isActive} onToggle={handleStatusToggle} /></td>
                  <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-500">{member.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{member.name}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">{member.email}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(member.id)}
                        className="p-1 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition duration-150"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-1 text-gray-600 hover:text-red-600 rounded-full hover:bg-red-50 transition duration-150"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell text-sm text-gray-500">{member.createdAt}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">{member.lastIP}</td>
                  <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-500">{member.lastLogin}</td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                    No team members found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
