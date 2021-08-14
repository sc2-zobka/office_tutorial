<template>
    <div>
        <form action="">

            <label for="">Nombre</label>
            <input type="text" v-model="nombre">
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
            <button type="button" :disabled="cargando" @click="save">{{ CreateOrEdit }}</button>

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
            cargando: false, // flag para no apretar el boton mas de una vez
            id: null
        }
    },
    // PARAMETRIZAR EL FORMULARIO
    // Usaremos Props para parametrizar el formulario, es decir,
    // el mismo Form sera usado para modificar, agregar o eliminar
    // Las Props serviran como Flag para el Form (modificar, agregar o eliminar)
    // Ejemplo: Props seria como una función y lo de dentro serían los Parametros
    // "producto" seria tratado como parametro de tipo Object ya que es un JSON
    props : {
        producto: {
            required: false,
            type: Object
        },
        //Agregar Props para ver si está modificando o agregando
        modificando: {
            required: false,
            type: Boolean,
            default: false
        }
    },
    // Props Computada para no agregar logica ternaria en el template
    computed: {
        CreateOrEdit() {
            return (this.modificando) ? "Modificar":"Guardando"
        }
    },
    // "Watch:" se usa para detectar cuando recibo algun paramtro
    //         basicamente "Obeserva" el comportamiento de los parametros si es que cambian
    watch: {
        //Observa el comportamiento del parametro "producto" dentro de "props"
        producto(val) {
            // si el parametro(producto) recibe algo(val) (en este caso el Objeto JSON con el producto)
            // entonces pasamos este Objeto a las variables en data()
            if (val) {
                this.nombre = val.nombre,
                this.precio = val.precio,
                this.stock = val.stock,
                this.categoria = val.categoria_id,
                this.id = val.id
            }
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
        save() {
            (this.modificando) ? this.ModificarProducto(): this.guardarProducto()
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
        },
        async ModificarProducto() {
            this.cargando = true
            let url = process.env.VUE_APP_URL_API + "productos/" + this.id + "/"

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
                method: "put",
                body: JSON.stringify(data)
            })
            // cuando termine de enviar el JSON vuelvo a habilitar el boton
            this.cargando = false

            if (response.status == 200 || response.status == 201) {
                alert("Modificado Correctamente")
            } else {
                alert("Ha ocurrido un error")
            }
        }
    },
}
</script>