<template>
    <div class="table-responsive">
        <!-- <table>
            <tr>
                <th>Nombre</th>
                <th>Categoria</th>
                <th>Precio</th>
                <th>Stock</th>
            </tr>
            <tr v-for="p in productos" :key="p.id">
                <td>{{ p.nombre }}</td>
                <td>{{ p.categoria.nombre_categoria }}</td>
                <td>{{ p.precio }}</td>
                <td>{{ p.stock }}</td>
                <td>
                    <router-link :to="`producto/edit/${p.id}`">Modificar</router-link>
                </td>
            </tr>
        </table> -->

        <b-table fixed striped bordered hover 
            :items="productos" 
            :fields="fields" 
            :primary-key="productos.id"
        >
            <template #cell(id)="data">
                <router-link :to="`producto/edit/${data.value}`">
                    <b-button pill variant="outline-primary" size="sm" class="mb-2">
                        Modificar <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                    </b-button>
                </router-link>
                &nbsp;&nbsp;
                <b-button pill variant="outline-danger" size="sm" class="mb-2" @click="eliminarProducto(data.value)">
                    Eliminar <b-icon icon="x-circle-fill" aria-hidden="true"></b-icon>
                </b-button>
            </template>

        </b-table>
    </div>
</template>

<script>
export default {
    name: "ListadoProductosComponent",
    data() {
        return {
            fields: [
                {
                    key: "nombre",
                    sortable: true
                },
                {
                    key: "categoria.nombre_categoria",
                    sortable: true,
                    label:"Categoria"
                },
                {
                    key: "precio",
                    sortable: true,
                },
                {
                    key: "stock",
                    sortable: true
                },
                {
                    key:"id",
                    label:"Opciones",
                }
            ],
            productos: []
        }
    },
    // Metodo nativo de Vue
    // created() -> Puede llamar a un Componente o Metodo que se ejecutará justo antes que
    //              se llame al componente(ListadoProductosComponent.vue)  
    created() {
        this.cargarProductos()
    },
    methods: {
        async cargarProductos() {
            // armar URL donde apuntara el metodo
            let url = process.env.VUE_APP_URL_API + "productos/"
             
            let data = await fetch(url)
            // se pasa la data al arreglo de productos de arriva
            this.productos = await data.json()
        },
        async eliminarProducto(id) {

            if(!confirm("¿Está seguro que desea eliminar?")) return 

            let url = process.env.VUE_APP_URL_API + "productos/" + id + "/"
            await fetch(url, {
                method: "DELETE"
            })

            alert("Producto Eliminado!")
            // recargo todos los productos para que no se vea el producto recien eliminado
            this.cargarProductos()
        }
    }
}
</script>

<style>
    .sr-only {
        display: none;
        }
</style>