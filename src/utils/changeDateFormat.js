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

export const reservationDateSetter = (newDate) => {
  const date = newDate.split("T")[0]
  const [year,month,day] = date.split("-")

  const monthInLetters = monthSetter(month)

  return `${day} de ${monthInLetters} de ${year}` ;
};

function monthSetter(month) {
  switch (month) {
    case "1":
      month = "Enero";
      break;
    case "2":
      month = "Febrero";
      break;
    case "3":
      month = "Marzo";
      break;
    case "4":
      month = "Abril";
      break;
    case "5":
      month = "Mayo";
      break;
    case "6":
      month = "Junio";
      break;
    case "7":
      month = "Julio";
      break;
    case "8":
      month = "Agosto";
      break;
    case "9":
      month = "Septiembre";
      break;
    case "10":
      month = "Octubre";
      break;
    case "11":
      month = "Noviembre";
      break;
    case "12":
      month = "Diciembre";
      break;
    default:
      return;
  }

  return month
}
