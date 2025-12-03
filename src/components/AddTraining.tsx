import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer, TrainingForm } from '../types';
import { saveTraining } from '../Customerapi';
import { getCustomers } from '../Customerapi';
import { MenuItem } from '@mui/material';

type AddTrainingProps = {
    fetchTraining: () => void;
}

export default function AddTraining({ fetchTraining }: AddTrainingProps) {
    const [open,setOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [training, setTraining] = useState<TrainingForm>({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    })

        useEffect(() => {
        getCustomers().then(data => setCustomers(data._embedded.customers));
        }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: "",
            duration: "",
            activity: "",
            customer: "",
        })
    };
    
    const handleSave = () => {
        if (!training.date || !training.activity) {
            alert("Enter values first");
            return;
        }

        saveTraining({...training,
            date: dayjs(training.date).toISOString(),
        })
        .then(() => {
            fetchTraining();
            handleClose();
        })
        .catch(err => console.error(err))
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
            Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new Training</DialogTitle>
                <DialogContent>
                    <TextField
                        type="datetime-local"
                        margin="dense"
                        required
                        label="date"
                        value={training.date}
                        onChange={event => setTraining({...training, date: event.target.value})}
                        fullWidth
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        label="duration"
                        value={training.duration}
                        onChange={event => setTraining({...training, duration: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="activity"
                        value={training.activity}
                        onChange={event => setTraining({...training, activity: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        select
                        margin="dense"
                        fullWidth
                        label="Customer"
                        value={training.customer}
                        onChange={event => setTraining({ ...training, customer: event.target.value })}
                    >
                        {customers.map(c => (
                            <MenuItem key={c._links.self.href} value={c._links.self.href}>
                                {c.firstname} {c.lastname}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}