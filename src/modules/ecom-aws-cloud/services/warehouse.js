import warehouseModel from '../models/warehouse.js';

// Create a new warehouse
const createWarehouse = async (warehouseData) => {
     try {
          const newWarehouse = new warehouseModel(warehouseData);
          return await newWarehouse.save();
     } catch (error) {
          throw new Error(error.message);
     }
};

// Get a list of all warehouses
const getWarehouses = async () => {
     try {
          return await warehouseModel.find().populate('products');
     } catch (error) {
          throw new Error(error.message);
     }
};

const updateWarehouseProducts = async (warehouseId, products) => {
     try {
          const updatedWarehouse = await warehouseModel.findByIdAndUpdate(
               warehouseId,
               {
                    $push: {
                         products: {
                              $each: products,
                         },
                    },
               },
               { new: true } // Return the updated warehouse
          );

          if (!updatedWarehouse) {
               throw new Error('Warehouse not found');
          }

          return updatedWarehouse;
     } catch (error) {
          throw new Error(error.message);
     }
};

export const warehouseService = {
     createWarehouse,
     getWarehouses,
     updateWarehouseProducts,
};
