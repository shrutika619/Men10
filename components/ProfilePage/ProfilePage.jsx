"use client";
import React, { useState, useEffect } from "react";
// ✅ 1. Import useRouter for redirection
import { useRouter } from "next/navigation"; 
import { User, Settings, ShoppingBag, HelpCircle, ShieldCheck, FileText, LogOut, Pencil, MapPin, X, Menu, Save, CheckCircle, Phone } from "lucide-react";
import { toast } from "sonner";
import { savePatientProfile } from "@/app/services/patient.service"; 
// ✅ REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
// ✅ 2. Import logoutSuccess action
import { fetchProfileDetails, updateUserData, logoutSuccess } from "@/redux/slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // ✅ Initialize Router

  const authUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  // Local Form State
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    email: "",
    phone: "",
    profileImageUrl: "",
    homeAddress: "",
    workAddress: ""
  });

  /* =========================================================
     LOGOUT HANDLER
     ========================================================= */
  const handleLogout = () => {
    // 1. Clear Redux State
    dispatch(logoutSuccess());
    
    // 2. Redirect to Home
    router.push("/");
    
    // 3. Optional: Show toast
    toast.success("Logged out successfully");
  };

  /* =========================================================
     STEP 1: FETCH FRESH DATA ON MOUNT
     ========================================================= */
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfileDetails());
    } else {
       // Optional: Redirect if not authenticated
       // router.push("/login");
    }
  }, [dispatch, isAuthenticated]);

  /* =========================================================
     STEP 2: SYNC REDUX DATA TO LOCAL FORM
     ========================================================= */
  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.fullName || "",
        gender: authUser.gender || "male",
        age: authUser.age || "",
        email: authUser.email || "",
        profileImageUrl: authUser.profileImageUrl || "",
        homeAddress: authUser.homeAddress || "",
        workAddress: authUser.workAddress || "",
        phone: authUser.mobileNo || "Not Provided" 
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* =========================================================
     STEP 3: SAVE & UPDATE REDUX CLIENT-SIDE
     ========================================================= */
  const handleSave = async () => {
    setSaveStatus(false);
    
    const payload = {
      fullName: formData.name,
      email: formData.email,
      age: formData.age ? parseInt(formData.age) : 0,
      gender: formData.gender,
      homeAddress: formData.homeAddress,
      workAddress: formData.workAddress
    };

    try {
      const res = await savePatientProfile(payload);

      if (res.success) {
        setSaveStatus(true);
        setIsEditing(false);
        toast.success("Profile updated successfully");
        dispatch(updateUserData(payload));
        setTimeout(() => setSaveStatus(false), 3000);
      } else {
        toast.error(res.message || "Failed to save changes");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans p-4 md:p-8">
      
      {/* MOBILE MENU TRIGGER */}
      <div className="lg:hidden mb-4 flex justify-end">
        <button onClick={() => setMenuOpen(true)} className="p-2 bg-white rounded-xl shadow-sm text-gray-600">
          <Menu size={24} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ---------------- SIDEBAR ---------------- */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="bg-white border-white border rounded-2xl p-6 shadow-sm sticky top-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md overflow-hidden">
                {formData.profileImageUrl ? (
                    <img src={formData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : <User size={24} />}
              </div>
              <div>
                <h2 className="font-semibold text-base truncate w-32">{formData.name || "User"}</h2>
                <p className="text-gray-400 text-xs capitalize">
                    {formData.gender} {formData.age ? `• ${formData.age} yrs` : ""}
                </p>
              </div>
            </div>
            <div className="space-y-1">
              <SidebarItem icon={<Settings size={16}/>} label="Settings" active />
              <SidebarItem icon={<ShoppingBag size={16}/>} label="My Orders" />
              <SidebarItem icon={<HelpCircle size={16}/>} label="Help" />
              <SidebarItem icon={<ShieldCheck size={16}/>} label="Privacy Policy" />
              <SidebarItem icon={<FileText size={16}/>} label="Terms & Conditions" />
            </div>
            
            {/* ✅ DESKTOP LOGOUT BUTTON */}
            <button 
                onClick={handleLogout}
                className="w-full mt-8 flex items-center justify-center gap-2 py-3 bg-red-50 text-red-500 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
            >
               <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="lg:col-span-9 space-y-6">
          {saveStatus && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-5 py-3 rounded-xl border-white border text-sm shadow-sm">
              <CheckCircle size={18} /> <span>Changes saved successfully!</span>
            </div>
          )}

          {/* EDITABLE PROFILE CARD */}
          <section className="bg-white border-white border rounded-2xl p-6 md:p-8 flex items-center justify-between shadow-sm relative">
             <div className="flex items-center gap-6 w-full">
               <div className="hidden sm:flex w-16 h-16 bg-blue-50 rounded-full items-center justify-center text-blue-600 border border-blue-50 overflow-hidden">
                 {formData.profileImageUrl ? (
                     <img src={formData.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                 ) : <User size={32} />}
               </div>
               <div className="flex-1">
                 {isEditing ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Full Name</label>
                       <input name="name" value={formData.name} onChange={handleInputChange} className="w-full border-b border-blue-200 outline-none text-lg bg-transparent py-1 focus:border-blue-500 transition-colors" placeholder="Enter full name" />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Age</label>
                       <input name="age" type="number" value={formData.age} onChange={handleInputChange} className="w-full border-b border-blue-200 outline-none text-lg bg-transparent py-1 focus:border-blue-500 transition-colors" placeholder="25" />
                     </div>
                   </div>
                 ) : (
                   <div>
                     <h2 className="text-xl font-semibold text-gray-900">{formData.name || "Your Name"}</h2>
                     <p className="text-gray-500 text-sm mt-1 uppercase tracking-tight font-medium">
                       {formData.gender} • {formData.age ? `${formData.age} years old` : "Age not set"}
                     </p>
                   </div>
                 )}
               </div>
             </div>
             <div className="flex items-center gap-2">
               {!isEditing ? (
                 <button onClick={() => setIsEditing(true)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                   <Pencil size={18} />
                 </button>
               ) : (
                 <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                   <Save size={16} /> Save Changes
                 </button>
               )}
             </div>
          </section>

          {/* CONTACT INFO CARD */}
          <section className="bg-white border-white border rounded-2xl p-6 md:p-8 shadow-sm">
             <div className="flex items-center gap-2 mb-6">
                <Phone className="text-blue-600" size={20} />
                <h3 className="font-semibold text-base text-gray-900">Contact Information</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                   <label className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Email Address</label>
                   {isEditing ? (
                     <input name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 bg-[#F9FAFB] border border-gray-100 rounded-lg text-sm outline-none focus:border-blue-300 transition-all" />
                   ) : (
                     <p className="text-sm text-gray-700 font-medium">{formData.email || "No Email Provided"}</p>
                   )}
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] text-gray-400 uppercase font-medium tracking-wider">Mobile Number</label>
                   <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-700 font-medium">{formData.phone}</p>
                      <ShieldCheck size={14} className="text-green-500" title="Verified" />
                   </div>
                </div>
             </div>
          </section>

          {/* ADDRESS SECTION */}
          {(formData.homeAddress || formData.workAddress || isEditing) && (
            <section className="bg-white border-white border rounded-2xl p-6 md:p-8 shadow-sm animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-base text-gray-900">Address Book</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableAddress 
                  label="HOME ADDRESS" 
                  name="homeAddress" 
                  value={formData.homeAddress} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  accentColor="bg-blue-600" 
                />
                <EditableAddress 
                  label="WORK ADDRESS" 
                  name="workAddress" 
                  value={formData.workAddress} 
                  isEditing={isEditing} 
                  onChange={handleInputChange} 
                  accentColor="bg-orange-500" 
                />
              </div>
            </section>
          )}
          
        </main>
      </div>

       {/* MOBILE DRAWER */}
       {menuOpen && (
        <div className="fixed inset-0 z-[100] flex items-end">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative bg-white w-full rounded-t-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Menu</h3>
              <button onClick={() => setMenuOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
            </div>
            <div className="space-y-3">
              <SidebarItem icon={<Settings size={18}/>} label="Account Settings" active />
              <SidebarItem icon={<ShoppingBag size={18}/>} label="My Orders" />
              
              {/* ✅ MOBILE LOGOUT BUTTON */}
              <button 
                onClick={handleLogout}
                className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-medium text-sm flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Logout Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- SUB COMPONENTS --- */

const SidebarItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
    active ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50"
  }`}>
    <div className="flex items-center gap-3">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  </button>
);

const EditableAddress = ({ label, name, value, isEditing, onChange, accentColor }) => (
  <div className="border border-white rounded-xl p-5 bg-[#FAFBFC] hover:shadow-inner transition-all relative">
    <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${accentColor}`} />
    <span className="text-[9px] font-semibold tracking-widest text-gray-400 uppercase block mb-2">{label}</span>
    {isEditing ? (
      <textarea 
        name={name}
        value={value} 
        onChange={onChange}
        rows={2}
        className="w-full p-2 bg-white border border-blue-100 rounded-lg text-sm outline-none focus:border-blue-400 resize-none transition-shadow"
        placeholder="Enter address..."
      />
    ) : (
      <p className="text-xs text-gray-600 leading-relaxed font-medium min-h-[40px]">
        {value || "Not set"}
      </p>
    )}
  </div>
);

export default ProfilePage;