const Order = require('../models/Order')

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderstatus } = req.body
        let orderUpdate = await Order.findByIdAndUpdate(
            orderId,
            {orderstatus},
            {new:true}
        )
        res.send(orderUpdate)
    } catch (err) {
        res.status(500).send("Change Status failed!!");
    }
};

exports.getOrderAdmin = async (req, res) => {
    try {
        let order = await Order.find()
            .populate('products.product')
            .populate("orderdBy","username")
            .sort([["createdAt",'desc']])
            .exec();

            res.json(order)
    } catch (err) {
        res.status(500).send('get Order Error')
    }
}

exports.getProof = async (req, res) => {
    try {
        const order = await Order
            .findOne({ _id: req.params.id })
            .exec()
        res.send(order)
    } catch (err) {
        res.status(500).send('get proof Order Error')
    }
}