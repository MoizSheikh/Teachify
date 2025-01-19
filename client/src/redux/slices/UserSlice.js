import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";
import setAuthenticationToken from "./setAuthenticationToken";

// Thunks for async actions
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/signup", obj, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        toast((t) => (
          <span>
            Account created successfully. Please login to continue &nbsp;
            <button onClick={() => toast.dismiss(t.id)}>OK</button>
          </span>
        ));
        return data.user;
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

export const loginTeacher = createAsyncThunk(
  "user/loginTeacher",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/login", obj, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        toast.success(data.message);
        const token = data.token;
        localStorage.setItem("token", token);
        setAuthenticationToken(token);
        const user = jwt.decode(token);
        return { user, isAdmin: data.userData?.is_admin };
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (obj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/user/login", obj, {
        headers: { "Content-Type": "application/json" },
      });

      if (data.success) {
        toast.success(data.message);
        const token = data.token;
        localStorage.setItem("token", token);
        setAuthenticationToken(token);
        const user = jwt.decode(token);
        return { user, isAdmin: data.userData?.is_admin };
      } else {
        toast.error(data.message);
        return rejectWithValue(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  }
);

// export const profileUpdate = createAsyncThunk(
//   "user/profileUpdate",
//   async (obj, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.put(`/user/edit/${obj.id}`, obj, {
//         headers: { "Content-Type": "application/json" },
//       });

//       if (data.success) {
//         toast.success(data.message);
//         return data.user;
//       } else {
//         toast.error(data.message);
//         return rejectWithValue(data.message);
//       }
//     } catch (err) {
//       toast.error(err.message);
//       return rejectWithValue(err.message);
//     }
//   }
// );

// // Slice
// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     currentUser: null,
//     isLoggedIn: false,
//     isAdmin: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem("token");
//       setAuthenticationToken(false);
//       state.currentUser = null;
//       state.isLoggedIn = false;
//       state.isAdmin = false;
//       toast.success("Logged out successfully.");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.fulfilled, (state, action) => {
//         toast.success("Signup successful!");
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.currentUser = action.payload.user;
//         state.isLoggedIn = true;
//         state.isAdmin = action.payload.isAdmin;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(profileUpdate.fulfilled, (state, action) => {
//         state.currentUser = { ...state.currentUser, ...action.payload };
//       })
//       .addCase(profileUpdate.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

export const { logout } = userSlice.actions;
export default userSlice.reducer;
