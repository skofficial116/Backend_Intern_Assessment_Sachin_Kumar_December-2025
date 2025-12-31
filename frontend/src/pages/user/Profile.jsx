import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  updateProfile,
  changePassword,
  requestAdminAccess,
} from "../../api/user.api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [profileForm, setProfileForm] = useState({
    fullName: user.fullName,
    email: user.email,
  });
  const [profileLoading, setProfileLoading] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passLoading, setPassLoading] = useState(false);

  const [adminCode, setAdminCode] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const [isProfileDirty, setIsProfileDirty] = useState(false);

  useEffect(() => {
    const dirty =
      profileForm.fullName !== user.fullName || profileForm.email !== user.email;
    setIsProfileDirty(dirty);
  }, [profileForm, user]);

  const handleProfileUpdate = async () => {
    try {
      setProfileLoading(true);
      const res = await updateProfile(profileForm);
      setUser(res.data);
      toast.success(res.message || "Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    try {
      setPassLoading(true);
      const res = await changePassword(passwordForm);
      toast.success(res.message || "Password updated successfully");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setPassLoading(false);
    }
  };

  const handleAdminRequest = async () => {
    try {
      setAdminLoading(true);
      const res = await requestAdminAccess({ codeword: adminCode });
      setUser({ ...user, role: "admin" });
      toast.success(res.message || "Admin access granted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid admin code");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 space-y-8 px-4">
        <div className="bg-gradient-to-r from-purple-50 to-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={profileForm.fullName}
              onChange={(e) =>
                setProfileForm({ ...profileForm, fullName: e.target.value })
              }
            />
            <Input
              label="Email"
              value={profileForm.email}
              onChange={(e) =>
                setProfileForm({ ...profileForm, email: e.target.value })
              }
            />
          </div>
          <div className="mt-6 flex gap-4">
            {profileLoading ? (
              <Loader message="Updating profile..." />
            ) : (
              isProfileDirty && (
                <>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                    onClick={handleProfileUpdate}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full"
                    onClick={() =>
                      setProfileForm({
                        fullName: user.fullName,
                        email: user.email,
                      })
                    }
                  >
                    Cancel
                  </Button>
                </>
              )
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Current Password"
              type={showPassword ? "text" : "password"}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
              }
            />
            <Input
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({ ...passwordForm, newPassword: e.target.value })
              }
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="w-4 h-4 text-purple-600"
            />
            <label className="text-sm text-gray-700">Show Passwords</label>
          </div>
          <div className="mt-6">
            {passLoading ? (
              <Loader message="Updating password..." />
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                onClick={handlePasswordChange}
              >
                Update Password
              </Button>
            )}
          </div>
        </div>

        {user.role !== "admin" && (
          <div className="bg-gradient-to-r from-green-50 to-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Admin Access</h2>
            <p className="text-sm text-gray-600 mb-4">
              Enter the admin codeword to gain admin privileges.
            </p>
            <Input
              label="Admin Codeword"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
            />
            <div className="mt-6">
              {adminLoading ? (
                <Loader message="Requesting admin access..." />
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                  onClick={handleAdminRequest}
                >
                  Request Admin Access
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
