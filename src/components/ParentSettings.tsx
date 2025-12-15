import { User, Mail, Phone, Lock, Bell, Globe, Eye, Shield, CreditCard, Trash2, Save, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function ParentSettings() {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Jennifer Smith',
    email: 'jennifer.smith@email.com',
    phone: '+1 (555) 123-4567',
    childName: 'Sarah Smith',
    childAge: '8 years old',
    childGrade: 'Grade 3'
  });

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Account Deletion State
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handlePasswordChange = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    // Mock API success
    toast.success("Password Updated Successfully", {
      description: "Your account is now secured with the new password."
    });
    setShowPasswordDialog(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== "DELETE") {
      toast.error("Please type DELETE to confirm.");
      return;
    }
    // Mock API success
    toast.success("Account Scheduled for Deletion", {
      description: "We're sorry to see you go. An email has been sent with final instructions."
    });
    setShowDeleteDialog(false);
    setDeleteConfirmation('');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Save logic here
  };

  return (
    <div className="px-12 py-12" >
      {/* Change Password Dialog */}
      < Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog} >
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[24px] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#333333]">Change Password</DialogTitle>
            <DialogDescription className="text-[#666666] text-[16px]">
              Make sure your new password is secure.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-[#333333] mb-2 opacity-80">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-[#333333] mb-2 opacity-80">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-[#333333] mb-2 opacity-80">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={handlePasswordChange}
              className="w-full bg-[#4A90E2] text-white py-3 rounded-[16px] font-semibold hover:bg-[#3A7BC8] transition-colors"
            >
              Update Password
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog >

      {/* Delete Account Dialog */}
      < AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog} >
        <AlertDialogContent className="max-w-[500px] border-4 border-red-200 rounded-[32px] p-8 bg-white">
          <AlertDialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-10 h-10 text-red-500" />
            </div>
            <AlertDialogTitle className="text-3xl font-bold text-[#333333] mb-2">
              Delete Account?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-[#666666] mb-4">
              This action is <span className="font-bold text-red-500">irreversible</span>. All your child's progress and certificates will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <label className="block text-center text-[#333333] mb-2 opacity-80 text-[16px]">
              Type <strong>DELETE</strong> to confirm
            </label>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              className="w-full px-4 py-3 rounded-[12px] border-2 border-gray-200 focus:border-red-500 outline-none text-center uppercase tracking-widest font-bold"
              placeholder=""
            />
          </div>
          <AlertDialogFooter className="sm:justify-center gap-4 mt-4 w-full">
            <AlertDialogCancel className="w-full sm:w-auto text-lg px-8 py-4 rounded-[24px] border-2 border-gray-200 text-[#333333] hover:bg-gray-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className={`w-full sm:w-auto text-lg px-8 py-4 rounded-[24px] border-none text-white transition-all ${deleteConfirmation === 'DELETE' ? 'bg-red-500 hover:bg-red-600 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
              disabled={deleteConfirmation !== 'DELETE'}
            >
              Delete Permanently
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog >

      <div className="mb-12">
        <h2 className="text-[#333333] m-0 mb-2">Settings</h2>
        <p className="text-[#333333] opacity-60 m-0 text-[20px]">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Account Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Parent Account Information */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[#333333] m-0">Parent Account Information</h3>
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-[#4A90E2] text-white px-6 py-3 rounded-[16px] hover:bg-[#3A7BC8] transition-all cursor-pointer border-none text-[18px]"
                >
                  <Edit2 className="w-5 h-5" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-3 rounded-[16px] bg-white border-2 border-gray-200 text-[#333333] hover:bg-gray-50 transition-all cursor-pointer text-[18px]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#7BC67E] text-white px-6 py-3 rounded-[16px] hover:bg-[#6AB56E] transition-all cursor-pointer border-none text-[18px]"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-[#333333] opacity-60 mb-3 text-[18px]">Full Name</label>
                {editMode ? (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#333333] opacity-40" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-[16px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[20px] text-[#333333]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-[#333333] text-[20px]">
                    <User className="w-6 h-6 opacity-40" />
                    <span>{formData.fullName}</span>
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#333333] opacity-60 mb-3 text-[18px]">Email Address</label>
                {editMode ? (
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#333333] opacity-40" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-[16px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[20px] text-[#333333]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-[#333333] text-[20px]">
                    <Mail className="w-6 h-6 opacity-40" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[#333333] opacity-60 mb-3 text-[18px]">Phone Number</label>
                {editMode ? (
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#333333] opacity-40" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full pl-14 pr-4 py-4 rounded-[16px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[20px] text-[#333333]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-[#333333] text-[20px]">
                    <Phone className="w-6 h-6 opacity-40" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Child Profile */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#333333] m-0 mb-8">Child Profile</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-gradient-to-br from-[#FFF8E7] to-[#E3F2FD] rounded-[20px]">
                <div className="w-20 h-20 bg-[#F475A8] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[40px]">👧</span>
                </div>
                <div className="flex-1">
                  {editMode ? (
                    <input
                      type="text"
                      value={formData.childName}
                      onChange={(e) => handleChange('childName', e.target.value)}
                      className="w-full px-4 py-2 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[24px] text-[#333333] mb-2"
                    />
                  ) : (
                    <h4 className="text-[#333333] m-0 mb-2 text-[24px]">{formData.childName}</h4>
                  )}
                  <div className="flex gap-4">
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={formData.childAge}
                          onChange={(e) => handleChange('childAge', e.target.value)}
                          className="w-32 px-3 py-1 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[18px] text-[#333333]"
                        />
                        <input
                          type="text"
                          value={formData.childGrade}
                          onChange={(e) => handleChange('childGrade', e.target.value)}
                          className="w-32 px-3 py-1 rounded-[12px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[18px] text-[#333333]"
                        />
                      </>
                    ) : (
                      <>
                        <span className="text-[#333333] opacity-60 text-[18px]">{formData.childAge}</span>
                        <span className="text-[#333333] opacity-60 text-[18px]">•</span>
                        <span className="text-[#333333] opacity-60 text-[18px]">{formData.childGrade}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#333333] m-0 mb-8">Security Settings</h3>

            <div className="space-y-6">
              {/* Change Password */}
              <div className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-[20px] hover:border-[#4A90E2] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#4A90E2] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-[#4A90E2]" />
                  </div>
                  <div>
                    <h4 className="text-[#333333] m-0 mb-1 text-[20px]">Change Password</h4>
                    <p className="text-[#333333] opacity-60 m-0 text-[16px]">Update your account password</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordDialog(true)}
                  className="px-6 py-3 rounded-[16px] bg-white border-2 border-gray-200 text-[#333333] hover:bg-[#4A90E2] hover:text-white hover:border-[#4A90E2] transition-all cursor-pointer text-[18px]"
                >
                  Change
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-6 border-2 border-gray-200 rounded-[20px]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#7BC67E] bg-opacity-10 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#7BC67E]" />
                  </div>
                  <div>
                    <h4 className="text-[#333333] m-0 mb-1 text-[20px]">Two-Factor Authentication</h4>
                    <p className="text-[#333333] opacity-60 m-0 text-[16px]">Add an extra layer of security</p>
                  </div>
                </div>
                <label className="relative inline-block w-14 h-8 cursor-pointer">
                  <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                  <span className="absolute inset-0 bg-gray-300 rounded-full transition-all peer-checked:bg-[#7BC67E] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#333333] m-0 mb-8">Notification Preferences</h3>

            <div className="space-y-4">
              {[
                { label: 'Daily Learning Summary', description: 'Get daily reports about your child\'s activities', checked: true },
                { label: 'Achievement Notifications', description: 'Be notified when your child earns badges', checked: true },
                { label: 'Weekly Progress Report', description: 'Receive detailed weekly progress reports', checked: true },
                { label: 'Recommended Activities', description: 'Get suggestions for new learning activities', checked: false },
                { label: 'Promotional Emails', description: 'Receive news and updates about new features', checked: false }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-[16px]">
                  <div className="flex-1">
                    <h4 className="text-[#333333] m-0 mb-1 text-[18px]">{notification.label}</h4>
                    <p className="text-[#333333] opacity-60 m-0 text-[16px]">{notification.description}</p>
                  </div>
                  <label className="relative inline-block w-14 h-8 cursor-pointer ml-4">
                    <input type="checkbox" defaultChecked={notification.checked} className="opacity-0 w-0 h-0 peer" />
                    <span className="absolute inset-0 bg-gray-300 rounded-full transition-all peer-checked:bg-[#4A90E2] before:content-[''] before:absolute before:h-6 before:w-6 before:left-1 before:top-1 before:bg-white before:rounded-full before:transition-all peer-checked:before:translate-x-6"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Settings */}
        <div className="space-y-8">
          {/* App Preferences */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#333333] m-0 mb-8">App Preferences</h3>

            <div className="space-y-6">
              {/* Language */}
              <div>
                <label className="flex items-center gap-3 text-[#333333] mb-3 text-[18px]">
                  <Globe className="w-5 h-5 opacity-60" />
                  <span>Language</span>
                </label>
                <select className="w-full px-4 py-3 rounded-[16px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[18px] text-[#333333] cursor-pointer bg-white">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              {/* Theme */}
              <div>
                <label className="flex items-center gap-3 text-[#333333] mb-3 text-[18px]">
                  <Eye className="w-5 h-5 opacity-60" />
                  <span>Theme</span>
                </label>
                <select className="w-full px-4 py-3 rounded-[16px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[18px] text-[#333333] cursor-pointer bg-white">
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                  <option>Auto</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h3 className="text-[#333333] m-0 mb-6">Privacy Settings</h3>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-4 rounded-[16px] border-2 border-gray-200 hover:border-[#4A90E2] transition-colors cursor-pointer bg-white text-[18px] text-[#333333]">
                Privacy Policy
              </button>
              <button className="w-full text-left px-4 py-4 rounded-[16px] border-2 border-gray-200 hover:border-[#4A90E2] transition-colors cursor-pointer bg-white text-[18px] text-[#333333]">
                Terms of Service
              </button>
              <button className="w-full text-left px-4 py-4 rounded-[16px] border-2 border-gray-200 hover:border-[#4A90E2] transition-colors cursor-pointer bg-white text-[18px] text-[#333333]">
                Data & Privacy
              </button>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-white">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-white" />
              <h3 className="text-white m-0">Premium Plan</h3>
            </div>
            <p className="text-white opacity-90 m-0 mb-6 text-[18px]">
              Access to all cultures and unlimited learning
            </p>
            <div className="text-[32px] mb-6">$9.99/month</div>
            <button className="w-full bg-white text-[#4A90E2] py-3 rounded-[16px] hover:bg-opacity-90 transition-all cursor-pointer border-none text-[18px]">
              Manage Subscription
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-2 border-red-200">
            <h3 className="text-[#333333] m-0 mb-6">Danger Zone</h3>

            <div className="space-y-4">
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-[16px] bg-red-50 border-2 border-red-200 text-red-600 hover:bg-red-100 transition-all cursor-pointer text-[18px]"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete Account</span>
              </button>
              <p className="text-[#333333] opacity-60 m-0 text-[14px] text-center">
                This action cannot be undone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
