import { Router } from "express"
import CartsHandler from "./handler"
import { auth } from "@/middlewares/auth"

const routes = (handler: CartsHandler) => {
    const v1 = Router()
    
    v1.get('/carts', auth, handler.getCartsHandler)
    v1.post('/carts', auth, handler.postCartHandler)
    v1.delete('/carts/:id/items/:itemId', auth, handler.deleteCartHandler)
    v1.delete('/carts', auth, handler.deleteCartsHandler)
    v1.post('/carts/:id/checkouts', auth, handler.postCheckoutHandler)

    return v1
}

export default routes