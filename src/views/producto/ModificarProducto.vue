<template>
    <div>
        <h2>Modificar Producto</h2>
        <br>
        <formulario-producto-component/>
         {{ producto }}
    </div>
</template>

<script>
import FormularioProductoComponent from "../../components/producto/FormularioProductoComponent.vue"

export default {
    components: { FormularioProductoComponent },
    name: "ModificarProducto",
    data() { 
        return {
            producto: null
        }
    },
    created() {
        // 1 - recibir id del producto que viene en la url
        let id = this.$route.params.id

        // 4 - Llamo al método buscarProductoPorID(id) para cargar la data(el producto que trae desde la API)
        //     y así poder acceder a ella a través de la Props producto que ya no será Null
        this.buscarProductoPorID(id) 
    },
    methods: {
        // 2 - Metodo para buscar producto por ID en la API.
        //    Debemos pasar el ID que viene en la URL como parametro al metodo.
        async buscarProductoPorID(id) {
            
            let url = process.env.VUE_APP_URL_API + "productos/" + id + "/"
            let data = await fetch(url)
            // 3 - Parseo el producto obtenido por id y se lo paso a la Props "producto" 
            //     dentro del Objeto data()
            this.producto = await data.json()
        }
    }
}
</script>