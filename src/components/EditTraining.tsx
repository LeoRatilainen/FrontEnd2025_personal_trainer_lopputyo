import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { TrainingForm, Training } from '../types';

type EditTrainingProps = {
    fetchTrainings: () => void;
    trainingRow: Training;
}

export default function EditTraining({ fetchTrainings, trainingRow }: EditTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TrainingForm>({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
        setTraining({
            date: trainingRow.date,
            duration: trainingRow.duration,
            activity: trainingRow.activity,
            customer: trainingRow.customer,
        })
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

        fetch(trainingRow._links.training.href, {
            method: "PUT",
            headers: { "content-type":"application/json" },
            body: JSON.stringify(training)
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
        .catch(err => console.error(err))
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        label="date"
                        value={training.date}
                        onChange={event => setTraining({...training, date: event.target.value})}
                        fullWidth
                        variant="standard"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}