import React, { useState } from 'react';

import { Button, Modal } from 'antd';

import InventoryForm from './InventoryForm';
import { useInventories } from '../../../hooks/useInventories';

import { IInventory} from '../../../interfaces/patient';
import AddInventory from '../../../pages/dashboards/LabManagement/AddInventory';

const AddPay = () => {
  const { addInventory } = useInventories();
  const [visible, setVisible] = useState(false);

  const handleClick = () => setVisible(!visible);

  const closeModal = () => setVisible(false);

  const handleAddInventories = (inventory: IInventory) => {
    addInventory(inventory);
    closeModal();
  };

  return (
    <div className='add-patient'>
      <Button type='primary' onClick={handleClick}>
        <span className='icofont icofont-plus mr-2' style={{ fontSize: '1.3em' }} />
        Add Inventory
      </Button>
      <Modal
        visible={visible}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add Inventory Details</h3>}
      >
        <InventoryForm onCancel={closeModal} onSubmit={handleAddInventories} />
      </Modal>
    </div>
  );
};

export default AddInventory;