import React, {useState} from "react";
import { useSearch } from "./service/OMDb";
import Loading from "./components/Loading";
import MovieList from "./components/MovieList";
import useCart from "./models/Cart";
import CartList from "./components/CartList";
import Checkout from "./components/Checkout";
import { FlexRow, FlexColumn } from "./components/Flex";
import useModal from "./components/Modal";
import "./App.scss";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, searchResults] = useSearch(searchQuery);
  const [cart] = useCart();
  const [showModal, closeModal, Modal] = useModal();

  return (
    <div className="App">
      <FlexColumn>
        <FlexRow className="search-container">
          <label className="search-label">Search:</label>
          <input className="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
        </FlexRow>
        { loading ? 
          <Loading />
          :
          <MovieList movies={searchResults?.Search} onSelect={cart.addMovie}/>
      }
        <hr/>
        <CartList cart={cart} />
        <button className="purchase" onClick={
          () => {
            showModal(<Checkout cart={cart} onSubmit={closeModal} onCancel={closeModal}/>);
          }
        }>Purchase</button>
      </FlexColumn>
      <Modal/>
    </div>
  );
}
