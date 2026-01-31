import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items", orders)

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'cash on delivery':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'delivered':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'cash on delivery':
        return '💵'
      case 'paid':
        return '✅'
      case 'pending':
        return '⏳'
      case 'delivered':
        return '📦'
      default:
        return '📋'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-gradient-to-r from-green-600 to-green-700 shadow-lg'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-2xl font-bold text-white flex items-center gap-2'>
            🛍️ My Orders
            {orders.length > 0 && (
              <span className='bg-white text-green-600 text-sm font-semibold px-3 py-1 rounded-full'>
                {orders.length}
              </span>
            )}
          </h1>
          <p className='text-green-100 mt-1'>Track and manage your orders</p>
        </div>
      </div>

      {/* Orders Container */}
      <div className='container mx-auto px-4 py-6'>
        {!orders[0] ? (
          <div className='bg-white rounded-xl shadow-sm p-8 text-center'>
            <div className='text-6xl mb-4'>📦</div>
            <h2 className='text-xl font-semibold text-gray-700 mb-2'>No Orders Yet</h2>
            <p className='text-gray-500 mb-6'>You haven't placed any orders. Start shopping to see your orders here!</p>
            <button 
              onClick={() => window.location.href = '/'}
              className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='space-y-4'>
            {orders.map((order, index) => (
              <div 
                key={order._id + index + "order"} 
                className='bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden'
              >
                {/* Order Header */}
                <div className='bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                    <div>
                      <p className='text-xs text-gray-500 uppercase tracking-wide font-semibold'>Order Number</p>
                      <p className='font-mono font-bold text-gray-800'>{order?.orderId}</p>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs text-gray-500'>Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.payment_status)}`}>
                          {getStatusIcon(order.payment_status)} {order.payment_status}
                        </span>
                      </div>
                      <div className='text-xs text-gray-500'>
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className='p-6'>
                  <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Product Image and Details */}
                    <div className='flex-1'>
                      <div className='flex gap-4'>
                        <div className='flex-shrink-0'>
                          <img
                            src={order.product_details.image?.[0] || 'https://via.placeholder.com/100x100/CCCCCC/FFFFFF?text=Product'} 
                            className='w-20 h-20 object-cover rounded-lg border border-gray-200'
                            alt={order.product_details.name}
                          />
                        </div>
                        <div className='flex-1'>
                          <h3 className='font-semibold text-gray-800 text-lg mb-1'>
                            {order.product_details.name}
                          </h3>
                          <div className='space-y-1 text-sm text-gray-600'>
                            <p className='flex items-center gap-2'>
                              <span>💰</span>
                              <span>Amount: <span className='font-semibold text-gray-800'>{DisplayPriceInRupees(order.totalAmt)}</span></span>
                            </p>
                            <p className='flex items-center gap-2'>
                              <span>📦</span>
                              <span>Subtotal: <span className='font-semibold text-gray-800'>{DisplayPriceInRupees(order.subTotalAmt)}</span></span>
                            </p>
                            <p className='flex items-center gap-2'>
                              <span>💳</span>
                              <span>Payment ID: <span className='font-mono text-xs'>{order.paymentId || 'COD'}</span></span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    {order.delivery_address && (
                      <div className='lg:w-80'>
                        <div className='bg-gray-50 rounded-lg p-4'>
                          <h4 className='font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                            📍 Delivery Address
                          </h4>
                          <div className='text-sm text-gray-600 space-y-1'>
                            <p className='font-medium text-gray-800'>{order.delivery_address.address_line}</p>
                            <p>{order.delivery_address.city}, {order.delivery_address.state}</p>
                            <p>{order.delivery_address.country} - {order.delivery_address.pincode}</p>
                            <p className='flex items-center gap-2'>
                              <span>📞</span>
                              <span>{order.delivery_address.mobile}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className='mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-3'>
                    <button className='px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors'>
                      📋 View Details
                    </button>
                    <button className='px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors'>
                      📧 Invoice
                    </button>
                    <button className='px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors'>
                      💬 Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
