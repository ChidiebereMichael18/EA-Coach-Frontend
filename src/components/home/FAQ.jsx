import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Can I change my booking?',
    answer: 'Changes depend on the bus operator policy. You can modify your booking up to 2 hours before departure through your dashboard. Check your booking in the dashboard and contact support if you need assistance.'
  },
  {
    question: 'Which payment methods are supported?',
    answer: 'We support multiple payment methods including Debit/Credit Cards (Visa, Mastercard), MTN Mobile Money, Airtel Money, and bank transfers. All payments are secure and encrypted.'
  },
  {
    question: 'Do I need to print my ticket?',
    answer: 'No, a digital confirmation on your phone is usually enough. You can show the booking reference or QR code to the bus conductor. Some operators may require a printed copy, so check your booking details.'
  },
  {
    question: 'What happens if my bus is delayed?',
    answer: 'We continuously monitor bus schedules and will notify you of any delays via SMS and email. If the delay is significant, you may be eligible for a full refund or reschedule.'
  },
  {
    question: 'Can I cancel my booking and get a refund?',
    answer: 'Cancellation policies vary by operator. Generally, cancellations made 24 hours before departure are eligible for a full refund. Later cancellations may incur fees or be non-refundable.'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Yes, we use industry-standard encryption to protect your data. We never share your personal information with third parties without your consent.'
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
      </p>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-primary flex-shrink-0" size={20} />
              ) : (
                <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
              )}
            </button>
            
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;