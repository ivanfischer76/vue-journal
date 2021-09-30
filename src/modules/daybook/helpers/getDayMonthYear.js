
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']


const getDayMonthYear = (dateString) => {
		const date = new Date(dateString)
		return {
			dayString: days[date.getDay()],
			day: date.getDate(),
			month: months[date.getMonth()],
			year: date.getFullYear()
		}
	
}

export default getDayMonthYear