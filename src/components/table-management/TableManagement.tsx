import { Add } from "@mui/icons-material";
import { Breakpoint, Button, Grid, GridSize } from "@mui/material";
import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import ModalContainer from "components/containers/modal-container";
import EditForm from "components/edit-form";
import LoaderContainer from "components/loading/loader-container";
import PrimaryTable from "components/table/PrimaryTable";
import PageHeading from "components/typography/page-heading";
import { useSnackbar } from "notistack";
import { ReactNode, useEffect, useMemo, useState } from "react";
import apiService, { APIService } from "services/api.service";
import { StaticField } from "types/ui-types";

function TableManagement<T = GridValidRowModel>({
  pageTitle = "",
  title = "",

  readOnly = false,

  reload = 1,

  columns = [] as Array<GridColDef>,

  formWidth = "sm",
  fields = [],
  viewFields = fields,
  lg = 12,
  md = 12,
  sm = 12,
  xs = 12,
  availableActions = ["Add", "Edit", "Delete"],
  onAdd,
  onEdit,
  onView,
  onDelete,
  onClickRow,

  hideFooterPagination = false,

  apiService: service = apiService,

  filterFields = [],
  filter,

  enableMockup = false,

  // @ts-ignore
  extractId = (v: T) => v?.id ?? "",

  actionsF,

  clickRowToEdit = false,

  formatData = (v: Array<T>) => v as Array<T & { disableAction?: boolean }>,

  inlineEdit = false,
}: {
  pageTitle?: string;
  title?: string;

  readOnly?: boolean;

  reload?: number;

  columns?: Array<GridColDef>;

  formWidth?: Breakpoint;
  filterFields?: Array<Partial<StaticField>>;
  fields?: Array<Partial<StaticField>>;
  viewFields?: Array<Partial<StaticField>>;
  lg?: boolean | GridSize;
  md?: boolean | GridSize;
  sm?: boolean | GridSize;
  xs?: boolean | GridSize;
  availableActions?: Array<"Add" | "Edit" | "View" | "Delete">;

  onAdd?: (v: T) => void;
  onEdit?: (v: T) => void;
  onView?: (v: T) => void;
  onDelete?: (v: T) => void;
  onClickRow?: (v: T) => void;

  hideFooterPagination?: boolean;

  apiService?: APIService;

  filter?: Object;

  enableMockup?: boolean;

  extractId?: (value: T) => string;

  actionsF?: (value: T, valueIndex?: number) => ReactNode;

  clickRowToEdit?: boolean;

  formatData?: (v: Array<T>) => Array<Partial<T> & { disableAction?: boolean }>;
  inlineEdit?: boolean;
}) {
  const snb = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Array<T>>([]);
  const [formData, setFormData] = useState<T>({} as T);
  const [filterFormData, setFilterFormData] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);

  const formattedData = useMemo(() => formatData(data), [data, formatData]);

  const formattedFilterFields = useMemo(
    () =>
      filterFields?.map(
        (item) =>
          ({
            ...(item ?? {}),
            sx: { ...(item?.sx ?? {}), minWidth: 120 },
          } as StaticField)
      ),
    [filterFields]
  );

  const jsonFilter = JSON.stringify(filter ?? {});
  const jsonFilterFormData = JSON.stringify(filterFormData ?? {});

  const hasAdd =
    !readOnly && availableActions.findIndex((item) => item === "Add") >= 0;
  const hasEdit =
    !readOnly && availableActions.findIndex((item) => item === "Edit") >= 0;
  const hasView = availableActions.findIndex((item) => item === "View") >= 0;
  const hasDelete =
    !readOnly && availableActions.findIndex((item) => item === "Delete") >= 0;

  const handleClose = () => setIsOpen(false);
  const handleCloseView = () => setIsOpenView(false);

  const handleAdd = () => {
    if (onAdd) {
      onAdd({} as T);
    } else {
      setFormData({} as T);
      setIsOpen(true);
    }
  };

  const handleEdit = (value: T) => {
    if (onEdit) {
      onEdit(value);
    } else {
      setFormData(value);
      setIsOpen(true);
    }
  };

  const handleView = (value: T) => {
    if (onView) {
      onView(value);
    } else {
      setFormData(value);
      setIsOpenView(true);
    }
  };

  const handleClickRow = (value: T) => {
    if (onClickRow) {
      onClickRow(value);
    }
    if (clickRowToEdit) {
      handleEdit(value);
    }
  };

  const handleDelete = async (value: T) => {
    if (onDelete) {
      onDelete(value);
    } else {
      const id = extractId(value);
      if (id) {
        setIsLoading(true);
        const ret = await service.delete({ id: id });
        console.log(ret);
        setIsLoading(false);
        if (ret.success || enableMockup) {
          snb.enqueueSnackbar(ret.msg ?? "Deleted successfully", {
            variant: "success",
          });

          setData((s = []) => s.filter((item) => !(extractId(item) === id)));
        } else {
          snb.enqueueSnackbar(ret.msg ?? "Delete failed(Unknown error)", {
            variant: "warning",
          });
        }
      } else {
        snb.enqueueSnackbar("Please select a valid row", {
          variant: "warning",
        });
      }
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    const ret = await service.gets(filterFormData);
    console.log(ret);
    setIsLoading(false);
    if (ret.success) {
      setData(ret.data ?? []);
    } else if (enableMockup) {
      setData([{ id: "mockup" } as T]);
    }
  };

  const handleSave = async () => {
    setIsOpen(false);
    setIsLoading(true);
    const ret = await service.save({ data: formData });
    console.log(ret);
    setIsLoading(false);

    if (ret.success) {
      loadData();
    } else if (enableMockup) {
      if (extractId(formData)) {
        setData((s = []) => {
          const matchIndex = s.findIndex(
            (item) => extractId(item) === extractId(formData)
          );
          return [
            ...s.slice(0, matchIndex),
            formData,
            ...s.slice(matchIndex + 1),
          ] as Array<T>;
        });
      } else {
        setData(
          (s = []) =>
            [...s, { ...formData, id: Math.random().toString() }] as Array<T>
        );
      }
    } else {
      setIsOpen(true);
      snb.enqueueSnackbar(ret.msg ?? "Failed to save (Unknown Error)", {
        variant: "warning",
      });
    }
  };

  useEffect(() => {
    setFilterFormData(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonFilter]);

  useEffect(() => {
    if (reload) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, jsonFilterFormData]);

  return (
    <LoaderContainer open={isLoading} style={{ height: "100%" }}>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 2 }}
        flexWrap="nowrap"
      >
        <Grid item>
          {pageTitle ? <PageHeading>{pageTitle}</PageHeading> : null}
        </Grid>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <EditForm
                data={filterFormData}
                onChange={setFilterFormData}
                fields={formattedFilterFields}
              />
            </Grid>
            <Grid item>
              {hasAdd ? (
                <Button
                  onClick={handleAdd}
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                >
                  Add
                </Button>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <PrimaryTable<T>
        data={formattedData}
        columns={columns}
        onEdit={hasEdit ? handleEdit : undefined}
        onView={hasView ? handleView : undefined}
        onDelete={hasDelete ? handleDelete : undefined}
        hideFooterPagination={hideFooterPagination}
        actionsF={actionsF}
        onClickRow={handleClickRow}
        inlineEdit={inlineEdit}
      />

      {/* Edit form */}
      <ModalContainer
        isOpen={isOpen}
        title={title}
        onClose={handleClose}
        okButtonLabel="Save"
        onOk={handleSave}
        maxWidth={formWidth}
      >
        <EditForm<T>
          data={formData}
          onChange={setFormData}
          fields={fields}
          lg={lg}
          md={md}
          sm={sm}
          xs={xs}
        />
      </ModalContainer>

      {/* Edit form */}
      <ModalContainer
        isOpen={isOpenView}
        title={title}
        onClose={handleCloseView}
        maxWidth={formWidth}
      >
        <EditForm<T>
          data={formData}
          onChange={setFormData}
          fields={viewFields}
          readOnly={true}
          lg={lg}
          md={md}
          sm={sm}
          xs={xs}
        />
      </ModalContainer>
    </LoaderContainer>
  );
}

export default TableManagement;
