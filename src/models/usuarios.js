import mongoose from "mongoose"
import bcrypt from "bcrypt"

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String
})

usuarioSchema.methods.encriptar = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5))
}

const Usuarios = mongoose.model("Usuarios", usuarioSchema)

export default Usuarios