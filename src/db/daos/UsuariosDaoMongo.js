import ContenedorMongoDb from '../contenedores/ContenedorMongo'

import bcrypt from "bcrypt"

let instance = null


class UsuariosDao extends ContenedorMongoDb {
  constructor() {
    super("usuarios", {
      nombre: String,
      email: String,
      password: String,
    })
  }
  static getInstance() {
    if (!instance) {
      instance = new UsuariosDao()
    }

    return instance
  }

  encriptar = (contraseña) => {
    return bcrypt.hashSync(contraseña, bcrypt.genSaltSync(5))
  };

  comparar = (encriptada, contraseña) => {
    return bcrypt.compareSync(contraseña, encriptada)
  };
}


export default UsuariosDao