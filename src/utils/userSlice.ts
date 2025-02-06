import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
}

interface ExistingUser {
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  currentUser: User | null;
}

const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem('userState');
    if (serializedState === null) {
      return {
        users: [],
        currentUser: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return {
      users: [],
      currentUser: null,
    };
  }
};

const saveState = (state: UserState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('userState', serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
};

const initialState: UserState = loadState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      const existingUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );

      if (existingUserIndex >= 0) {
        state.users[existingUserIndex] = action.payload;
      } else {
        state.users.push(action.payload);
      }
      state.currentUser = action.payload;
      saveState(state); 
    },
    removeUser: (state) => {
      state.currentUser = null;
      saveState(state); 
    },
    setUser: (state, action: PayloadAction<ExistingUser>) => {
      const foundUser = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );

      if (foundUser) {
        state.currentUser = foundUser;
        saveState(state); 
      }
    },
  },
});

export const { createUser, removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;