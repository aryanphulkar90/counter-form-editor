import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
} from '@mui/material';
import Header from './Header';

interface Note {
  id: number;
  content: string;
}

const Notes: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSave = () => {
    if (content.trim()) {
      const newNote: Note = {
        id: Date.now(), 
        content: content,
      };
      setNotes([...notes, newNote]);
      setContent(''); 
    }
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id)); 
  };

  return (
    <Container sx={{ padding: 3 }}>
      <Header/>
      <Typography variant="h5" sx={{marginBottom: '20px', marginTop: '20px'}}>
        Create Note Here
      </Typography>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
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
      {notes.length === 0 ? (
        <Typography variant="body1">No notes have been created.</Typography>
      ) : (
        <Box>
          {notes.map((note) => (
            <Box sx={{marginTop:'20px'}} key={note.id}>
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
    </Container>
  );
};

export default Notes;