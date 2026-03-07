import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Bus, 
  Calendar, 
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Navigation
} from 'lucide-react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 15420,
    activeUsers: 8234,
    totalBuses: 156,
    activeBuses: 128,
    totalBookings: 45678,
    todayBookings: 234,
    totalRevenue: 456789000,
    todayRevenue: 2345000,
    pendingPayments: 23,
    cancelledBookings: 12
  });

  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'New booking from John Doe', time: '2 min ago', type: 'booking', amount: 'UGX 150,000' },
    { id: 2, action: 'Payment received from Sarah Smith', time: '5 min ago', type: 'payment', amount: 'UGX 120,000' },
    { id: 3, action: 'New user registered', time: '10 min ago', type: 'user' },
    { id: 4, action: 'Bus JX-001 maintenance scheduled', time: '15 min ago', type: 'bus' },
    { id: 5, action: 'Booking #BK-1234 cancelled', time: '20 min ago', type: 'cancellation' },
  ]);

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Bookings',
        data: [65, 78, 82, 94, 88, 112, 98],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const routeData = {
    labels: ['Kampala-Nairobi', 'Kampala-Kigali', 'Kampala-Dar', 'Kampala-Juba', 'Other'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          '#2563eb',
          '#f59e0b',
          '#10b981',
          '#ef4444',
          '#8b5cf6'
        ],
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <span className="text-green-600 flex items-center text-sm">
              <ArrowUpRight size={16} />
              +12%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-xs text-gray-400 mt-2">{stats.activeUsers.toLocaleString()} active this month</p>
        </div>

        {/* Total Buses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Bus className="text-orange-600" size={24} />
            </div>
            <span className="text-green-600 flex items-center text-sm">
              <ArrowUpRight size={16} />
              +5%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalBuses}</p>
          <p className="text-sm text-gray-500">Total Buses</p>
          <p className="text-xs text-gray-400 mt-2">{stats.activeBuses} active • 28 in maintenance</p>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Calendar className="text-purple-600" size={24} />
            </div>
            <span className="text-green-600 flex items-center text-sm">
              <ArrowUpRight size={16} />
              +18%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalBookings.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-xs text-gray-400 mt-2">{stats.todayBookings} today • {stats.pendingPayments} pending</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <span className="text-green-600 flex items-center text-sm">
              <ArrowUpRight size={16} />
              +15%
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">UGX {(stats.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-xs text-gray-400 mt-2">UGX {(stats.todayRevenue / 1000).toFixed(0)}K today</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bookings Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Weekly Bookings</h3>
            <select className="text-sm border rounded-lg px-3 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="h-64">
            <Line data={weeklyData} options={options} />
          </div>
        </div>

        {/* Popular Routes Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Popular Routes</h3>
          <div className="h-48">
            <Doughnut data={routeData} options={options} />
          </div>
          <div className="mt-4 space-y-2">
            {routeData.labels.map((label, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: routeData.datasets[0].backgroundColor[index] }}></div>
                  <span className="text-gray-600">{label}</span>
                </div>
                <span className="font-semibold">{routeData.datasets[0].data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className={`
                  p-2 rounded-lg flex-shrink-0
                  ${activity.type === 'booking' ? 'bg-blue-100 text-blue-600' : ''}
                  ${activity.type === 'payment' ? 'bg-green-100 text-green-600' : ''}
                  ${activity.type === 'user' ? 'bg-purple-100 text-purple-600' : ''}
                  ${activity.type === 'bus' ? 'bg-orange-100 text-orange-600' : ''}
                  ${activity.type === 'cancellation' ? 'bg-red-100 text-red-600' : ''}
                `}>
                  {activity.type === 'booking' && <Calendar size={16} />}
                  {activity.type === 'payment' && <CreditCard size={16} />}
                  {activity.type === 'user' && <Users size={16} />}
                  {activity.type === 'bus' && <Bus size={16} />}
                  {activity.type === 'cancellation' && <AlertCircle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-xs font-semibold text-green-600">{activity.amount}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm text-primary hover:text-blue-600 font-semibold w-full text-center">
            View All Activity
          </button>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Alerts & Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Bus Maintenance Due</p>
                  <p className="text-xs text-yellow-600">3 buses require maintenance within 7 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="text-blue-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-blue-800">High Demand Alert</p>
                  <p className="text-xs text-blue-600">Kampala-Nairobi route at 95% capacity this week</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-red-800">Payment Issues</p>
                  <p className="text-xs text-red-600">5 failed payments need attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Users className="text-primary mb-2" size={20} />
                <p className="text-sm font-medium">Add New User</p>
              </button>
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Bus className="text-primary mb-2" size={20} />
                <p className="text-sm font-medium">Add New Bus</p>
              </button>
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Calendar className="text-primary mb-2" size={20} />
                <p className="text-sm font-medium">Create Booking</p>
              </button>
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <Navigation className="text-primary mb-2" size={20} />
                <p className="text-sm font-medium">Add New Route</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;