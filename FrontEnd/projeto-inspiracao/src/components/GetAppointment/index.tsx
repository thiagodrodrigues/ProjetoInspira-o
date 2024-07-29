import React, { useEffect, useState } from 'react';
import { Container, ScheduleList, Button, SectionTitle, ScheduleCard, ScheduleCardContent, ScheduleRow, ScheduleItemLabel, ScheduleItemValue, DetailsButtonFuture, DetailsButtonPast, CloseButton, ModalContent, ModalFooter, ModalOverlay } from './GetAppointment';
import { cancelSchedule, getSchedules } from '../../api/Appointments';
import Pagination from '../Pagination';
import { getPhysiotherapists } from '../../api/Users';

interface AppointmentEntity {
  id: string,
  physiotherapistId: string,
  patientId: string,
  activies: string,
  comments: string,
  calendar: CalendarEntity,
}

interface CalendarEntity {
  id: string,
  date: string,
  time: string,
  available: string,
  duration: string,
}

interface Physiotherapist {
  id: string,
  crefito: string,
}

interface UserPhysiotherapist {
  id: number;
  name: string;
  physiotherapist: Physiotherapist
}

const GetAppointment: React.FC = () => {
  const [futureSchedules, setFutureSchedules] = useState<AppointmentEntity[]>([]);
  const [pastSchedules, setPastSchedules] = useState<AppointmentEntity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [physiotherapistName, setPhysiotherapistName] = useState< {[key: string]: string}>({});
  const [physiotherapists, setPhysiotherapists] = useState<UserPhysiotherapist[]>([]);
  const [displayModal, setDisplayModal] = useState('none');
  const [appointmentID, setAppointmentId] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    getPhysiotherapists()
    .then((res) => {
      setPhysiotherapists(res.data)
    })
    const fetchSchedules = async () => {
      getSchedules('future')
      .then((res) => {
        if(res.data.length>=3){
          const threeSchedules = [];
          for(let i = 0; i<3; i++){
            threeSchedules.push(res.data[i]);
          }
          setFutureSchedules(threeSchedules);
        } else if(res.data.length>0 && res.data.length<3){
          setFutureSchedules(res.data);
        }
      });
      getSchedules('past')
      .then((res) => {
        setPastSchedules(res.data);
      });
    };

    fetchSchedules();
  }, []);

  const handleScheduleClick = (appointmentId: string) => {
    setAppointmentId(appointmentId)
    setDisplayModal('block')
  };

  const handleCloseModal = () => {
    setAppointmentId('')
    setDisplayModal('none')
  };

  const handleConfirmSchedule = async () => {
    try {
      cancelSchedule(appointmentID).then(() => {
        setDisplayModal('none')
        setTimeout(() => {window.location.reload();}, 1000)
      });
    } catch (error) {
      console.error('Erro ao cancelar a consulta', error);
    }
  };

  useEffect(() => {
    const names: any = {};
    futureSchedules.forEach(schedule => {
      const selectedPhysiotherapist = physiotherapists.find(physio => physio.physiotherapist.id === schedule.physiotherapistId);
      if (selectedPhysiotherapist) {
        names[schedule.physiotherapistId] = selectedPhysiotherapist.name;
      }
    });
    pastSchedules.forEach(schedule => {
      const selectedPhysiotherapist = physiotherapists.find(physio => physio.physiotherapist.id === schedule.physiotherapistId);
      if (selectedPhysiotherapist) {
        names[schedule.physiotherapistId] = selectedPhysiotherapist.name;
      }
    });
    setPhysiotherapistName(names);
  }, [futureSchedules, physiotherapists]);

  const indexOfLastSchedule = currentPage * itemsPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - itemsPerPage;
  const currentPastSchedules = pastSchedules.slice(indexOfFirstSchedule, indexOfLastSchedule);
  const totalPages = Math.ceil(pastSchedules.length / itemsPerPage)

  return (
    <Container>
    <SectionTitle>Próximas Consultas</SectionTitle>
    {futureSchedules.length > 0 && (
      <ScheduleList>
      {futureSchedules.map((schedule, index) => (
        <ScheduleCard key={index}>
          <ScheduleCardContent>
            <ScheduleRow>
              <ScheduleItemLabel>Data:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.date}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Hora:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.time}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Status:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.available}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Fisioterapeuta:</ScheduleItemLabel>
              <ScheduleItemValue>{physiotherapistName[schedule.physiotherapistId]}</ScheduleItemValue>
            </ScheduleRow>
            <DetailsButtonFuture onClick={() => handleScheduleClick(schedule.id)}>Cancelar</DetailsButtonFuture>
          </ScheduleCardContent>
        </ScheduleCard>
      ))}
    </ScheduleList>
    )}
    <SectionTitle>Histórico de Consultas</SectionTitle>
    <ScheduleList>
      {currentPastSchedules.map((schedule, index) => (
        <ScheduleCard key={index}>
          <ScheduleCardContent>
            <ScheduleRow>
              <ScheduleItemLabel>Data:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.date}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Hora:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.time}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Status:</ScheduleItemLabel>
              <ScheduleItemValue>{schedule.calendar.available}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Fisioterapeuta:</ScheduleItemLabel>
              <ScheduleItemValue>{physiotherapistName[schedule.physiotherapistId]}</ScheduleItemValue>
            </ScheduleRow>
            <DetailsButtonPast href={`appointment/${schedule.id}`}>Detalhes</DetailsButtonPast>
          </ScheduleCardContent>
        </ScheduleCard>
      ))}
    </ScheduleList>
      <Pagination
        currentPage={currentPage}
        maxLength={7}
        lastPage={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <ModalOverlay style={{display: `${displayModal}`}}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <h2>Cancelar Agendamento?</h2>
          <br/>
          <p>Tem certeza que deseja cancelar sua consulta?</p>
          <br/>
          <ModalFooter>
            <Button className="secondary" onClick={handleCloseModal}>Não</Button>
            <Button className="danger" onClick={handleConfirmSchedule}>Sim</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default GetAppointment;