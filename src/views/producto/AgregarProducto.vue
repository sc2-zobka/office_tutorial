<template>
    <div>
        <h2>Agregar Producto</h2>
        <br>
        <formulario-producto-component />
    </div>
</template>

<script>
import FormularioProductoComponent from "../../components/producto/FormularioProductoComponent.vue"
export default {
    components: { FormularioProductoComponent },
    name: "AgregarProducto"
}
</script>