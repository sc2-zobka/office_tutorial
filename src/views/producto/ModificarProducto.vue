<template>
    <div>
        <h2>Modificar Producto</h2>
        <br>
        <formulario-producto-component/>
    </div>
</template>

<script>
import FormularioProductoComponent from "../../components/producto/FormularioProductoComponent.vue"
export default {
  components: { FormularioProductoComponent },
    name: "ModificarProducto"
}
</script>