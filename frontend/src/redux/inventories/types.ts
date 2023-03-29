import { IInventory } from '../../interfaces/patient';

export const SET_INVENTORIES = '[inventories] Set';
export const ADD_INVENTORY = '[inventories] Add';
export const EDIT_INVENTORY = '[inventories] Edit';
export const DELETE_INVENTORY = '[inventories] Delete';
export const FETCH_INVENTORY = '[inventories] Fetch';
export interface SetInventoryAction {
  type: typeof SET_INVENTORIES;
  payload: IInventory[];
}

export interface AddInventoryAction {
  type: typeof ADD_INVENTORY;
  payload: IInventory;
}

export interface EditInventoryAction {
  type: typeof EDIT_INVENTORY;
  payload: IInventory;
}

export interface DeleteInventoryAction {
  type: typeof DELETE_INVENTORY;
  id: string;
}
export interface FetchInventoryAction {
  type: typeof FETCH_INVENTORY;
  payload: IInventory;
  id:string
}


export type InventoriesActions =
  | SetInventoryAction
  | AddInventoryAction
  | DeleteInventoryAction
  | FetchInventoryAction
  | EditInventoryAction;
