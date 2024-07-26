import mongoose from 'mongoose';

const warehouseSchema = new mongoose.Schema({
     name: String,
     location: String,
     products: [
          {
               product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
               },
               stockInWarehouse: Number, // Represents the stock quantity of the product in this warehouse
          },
     ],
});

const warehouseModel = mongoose.model('warehouse', warehouseSchema);

export default warehouseModel;
