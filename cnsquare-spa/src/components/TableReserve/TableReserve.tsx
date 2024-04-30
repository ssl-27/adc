import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Breadcrumbs, Link, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from 'react-router-dom';
import adcAxios from '../../utils/cn-axios';
import { v4 as uuidv4 } from 'uuid';



function TableReserve() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [estimatedTime, setEstimatedTime] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(user)
  const [formData, setFormData] = useState<Reservation>({
    id: 0,
    ticketId: uuidv4(),
    headCount: 1,
    userId: 0,
    arrivalTime: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    tableNumber: 0,
  });

  useEffect(() => {
    setFormData(({
      ...formData,
      userId: parseInt(user.id as string),
    }))
  }, [user])

  const handlePersonChange = useCallback((event) => {
    setNumberOfPersons(parseInt(event.target.value));
    setFormData(({
      ...formData,
      headCount: parseInt(event.target.value),
    }))
  }, [formData]);

  const handleTimeChange = useCallback((time) => {
    setEstimatedTime(time);
    setFormData(({
      ...formData,
      arrivalTime: time,
    }))
  }, [formData]);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    adcAxios.post("/reservation", formData).then((response) => {
      console.log(response)
      navigate("/reservationCode");
      
    });
    console.log('Reservation submitted!');
  }, [formData, user]);

  return (
    <div>
        <Breadcrumbs>
            <Link
            underline="hover"
            color="inherit"
            onClick={() => {
                navigate("/");
            }}
            sx={{ cursor: "pointer"}}
            >
            Home
            </Link>
        <Typography color="text.primary">Table Reservation</Typography>
      </Breadcrumbs>
      <br></br>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel id="persons-label">Number of Persons:</InputLabel>
          <Select
            labelId="persons-label"
            id="persons"
            value={numberOfPersons}
            onChange={handlePersonChange}
            style={{width: '150px', height: '30px'} }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
        <div style={{ marginTop: '1rem'}}>
          <InputLabel htmlFor="time">Estimated Time of Arrival:</InputLabel>
          <div style={{ display: 'flex', alignItems: 'center', width: '200px' }}>
            <AccessTimeIcon style={{ marginRight: '0.5rem' }} />
            <div>
              <TimePicker
                id="time"
                value={estimatedTime}
                onChange={handleTimeChange}
                clearIcon={null} // Remove the clear icon
                clockIcon={null} // Remove the clock icon
              />
            </div>
          </div>
        </div>
        <Button variant="contained" type="submit" style={{ marginTop: '1rem' }}>
          Reserve Table
        </Button>
      </form>
    </div>
  );
}

export default TableReserve;