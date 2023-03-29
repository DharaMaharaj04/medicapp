import { IInventory } from '../interfaces/patient';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../redux/inventories/actions';

import { IAppState } from '../interfaces/app-state';

export function useInventories() {
  const dispatch = useDispatch();
  const inventories = useSelector<IAppState, IInventory[]>((state) => state.inventories);
  const editInventory = (inventory: IInventory) => {
    return dispatch(actions.editInventory(inventory));
  };

  const addInventory = (inventory: IInventory) => {
    return dispatch(actions.addInventory(inventory));
  };

  const deleteInventory = (id: string) => {
    return dispatch(actions.deleteInventory(id));
  };

  return { inventories, addInventory, editInventory, deleteInventory };
}