import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import {useNavigate} from "react-router-dom"
import React from 'react'
import storeItems from "../data/items.json"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const navigate = useNavigate()
  const { closeCart, cartItems } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
          <div>
            <Button onClick={()=>navigate("../Checkout.js")} className="d-flex align-items-center justify-content-center" style={{alignSelf:'flex-end', position: 'absolute', width: 370 , bottom: 35}}> login</Button>
          </div>
          </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}