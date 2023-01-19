import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: String,
    amount: Number,
    category: String,
    dateOfInvoice: {
        type: Date,
        default: new Date(),
    },
    dateOfPayment: {
        type: Date,
        default: new Date(),
    },
     description : String
})



var Product = mongoose.model('Product', productSchema);

export default Product;