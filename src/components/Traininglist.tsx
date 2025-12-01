import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams, GridValueFormatter } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import EditTraining from './EditTraining';
import AddTraining from './AddTraining';
import type { Training, Customer } from '../types';
import { getTrainings, deleteTraining, getCustomers } from '../Customerapi';

function Traininglist() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchTrainings();
        fetchCustomers();
    }, []);

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.error(err))
    };

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure")) {
            deleteTraining(url)
            .then(() => fetchTrainings())
            .catch(err => console.error(err))
        }
    };

    const columns: GridColDef[] = [
        { field: 'date', width: 200 }, 
        { field: 'duration', width: 150 },
        { field: 'activity', width: 150 },
        { field: 'customer', width: 150 },
        {
            headerName: "",
            sortable: false,
            filterable: false,
            field: '_links.self.href',
            renderCell: (params: GridRenderCellParams) => 
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        },
        {
            headerName: "",
            sortable: false,
            filterable: false,
            field: "_links.training.href",
            renderCell: (params: GridRenderCellParams) =>
                <EditTraining fetchTrainings={fetchTrainings} trainingRow={params.row} />
        }
    ]

    return(
        <>
            <AddTraining fetchTraining={fetchTrainings} />
            <div style ={{ width: '90%', height: 500, margin: 'auto' }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}

export default Traininglist