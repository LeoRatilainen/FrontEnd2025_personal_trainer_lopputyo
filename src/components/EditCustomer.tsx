import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { CustomerForm, Customer } from '../types';

type EditCustomerProps = {
    fetchCustomers: () => void;
    customerRow: Customer;
}

export default function EditCustomer({ fetchCustomers, customerRow }: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerForm>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: customerRow.firstname,
            lastname: customerRow.lastname,
            streetaddress: customerRow.streetaddress,
            postcode: customerRow.postcode,
            city: customerRow.city,
            email: customerRow.email,
            phone: customerRow.phone,
        })
    };

    const handleClose = () => {
        setOpen(false);
        setCustomer({
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: "",
        })
    };

    const handleSave = () => {
        if (!customer.firstname || !customer.lastname) {
            alert("Enter values first");
            return;
        }

        fetch(customerRow._links.customer.href, {
            method: "PUT",
            headers: { "content-type":"application/json" },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when editing Customer");

            return response.json();
        })
        .then(() => {
            fetchCustomers();
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
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        required
                        label="firstname"
                        value={customer.firstname}
                        onChange={event => setCustomer({...customer, firstname: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="lastname"
                        value={customer.lastname}
                        onChange={event => setCustomer({...customer, lastname: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="streetaddress"
                        value={customer.streetaddress}
                        onChange={event => setCustomer({...customer, streetaddress: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="postcode"
                        value={customer.postcode}
                        onChange={event => setCustomer({...customer, postcode: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="city"
                        value={customer.city}
                        onChange={event => setCustomer({...customer, city: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="email"
                        value={customer.email}
                        onChange={event => setCustomer({...customer, email: event.target.value})}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="phone"
                        value={customer.phone}
                        onChange={event => setCustomer({...customer, phone: event.target.value})}
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