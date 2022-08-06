import { Router } from 'express'
// import {fork} from 'child_process'
// const forked = fork('./src/calculo.js')


const router = Router()

router.get("/randoms", (req, res) => {
  // if (req.query.cant) {
  //   forked.send(req.query.cant);
  // } else {
  //   forked.send(100000000);
  // }
  // forked.on("message", (msj) => {
  //   res.render('random' ,{data: msj})
  // });
  // forked.on("exit", (code) => {
  //   console.log("Se ha cerrado el proceso", code);
  // });
  let cant = req.query.cant || 100000000
  const calculo = (cant) => {
    let obj = {};
    for (let i = 0; i < cant; i++) {
      let num = Math.floor(Math.random() * 1000);
      if (obj[num]) {
        obj[num] = obj[num] + 1;
      } else {
        obj[num] = 1;
      }
    }
    return obj
  };
  res.render('random', { data: calculo(cant) })
});

export default router