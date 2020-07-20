import { Wine } from "./Wine";

export interface Historic {
  codigo: string;
  data: string;
  cliente: string;
  itens: Wine[];
  valorTotal: number;
}
