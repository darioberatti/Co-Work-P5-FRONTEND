const { DateTime } = require("luxon");

const numeroAMes = (mes) => {
  if (parseInt(mes) < 1 || parseInt(mes) > 12) {
    return "Número de mes inválido";
  }

  const fecha = DateTime.fromObject({ month: mes });

  let nombreMes = fecha.toLocaleString({ month: "long" });

  nombreMes = nombreMes[0].toUpperCase() + nombreMes.slice(1, nombreMes.length);

  return nombreMes;
};

export const descriptionBookings = (oldDate) => {
  const newDate = `${oldDate[8]}${oldDate[9]} de ${numeroAMes(
    oldDate[5] + oldDate[6]
  )} de ${oldDate[0]}${oldDate[1]}${oldDate[2]}${oldDate[3]}`;
  
  return newDate;
};

export const birthSetter = (newDate)=>{
  const date = newDate.split("T")[0]
  const [year,month,day] = date.split("-")
  return `${day}/${month}/${year}`
}