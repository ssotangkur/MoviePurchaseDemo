import React from "react";
import CartList from "./CartList";
import { Cart } from "../models/Cart";
import { FlexColumn, FlexRow } from "./Flex";

export type CheckoutProps = {
  onSubmit?: () => void;
  onCancel?: () => void;
  cart: Cart;
};

const Checkout = (props: CheckoutProps) => {

  const clearAndSubmit = () => {
    props.cart.clear();
    props.onSubmit?.();
  }

  const cancel = () => {
    props.onCancel?.();
  }
  
  return (
    <FlexColumn>
      <label>Confirm Purchase</label>
      <CartList cart={props.cart} />
      <FlexRow className="modal-btn-bar">
        <button onClick={clearAndSubmit}>OK</button>
        <button onClick={cancel}>Cancel</button>
      </FlexRow>
    </FlexColumn>
  );
}

export default Checkout;
