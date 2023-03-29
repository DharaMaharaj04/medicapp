import {
  ADD_INVENTORY,
  DELETE_INVENTORY,
  EDIT_INVENTORY,
  SET_INVENTORIES,
  FETCH_INVENTORY,
  SetInventoryAction
} from './types';

import { IInventory } from '../../interfaces/patient';
import * as api from '../../api/index';
import {toast} from 'react-toastify';

export const setInventories = (inventories: IInventory[]): SetInventoryAction => ({
  type: SET_INVENTORIES,
  payload: inventories,
});

export const addInventory = (inventory: IInventory) => async (dispatch) => {
  try {
    const { data } = await api.createInventory(inventory);
    toast.success("Inventory add!!");
    dispatch({ type: ADD_INVENTORY, payload: data });
  } catch (error) {
    console.log("Error on add Inventory");
  }
};
export const deleteInventory = (id: string) => async (dispatch) => {
  try {
    await api.deleteInventory(id);
    toast.success("Inventory deleted");
    dispatch({ type: DELETE_INVENTORY, id });
  } catch (error) {
    console.log("Error while deleting Inventory");
  }
};
export const editInventory = (inventories:IInventory) => async (dispatch) => {
  try {
    const { data } = await api.editInventory(inventories._id,inventories);
    console.log(data)
    toast.success("Inventory edited!!");
    dispatch({ type: EDIT_INVENTORY, payload: data });
  } catch (error) {
    console.log("Error on editing Inventory");
  }
};

export const fetchInventories = () => async (dispatch) => {
  try {
    const { data } = await api.fetchInventory();
    dispatch({ type: SET_INVENTORIES, payload: data });
  } catch (error) {
    console.log("Error on fetch Inventories");
  }
};
export const getInventory = (inventories:IInventory) => async (dispatch) => {
  try {
    const { data } = await api.fetchInventory();
    dispatch({ type: FETCH_INVENTORY, payload: data });
  } catch (error) {
    console.log("Error ");
  }
};

