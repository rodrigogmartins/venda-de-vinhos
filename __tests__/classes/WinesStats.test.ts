import { WinesStats } from "../../src/classes/WinesStats";

describe("Tests getTopSaleWines()", () => {
  it("Should return array with 3 objects type Wine in desc order by property 'quantidadeVendas'", () => {
    const purchaseHistoric = [
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
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
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
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
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
          {
            produto: "Casa Silva Gran Reserva",
            variedade: "Petit Verdot",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2009",
            preco: 120,
          },
        ],
        valorTotal: 278,
      },
    ];

    const winesStats = new WinesStats(purchaseHistoric);

    expect(winesStats.getTopSaleWines(3)).toStrictEqual([
      {
        categoria: "Tinto",
        pais: "Chile",
        preco: 79,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 3,
        safra: "2014",
        variedade: "Cabernet Sauvignon",
      },
      {
        categoria: "Branco",
        pais: "Chile",
        preco: 79,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 2,
        safra: "2015",
        variedade: "Sauvignon Blanc",
      },
      {
        categoria: "Tinto",
        pais: "Chile",
        preco: 120,
        produto: "Casa Silva Gran Reserva",
        quantidadeVendas: 1,
        safra: "2009",
        variedade: "Petit Verdot",
      },
    ]);
  });

  it("Test limit higher than elements lenght. Should return array with 2 objects type Wine in desc order by property 'quantidadeVendas'", () => {
    const purchaseHistoric = [
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
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
          {
            produto: "Casa Silva Reserva",
            variedade: "Cabernet Sauvignon",
            pais: "Chile",
            categoria: "Tinto",
            safra: "2014",
            preco: 79,
          },
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
      {
        codigo: "4a7c9be2-5231-4dff-b8e7-9a639286726e",
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
          {
            produto: "Casa Silva Reserva",
            variedade: "Sauvignon Blanc",
            pais: "Chile",
            categoria: "Branco",
            safra: "2015",
            preco: 79,
          },
        ],
        valorTotal: 278,
      },
    ];

    const winesStats = new WinesStats(purchaseHistoric);

    expect(winesStats.getTopSaleWines(3)).toStrictEqual([
      {
        categoria: "Tinto",
        pais: "Chile",
        preco: 79,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 3,
        safra: "2014",
        variedade: "Cabernet Sauvignon",
      },
      {
        categoria: "Branco",
        pais: "Chile",
        preco: 79,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 2,
        safra: "2015",
        variedade: "Sauvignon Blanc",
      },
    ]);
  });

  it("Test without objects. Should return empty array", () => {
    const winesStats = new WinesStats();

    expect(winesStats.getTopSaleWines(3)).toStrictEqual([]);
  });
});

describe("Tests getTopSaledItems()", () => {
  it("Should return array with 3 objects type Wine in desc order by property 'quantidadeVendas'", () => {
    const winesStats = new WinesStats();
    const winesStringObject = {
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Tinto**2014**79": 2,
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Branco**2011**99": 5,
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Tinto**1997**999": 10,
      "Casa Silva Reserva**Cabernet Sauvignon**Panamá**Branco**1697**9999": 37,
    };

    expect(winesStats.getTopSaledItems(winesStringObject, 3)).toStrictEqual([
      {
        categoria: "Branco",
        pais: "Panamá",
        preco: 9999,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 37,
        safra: "1697",
        variedade: "Cabernet Sauvignon",
      },
      {
        categoria: "Tinto",
        pais: "Chile",
        preco: 999,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 10,
        safra: "1997",
        variedade: "Cabernet Sauvignon",
      },
      {
        categoria: "Branco",
        pais: "Chile",
        preco: 99,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 5,
        safra: "2011",
        variedade: "Cabernet Sauvignon",
      },
    ]);
  });

  it("Test limit higher than elements lenght. Should return array with 2 objects type Wine in desc order by property 'quantidadeVendas'", () => {
    const winesStats = new WinesStats();
    const winesStringObject = {
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Branco**2011**99": 5,
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Tinto**1997**999": 10,
    };

    expect(winesStats.getTopSaledItems(winesStringObject, 3)).toStrictEqual([
      {
        categoria: "Tinto",
        pais: "Chile",
        preco: 999,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 10,
        safra: "1997",
        variedade: "Cabernet Sauvignon",
      },
      {
        categoria: "Branco",
        pais: "Chile",
        preco: 99,
        produto: "Casa Silva Reserva",
        quantidadeVendas: 5,
        safra: "2011",
        variedade: "Cabernet Sauvignon",
      },
    ]);
  });

  it("Test without objects. Should return empty array", () => {
    const winesStats = new WinesStats();
    const winesStringObject = {};

    expect(winesStats.getTopSaledItems(winesStringObject, 3)).toStrictEqual([]);
  });
});

describe("Tests getSaledItemsReferenceOnDescOrder()", () => {
  it("Should return array of object entryes ordered by value", () => {
    const winesStats = new WinesStats();
    const itemsObejct = {
      item0: 99,
      item1: 45,
      item2: 158,
    };

    expect(
      winesStats.getSaledItemsReferenceOnDescOrder(itemsObejct)
    ).toStrictEqual(["item2", "item0", "item1"]);
  });

  it("Should return array with only one element", () => {
    const winesStats = new WinesStats();
    const itemsObejct = {
      item0: 99,
    };

    expect(
      winesStats.getSaledItemsReferenceOnDescOrder(itemsObejct)
    ).toStrictEqual(["item0"]);
  });
  it("Should return empty array", () => {
    const winesStats = new WinesStats();
    const itemsObejct = {};

    expect(
      winesStats.getSaledItemsReferenceOnDescOrder(itemsObejct)
    ).toStrictEqual([]);
  });
});

describe("Tests parseItemStringToObject()", () => {
  it("Should return Wine type object", () => {
    const winesStats = new WinesStats();
    const wineString =
      "Casa Silva Reserva**Cabernet Sauvignon**Chile**Tinto**2014**79**2";

    expect(winesStats.parseItemStringToObject(wineString)).toStrictEqual({
      produto: "Casa Silva Reserva",
      variedade: "Cabernet Sauvignon",
      pais: "Chile",
      categoria: "Tinto",
      safra: "2014",
      preco: 79,
      quantidadeVendas: 2,
    });
  });

  it("Should return false: None props", () => {
    const winesStats = new WinesStats();
    const wineString = "";

    expect(winesStats.parseItemStringToObject(wineString)).toStrictEqual(false);
  });

  it("Should return false: One property left", () => {
    const winesStats = new WinesStats();
    const wineString = "Cabernet Sauvignon**Chile**Tinto**2014**79**2";

    expect(winesStats.parseItemStringToObject(wineString)).toStrictEqual(false);
  });
});
