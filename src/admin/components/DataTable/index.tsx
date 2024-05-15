import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import './DataTable.css';
import { Link } from 'react-router-dom';
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {
  const handleDelete = (id: number) => {
    //delete the item
    // mutation.mutate(id)
  };

  // const actionColumn: GridColDef = {
  //   field: 'action',
  //   headerName: 'Các thao tác',
  //   width: 100,
  //   renderCell: (params) => {
  //     return (
  //       <div className="dataTable__action f-flex justify-content-center">
  //         <Link to={`/${props.slug}/${params.row.id}`}>
  //           <img src="/view.svg" alt="" />
  //         </Link>
  //         <div
  //           className="dataTable__delete"
  //           onClick={() => handleDelete(params.row.id)}
  //         >
  //           <img src="/delete.svg" alt="" />
  //         </div>
  //       </div>
  //     );
  //   },
  // };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataTable__dataGrid"
        rows={props.rows}
        columns={[...props.columns]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
    </div>
  );
};

export default DataTable;
