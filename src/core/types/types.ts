export type paramQueryArgs = {
  limit: number;
  filter?: Array<string>;
  sort?: Array<string>;
  ["text.en-US"]?: string;
  fuzzy?: true;
};

export interface IParamsQueryArgs {
  productsAll: { limit: number; offset: number; filter: string[] };
  filterLactoseYes: { limit: number; offset: number; filter: string[] };
  filterLactoseNo: { limit: number; offset: number; filter: string[] };
  sortAlphabetically: {
    limit: number;
    offset: number;
    sort: string[];
    filter: string[];
  };
  sortAscending: {
    limit: number;
    offset: number;
    sort: string[];
    filter: string[];
  };
  sortDescending: {
    limit: number;
    offset: number;
    sort: string[];
    filter: string[];
  };
  searchText: {
    limit: number;
    filter: string[];
    offset: number;
    "text.en-US": string;
    fuzzy: true;
  };
}

export interface IParamsQueryArgsAll {
  productsAll: { limit: number };
}

export interface IParamsCategories {
  categoriesSushi: {
    limit: number;
    filter: string[];
    offset: number;
  };
}
