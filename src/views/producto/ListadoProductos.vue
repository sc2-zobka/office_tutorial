<template>
    <div>
        <h2>Listado de productos</h2>
        <listado-productos-component/>

    </div>
</template>

<script>
import ListadoProductosComponent from '../../components/producto/ListadoProductosComponent.vue'
export default {
    name: "ListadoProductos",
    components: {ListadoProductosComponent}
}
</script>