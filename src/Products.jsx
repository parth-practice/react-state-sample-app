import React, { useState } from "react";
import { useParams, Link } from 'react-router-dom';
import "./App.css";
import PageNotFound from "./PageNotFound";

import useFetch from "./services/useFetch";
import Spinner from './Spinner';

export default function Products() {

  const [size, setSize] = useState("");
  const { category } = useParams();
  const {data: products, error, loading: isLoading} = useFetch("products?category=" + category);

  const filteredProduct = size ? products.filter((product) => product.skus.find((s) => s.size === parseInt(size))) : products;

  if (error) throw error;
  
  if (isLoading) return <Spinner />;

  if (filteredProduct.length === 0) return <PageNotFound />;

  return (
    <>
    <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select id="size" value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">All sizes</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
        </section>
        { size && <h2>{filteredProduct.length} items found</h2> }
        <section id="products">
            {filteredProduct.map((product) => {
            return (
                <div key={product.id} className="product">
                <Link to={`/${category}/${product.id}`}>
                    <img src={`/images/${product.image}`} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </Link>
                </div>
            )})}
        </section>
    </>
  );
}
