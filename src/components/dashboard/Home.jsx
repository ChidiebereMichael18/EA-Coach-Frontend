import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  CreditCard,
  TrendingUp,
  Award,
  Bell,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTotalBookingAmount, getMyBookings } from '../../api/dashboardApi';

const formatDate = (d) => {
  if (!d) return '—';
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
};

const formatTime = (t) => (t || '—');
const formatAmount = (n) => (n != null ? `UGX ${Number(n).toLocaleString()}` : '—');

const Home = ({ user }) => {
  const [stats, setStats] = useState({ totalAmount: 0, totalBookings: 0 });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setLoading(true);
    Promise.all([getTotalBookingAmount(), getMyBookings()])
      .then(([amountRes, bookingsRes]) => {
        if (cancelled) return;
        if (amountRes.success && amountRes.data) {
          setStats({
            totalAmount: amountRes.data.totalAmount ?? 0,
            totalBookings: amountRes.data.totalBookings ?? 0,
          });
        }
        if (bookingsRes.success && Array.isArray(bookingsRes.data)) {
          setBookings(bookingsRes.data);
        } else if (!bookingsRes.success) {
          setError(bookingsRes.errorMessage || 'Failed to load bookings');
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load dashboard data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingBookings = bookings
    .filter((b) => b.bookingStatus === 'confirmed' && new Date(b.route?.departureDate) >= today)
    .slice(0, 5)
    .map((b) => ({
      id: b._id,
      bookingId: b.bookingId,
      from: b.route?.from ?? '—',
      to: b.route?.to ?? '—',
      date: formatDate(b.route?.departureDate),
      time: formatTime(b.route?.departureTime),
      bus: b.bus?.busNumber || b.bus?.busType || '—',
      seat: (b.bookedSeats && b.bookedSeats.length) ? `Seat ${b.bookedSeats[0]}` : '—',
      status: b.bookingStatus || 'confirmed',
    }));

  const recentFromBookings = bookings
    .slice(0, 3)
    .map((b, i) => ({
      id: b._id || i,
      action: `Booked ticket to ${b.route?.to ?? 'destination'}`,
      time: b.createdAt ? (() => {
        const created = new Date(b.createdAt);
        const diff = (Date.now() - created.getTime()) / 3600000;
        if (diff < 1) return 'Just now';
        if (diff < 24) return `${Math.floor(diff)} hours ago`;
        return `${Math.floor(diff / 24)} days ago`;
      })() : '—',
      icon: Calendar,
      color: 'text-blue-500',
    }));

  const statCards = [
    { label: 'Total Trips', value: String(stats.totalBookings), icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Total Spent', value: formatAmount(stats.totalAmount), icon: Award, color: 'bg-green-500' },
    { label: 'Upcoming', value: String(upcomingBookings.length), icon: Calendar, color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={18} className="flex-shrink-0" />
          {error}
        </div>
      )}

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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((stat, index) => {
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
            {upcomingBookings.length === 0 ? (
              <p className="text-gray-500 text-sm">No upcoming trips. <Link to="/booking" className="text-primary hover:underline">Book a trip</Link>.</p>
            ) : (
              upcomingBookings.map((booking) => (
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
                          <span className="text-xs text-gray-500">{booking.seat}</span>
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
              ))
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentFromBookings.length === 0 ? (
                <p className="text-gray-500 text-sm">No recent activity</p>
              ) : (
                recentFromBookings.map((activity) => {
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
                })
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/booking" className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Bell size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">Book a trip</span>
              </Link>
              <Link to="/dashboard?view=bookings" className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
                <Award size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">View booking history</span>
              </Link>
              <button type="button" className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3">
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