const OrderModel = require('../models/orderModel');
const fetch = require('node-fetch');

exports.createOrder = async (orderData) => {
    try {
        const restaurant = await fetch(`http://localhost:3000/api/search?restaurantName=${orderData.restaurantName}`);
        const restaurantArr = await restaurant.json();
        if(!Array.isArray(restaurantArr.data)) {
            return restaurantArr;
        }
        const restaurantData = restaurantArr.data[0];
        
        let orderTotal = 0; 
        let orderFoodItems = [];
        let notFoundItems = [];
        for (let odata of orderData.food) {
            let restaurantFoodItem = restaurantData.menu.find(
                rdata => odata.dishName === rdata.dishName
            );
            if (restaurantFoodItem) {
                orderTotal += (odata.quantity)*restaurantFoodItem.price;
                orderFoodItems.push({
                    dishName: odata.dishName,
                    quantity: odata.quantity,
                    price: restaurantFoodItem.price
                });   
            } else {
                notFoundItems.push(odata.dishName);
            }
        }
        
        if(!notFoundItems.length) {
            const orderDataModel = {
                restaurantID: restaurantData._id,
                restaurantName: restaurantData.restaurantName,
                city: restaurantData.location,
                orderTotalAmount: orderTotal,
                food: orderFoodItems
            }
            console.log(orderDataModel);
            // let order = new OrderModel(orderDataModel);
            // return await order.save();
        } else {
            throw Error(orderData.restaurantName + " doesn't have " + notFoundItems.join(', ') + " in their menu.");
        }
    } catch(error) {
        throw error;
    }
}