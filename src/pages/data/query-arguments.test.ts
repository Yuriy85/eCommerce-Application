import QueryArgs from "../data/query-arguments";
import { expect, describe, test } from "@jest/globals";

describe("test: getQueryArgs function return IParamsQueryArgs", () => {
  const queryArgs: QueryArgs = new QueryArgs();
  const result = {
    filterLactoseNo: {
      filter: ['categories.id:"undefined"', 'variants.attributes.lactose:"no"'],
      limit: 6,
      offset: 1,
    },
    filterLactoseYes: {
      filter: [
        'categories.id:"undefined"',
        'variants.attributes.lactose:"yes"',
      ],
      limit: 6,
      offset: 1,
    },
    productsAll: { filter: ['categories.id:"undefined"'], limit: 6, offset: 1 },
    searchText: {
      filter: ['categories.id:"undefined"'],
      fuzzy: true,
      limit: 6,
      offset: 1,
      "text.en-US": '"undefined"',
    },
    sortAlphabetically: {
      filter: ['categories.id:"undefined"'],
      limit: 6,
      offset: 1,
      sort: ["name.en-US asc"],
    },
    sortAscending: {
      filter: ['categories.id:"undefined"'],
      limit: 6,
      offset: 1,
      sort: ["price asc"],
    },
    sortDescending: {
      filter: ['categories.id:"undefined"'],
      limit: 6,
      offset: 1,
      sort: ["price desc"],
    },
  };
  test("Test1", async () => {
    const data = await queryArgs.getQueryArgs(1, 1);
    expect(data).toStrictEqual(result);
  });
});

describe("test: getQueryArgsCategories function return IParamsCategories", () => {
  const queryArgs: QueryArgs = new QueryArgs();
  const result = {
    categoriesSushi: {
      filter: ['categories.id:"undefined"'],
      limit: 6,
      offset: 1,
    },
  };
  test("Test1", async () => {
    const data = await queryArgs.getQueryArgsCategories(1, 1);
    expect(data).toStrictEqual(result);
  });
});
