import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSpring, animated } from '@react-spring/web';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
} from '@mui/material';
import Header from './Header';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { increment, decrement, reset, setNotes, clearEditor, saveCurrentNote } from '../utils/userSlice';

interface Note {
  id: number;
  content: string;
}

const Notes: React.FC = () => {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state)=>state.user.currentUser?.count)
  const notes = useAppSelector((state)=>state.user.currentUser?.notes)
  const content = useAppSelector((state)=>state.user.currentUser?.currentNote)

  const handleSave = () => {
      if (content && content.trim()) {
        const newNote: Note = {
        id: Date.now(),
        content: content,
      };
      if(notes)
      dispatch(setNotes([...notes, newNote]));
      dispatch(clearEditor());
    }
  };

  const handleDeleteNote = (id: number) => {
    if(notes)
     dispatch(setNotes(notes.filter((note) => note.id !== id)));
  };

  const handleIncrement = () => {
    dispatch(increment())
  };

  const handleDecrement = () => {
    dispatch(decrement())
  };

  const handleReset = () => {
    dispatch(reset())
  };

  const backgroundAnimation = useSpring({
    height: `${count}%`,
    config: { tension: 100, friction: 20, precision: 0.1 }, 
  });

  return (
    <Container sx={{ padding: 3, position: 'relative', overflow: 'hidden' }}>
      <animated.div
        style={{
          ...backgroundAnimation,
          backgroundColor: '#2196f3',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: -1, 
        }}
      />
      <Header />
      <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>
        Create Note Here
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(content)=>dispatch(saveCurrentNote(content))}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          }}
          formats={[
            'header',
            'bold',
            'italic',
            'underline',
            'strike',
            'list',
            'bullet',
            'link',
            'image',
          ]}
        />
        <Box sx={{ marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Paper>
      <Typography variant="h5" gutterBottom>
        Your Notes
      </Typography>
      {notes?.length === 0 ? (
        <Typography variant="body1">No notes have been created.</Typography>
      ) : (
        <Box>
          {notes?.map((note) => (
            <Box sx={{ marginTop: '20px' }} key={note.id}>
              <Paper elevation={2} sx={{ padding: 2 }}>
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      )}
      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        <Button variant="contained">
           Count: {count}
        </Button>
        <Button variant="contained" color="primary" onClick={handleIncrement}>
          Increment (+1)
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDecrement}>
          Decrement (-1)
        </Button>
        <Button variant="outlined" color="error" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Container>
  );
};

export default Notes;