import React from 'react';

import { Modal } from 'antd';

import InventoryForm from './InventoryForm';
import { IInventory } from '../../../interfaces/patient';

type Props = {
  onSubmit: (inventory: IInventory) => void;
  visible: boolean;
  onClose: () => void;
};

const AddInventory = ({ visible, onClose, onSubmit }: Props) => {
  return (
   <div>
       <Modal
       visible={visible}
       onCancel={onClose}
       destroyOnClose
       footer={null}
       title={<h3 className='title'>Add Inventory</h3>}
       >
       <InventoryForm onCancel={onClose} onSubmit={onSubmit} submitText='Add inventory' />
       
       </Modal>
   </div>
  );
};

export default AddInventory;
