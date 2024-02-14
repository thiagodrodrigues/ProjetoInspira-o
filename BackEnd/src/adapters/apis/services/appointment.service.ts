import constantsConfig from '../../../infrastructure/config/constants.config';

class AppointmentService {
  async conversionForDate(data: any): Promise<Date>{
    try {
      let response = new Date(`${data.year}-${data.month}-${data.day}`,)
      return response;
    } catch (error) {
      return new Date()
    }
  }
  
  async conversionDateSchedule(data: any){
    try {
      let response: any = []
      for(let ix=0; ix<data.year.length; ix++){
        for(let i=0; i<data.month.length; i++){
          for(let index=0; index<data.day.length; index++){
            for(let it=0; it<data.time.length; it++){
              response.push({
                available: data.available,
                idFisioterapist: data.userInfo.idFisioterapist,
                date: `${data.year[i]}-${data.month[i]}-${data.day[index]}`,
                time: data.time[it],
                duration: data.duration
              })
            }
          }
        }
      }
      return response;
    } catch (error) {
    }
  }

  calculateTimes(time: string, duration: number) {
    const times = [];
    const [hours, minutes] = time.split(":").map(Number);

    for (let i = duration-5; i >= 0; i -= 5) {
        const currentMinutes = (minutes - i + 60) % 60;
        const currentHours = hours + Math.floor((minutes - i) / 60);
        const formattedTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);
    }

    for (let index = 5; index <= duration-5; index += 5) {
        const currentMinutes = (minutes + index) % 60;
        const currentHours = hours + Math.floor((minutes + index) / 60);
        const formattedTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;
        times.push(formattedTime);
    }
    return times;
  }

  checkRelationAppointmentUser(idFisioterapistUser?: number, idFisioterapist?: number, idPatientUser?: number, idPatient?: number){
    let status = undefined;
    if(idFisioterapistUser && idFisioterapistUser == idFisioterapist){
      status = {
        status: true,
        relation: "Fisioterapist"
      };
    } else if (idPatientUser && idPatientUser == idPatient){
      status = {
        status: true,
        relation: "Patient"
      };
    }
    return status;
  }

}


export default new AppointmentService();