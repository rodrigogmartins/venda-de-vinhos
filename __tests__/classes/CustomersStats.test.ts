import { CustomersStats } from "../../src/classes/CustomersStats";

describe("Tests getLoyalCustomers()", () => {
  it("Should return array with only 5 customers ordered by 'gastoTotal' Desc. ", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
      {
        id: 3,
        nome: "Joel",
        cpf: "000.000.000-03",
      },
      {
        id: 4,
        nome: "Gustavo",
        cpf: "000.000.000-04",
      },
      {
        id: 5,
        nome: "Raquel",
        cpf: "000.000.000-05",
      },
      {
        id: 6,
        nome: "Pamela",
        cpf: "000.000.000-06",
      },
      {
        id: 7,
        nome: "Bruno",
        cpf: "000.000.000-07",
      },
    ];

    const purchasesHistorics = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.01",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2018",
        cliente: "0000.000.000.03",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.05",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.04",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
    ];

    const customersStats = new CustomersStats(customers, purchasesHistorics);

    expect(customersStats.getLoyalCustomers()).toStrictEqual([
      {
        cpf: "000.000.000-02",
        id: 2,
        itensComprados: 2,
        nome: "Marcos",
      },
      {
        cpf: "000.000.000-01",
        id: 1,
        itensComprados: 1,
        nome: "Vinicius",
      },
      {
        cpf: "000.000.000-03",
        id: 3,
        itensComprados: 1,
        nome: "Joel",
      },
      {
        cpf: "000.000.000-04",
        id: 4,
        itensComprados: 1,
        nome: "Gustavo",
      },
      {
        cpf: "000.000.000-05",
        id: 5,
        itensComprados: 1,
        nome: "Raquel",
      },
    ]);
  });

  it("Should return array of 2 customers ordered by 'gastoTotal' Desc. ", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
    ];

    const purchasesHistorics = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.07",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2018",
        cliente: "0000.000.000.05",
        itens: [],
        valorTotal: 278,
      },
    ];

    const customersStats = new CustomersStats(customers, purchasesHistorics);

    expect(
      customersStats.getCustomersOrderedByHighestTotalPurchaseValue()
    ).toStrictEqual([
      { cpf: "000.000.000-02", gastoTotal: 278, id: 2, nome: "Marcos" },
      { cpf: "000.000.000-01", gastoTotal: 0, id: 1, nome: "Vinicius" },
    ]);
  });

  it("Should return empty array", () => {
    const customersStats = new CustomersStats();

    expect(
      customersStats.getCustomersOrderedByHighestTotalPurchaseValue()
    ).toStrictEqual([]);
  });
});

describe("Tests getCustomersOrderedByHighestTotalPurchaseValue()", () => {
  it("Should return array of customers ordered by 'gastoTotal' Desc. ", () => {
    const customers = [
      {
        id: 1,
        nome: "Vinicius",
        cpf: "000.000.000-01",
      },
      {
        id: 2,
        nome: "Marcos",
        cpf: "000.000.000-02",
      },
    ];

    const purchasesHistorics = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-01-2015",
        cliente: "0000.000.000.07",
        itens: [],
        valorTotal: 278,
      },
      {
        data: "22-10-2018",
        cliente: "0000.000.000.05",
        itens: [],
        valorTotal: 278,
      },
    ];

    const customersStats = new CustomersStats(customers, purchasesHistorics);

    expect(
      customersStats.getCustomersOrderedByHighestTotalPurchaseValue()
    ).toStrictEqual([
      { cpf: "000.000.000-02", gastoTotal: 278, id: 2, nome: "Marcos" },
      { cpf: "000.000.000-01", gastoTotal: 0, id: 1, nome: "Vinicius" },
    ]);
  });

  it("Should return empty array", () => {
    const customersStats = new CustomersStats();

    expect(
      customersStats.getCustomersOrderedByHighestTotalPurchaseValue()
    ).toStrictEqual([]);
  });
});

describe("Tests getTotalItemsPurchased()", () => {
  it("Only one purchase. Should return 1", () => {
    const purchaseHistoric = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Chardonnay",
            pais: "Chile",
            categoria: "Branco",
            safra: "2016",
            preco: 79,
          },
        ],
        valorTotal: 79,
      },
    ];
    const customersStats = new CustomersStats([]);

    expect(
      customersStats.getTotalItemsPurchased(purchaseHistoric)
    ).toStrictEqual(1);
  });

  it("Should return 0", () => {
    const customersStats = new CustomersStats();

    expect(customersStats.getTotalItemsPurchased()).toStrictEqual(0);
  });
});

describe("Tests getTotalPurchaseValue()", () => {
  it("Only one item. Should return object of type Historic[]", () => {
    const purchaseHistoric = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [],
        valorTotal: 79,
      },
    ];
    const customersStats = new CustomersStats([], purchaseHistoric);

    expect(
      customersStats.getTotalPurchaseValue(purchaseHistoric)
    ).toStrictEqual(79);
  });

  it("Should return 158", () => {
    const purchaseHistoric = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [],
        valorTotal: 79,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [],
        valorTotal: 79,
      },
    ];
    const customersStats = new CustomersStats();

    expect(
      customersStats.getTotalPurchaseValue(purchaseHistoric)
    ).toStrictEqual(158);
  });

  it("Should return 0", () => {
    const customersStats = new CustomersStats();

    expect(customersStats.getTotalPurchaseValue()).toStrictEqual(0);
  });
});

describe("Tests getCustomerPurchases()", () => {
  it("Only one item. Should return object of type Historic[]", () => {
    const purchaseHistoric = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.03",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
    ];
    const customersStats = new CustomersStats([], purchaseHistoric);
    const customer = {
      id: 1,
      nome: "Vinicius",
      cpf: "000.000.000-02",
    };

    expect(customersStats.getCustomerPurchases(customer)).toStrictEqual([
      {
        cliente: "0000.000.000.02",
        data: "22-10-2015",
        itens: [
          {
            categoria: "Tinto",
            pais: "Chile",
            preco: 79,
            produto: "Casa Silva Reserva",
            safra: "2014",
            variedade: "Cabernet Sauvignon",
          },
        ],
        valorTotal: 278,
      },
    ]);
  });

  it("Should return object of type Historic[] with 2 elements", () => {
    const purchaseHistoric = [
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        data: "22-10-2015",
        cliente: "0000.000.000.02",
        itens: [
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
    ];
    const customersStats = new CustomersStats([], purchaseHistoric);
    const customer = {
      id: 1,
      nome: "Vinicius",
      cpf: "000.000.000-02",
    };

    expect(customersStats.getCustomerPurchases(customer)).toStrictEqual([
      {
        cliente: "0000.000.000.02",
        data: "22-10-2015",
        itens: [
          {
            categoria: "Tinto",
            pais: "Chile",
            preco: 79,
            produto: "Casa Silva Reserva",
            safra: "2014",
            variedade: "Cabernet Sauvignon",
          },
        ],
        valorTotal: 278,
      },
      {
        cliente: "0000.000.000.02",
        data: "22-10-2015",
        itens: [
          {
            categoria: "Tinto",
            pais: "Chile",
            preco: 79,
            produto: "Casa Silva Reserva",
            safra: "2014",
            variedade: "Cabernet Sauvignon",
          },
        ],
        valorTotal: 278,
      },
    ]);
  });

  it("Should return empty array", () => {
    const customersStats = new CustomersStats();
    const customer = {
      id: 1,
      nome: "Vinicius",
      cpf: "000.000.000-01",
    };

    expect(customersStats.getCustomerPurchases(customer)).toStrictEqual([]);
  });
});

describe("Tests isCustomerPurchases()", () => {
  it("Same length. Should return true", () => {
    const customersStats = new CustomersStats();
    const cpf = "000.000.000-01";
    const customer = "000.000.000.01";

    expect(customersStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      true
    );
  });

  it("One zero on left more. Should return true", () => {
    const customersStats = new CustomersStats();
    const cpf = "000.000.000-01";
    const customer = "0000.000.000.01";

    expect(customersStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      true
    );
  });

  it("Should return false", () => {
    const customersStats = new CustomersStats();
    const cpf = "";
    const customer = "0000.000.000.01";

    expect(customersStats.isCustomerPurchases(cpf, customer)).toStrictEqual(
      false
    );
  });
});

describe("Tests customerCpfToPurchaseReference()", () => {
  it("Should return cpf separate by dots", () => {
    const customersStats = new CustomersStats();
    const cpf = "000.000.000-01";

    expect(customersStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      "000.000.000.01"
    );
  });

  it("Should return cpf separate by dots", () => {
    const customersStats = new CustomersStats();
    const cpf = "000.000.000.01";

    expect(customersStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      "000.000.000.01"
    );
  });

  it("Should return empty string", () => {
    const customersStats = new CustomersStats();
    const cpf = "";

    expect(customersStats.customerCpfToPurchaseReference(cpf)).toStrictEqual(
      ""
    );
  });
});
