import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";

export class PurchasesStats {
  customers: Customer[] = [];
  purchasesHistorics: Historic[] = [];

  constructor(customers: Customer[] = [], purchasesHistorics: Historic[] = []) {
    this.customers = customers;
    this.purchasesHistorics = purchasesHistorics;
  }

  getBiggestSinglePurchaseCustomersOfYear = (
    year: string | number
  ): Customer | boolean => {
    const purchasesHistoricsOfYear = this.getPurchasesHistoricsOfYear(year);

    const {
      biggestSinglePurchase,
      biggestSinglePurchaseCustomerReference,
    } = this.getBiggestSinglePurchaseOfYear(purchasesHistoricsOfYear);

    const biggestSinglePurchaseCustomer = this.getPurchaseCustomer(
      biggestSinglePurchaseCustomerReference
    );

    return biggestSinglePurchaseCustomer[0]
      ? {
          ...biggestSinglePurchaseCustomer[0],
          itensComprados: biggestSinglePurchase,
        }
      : false;
  };

  getPurchasesHistoricsOfYear = (year: string | number) => {
    return this.purchasesHistorics.filter(
      (purchaseHistoric) => purchaseHistoric.data.indexOf(`${year}`) > -1
    );
  };

  getBiggestSinglePurchaseOfYear = (purchasesHistoricsOfYear: Historic[]) => {
    let biggestSinglePurchase = 0;
    let biggestSinglePurchaseCustomerReference = "";

    purchasesHistoricsOfYear.forEach((historic: Historic) => {
      if (historic.itens.length > biggestSinglePurchase) {
        biggestSinglePurchase = historic.itens.length;
        biggestSinglePurchaseCustomerReference = historic.cliente;
      }
    });

    return { biggestSinglePurchase, biggestSinglePurchaseCustomerReference };
  };

  getPurchaseCustomer = (biggestSinglePurchaseCustomerReference: string) => {
    return this.customers.filter((customer) => {
      return this.isCustomerPurchases(
        customer.cpf,
        biggestSinglePurchaseCustomerReference
      );
    });
  };

  isCustomerPurchases = (cpf: string, customer: string): boolean => {
    const normalizedCpf = this.customerCpfToPurchaseReference(cpf);

    return cpf && customer ? customer.indexOf(normalizedCpf) > -1 : false;
  };

  customerCpfToPurchaseReference = (cpf: string): string => {
    return cpf?.replace("-", ".");
  };
}
