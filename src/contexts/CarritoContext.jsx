import React, { createContext, useContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [productosCarrito, setProductosCarrito] = useState([]);

  
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setProductosCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  }, [productosCarrito]);

  
  const agregarAlCarrito = (producto) => {
    const existe = productosCarrito.find(p => p.id === producto.id);
    if (existe) {
      const carritoActualizado = productosCarrito.map((p) =>
        p.id === producto.id
          ? { ...p, cantidad: p.cantidad + producto.cantidad }
          : p
      );
      setProductosCarrito(carritoActualizado);
    } else {
      setProductosCarrito([...productosCarrito, producto]);
    }
  };

  
  const actualizarCantidad = (id, nuevaCantidad) => {
    const carritoActualizado = productosCarrito.map((p) =>
      p.id === id ? { ...p, cantidad: nuevaCantidad } : p
    );
    setProductosCarrito(carritoActualizado);
  };

  
  const borrarProductoCarrito = (id) => {
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  };


  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{
      productosCarrito,
      agregarAlCarrito,
      actualizarCantidad,
      borrarProductoCarrito,
      vaciarCarrito
    }}>
      {children}
    </CarritoContext.Provider>
  );
}


export function useCarritoContext() {
  return useContext(CarritoContext);
}
