import React, { createContext, useState, useEffect } from "react"

export const CartContext = createContext(null)

export default function ShoppingCartProvider({ children }) {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("carrito")) ?? [])

    //UseEffect para grabar en el LS
    useEffect(() => {
        if (cart?.length === 0) return
        localStorage.setItem("carrito", JSON.stringify(cart))
    }, [cart])

    return <CartContext.Provider value={[cart, setCart]}>{children}</CartContext.Provider>
}
