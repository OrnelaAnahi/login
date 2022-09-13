
import "dotenv/config"

let usuariosDao

switch (process.env.PERS) {
  default:
    const { default: UsuariosDaoMongoDb } = await import(
      "./daos/UsuariosDaoMongo.js"
    )
    usuariosDao = UsuariosDaoMongoDb.getInstance()
    break
}

export default usuariosDao