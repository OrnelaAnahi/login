export const randoms = (req, res) => {
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
  res.render('random' ,{data: calculo(cant)})
}