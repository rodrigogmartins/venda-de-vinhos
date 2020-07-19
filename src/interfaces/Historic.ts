import { Item } from "./Item";

export interface Historic {
  codigo: string;
  data: string;
  cliente: string;
  itens: Item[];
  valorTotal: number;
}
