import React, { useState } from 'react';

import { usePageData } from '../../../hooks/usePage';
import { useInventories } from '../../../hooks/useInventories';
import PageAction from '../../../layout/components/page-action/PageAction';
import InventoriesTable from './InventoriesTable';
import { IPageData } from '../../../interfaces/page';
import AddInventory from './AddInventory';


const pageData: IPageData = {
  title: 'Inventories',
  fulFilled: true,
  breadcrumbs: [
    {
      title: 'Medicine',
      route: 'default-dashboard'
    },
    {
      title: 'Inventories'
    }
  ]
};

const InventoriesPage = () => {
  const { inventories, addInventory, editInventory, deleteInventory } = useInventories();
  usePageData(pageData);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [addingModalVisibility, setAddingModalVisibility] = useState(false);
  const closeAddingModal = () => setAddingModalVisibility(false);
  const openAddingModal = () => setAddingModalVisibility(true);

  return (
    <>
      <InventoriesTable
        onDeleteInventory={deleteInventory}
        onEditInventory={editInventory}
        inventories={inventories}
      />
      <PageAction onClick={openAddingModal} icon='icofont-plus' type={'primary'} />
      <AddInventory
        onClose={closeAddingModal}
        visible={addingModalVisibility}
        onSubmit={addInventory}
      />
    </>
  );
};

export default InventoriesPage;
