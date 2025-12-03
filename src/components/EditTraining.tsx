import { useEffect, useState } from 'react';
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingForm, Training, Customer } from '../types';
import { getCustomers } from '../Customerapi';
import { MenuItem } from '@mui/material';

type EditTrainingProps = {
    fetchTrainings: () => void;
    trainingRow: Training;
};

export default function EditTraining({ fetchTrainings, trainingRow }: EditTrainingProps) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [training, setTraining] = useState<TrainingForm>({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    });

    // Load customers
    useEffect(() => {
        getCustomers().then(data => setCustomers(data._embedded.customers));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);

        // Convert ISO → datetime-local format
        const formatted = dayjs(trainingRow.date).format("YYYY-MM-DDTHH:mm");

        setTraining({
            date: formatted,
            duration: trainingRow.duration,
            activity: trainingRow.activity,
            customer: trainingRow.customer,  // existing customer link
        });
    };

    const handleClose = () => {
        setOpen(false);
        setTraining({
            date: "",
            duration: "",
            activity: "",
            customer: "",
        });
    };

    const handleSave = () => {
        if (!training.date || !training.activity) {
            alert("Enter values first");
            return;
        }

        const updated = {
            ...training,
            date: dayjs(training.date).toISOString(), // convert back
        };

        fetch(trainingRow._links.self.href, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(updated),
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when editing Training");
            return response.json();
        })
        .then(() => {
            fetchTrainings();
            handleClose();
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>

                    {/* DATE / TIME INPUT */}
                    <TextField
                        type="datetime-local"
                        margin="dense"
                        required
                        label="Date"
                        value={training.date}
                        onChange={event => setTraining({ ...training, date: event.target.value })}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={event => setTraining({ ...training, duration: event.target.value })}
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={event => setTraining({ ...training, activity: event.target.value })}
                        fullWidth
                        variant="standard"
                    />

                    {/* CUSTOMER SELECT */}
                    <TextField
                        select
                        margin="dense"
                        fullWidth
                        label="Customer"
                        value={training.customer}
                        onChange={event => setTraining({ ...training, customer: event.target.value })}
                        variant="standard"
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
