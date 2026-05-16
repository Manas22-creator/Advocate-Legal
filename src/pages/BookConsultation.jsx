import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Video, Building2, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    type: 'online',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    details: ''
  });

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to book appointment');

      setSuccess(true);
    } catch (err) {
      setError('An error occurred while booking your consultation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Consultation Booked!</h2>
          <p className="text-lg text-slate-600 mb-8">
            Your {formData.type} consultation is scheduled for <strong>{formData.date}</strong> at <strong>{formData.time}</strong>.
            We have sent a confirmation email with further details.
          </p>
          <div className="bg-slate-50 rounded-2xl p-6 text-left mb-8 border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Booking Details</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><span className="font-medium text-slate-900">Name:</span> {formData.name}</li>
              <li><span className="font-medium text-slate-900">Email:</span> {formData.email}</li>
              <li><span className="font-medium text-slate-900">Phone:</span> {formData.phone}</li>
              <li><span className="font-medium text-slate-900">Type:</span> {formData.type === 'online' ? 'Video Conference' : 'In-Office Visit'}</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Book a Consultation</h1>
          <p className="text-xl text-slate-600">
            Schedule a confidential meeting with our legal experts to discuss your case.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="flex border-b border-slate-100">
            <div className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${step >= 1 ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500' : 'text-slate-400'}`}>
              1. Consultation Type
            </div>
            <div className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${step >= 2 ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500' : 'text-slate-400'}`}>
              2. Date & Time
            </div>
            <div className={`flex-1 py-4 text-center font-medium text-sm transition-colors ${step >= 3 ? 'bg-amber-50 text-amber-700 border-b-2 border-amber-500' : 'text-slate-400'}`}>
              3. Your Details
            </div>
          </div>

          <div className="p-8 md:p-12">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 mb-8">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step 1: Type */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">How would you like to meet?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className={`relative flex flex-col p-6 cursor-pointer rounded-2xl border-2 transition-all ${formData.type === 'online' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-amber-300'}`}>
                      <input type="radio" name="type" value="online" className="sr-only" checked={formData.type === 'online'} onChange={() => setFormData({...formData, type: 'online'})} />
                      <Video className={`w-8 h-8 mb-4 ${formData.type === 'online' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <span className="text-lg font-bold text-slate-900 mb-2">Video Consultation</span>
                      <span className="text-sm text-slate-500">Meet securely via Google Meet or Zoom from anywhere.</span>
                      {formData.type === 'online' && <CheckCircle2 className="absolute top-6 right-6 w-6 h-6 text-amber-500" />}
                    </label>

                    <label className={`relative flex flex-col p-6 cursor-pointer rounded-2xl border-2 transition-all ${formData.type === 'office' ? 'border-amber-500 bg-amber-50/50' : 'border-slate-200 hover:border-amber-300'}`}>
                      <input type="radio" name="type" value="office" className="sr-only" checked={formData.type === 'office'} onChange={() => setFormData({...formData, type: 'office'})} />
                      <Building2 className={`w-8 h-8 mb-4 ${formData.type === 'office' ? 'text-amber-600' : 'text-slate-400'}`} />
                      <span className="text-lg font-bold text-slate-900 mb-2">In-Office Visit</span>
                      <span className="text-sm text-slate-500">Meet in person at our Bombay High Court chamber.</span>
                      {formData.type === 'office' && <CheckCircle2 className="absolute top-6 right-6 w-6 h-6 text-amber-500" />}
                    </label>
                  </div>
                  <div className="mt-10 flex justify-end">
                    <button type="button" onClick={() => setStep(2)} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center">
                      Continue to Date & Time <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Select a Date & Time</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2 text-amber-500" /> Select Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  {formData.date && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-amber-500" /> Select Time Slot
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({...formData, time})}
                            className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${formData.time === time ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-10 flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="text-slate-500 font-medium hover:text-slate-900 px-6 py-4">
                      Back
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setStep(3)} 
                      disabled={!formData.date || !formData.time}
                      className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Details <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Details */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Details</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm font-medium text-slate-700 mb-2">Brief Case Details (Optional)</label>
                    <textarea
                      id="details"
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none"
                      placeholder="Briefly describe what you would like to discuss..."
                    ></textarea>
                  </div>

                  <div className="mt-10 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(2)} className="text-slate-500 font-medium hover:text-slate-900 px-6 py-4">
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading || !formData.name || !formData.email || !formData.phone}
                      className="bg-amber-500 text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition-colors shadow-lg flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Processing...</>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
