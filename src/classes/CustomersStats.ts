import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";

export class CustomersStats {
  customers: Customer[] = [];
  purchasesHistorics: Historic[] = [];

  constructor(customers: Customer[] = [], purchasesHistorics: Historic[] = []) {
    this.customers = customers;
    this.purchasesHistorics = purchasesHistorics;
  }

  getLoyalCustomers = (): Customer[] => {
    const customersWithTotalItemsPurchased: Customer[] = [];

    this.customers.forEach((customer) => {
      const customerPurchases = this.getCustomerPurchases(customer);

      const customerTotalItemsPurchased = this.getTotalItemsPurchased(
        customerPurchases
      );

      customersWithTotalItemsPurchased.push({
        ...customer,
        itensComprados: customerTotalItemsPurchased,
      });
    });

    const mostLoyalCustomers = customersWithTotalItemsPurchased.sort(
      (a, b) => b.itensComprados - a.itensComprados
    );

    return mostLoyalCustomers.slice(0, 5);
  };

  getCustomersOrderedByHighestTotalPurchaseValue = (): Customer[] => {
    const customersWithTotalSpend: Customer[] = [];

    this.customers.forEach((customer) => {
      const customerPurchases = this.getCustomerPurchases(customer);

      const customerTotalPurchase = this.getTotalPurchaseValue(
        customerPurchases
      );

      customersWithTotalSpend.push({
        ...customer,
        gastoTotal: customerTotalPurchase,
      });
    });

    return customersWithTotalSpend.sort((a, b) => b.gastoTotal - a.gastoTotal);
  };

  getTotalItemsPurchased = (customerPurchases: Historic[] = []): number => {
    try {
      return customerPurchases.length;
    } catch (error) {
      return 0;
    }
  };

  getTotalPurchaseValue = (customerPurchases: Historic[] = []): number => {
    try {
      const purchasesValues = customerPurchases.map(
        (customerPurchases) => customerPurchases.valorTotal
      );

      return purchasesValues.reduce(
        (totalPurchaseValue: number = 0, purchaseValue: number) =>
          (totalPurchaseValue += purchaseValue)
      );
    } catch (error) {
      return 0;
    }
  };

  getCustomerPurchases = (customer: Customer): Historic[] => {
    return this.purchasesHistorics.filter((purchaseHistoric) =>
      this.isCustomerPurchases(customer.cpf, purchaseHistoric.cliente)
    );
  };

  isCustomerPurchases = (cpf: string, cliente: string): boolean => {
    const normalizedCpf = this.customerCpfToPurchaseReference(cpf);

    return cliente.indexOf(normalizedCpf) > -1;
  };

  customerCpfToPurchaseReference = (cpf: string): string => {
    return cpf?.replace("-", ".");
  };
}
