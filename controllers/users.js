const bcrypt = require('bcryptjs');


const User = require('../models/User');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Order = require('../models/Order');


const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
    try {
        const user = await User.find({}).select('-password').exec();
        res.send(user)


    } catch (err) {
        console.log('err')
        res.status(500).send('Server Error!')

    }
};

exports.readUsers = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOne({ _id: id }).select('-password').exec()
        res.send(user)


    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
};

exports.updateUsers = async (req, res) => {
    try {
        var { id, password } = req.body.values
        //gen salt
        const salt = await bcrypt.genSalt(10);
        //encrypt
        var enPassword = await bcrypt.hash(password, salt);
        const user = await User.findOneAndUpdate(
            { _id: id },
            { password: enPassword }
        );
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error!');

    }
};

exports.removeUsers = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findOneAndDelete({ _id: id });
        res.send(user)


    } catch (err) {
        console.log('err')
        res.status(500).send('Server Error!')

    }
};
exports.changeStatus = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { enabled: req.body.enabled }
        );
        res.send(user);
    } catch (err) {
        console.log('err');
        res.status(500).send('Server Error!');

    }
};

exports.changeRole = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id },
            { role: req.body.role }
        );
        res.send(user);
    } catch (err) {
        console.log('err');
        res.status(500).send('Server Error!');

    }
};

exports.userCart = async (req, res) => {
    try {
        const { cart } = req.body
        let user = await User.findOne({ username: req.user.username }).exec();
        let products = []
        let cartOld = await Cart.findOne({ orderById: user._id }).exec();
        if (cartOld) {
            cartOld.remove()
            console.log('remove old cart')
        }

        for (let i = 0; i < cart.length; i++) {
            let object = {}
            object.product = cart[i]._id;
            object.count = cart[i].count;
            object.price = cart[i].price;
            products.push(object)
        }

        let cartTotal = 0
        for (let i = 0; i < products.length; i++) {
            cartTotal = cartTotal + products[i].price * products[i].count
        }

        let newCart = await new Cart({
            products,
            cartTotal,
            orderdBy: user._id
        }).save();

        console.log(newCart)
        res.send('userCart success')
    } catch (err) {
        console.log(err)
        res.status(500).send('userCart server Error')
    }
}


exports.getUserCart = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.user.username }).exec();

        let cart = await Cart.findOne({ orderdBy: user._id })
            .populate('products.product', '_id title price')
            .exec();

        const { products, cartTotal } = cart
        res.json({ products, cartTotal })

    } catch (err) {
        res.status(500).send('getUserCart Error')
    }
}
exports.emptyCart = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.user.username }).exec();

        const empty = await Cart.findOneAndRemove({ orderdBy: user._id }).exec()

        res.send(empty)

    } catch (err) {
        res.status(500).send('remove cart Error')
    }
}

exports.saveAddress = async (req, res) => {
    try {
        const userAddress = await User
            .findOneAndUpdate(
                { username: req.user.username },
                { address: req.body.address }).exec();
        res.json({ ok: true })
    } catch (err) {
        res.status(500).send('getUserCart Error')
    }
}

exports.saveOrder = async (req, res) => {
    try {
        let user = await User
            .findOne({ username: req.user.username })
            .exec()

        let userCart = await Cart.findOne({ orderdBy: user._id })
            .exec()
        let order = await new Order({
            products: userCart.products,
            orderdBy: user._id,
            cartTotal: userCart.cartTotal
        }).save()

        //อัปเดตคลังสินค้า
        let bulkOption = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } }
                }
            }
        })

        let updated = await Product.bulkWrite(bulkOption, {})


        res.send(updated);
    } catch (err) {
        res.status(500).send("save order ERROR!! ")
    }
};

exports.getOrder = async (req, res) => {
    try {
        const user = await User
            .findOne({ username: req.user.username }).exec();

        let order = await Order.find({ orderdBy: user._id })
            .populate('products.product')
            .sort([["createdAt", "desc"]])
            .exec();

        res.json(order)
    } catch (err) {
        res.status(500).send('get Order Error')
    }
}



exports.addToWishList = async (req, res) => {
    try {
        const { productId } = req.body
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $addToSet: { wishlist: productId } }
        ).exec()

        res.send(user)
    } catch (err) {
        res.status(500).send('Add wishlist Error')
    }
}

exports.getWishList = async (req, res) => {
    try {
        let list = await User
            .findOne({ username: req.user.username })
            .select('wishlist')
            .populate('wishlist')
            .exec()
        res.json(list)
    } catch (err) {
        res.status(500).send('get wishlist Error')
    }
}

exports.removeWishList = async (req, res) => {
    try {
        const { productId } = req.params//ดึงไอดีของมา
        let user = await User.findOneAndUpdate(
            { username: req.user.username },
            { $pull: { wishlist: productId } })
            .exec()
        res.send(user)
    } catch (err) {
        res.status(500).send('get wishlist Error')
    }
}

exports.readUserSingle = async (req, res) => {
    try {

        const user = await User.findById(req.user._id).select('-password').exec()
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                tel: user.tel,
                address: user.address,
                createdAt: user.createdAt
            })
        }

        else {
            res.status(404);
            throw new Error("User not found")
        }
    } catch (err) {
        res.status(500).send('read detail user Error')
    }




}

exports.updateUserSingle = async (req, res) => {
    try {
        const user = await User
            .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            .exec()
        res.send(user)

    } catch (err) {
        res.status(500).send("update singgle user Error")
    }
}
// exports.updateUserSingle = async (req, res) => {
//     try {
//         const user = await User.findById(req.values._id).exec()
//         if (user){
            
            
//             user.username = req.body.username || user.username;
//             const updatedUser = await user.save();
//             res.send({
//                 username: updatedUser.username,
//                 firstname: updatedUser.firstname,
//                 lastname: updatedUser.lastname,
//                 email: updatedUser.email,
//                 tel: updatedUser.tel,
//                 address: updatedUser.address,
//             })
//         }
//         else{
//             res.status(404)

//         }
//     } catch (err) {
//         res.status(500).send("update single user Error")
//     }
// }

exports.saveProof = async (req, res) => {
    try {
        const order = await Order
            .findOneAndUpdate({_id:req.params.id},req.body, {new:true})
            .exec()
        res.send(order)
    } catch (err) {
        res.status(500).send("send proof ERROR!! ")
    }
};

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