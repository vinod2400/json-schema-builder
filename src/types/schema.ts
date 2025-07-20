export interface Field {
  id: string;
  name: string;
  type: string;
  children?: Field[];
}
