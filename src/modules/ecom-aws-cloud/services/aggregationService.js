import mongoose from 'mongoose';

import warehouseModel from '../models/warehouse.js';

const aggregateData = async () => {
     try {
          const aggregatedData = await warehouseModel.aggregate([
               {
                    $unwind: '$products',
               },
               {
                    $lookup: {
                         from: 'products',
                         localField: 'products.product',
                         foreignField: '_id',
                         as: 'productDetails',
                    },
               },
               {
                    $unwind: '$productDetails',
               },
               {
                    $project: {
                         _id: 0,
                         warehouseName: '$name',
                         productName: '$productDetails.name',
                         availableStock: '$productDetails.availableStock',
                         stockInWarehouse: '$products.stockInWarehouse',
                    },
               },
          ]);

          return aggregatedData;
     } catch (error) {
          throw new Error('An error occurred during aggregation.');
     }
};

export const aggregationService = {
     aggregateData,
};
