import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser : (state, action: PayloadAction<User>) => {
      const existingUserIndex = state.users.findIndex(
        user => user.id === action.payload.id
      );
      
      if (existingUserIndex >= 0) {
        state.users[existingUserIndex] = action.payload;
      } else {
        state.users.push(action.payload);
      }
      state.currentUser = action.payload;
    },
    userSaved : (state, action: PayloadAction<User>) => {
      const existingUserIndex = state.users.findIndex(
        user => user.id === action.payload.id
      );
      
      if (existingUserIndex >= 0) {
        state.users[existingUserIndex] = action.payload;
      } else {
        state.users.push(action.payload);
      }
      state.currentUser = action.payload;
    }
  },
});

export const { createUser, userSaved } = userSlice.actions;
export default userSlice.reducer;