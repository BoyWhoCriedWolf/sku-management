import TableManagement from "components/table-management";
import skuService from "services/sku.service";
import { Sku } from "services/types/sku.types";
import { FieldType } from "types/ui-types";

const SkusList = () => {
  return (
    <TableManagement<Sku>
      apiService={skuService}
      pageTitle="Sku Categories"
      title="Sku Category"
      columns={[
        { headerName: "Medication Name", field: "medication_name" },
        { headerName: "Dose", field: "Dose" },
        { headerName: "Unit", field: "unit" },
        { headerName: "Presentation", field: "presentation" },
        { headerName: "Countries", field: "countries" },
      ]}
      fields={[
        {
          displayName: "Medication Name",
          name: "medication_name",
          type: FieldType.Text,
        },
        { displayName: "Dose", name: "Dose", type: FieldType.MultiLineText },
        { displayName: "Unit", name: "unit", type: FieldType.Text },
        {
          displayName: "Presentation",
          name: "presentation",
          type: FieldType.MultiLineText,
        },
        {
          displayName: "Countries",
          name: "countries",
          type: FieldType.MultiLineText,
        },
      ]}
    />
  );
};

export default SkusList;
