import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

export default function Student() {
  const [student, setStudent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/' + id);
      const updatedStudent = student.filter(data => data.id !== id);
      setStudent(updatedStudent);
      openSnackbar('Student deleted successfully'); // Show success message
    } catch (err) {
      console.log(err);
      openSnackbar('Error deleting student'); // Show error message
    }
  };

  const handleSearch = () => {
    // Filter the student data based on the searchTerm
    const filteredStudents = student.filter(data =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setStudent(filteredStudents);
    setIsSearching(true);
  };

  const handleBack = () => {
    setSearchTerm(''); // Clear the search term
    setIsSearching(false);
    // Reset to the full student data
    axios.get('http://localhost:8081/')
      .then(res => setStudent(res.data))
      .catch(err => console.log(err));
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h2>HEY, YOUR STUDENTS LIST</h2>

      <div style={{ width: '60%', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <Link to="/create">
              <Button variant="contained">ADD +</Button>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
            />
            <IconButton
              aria-label="Search"
              style={{ color: '#4CAF50', padding: '8px', fontSize: '16px' }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
            {isSearching && (
              <Button variant="contained" color="primary" onClick={handleBack}>
                Back
              </Button>
            )}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((data, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{data.id}</TableCell>
                  <TableCell align="center">{data.name}</TableCell>
                  <TableCell align="center">{data.email}</TableCell>
                  <TableCell align="center">
                    <Link to={`update/${data.id}`}>
                      <IconButton aria-label="Edit" style={{ color: '#279107' }}>
                        <EditIcon />
                      </IconButton>
                    </Link>

                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDelete(data.id)}
                      style={{ color: '#F4523D' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={closeSnackbar}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarMessage.includes('Error') ? '#E282D9' : '#279107',
          }}
        />
      </Snackbar>
    </div>
  );
}
