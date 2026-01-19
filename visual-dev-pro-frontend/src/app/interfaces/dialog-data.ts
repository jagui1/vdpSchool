export interface DialogData {
  title: string;
  entity: string;
  fields: {
    label: string;
    value: string;
    type: string;
  }[];
}
