import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams, } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import EditTraining from './EditTraining';
import AddTraining from './AddTraining';
import type { Training, Customer } from '../types';
import { getTrainings, deleteTraining } from '../Customerapi';

type TrainingWithCustomer = Training & {
    customerName: string;
};

function Traininglist() {
    const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const data = await getTrainings();
            const trainings: Training[] = data._embedded.trainings;

            // fetch each linked customer
            const enriched = await Promise.all(
                trainings.map(async (t) => {
                    try {
                        const res = await fetch(t._links.customer.href);
                        const customer: Customer = await res.json();

                        return {
                            ...t,
                            customerName: `${customer.firstname} ${customer.lastname}`,
                        };
                    } catch (error) {
                        console.error("Error fetching customer", error);
                        return { ...t, customerName: "Unknown" };
                    }
                })
            );

            setTrainings(enriched);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure")) {
            deleteTraining(url)
            .then(() => fetchTrainings())
            .catch(err => console.error(err))
        }
    };

    const columns: GridColDef[] = [
    {
        field: "date",
        width: 200,
        headerName: "Date",
        valueFormatter: (value) =>
        value ? dayjs(value).format("DD.MM.YYYY HH:mm") : "",
    },
        { field: 'duration', width: 150 },
        { field: 'activity', width: 150 },
        { field: 'customerName', headerName: "Customer", width: 200 },
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
];


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