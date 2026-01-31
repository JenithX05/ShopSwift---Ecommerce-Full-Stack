import Stripe from "../config/stripe.js";
import CartProductModel from "../models/cartproduct.model.js";
import OrderModel from "../models/order.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";

 export async function CashOnDeliveryOrderController(request,response){
    try {
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        const payload = list_items.map(el => {
            return({
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : el.productId._id, 
                product_details : {
                    name : el.productId.name,
                    image : el.productId.image
                } ,
                paymentId : "",
                payment_status : "CASH ON DELIVERY",
                delivery_address : addressId ,
                subTotalAmt  : subTotalAmt,
                totalAmt  :  totalAmt,
            })
        })

        const generatedOrder = await OrderModel.insertMany(payload)

        ///remove from the cart
        const removeCartItems = await CartProductModel.deleteMany({ userId : userId })
        const updateInUser = await UserModel.updateOne({ _id : userId }, { shopping_cart : []})

        return response.json({
            message : "Order successfully",
            error : false,
            success : true,
            data : generatedOrder
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error ,
            error : true,
            success : false
        })
    }
}

export const pricewithDiscount = (price,dis = 1)=>{
    const discountAmout = Math.ceil((Number(price) * Number(dis)) / 100)
    const actualPrice = Number(price) - Number(discountAmout)
    return actualPrice
}

export async function paymentController(request,response){
    try {
        console.log("🔥 Payment controller called");
        console.log("🔥 Stripe secret key:", process.env.STRIPE_SECRET_KEY ? "Present" : "Missing");
        
        const userId = request.userId // auth middleware 
        const { list_items, totalAmt, addressId,subTotalAmt } = request.body 

        console.log("🔥 Request data:", { userId, list_items: list_items?.length, totalAmt, addressId });

        const user = await UserModel.findById(userId)
        console.log("🔥 User found:", user?.email);

        const line_items  = list_items.map(item =>{
            return{
               price_data : {
                    currency : 'inr',
                    product_data : {
                        name : item.productId.name,
                        images : item.productId.image,
                        metadata : {
                            productId : item.productId._id
                        }
                    },
                    unit_amount : pricewithDiscount(item.productId.price,item.productId.discount) * 100   
               },
               adjustable_quantity : {
                    enabled : true,
                    minimum : 1
               },
               quantity : item.quantity 
            }
        })

        const params = {
            submit_type : 'pay',
            mode : 'payment',
            payment_method_types : ['card'],
            customer_email : user.email,
            metadata : {
                userId : userId,
                addressId : addressId
            },
            line_items : line_items,
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        console.log("🔥 Creating Stripe session...");
        const session = await Stripe.checkout.sessions.create(params)
        console.log("🔥 Stripe session created:", session.id);

        return response.status(200).json(session)

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}


const getOrderProductItems = async({
    lineItems,
    userId,
    addressId,
    paymentId,
    payment_status,
 })=>{
    const productList = []

    if(lineItems?.data?.length){
        for(const item of lineItems.data){
            const product = await Stripe.products.retrieve(item.price.product)

            const paylod = {
                userId : userId,
                orderId : `ORD-${new mongoose.Types.ObjectId()}`,
                productId : product.metadata.productId, 
                product_details : {
                    name : product.name,
                    image : product.images
                } ,
                paymentId : paymentId,
                payment_status : payment_status,
                delivery_address : addressId,
                subTotalAmt  : Number(item.amount_total / 100),
                totalAmt  :  Number(item.amount_total / 100),
            }

            productList.push(paylod)
        }
    }

    return productList
}

//http://localhost:8080/api/order/webhook
export async function webhookStripe(request,response){
    const event = request.body;
    const endPointSecret = process.env.STRIPE_ENPOINT_WEBHOOK_SECRET_KEY

    console.log("🔥 WEBHOOK EVENT RECEIVED:", event.type);
    console.log("🔥 EVENT DATA:", JSON.stringify(event.data.object, null, 2));

    // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      console.log("🔥 PAYMENT COMPLETED - Processing order...");
      const session = event.data.object;
      const lineItems = await Stripe.checkout.sessions.listLineItems(session.id)
      const userId = session.metadata.userId
      console.log("🔥 USER ID:", userId);
      console.log("🔥 SESSION METADATA:", session.metadata);
      
      const orderProduct = await getOrderProductItems(
        {
            lineItems : lineItems,
            userId : userId,
            addressId : session.metadata.addressId,
            paymentId  : session.payment_intent,
            payment_status : session.payment_status,
        })
    
      console.log("🔥 ORDER PRODUCTS TO CREATE:", orderProduct);
      
      const order = await OrderModel.insertMany(orderProduct)
      console.log("🔥 ORDERS CREATED:", order.length, "orders");
      console.log("🔥 ORDER DETAILS:", JSON.stringify(order, null, 2));

        if(Boolean(order[0])){
            console.log("🔥 CLEARING USER CART...");
            const removeCartItems = await  UserModel.findByIdAndUpdate(userId,{
                shopping_cart : []
            })
            console.log("🔥 USER CART CLEARED");
            const removeCartProductDB = await CartProductModel.deleteMany({ userId : userId})
            console.log("🔥 CART PRODUCTS DELETED FROM DB");
        }
      break;
    default:
      console.log(`🔥 UNHANDLED EVENT TYPE ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
}


export async function getOrderDetailsController(request,response){
    try {
        const userId = request.userId // order id
        console.log("🔥 FETCHING ORDERS FOR USER:", userId);

        const orderlist = await OrderModel.find({ userId : userId }).sort({ createdAt : -1 }).populate('delivery_address')
        console.log("🔥 ORDERS FOUND:", orderlist.length);
        console.log("🔥 ORDER LIST:", JSON.stringify(orderlist, null, 2));

        return response.json({
            message : "order list",
            data : orderlist,
            error : false,
            success : true
        })
    } catch (error) {
        console.error("🔥 ERROR FETCHING ORDERS:", error);
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}
