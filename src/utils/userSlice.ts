import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  id: number;
  content: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  count: number;
  notes: Note[];
  currentNote: string;
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
        (user) => user.email === action.payload.email
      );

      if (existingUserIndex >= 0) {
        alert("User with this email Already Exists") 
      } 
      else {
        state.users.push(action.payload);
        state.currentUser = action.payload;
        saveState(state);
      } 
    },
    removeUser: (state) => {
      state.users = state.users.filter(
        (user) =>
          user.email !== state.currentUser?.email
      );
      if(state.currentUser) state.users.push(state.currentUser)
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
      else{
        alert("No Such User Exists")
      }
    },
    increment: (state) => {
      if(state.currentUser) state.currentUser.count = Math.min(state.currentUser.count+1,100);
      saveState(state); 
    },
    decrement: (state) => {
      if(state.currentUser) state.currentUser.count = Math.max(state.currentUser.count-1,0);
      saveState(state); 

    },
    reset: (state) => {
      if(state.currentUser) state.currentUser.count = 0;
      saveState(state); 
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      if(state.currentUser) state.currentUser.notes = action.payload;
      saveState(state); 
    },
    clearEditor: (state) => {
      if(state.currentUser) state.currentUser.currentNote = ""
      saveState(state); 
    },
    saveCurrentNote: (state, action: PayloadAction<string>) => {
      if(state.currentUser) state.currentUser.currentNote = action.payload
      saveState(state); 
    }
  }  
});

export const { createUser, removeUser, setUser, increment, decrement, reset, setNotes, clearEditor, saveCurrentNote } = userSlice.actions;
export default userSlice.reducer;