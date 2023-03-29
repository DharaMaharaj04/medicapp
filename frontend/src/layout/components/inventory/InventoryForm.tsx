import React from 'react';

import { Button, Select, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import { hasErrorFactory } from '../../../utils/hasError';

import { IInventory } from '../../../interfaces/patient';
import { textChangeRangeNewSpan } from 'typescript';


const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(
    <Option value={i.toString(36) + i} key={i.toString(36) + i}>
      {i.toString(36) + i}
    </Option>);
}

const { TextArea } = Input;
type Props = {
  onSubmit: (inventory: IInventory) => void;
  onCancel: () => void;
  inventory?: IInventory;
  submitText?: string;
};

const defaultSubmitText = 'Add Inventory';
const emptyInventory = {
  item: null,
  category: null,
  brands: null,
  vendor: null,
  quantity: null,
  currentstock: null,
  shelf: null
};

const inventoryScheme = Yup.object({
    item: Yup.string().required('item Required'),
    category: Yup.string().required('category Required'),
    brands: Yup.string().required('brands Required'),
    vendor: Yup.string().required('vendor Required'),
    quantity: Yup.string().required('quantity Required'),
    currentstock: Yup.string().required('currentstock Required'),
    shelf: Yup.string().required('shelf Required')
});

const InventoryForm = ({
  submitText = defaultSubmitText,
  inventory = emptyInventory,
  onSubmit,
  onCancel
}: Props) => {
  const {
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    setValues,
    handleBlur,
    resetForm,
    touched,
    values,
    errors,
    isValid
  } = useFormik<IInventory>({
    validationSchema: inventoryScheme,
    initialValues: inventory,
    onSubmit: (values) => {
      onSubmit(values);
      onCancel();
    }
  });

  const hasError = hasErrorFactory(touched, errors);

  const handleItemSelect = (value) => setFieldValue('item', value);

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          
          <Select  
                    
                    placeholder='Item'
                    onBlur={() => setFieldTouched('item')}
                    defaultValue={values.item}
                    onChange={handleItemSelect}
                    className={hasError('item')}
                  >
                    <Select.Option value='Bouffant cap'>Bouffant cap</Select.Option>
                    <Select.Option value='Chip blower'>Chip blower</Select.Option>
                    <Select.Option value='Alcohol blow torch'>Alcohol blow torch</Select.Option>
                    <Select.Option value='Mackintosh-sheet'>Mackintosh-sheet</Select.Option>
                    <Select.Option value='Sand paper'>Sand paper</Select.Option>
                    <Select.Option value='Modeling wax'>Modeling wax</Select.Option>
                    <Select.Option value='Mortar pastel'>Mortar pastel</Select.Option>
                    <Select.Option value='Dettol hand wash'>Dettol hand wash</Select.Option>
                    <Select.Option value='Spirit (chair solution)'>Spirit (chair solution)</Select.Option>
                    <Select.Option value='Hit'>Hit</Select.Option>
                    <Select.Option value='Spray bottle'>Spray bottle</Select.Option>
                    <Select.Option value='Cotton roll'>Cotton roll</Select.Option>
                    <Select.Option value='Gauze'>Gauze</Select.Option>
                    <Select.Option value='Savlon'>Savlon</Select.Option>

                  </Select>
        </div>

        <div className='form-group'>
          <Input
            name='category'
            placeholder='Inventory Item Category'
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values.category}
            className={hasError('category')}
          />
          
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.brands}
            placeholder='Preferred Brands'
            onBlur={handleBlur}
            name='brands'
            onChange={handleChange}
            className={hasError('brands')}
          />
        </div>

        <div className='form-group'>
          <Input
            defaultValue={values.vendor}
            placeholder='Favorite Vendor'
            onBlur={handleBlur}
            name='vendor'
            onChange={handleChange}
            className={hasError('vendor')}
          />
        </div>


        <div className='form-group'>
          <Input
            defaultValue={values.quantity}
            placeholder='Reorder Quantity'
            onBlur={handleBlur}
            name='quantity'
            onChange={handleChange}
            className={hasError('quantity')}
          />
        </div>


        <div className='form-group'>
          <Input
            defaultValue={values.currentstock}
            placeholder='Supplier'
            onBlur={handleBlur}
            name='currentstock'
            onChange={handleChange}
            className={hasError('currentstock')}
          />
        </div>




        <div className='form-group'>
          <Input
            defaultValue={values.shelf}
            placeholder='Shelf/location'
            onBlur={handleBlur}
            name='shelf'
            onChange={handleChange}
            className={hasError('shelf')}
          />
        </div>

        
        
        <div className='d-flex justify-content-between buttons-list settings-actions'>
          <Button danger onClick={handleCancel}>
            Cancel
          </Button>

          <Button type='primary' htmlType='submit'>
            {submitText}
          </Button>
        </div>
      </form>
    </>
  );
};

export default InventoryForm;