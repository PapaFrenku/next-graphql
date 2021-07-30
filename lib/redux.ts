import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { SortEnum } from "../components/Sort";
import { Product } from "../generated/types";

let store: any;

export interface InitialState {
  sort: SortEnum | null;
  products: Product[];
}

const initialState:InitialState = {
  sort: null,
  products: [],
};

export enum ActionTypes {
  SET_SORT_TYPE = "SET_SORT_TYPE",
  SET_PRODUCTS = "SET_PRODUCTS",
}

export interface SetSortTypeAction {
  type: ActionTypes.SET_SORT_TYPE;
  payload: SortEnum | 'reset';
}

export interface SetProducts {
  type: ActionTypes.SET_PRODUCTS;
  payload: Product[];
}

export type ActionCreatorsTypes = SetSortTypeAction | SetProducts;

const sortProductsByRating = (products: Product[]) => products.sort((a, b) =>
a.initialRating > b.initialRating ? -1 : 1
);

const sortProductsByPrice = (products: Product[]) => products.sort((a, b) =>
a.price > b.price ? 1 : -1
);

const reducer = (state = initialState, action: ActionCreatorsTypes) => {
  switch (action.type) {
    case ActionTypes.SET_SORT_TYPE: {
      switch (action.payload) {
        case SortEnum.Rating:
          return {
            sort: SortEnum.Rating,
            products: sortProductsByRating(state.products)
          };
        case SortEnum.Price:
          return {
            sort: SortEnum.Price,
            products: sortProductsByPrice(state.products)
          };
        case "reset":
          return {
            sort: SortEnum.Rating,
            products: sortProductsByRating(state.products)
          };
        default:
          throw new Error("Неверный тип сортировки");
      }
    }
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore() {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
