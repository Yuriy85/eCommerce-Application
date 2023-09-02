export type paramQueryArgs = {
  limit: number;
  filter?: Array<string>;
  sort?: Array<string>;
  ["text.en-US"]?: string;
  fuzzy?: true;
};

export type paramIndexCategories = {
  sushi: number;
  desserts: number;
  drinks: number;
  set: number;
  softDrinks: number;
  hotDrinks: number;
  healthyFood: number;
  usualDessert: number;
  rolls: number;
};

export interface IParamsQueryArgs {
  productsAll: { limit: number };
  filterLactoseYes: { limit: number; filter: string[] };
  filterLactoseNo: { limit: number; filter: string[] };
  sortAlphabetically: { limit: number; sort: string[] };
  sortAscending: { limit: number; sort: string[] };
  sortDescending: { limit: number; sort: string[] };
  searchText: { limit: number; "text.en-US": string; fuzzy: true };
}

export interface IParamsCategories {
  categoriesSushi: {
    limit: number;
    filter: string[];
  };
}
