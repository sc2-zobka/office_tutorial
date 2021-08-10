<template>
    <div>
        <form action="">

            <label for="">Nombre</label>
            <input type="text" v-model="nombre">
            {{ nombre }}
            <br>
            <label for="">Precio</label>
            <input type="number" v-model="precio">
            <br>
            <label for="">Stock</label>
            <input type="number" v-model="stock">
            <br>
            <label for="">Categoria</label>
            <select name="" id="" v-model="categoria">
                <option value="">seleccionar</option>
                <option v-for="c in categorias" :key="c.id" :value="c.id"> {{ c.nombre_categoria }}</option>
            </select>
            <br>
            <button type="button" :disabled="cargando" @click="guardarProducto">Guardar</button>

        </form>
    </div>
</template>

<script>
export default {
    name: "FormularioProductoComponent",
    data() {
        return {
            nombre: null,
            precio: null,
            stock: null,
            categoria: "", // comboBox
            categorias: [], // categorias desde la API
            cargando: false // flag para no apretar el boton mas de una vez
        }
    },
    created() {
        this.cargarCategorias()
    },
    methods: {
        async cargarCategorias() {

            let url = process.env.VUE_APP_URL_API + "categorias/"
            let data = await fetch(url)
            this.categorias = await data.json()
        },
        async guardarProducto() {
            this.cargando = true
            let url = process.env.VUE_APP_URL_API + "productos/"

            // armar JSON que se enviara

            let data = {
                nombre: this.nombre,
                precio: this.precio,
                stock: this.stock,
                categoria_id: this.categoria
            }

            let response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                method: "post",
                body: JSON.stringify(data)
            })
            // cuando termine de enviar el JSON vuelvo a habilitar el boton
            this.cargando = false

            if (response.status == 200 || response.status == 201) {
                alert("Guardado Correctamente")
            } else {
                alert("Ha ocurrido un error")
            }
        }
    },
}
</script>