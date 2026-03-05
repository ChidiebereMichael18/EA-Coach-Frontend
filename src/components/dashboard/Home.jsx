import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CreditCard,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  // Mock data - replace with actual API data
  const stats = [
    { label: 'Total Trips', value: '12', icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Saved', value: 'UGX 45,000', icon: Award, color: 'bg-green-500' },
    { label: 'Upcoming', value: '2', icon: Calendar, color: 'bg-orange-500' },
    { label: 'Points', value: '450', icon: Award, color: 'bg-purple-500' },
  ];

  const upcomingBookings = [
    {
      id: 1,
      from: 'Kampala',
      to: 'Nairobi',
      date: '2024-03-25',
      time: '08:00',
      bus: 'Jaguar Executive',
      seat: '12A',
      status: 'confirmed'
    },
    {
      id: 2,
      from: 'Kampala',
      to: 'Mbarara',
      date: '2024-03-28',
      time: '14:00',
      bus: 'Gateway Bus',
      seat: '8B',
      status: 'pending'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Booked ticket to Nairobi',
      time: '2 hours ago',
      icon: Calendar,
      color: 'text-blue-500'
    },
    {
      id: 2,
      action: 'Payment of UGX 150,000 confirmed',
      time: '5 hours ago',
      icon: CreditCard,
      color: 'text-green-500'
    },
    {
      id: 3,
      action: 'Trip to Jinja completed',
      time: '2 days ago',
      icon: MapPin,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black/90">
          Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}!
        </h1>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          Ready for your next adventure? Check your upcoming trips or book a new journey.
        </p>
        <Link
          to="/booking"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Book a Trip
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="text-white" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Trips</h2>
            <Link to="/dashboard?view=bookings" className="text-primary text-sm hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="border border-gray-100 rounded-lg p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {booking.from} → {booking.to}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">{booking.bus}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">Seat {booking.seat}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <Icon className={`${activity.color} flex-shrink-0`} size={18} />
                    <div>
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Bell size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">Set travel alerts</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Award size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">View loyalty points</span>
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <CreditCard size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">Saved payment methods</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;