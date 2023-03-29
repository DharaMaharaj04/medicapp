import React, { useState } from 'react';

import { ColumnProps } from 'antd/es/table';
import { Avatar, Table, Button, Modal, Tag } from 'antd';
import { IInventory } from '../../../interfaces/patient';
import InventoryForm from '../../../layout/components/inventory/InventoryForm';

type Props = {
  inventories: IInventory[];
  onEditInventory: (inventory: IInventory) => void;
  onDeleteInventory?: (id: string) => void;
};

const InventoriesTable = ({
  inventories,
  onEditInventory = () => null,
  onDeleteInventory = () => null
}: Props) => {

  const [inventory, setInventory] = useState(null);
  const [visibility, setVisibility] = useState(false);

  const closeModal = () => setVisibility(false);
  const handleDeleteInventory = (id) => onDeleteInventory(id);
  const handleEditInventory = (inventory: IInventory) => {
    setInventory(inventory);
    setVisibility(true);
  };

  const actions = (inventory: IInventory) => (
    <div className='buttons-list nowrap'>
      <Button onClick={handleEditInventory.bind({}, inventory)} shape='circle' type='primary'>
        <span className='icofont icofont-edit-alt' />
      </Button>
      <Button onClick={handleDeleteInventory.bind({}, inventory._id)} shape='circle' danger>
        <span className='icofont icofont-ui-delete' />
      </Button>
    </div>
  );

  const columns: ColumnProps<IInventory>[] = [
    
    {
        key: 'item',
        dataIndex: 'item',
        title: 'Item',
        sorter: (a, b) => (a.item > b.item ? 1 : -1),
        render: (item) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {item}
          </span>
        )
      },
      {
        key: 'category',
        dataIndex: 'category',
        title: 'Inventory Item Category',
        render: (category) => (
            <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {category}
            </span>
        )
      },
      {
        key: 'brands',
        dataIndex: 'brands',
        title: 'Preferred Brands',
        render: (brands) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {brands}
          </span>
        )
      },
      {
        key: 'vendor',
        dataIndex: 'vendor',
        title: 'Favorite Vendor',
        render: (vendor) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {vendor}
          </span>
        )
      },
      {
        key: 'quantity',
        dataIndex: 'quantity',
        title: 'Reorder Quantity',
        render: (quantity) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {quantity}
          </span>
        )
      },
      {
        key: 'currentstock',
        dataIndex: 'currentstock',
        title: 'Current_Stock',
        render: (currentstock) => (
          <span className='nowrap' style={{ color: '#a5a5a5' }}>
            {currentstock}
          </span>
        )
      },
    {
      key: 'shelf',
      dataIndex: 'shelf',
      title: 'Shelf/location',
      render: (shelf) => (
        <span className='nowrap' style={{ color: '#a5a5a5' }}>
          {shelf}
        </span>
      )
    },
    
    {
      key: 'actions',
      title: 'Actions',
      render: actions
    }
  ];



  return (
    <>
      <Table
        
        className='accent-header'
        rowKey='_id'
        dataSource={inventories}
        columns={columns}
      />

      <Modal
        visible={visibility}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        title={<h3 className='title'>Add inventory</h3>}
      >
        <InventoryForm
          submitText='Update inventory'
          onCancel={closeModal}
          onSubmit={onEditInventory}
          inventory={inventory}
        />
      </Modal>
    </>
  );
};

export default InventoriesTable;