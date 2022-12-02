const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;



const OrderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'product'
                },
                count: Number,
                price: Number

            }
        ],
        cartTotal: Number,
        orderstatus: {
            type: String,
            default: 'ยังไม่ดำเนินการ'
        },

        orderdBy: {
            type: ObjectId,
            ref: 'users'
        },

        
        timeProof:{
            type:String,
        },
        dateProof:{
            type:Date,
            default:null
        },
        images: {
            type: Array,
            default:""
        }
    },

    { timestamps: true }
);

module.exports = Order = mongoose.model('order', OrderSchema);