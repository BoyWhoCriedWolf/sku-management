import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, Grid, IconButton } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridValidRowModel,
} from "@mui/x-data-grid";
import ConfirmButtonContainer from "components/containers/confirm-button-container";
import { ReactNode, useMemo } from "react";

function PrimaryTable<T = GridValidRowModel>({
  columns = [] as Array<GridColDef>,
  data = [] as Array<T>,
  isAction = false as Boolean,

  onClickRow = () => null,

  checkboxSelection = false,

  onEdit,
  onDelete,
  onView,

  hideFooterPagination = false,

  actionsF,
  inlineEdit = false,
}: {
  columns?: Array<GridColDef>;
  data?: Array<Partial<T>>;
  isAction?: Boolean;

  onClickRow?: (row: T, rowIndex?: number, self?: Array<T>) => void;

  checkboxSelection?: boolean;

  onEdit?: (row: T, rowIndex?: number, self?: Array<T>) => void;
  onDelete?: (row: T, rowIndex?: number, self?: Array<T>) => void;
  onView?: (row: T, rowIndex?: number, self?: Array<T>) => void;

  hideFooterPagination?: boolean;

  actionsF?: (value: T, valueIndex?: number) => ReactNode;
  inlineEdit?: boolean;
}) {
  const formattedData = useMemo(
    () =>
      data.map((item, itemIndex) => {
        return {
          ...(item ?? {}),
          // @ts-ignore
          id: item?.id ?? itemIndex,
        } as GridValidRowModel;
      }),
    [data]
  );

  const hasOnEdit = typeof onEdit === "function";
  const hasOnDelete = typeof onDelete === "function";
  const hasOnView = typeof onView === "function";
  const hasAdditionalActions = typeof actionsF === "function";
  const hasActions =
    hasOnEdit || hasOnDelete || hasOnView || hasAdditionalActions;

  const handleRowClick: GridEventListener<"rowClick"> = (
    params,
    event,
    details
  ) => {
    onClickRow(params.row as T);
  };

  const handleEdit = (value: T) => {
    if (onEdit) {
      onEdit(value);
    }
  };

  const handleDelete = (value: T) => {
    if (onDelete) {
      onDelete(value);
    }
  };

  const handleView = (value: T) => {
    if (onView) {
      onView(value);
    }
  };

  const formattedColumns: Array<GridColDef> = useMemo(
    () =>
      [
        ...columns.map((item) => ({ ...item, flex: item?.flex ?? 1 })),
        ...((hasActions
          ? [
              {
                headerName: "Actions",
                renderCell: (p: GridRenderCellParams) => {
                  const disableAction = !!p.row.disableAction;
                  return (
                    <Grid container flexWrap={"nowrap"}>
                      {hasAdditionalActions ? (
                        <Grid item>{actionsF(p.row)}</Grid>
                      ) : null}
                      {hasOnView && !disableAction ? (
                        <Grid item>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleView(p.row)}
                          >
                            <Visibility />
                          </IconButton>
                        </Grid>
                      ) : null}
                      {hasOnEdit && !disableAction ? (
                        <Grid item>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleEdit(p.row)}
                          >
                            <Edit />
                          </IconButton>
                        </Grid>
                      ) : null}
                      {hasOnDelete && !disableAction ? (
                        <Grid item>
                          <ConfirmButtonContainer
                            onClick={() => handleDelete(p.row)}
                          >
                            <IconButton size="small" color="error">
                              <Delete />
                            </IconButton>
                          </ConfirmButtonContainer>
                        </Grid>
                      ) : null}
                    </Grid>
                  );
                },
              },
            ]
          : []) as Array<GridColDef>),
      ] as Array<GridColDef>,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columns, hasActions]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={formattedData}
        columns={formattedColumns}
        checkboxSelection={checkboxSelection}
        onRowClick={handleRowClick}
        hideFooterPagination={
          formattedData.length > 100 ? false : hideFooterPagination
        }
      />
    </Box>
  );
}

export default PrimaryTable;
