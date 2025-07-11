import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";
import { dispararSweetBasico } from "../helpers/sweetAlert";
import Swal from "sweetalert2";
import "../Styles/Custom.css";

function FormularioProducto() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagen, setImagen] = useState("");
  const [nombresExistentes, setNombresExistentes] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  
  useEffect(() => {
    document.title = id
      ? "✏️ Editar producto - Admin | PetShop"
      : "➕ Agregar producto - Admin | PetShop";
  }, [id]);

  useEffect(() => {
    const cargarProducto = async () => {
      if (id) {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const producto = docSnap.data();
          setName(producto.name);
          setDescription(producto.description);
          setPrice(producto.price);
          setImagen(producto.imagen);
        }
      }
    };
    cargarProducto();
  }, [id]);

  useEffect(() => {
    const traerNombres = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const nombres = querySnapshot.docs.map(doc => doc.data().name);
      setNombresExistentes(nombres);
    };
    traerNombres();
  }, []);

  const handleNombreSeleccionado = async (nombreSeleccionado) => {
    setName(nombreSeleccionado);

    const querySnapshot = await getDocs(collection(db, "productos"));
    const productoCoincidente = querySnapshot.docs.find(
      (doc) => doc.data().name.toLowerCase() === nombreSeleccionado.toLowerCase()
    );

    if (productoCoincidente) {
      const producto = productoCoincidente.data();
      setDescription(producto.description);
      setPrice(producto.price);
      setImagen(producto.imagen);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !imagen) {
      dispararSweetBasico("Error", "Completá todos los campos", "error", "OK");
      return;
    }

    if (Number(price) <= 0) {
      dispararSweetBasico("Error", "El precio debe ser mayor a 0", "error", "OK");
      return;
    }

    try {
      if (id) {
        await updateDoc(doc(db, "productos", id), {
          name, description, price, imagen
        });
        dispararSweetBasico("Actualizado", "Producto editado", "success", "OK");
      } else {
        await addDoc(collection(db, "productos"), {
          name, description, price, imagen
        });
        dispararSweetBasico("Agregado", "Producto creado", "success", "OK");
      }

      navigate("/productos");
    } catch (error) {
      dispararSweetBasico("Error", "No se pudo guardar", "error", "OK");
    }
  };

  const handleEliminar = async () => {
    const resultado = await Swal.fire({
      title: "¿Estás segura/o?",
      text: "Esta acción eliminará el producto permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        await deleteDoc(doc(db, "productos", id));
        Swal.fire("Eliminado", "Producto eliminado exitosamente", "success");
        navigate("/productos");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar", "error");
      }
    }
  };

  return (
    <div className="fondo-formulario">
      <div className="formulario-admin">
        <h2>{id ? "Editar producto" : "Agregar producto"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre del producto</label>
          <input
            type="text"
            list="sugerencias-nombres"
            value={name}
            onChange={(e) => handleNombreSeleccionado(e.target.value)}
          />
          <datalist id="sugerencias-nombres">
            {nombresExistentes.map((nombre, index) => (
              <option key={index} value={nombre} />
            ))}
          </datalist>

          <label>Descripción</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Precio</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>URL de la imagen</label>
          <input type="text" value={imagen} onChange={(e) => setImagen(e.target.value)} />

          <button type="submit" className="btn btn-primary">
            {id ? "Actualizar producto" : "Agregar producto"}
          </button>

          {id && (
            <button type="button" className="btn btn-danger" onClick={handleEliminar}>
              Eliminar
            </button>
          )}

          <button type="button" className="btn btn-secondary" onClick={() => navigate("/productos")}>
            Volver a productos
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioProducto;
