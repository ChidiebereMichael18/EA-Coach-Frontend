import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Smartphone,
  Landmark,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const PaymentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  // Mock payments data
  const [payments, setPayments] = useState([
    {
      id: 'PAY-20240315-001',
      transactionId: 'TXN-12345678',
      bookingId: 'BK-20240315-001',
      user: {
        name: 'John Doe',
        email: 'john@example.com'
      },
      amount: 300000,
      method: 'MTN MoMo',
      status: 'completed',
      date: '2024-03-15T10:30:00',
      reference: 'MOMO-987654',
      description: 'Bus ticket payment for Kampala to Nairobi'
    },
    {
      id: 'PAY-20240315-002',
      transactionId: 'TXN-23456789',
      bookingId: 'BK-20240315-002',
      user: {
        name: 'Sarah Smith',
        email: 'sarah@example.com'
      },
      amount: 120000,
      method: 'Card',
      status: 'completed',
      date: '2024-03-15T11:45:00',
      reference: 'CARD-456789',
      description: 'Bus ticket payment for Kampala to Kigali'
    },
    {
      id: 'PAY-20240314-003',
      transactionId: 'TXN-34567890',
      bookingId: 'BK-20240314-003',
      user: {
        name: 'Robert Johnson',
        email: 'robert@example.com'
      },
      amount: 420000,
      method: 'Bank Transfer',
      status: 'pending',
      date: '2024-03-14T15:20:00',
      reference: 'BANK-789012',
      description: 'Bus ticket payment for Jinja to Nairobi'
    },
    {
      id: 'PAY-20240314-004',
      transactionId: 'TXN-45678901',
      bookingId: 'BK-20240314-004',
      user: {
        name: 'Emily Brown',
        email: 'emily@example.com'
      },
      amount: 500000,
      method: 'MTN MoMo',
      status: 'failed',
      date: '2024-03-14T09:15:00',
      reference: 'MOMO-123456',
      description: 'Bus ticket payment for Kampala to Dar es Salaam'
    },
    {
      id: 'PAY-20240313-005',
      transactionId: 'TXN-56789012',
      bookingId: 'BK-20240313-005',
      user: {
        name: 'Michael Ouma',
        email: 'michael@example.com'
      },
      amount: 80000,
      method: 'Airtel Money',
      status: 'completed',
      date: '2024-03-13T14:30:00',
      reference: 'AIRTEL-345678',
      description: 'Bus ticket payment for Mbarara to Kigali'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getMethodIcon = (method) => {
    switch(method) {
      case 'MTN MoMo':
      case 'Airtel Money':
        return <Smartphone size={16} className="text-blue-600" />;
      case 'Card':
        return <CreditCard size={16} className="text-purple-600" />;
      case 'Bank Transfer':
        return <Landmark size={16} className="text-green-600" />;
      default:
        return <DollarSign size={16} className="text-gray-600" />;
    }
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    totalAmount: payments.reduce((acc, p) => acc + p.amount, 0),
    completedAmount: payments.filter(p => p.status === 'completed').reduce((acc, p) => acc + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Management</h1>
        <p className="text-gray-600">Monitor and manage all payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCard className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="text-red-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Failed</p>
              <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Total Revenue</h3>
            <TrendingUp className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">UGX {stats.totalAmount.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Completed Payments</h3>
            <DollarSign className="text-green-600" size={20} />
          </div>
          <p className="text-3xl font-bold text-gray-800">UGX {stats.completedAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">{(stats.completedAmount / stats.totalAmount * 100).toFixed(1)}% success rate</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by transaction ID, booking ID, or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Methods</option>
              <option value="MTN MoMo">MTN MoMo</option>
              <option value="Airtel Money">Airtel Money</option>
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{payment.transactionId}</p>
                    <p className="text-xs text-gray-500">Booking: {payment.bookingId}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{payment.user.name}</p>
                    <p className="text-xs text-gray-500">{payment.user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-lg font-bold text-gray-900">UGX {payment.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getMethodIcon(payment.method)}
                      <span className="text-sm text-gray-600">{payment.method}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleTimeString()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600">{payment.reference}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye size={16} className="text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download size={16} className="text-gray-600" />
                      </button>
                      {payment.status === 'failed' && (
                        <button className="p-1 hover:bg-blue-100 rounded-lg transition-colors">
                          <AlertCircle size={16} className="text-blue-600" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing 1 to {filteredPayments.length} of {payments.length} payments
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                Previous
              </button>
              <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm">
                1
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 border rounded-lg text-sm hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;