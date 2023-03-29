import { ADD_INVENTORY, FETCH_INVENTORY, DELETE_INVENTORY, EDIT_INVENTORY, InventoriesActions, SET_INVENTORIES } from './types';
import { IInventory } from '../../interfaces/patient';

const initialState: IInventory[] = [];

export function inventoriesReducer(
  state: IInventory[] = initialState,
  action: InventoriesActions
): IInventory[] {
  switch (action.type) {
    case SET_INVENTORIES: {
      return [...action.payload];
    }

    case EDIT_INVENTORY: {
      const editedInventories = state.map((el) => (el._id !== action.payload._id ? el : action.payload));
      return [...editedInventories];
    }

    case ADD_INVENTORY: {
      return [{ ...action.payload }, ...state];
    }

    case DELETE_INVENTORY: {
      const inventories = state.filter((el) => el._id !== action.id);
      return [...inventories];
    }
    case FETCH_INVENTORY: {
      const fetchInventories = state.map((el) => (el._id !== action.payload._id ? el : action.payload));
      return [...fetchInventories];
    }

    default: {
      return state;
    }
  }
}
