import React from "react";
import { Cart } from "../models/Cart";
import { FlexColumn, FlexRow } from "./Flex";
import "./CartList.scss";

export type CartListProps = {
  cart: Cart;
};

const CartList = (props: CartListProps) => {
  return (
    <FlexColumn className="container">
      <FlexRow>
        <label>
          <b>Cart:</b>
        </label>
      </FlexRow>

      {Array.from(props.cart.movies.values(), movie => {
        return (
          <FlexRow key={movie.imdbID} className="cart-item">
            <div>{`${movie.Title} (${movie.Year})`}</div>
            <button
              className="remove-btn"
              onClick={() => {
                props.cart.deleteMovie(movie);
              }}
            >
              Remove
            </button>
          </FlexRow>
        );
      })}
    </FlexColumn>
  );
};

export default CartList;
