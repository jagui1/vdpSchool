export interface DeleteDialogData {
  title: string;
  entityName: string;
  fields: {
    label: string;
    value: string;
  }[];
}
