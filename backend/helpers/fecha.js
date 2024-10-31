// helpers/fecha.js
import moment from 'moment-timezone';

export function convertirFecha(fechaIso) {
    // Crear un objeto moment con la fecha ISO y la zona horaria UTC
    const fechaMoment = moment.utc(fechaIso);

    // Convertir a la zona horaria deseada (ajusta según tu necesidad)
    const fechaConvertida = fechaMoment.tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss');

    return fechaConvertida;
}
export function convertirFechaYYYMMDD(fechaIso) {
    // Crear un objeto moment con la fecha ISO y la zona horaria UTC
    const fechaMoment = moment.utc(fechaIso);

    // Convertir a la zona horaria deseada (ajusta según tu necesidad)
    const fechaConvertida = fechaMoment.tz('America/Mexico_City').format('YYYY-MM-DD');

    return fechaConvertida;
}