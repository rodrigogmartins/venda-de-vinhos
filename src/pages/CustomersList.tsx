import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Customer } from "../interfaces/Customer";
import { Historic } from "../interfaces/Historic";

const CustomerList: React.FC = () => {
  let orderedCustomers: Customer[] = [];
  const customersApiEndpoint = process.env.REACT_APP_ENDPOINT_USER || "";
  const historicsApiEndpoint = process.env.REACT_APP_ENDPOINT_HISTORIC || "";
  const customers = useFetch<Customer[]>(customersApiEndpoint).data;
  const purchasesHistorics = useFetch<Historic[]>(historicsApiEndpoint).data;

  if (!customers && !purchasesHistorics) {
    return <p>Carregando...</p>;
  } else {
    orderedCustomers = OrderByHighestTotalPurchaseValue(
      customers,
      purchasesHistorics
    );
  }

  return (
    <ul>
      {orderedCustomers?.map((customer) => (
        <li key={customer.id}>
          <Link to={`/customer/${customer.id}`}>
            {customer.nome} - R$ {customer.gastoTotal.toFixed(2)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const OrderByHighestTotalPurchaseValue = (
  customers: Customer[] = [],
  purchasesHistorics: Historic[] = []
): Customer[] => {
  const customersWithTotalSpend: Customer[] = [];

  customers.forEach((customer) => {
    const customerTotalPurchase = getTotalPurchaseValue(
      customer,
      purchasesHistorics
    );

    customersWithTotalSpend.push({
      ...customer,
      gastoTotal: customerTotalPurchase,
    });
  });

  return customersWithTotalSpend.sort((a, b) => b.gastoTotal - a.gastoTotal);
};

const getTotalPurchaseValue = (
  customer: Customer,
  purchasesHistorics: Historic[] = []
): number => {
  try {
    const customerPurchases = getCustomerPurchases(
      customer,
      purchasesHistorics
    );
    const purchasesValues = getTotalPurchasesValues(customerPurchases);

    return purchasesValues.reduce(
      (totalPurchaseValue: number = 0, purchaseValue: number) =>
        (totalPurchaseValue += purchaseValue)
    );
  } catch (error) {
    return 0;
  }
};

const getTotalPurchasesValues = (customerPurchases: Historic[]): number[] => {
  return customerPurchases.map(
    (customerPurchases) => customerPurchases.valorTotal
  );
};

const getCustomerPurchases = (
  customer: Customer,
  purchasesHistorics: Historic[] = []
): Historic[] => {
  return purchasesHistorics.filter((purchaseHistoric) =>
    isCustomerPurchases(customer, purchaseHistoric)
  );
};

const isCustomerPurchases = (
  customer: Customer,
  purchaseHistoric: Historic
): boolean => {
  const normalizedCpf = customerCpfToPurchaseReference(customer.cpf);

  return purchaseHistoric.cliente.indexOf(normalizedCpf) > -1;
};

const customerCpfToPurchaseReference = (cpf: string): string => {
  return cpf?.replace("-", ".");
};

export default CustomerList;
