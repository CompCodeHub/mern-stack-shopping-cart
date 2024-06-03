import React from "react";
import { Link } from "react-router-dom";

const CartTotal = () => {
    return (
        <div className="card">
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <h3>Subtotal () items</h3>
                    $99.99
                </li>
                <li className="list-group-item">
                    <Link to="/cart" className="btn btn-outline-dark">Checkout</Link>
                </li>
            </ul>
        </div>
    )
}
export default CartTotal;