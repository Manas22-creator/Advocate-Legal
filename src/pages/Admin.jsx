import React, { useState, useEffect } from 'react';
import { Users, Calendar, FileText, Settings, LogOut, Loader2, CheckCircle, XCircle, Clock, UserPlus, Edit, Trash2, Quote, Star } from 'lucide-react';
import { format } from 'date-fns';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Team Member Form State
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);
  const [teamForm, setTeamForm] = useState({ name: '', role: '', description: '', image_url: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'inquiries') {
        const res = await fetch('/api/inquiries');
        const data = await res.json();
        setInquiries(data);
      } else if (activeTab === 'appointments') {
        const res = await fetch('/api/appointments');
        const data = await res.json();
        setAppointments(data);
      } else if (activeTab === 'team') {
        const res = await fetch('/api/team');
        const data = await res.json();
        setTeamMembers(data);
      } else if (activeTab === 'testimonials') {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = currentTeamMember ? `/api/team/${currentTeamMember.id}` : '/api/team';
      const method = currentTeamMember ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamForm)
      });
      
      if (res.ok) {
        setIsEditingTeam(false);
        setCurrentTeamMember(null);
        setTeamForm({ name: '', role: '', description: '', image_url: '' });
        fetchData();
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: 'DELETE' });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const tabs = [
    { id: 'inquiries', name: 'Inquiries', icon: Users },
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'team', name: 'Team Members', icon: Users },
    { id: 'testimonials', name: 'Testimonials', icon: Quote },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-serif font-bold text-amber-500">Admin Dashboard</h2>
          <p className="text-xs text-slate-400 mt-1">Advocate Legal Services</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <tab.icon className={`w-5 h-5 mr-3 ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400'}`} />
              {tab.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
            <LogOut className="w-5 h-5 mr-3 text-slate-400" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 capitalize">{activeTab}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-500">Welcome, Admin</span>
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold">
                A
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {activeTab === 'inquiries' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Date</th>
                        <th className="p-4">Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Subject</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-sm text-slate-600 whitespace-nowrap">
                            {format(new Date(inq.created_at), 'MMM dd, yyyy')}
                          </td>
                          <td className="p-4 text-sm font-medium text-slate-900">{inq.name}</td>
                          <td className="p-4 text-sm text-slate-600">
                            <div>{inq.email}</div>
                            <div className="text-xs text-slate-400">{inq.phone}</div>
                          </td>
                          <td className="p-4 text-sm text-slate-600">{inq.subject}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              inq.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {inq.status === 'pending' ? <Clock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                              {inq.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm">
                            <button className="text-amber-600 hover:text-amber-900 font-medium">View Details</button>
                          </td>
                        </tr>
                      ))}
                      {inquiries.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">No inquiries found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500 uppercase tracking-wider">
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Client Name</th>
                        <th className="p-4">Contact</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 text-sm text-slate-600 whitespace-nowrap font-medium">
                            <div>{apt.date}</div>
                            <div className="text-amber-600">{apt.time}</div>
                          </td>
                          <td className="p-4 text-sm font-medium text-slate-900">{apt.name}</td>
                          <td className="p-4 text-sm text-slate-600">
                            <div>{apt.email}</div>
                            <div className="text-xs text-slate-400">{apt.phone}</div>
                          </td>
                          <td className="p-4 text-sm text-slate-600 capitalize">{apt.type}</td>
                          <td className="p-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Scheduled
                            </span>
                          </td>
                          <td className="p-4 text-sm space-x-3">
                            <button className="text-emerald-600 hover:text-emerald-900 font-medium">Confirm</button>
                            <button className="text-red-600 hover:text-red-900 font-medium">Cancel</button>
                          </td>
                        </tr>
                      ))}
                      {appointments.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">No appointments scheduled.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'team' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Manage Team Members</h2>
                    <button 
                      onClick={() => {
                        setIsEditingTeam(true);
                        setCurrentTeamMember(null);
                        setTeamForm({ name: '', role: '', description: '', image_url: '' });
                      }}
                      className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-amber-400 transition-colors flex items-center"
                    >
                      <UserPlus className="w-4 h-4 mr-2" /> Add Member
                    </button>
                  </div>

                  {isEditingTeam ? (
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">{currentTeamMember ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                      <form onSubmit={handleTeamSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input type="text" required value={teamForm.name} onChange={e => setTeamForm({...teamForm, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Adv. Jane Doe" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role / Location</label>
                            <input type="text" required value={teamForm.role} onChange={e => setTeamForm({...teamForm, role: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Bombay High Court" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                          <input type="url" required value={teamForm.image_url} onChange={e => setTeamForm({...teamForm, image_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="https://example.com/image.jpg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                          <textarea required value={teamForm.description} onChange={e => setTeamForm({...teamForm, description: e.target.value})} rows={3} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-amber-500 outline-none resize-none" placeholder="Brief description of their role..."></textarea>
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                          <button type="button" onClick={() => setIsEditingTeam(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                          <button type="submit" className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors">Save Member</button>
                        </div>
                      </form>
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden bg-slate-100">
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="p-5">
                          <h4 className="text-lg font-bold text-slate-900 mb-1">{member.name}</h4>
                          <p className="text-amber-600 font-medium text-sm mb-3">{member.role}</p>
                          <p className="text-slate-600 text-sm line-clamp-2 mb-4">{member.description}</p>
                          <div className="flex justify-end space-x-2 border-t border-slate-100 pt-4 mt-auto">
                            <button 
                              onClick={() => {
                                setCurrentTeamMember(member);
                                setTeamForm({ name: member.name, role: member.role, description: member.description, image_url: member.image_url });
                                setIsEditingTeam(true);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTeamMember(member.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {teamMembers.length === 0 && !isEditingTeam && (
                      <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                        No team members found. Click "Add Member" to create one.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Client Testimonials</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative">
                        <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-500/10" />
                        <div className="flex mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm italic mb-4">"{t.content}"</p>
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                            {t.client_name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{t.client_name}</h4>
                            <p className="text-[10px] text-slate-400 uppercase tracking-wider">Verified Client</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {testimonials.length === 0 && (
                      <div className="col-span-full text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                        No testimonials found in database.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-12 text-center">
                  <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Module Under Development</h3>
                  <p className="text-slate-500">This section is currently being built and will be available soon.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
