import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, removeFavorites } from "../../redux/actions/actions";
import addFav from "../../images/fav.png";
import noFav from "../../images/fav1.png";

export default function Card({ id, photo, brand, model, price }) {
  //Cambios abrir
  const fav = useSelector(state => state.favorites);
  console.log(fav);
  const [favorito, setFavorito] = useState(fav ? fav.some(item => item.id === id) : false);
  console.log("include ",fav.some(item => item.id));
  //const favorites = useState([]);
  const dispatch = useDispatch();

  const handleClickFavorito = (event) => {
    const data = {
      id,
      photo,
      brand,
      model,
      price,
    };
    if (!favorito) {
      dispatch(addFavorites(data));
      setFavorito(true);
    } else {
      dispatch(removeFavorites(id));
      setFavorito(false);
    }
  };
  //Cambios cerrar
  return (
    <div
      className="flex flex-col bg-white p-5 rounded-lg w-[300px] h-[400px] justify-around shadow-xl"
      value={id}
    >
      <button className="w-max" onClick={(event) => handleClickFavorito(event)}>
        <img src={favorito ? addFav : noFav} className="w-[30px]" />
      </button>

      <img
        src={photo}
        alt="Loading Auto"
        className="flex items-center h-40 w-40 m-auto rounded-full border-[#009A88] border-2 p-1"
      />
      <p className="font-bold">{brand}</p>
      <p>{model}</p>
      <p className="font-bold text-[#F97D67]">USD {price}</p>

      <NavLink
        to={`/detail/${id}`}
        className="bg-[#009A88] w-max self-center p-4 rounded-3xl hover:bg-[#F97D67] text-white mt-2"
      >
        <span>Ver Oferta</span>
      </NavLink>
    </div>
  );
}
