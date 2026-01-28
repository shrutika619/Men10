import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPatientProfile } from "@/app/services/patient.service";

/**
 * ------------------------------------------------------------------
 * ASYNC THUNK: Fetch Profile Details
 * ------------------------------------------------------------------
 * This is called when the user visits the Profile Page or Dashboard.
 * It fills in the "Flesh" (Name, Email, Image) onto the "Skeleton" (ID, Mobile).
 */
export const fetchProfileDetails = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPatientProfile();
      if (res.success) {
        return res.data; 
      }
      return rejectWithValue(res.message);
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch profile");
    }
  }
);

/**
 * ------------------------------------------------------------------
 * INITIAL STATE
 * ------------------------------------------------------------------
 */
const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isfirstime: false,
  isExpired: false,
  role: null,
  
  // ✅ ROBUST USER STRUCTURE
  // We initialize fields to empty strings/null to prevent UI "undefined" errors
  user: {
    _id: null,        // USER ID (From Login)
    profileId: null,  // PROFILE DOC ID (From Profile API)
    mobileNo: "",     // From Login
    role: "",         // From Login
    
    // Details fetched later:
    fullName: "",
    email: "",
    age: "",
    gender: "",
    profileImageUrl: "",
    homeAddress: "",
    workAddress: "",
    lastUpdated: null, // To track when we last synced
  }, 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ 1. LOGIN SUCCESS
    // Saves the "Identity" (Token, User ID, Mobile)
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isExpired = false;
      state.loading = false;
      state.error = null;

      // Merge payload user data (usually just _id, mobileNo, role)
      // while keeping existing structure safe.
      state.user = { 
        ...state.user, 
        ...(action.payload.user || {}),
        lastUpdated: new Date().toISOString() 
      };
    },

    // ✅ 2. LOGOUT
    logoutSuccess: () => initialState,

    // ✅ 3. MANUAL DATA UPDATE
    // Called when user saves profile forms (Updates Redux instantly without API fetch)
    updateUserData: (state, action) => {
      state.user = { 
        ...state.user, 
        ...action.payload,
        lastUpdated: new Date().toISOString() 
      };
    },

    // Helpers
    updateRole: (state, action) => {
      state.role = action.payload;
    },
    setExpired: (state, action) => {
      state.isExpired = action.payload;
      if (action.payload) state.isAuthenticated = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  
  extraReducers: (builder) => {
    builder
      // --- Fetch Profile Handlers ---
      .addCase(fetchProfileDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        
        const responseData = action.payload;

        // 1. Extract the Profile Document ID (different from User Login ID)
        const profileId = responseData._id;

        // 2. Extract Mobile Number (It is nested inside user_id object now)
        let fetchedMobile = state.user.mobileNo; // Default to what we have
        
        // Check if user_id is an object and contains mobileNo (Populated data)
        if (responseData.user_id && typeof responseData.user_id === 'object' && responseData.user_id.mobileNo) {
            fetchedMobile = responseData.user_id.mobileNo;
        }

        // 3. Separate the rest of the profile data
        // We destructure _id and user_id out so we don't accidentally overwrite state with them directly
        const { _id, user_id, ...profileDetails } = responseData;

        // 4. MERGE EVERYTHING
        state.user = { 
            ...state.user,        // Keep existing keys (like token/role if stored there)
            ...profileDetails,    // Add Name, Email, Age, Gender, etc.
            
            profileId: profileId, // Store Profile ID separately
            mobileNo: fetchedMobile, // ✅ EXPLICITLY SAVE THE FETCHED MOBILE NO
            
            lastUpdated: new Date().toISOString()
        };
      })
      .addCase(fetchProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  logoutSuccess,
  loginSuccess,
  updateRole,
  setExpired,
  updateUserData,
  clearAuthError,
} = authSlice.actions;

// ✅ SELECTORS
// These are used in your components to grab data
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;