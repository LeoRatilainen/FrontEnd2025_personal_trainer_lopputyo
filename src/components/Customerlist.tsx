import { useState, useEffect } from 'react';
import type { Customer } from '../types';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getCustomers, deleteCustomer } from '../Customerapi';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

function Customerlist() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        getCustomers()
        .then(data => setCustomers(data.embedded.customers))
        .catch(err => console.error(err))
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure")) {
            deleteCustomer(url)
            .then(() => fetchCustomers())
            .catch(err => console.error(err))
        }
    }

    const columns: GridColDef[] = [
        { field: 'firstname', width: 150 },
        { field: 'lastname', width: 150 },
        { field: 'streetaddress', width: 150 },
        { field: 'postcode', width: 150  },
        { field: 'city', width: 150  },
        { field: 'email', width: 150  },
        { field: 'phone', width: 150  },
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
            field: "_links.customer.href",
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer fetchCustomers={fetchCustomers} customerRow={params.row} />
        }
    ]

    return(
        <>
            <AddCustomer fetchCustomer={fetchCustomers} />
            <div style ={{ width: '90%', height: 500, margin: 'auto' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}

export default Customerlist