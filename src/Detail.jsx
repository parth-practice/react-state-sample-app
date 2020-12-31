import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ sku, setSku ] = useState("");
    const { data: product, error, loading } = useFetch(`products/${id}`);

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    if (error) throw error;

  return (
    <div id="detail">
        <h1>{ product.name }</h1>
        <p>{ product.description }</p>
        <p id="proce">${ product.price }</p>
        <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
            <option value="">What sizes?</option>
            {product.skus.map((sku) => (
                <option key={sku.sku} value={sku.sku}>{sku.size}</option>                
            ))}           
        </select>
        <p>
            <button disabled={!sku} className="btn btn-primary" onClick={() => {
                props.addToCart(id, sku);
                navigate("/cart");
            }}>Add to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category}/>
    </div>
  );
}
