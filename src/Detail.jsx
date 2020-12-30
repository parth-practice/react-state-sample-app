import React from "react";
import { useParams, useNavigate } from 'react-router-dom';

import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, error, loading } = useFetch(`products/${id}`);

    if (loading) return <Spinner />;
    if (!product) return <PageNotFound />;
    if (error) throw error;

  return (
    <div id="detail">
        <h1>{ product.name }</h1>
        <p>{ product.description }</p>
        <p id="proce">${ product.price }</p>
        <p>
            <button className="btn btn-primary" onClick={(() => navigate("/cart"))}>Add to cart</button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category}/>
    </div>
  );
}
