import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
  Lock,
  Bell,
  Shield
} from 'lucide-react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('user', JSON.stringify(editedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Edit2 size={18} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              <Save size={18} />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200 px-6">
          <nav className="flex space-x-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                      <Camera size={16} className="text-gray-600" />
                    </button>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
                  <p className="text-gray-500">Member since March 2024</p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={isEditing ? editedUser?.name : user?.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={isEditing ? editedUser?.email : user?.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      value={isEditing ? editedUser?.phone : user?.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={isEditing ? editedUser?.dob : user?.dob}
                      onChange={(e) => setEditedUser({...editedUser, dob: e.target.value})}
                      readOnly={!isEditing}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      value={isEditing ? editedUser?.address : user?.address}
                      onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                      readOnly={!isEditing}
                      placeholder="Enter your address"
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary ${
                        !isEditing ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-700">
                  For security reasons, you'll need to verify your identity before changing sensitive information.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Update Password
                </button>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <Shield size={18} className="text-primary" />
                  <span>Two-Factor Authentication</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive booking confirmations and updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">SMS Notifications</h3>
                  <p className="text-sm text-gray-500">Get real-time updates via SMS</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">Promotional Emails</h3>
                  <p className="text-sm text-gray-500">Receive offers and discounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;