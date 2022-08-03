import mongoose from "mongoose"
mongoose.connect("mongodb+srv://user_coder:42856227@cluster0.b8idn.mongodb.net/usuarioMongo?retryWrites=true&w=majority").then(() => {
  console.log("Conexion a MongoDB correcta")
}).catch(err => {
  console.log(err)
})