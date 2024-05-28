
// FIXME: Me devuelve un dia menos.
const formatDate = (fecha) => {
    let nuevaFecha
    if (fecha.includes('T00:00:00.000Z')) {
        nuevaFecha = new Date(fecha.split('T')[0].split('-'))
        //nuevaFecha = new Date(fecha)
    } 
    else{
        nuevaFecha = new Date(fecha)
        //nuevaFecha = nuevaFecha.setTime(nuevaFecha.getTime()+24)
    }
    
    const opciones = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }

    return new Intl.DateTimeFormat('es-ES', opciones).format(nuevaFecha)
}

export default formatDate