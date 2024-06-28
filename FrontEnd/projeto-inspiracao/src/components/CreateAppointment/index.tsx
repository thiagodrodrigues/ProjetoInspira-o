import React, { useState, useEffect } from 'react';
import { AppointmentContainer, AppointmentDetail, AppointmentDetails, Container, Dropdown, Label, Option, StyledCalendarWrapper, RadioButton, RadioGroup, SelectTime, Button, ButtonContainer, CloseButton, ModalContent, ModalFooter, ModalOverlay, TimeContainer } from './CreateAppointment.style';
import Calendar, { TileArgs } from 'react-calendar';
import { getPhysiotherapists } from '../../api/Users';
import { getDates, newSchedule } from '../../api/Calendars';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";

interface Physiotherapist {
  id: string,
  crefito: string,
}

interface UserPhysiotherapist {
  id: number;
  name: string;
  physiotherapist: Physiotherapist
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  available: string;
  duration: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  physiotherapistId: string;
  appointmentId: string | null;
}

const CreateAppointment: React.FC = () => {
  const navigate = useNavigate()
  const [physiotherapists, setPhysiotherapists] = useState<UserPhysiotherapist[]>([]);
  const [idPhysiotherapistSelect, setIdPhysiotherapistSelect] = useState('');
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [listDates, setlistDate] = useState<Appointment[]>([]);
  const [dateSelect, setDateSelect] = useState(new Date());
  const [statusDate, setStatusDate] = useState(false);
  const [selectedIdCalendar, setSelectedIdCalendar] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [displayModal, setDisplayModal] = useState('none');
  const [idUser, setIdUser] = useState('');
  const [physiotherapistName, setPhysiotherapistName] = useState('');

  useEffect(() => {
    if(localStorage.getItem('idPatient')){
      const idPatient = localStorage.getItem('idPatient');
      setIdUser(idPatient!)
    }
    getPhysiotherapists()
    .then((res) => {
      setPhysiotherapists(res.data)
    })
  }, []);

  const handleSelectChange = (event: any) => {
    const selectedId = event.target.value;
    const selectedPhysiotherapist = physiotherapists.find(physio => physio.physiotherapist.id === selectedId)
    setIdPhysiotherapistSelect(selectedId);
    setPhysiotherapistName(selectedPhysiotherapist ? selectedPhysiotherapist.name : "");
  };

  useEffect(() => {
    if (idPhysiotherapistSelect) {
      fetchData();
    }
  }, [idPhysiotherapistSelect, startDate, endDate]);

  const fetchData = async () => {
    try {
      getDates({
        idPhysiotherapist: idPhysiotherapistSelect,
        startDate,
        endDate
      })
      .then((res) => {
        setlistDate(res.data.calendarsFiltered)
        setStatusDate(false)
      })
    } catch (error) {
      console.error('Erro ao fazer nova busca no backend', error);
    }
  };

  const onChange = (date: any) => {
    setDateSelect(date);
    setStatusDate(true);
  };

  const onActiveStartDateChange = async ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (activeStartDate) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setStartDate(dayjs(activeStartDate).startOf('month').format('YYYY-MM-DD'));
      setEndDate(dayjs(activeStartDate).endOf('month').format('YYYY-MM-DD'));
      await fetchData()
    }
  };

  const tileDisabled = ({ date, view }: TileArgs): boolean => {
    if (view === 'month') {
      const dateString = dayjs(date).format('YYYY-MM-DD');
      const appointment = listDates.some(item => item.date === dateString && (item.available === 'LIVRE' || item.available === 'CANCELADO'));
      return !appointment;
    }
    return false;
  };

  const tileClassName = ({ date, view }: TileArgs) => {
    if (view === 'month') {
      const dateString = dayjs(date).format('YYYY-MM-DD');
      const isWeekend = date.getDay() === 0;
      const isAvailable = listDates.some(item => item.date === dateString && (item.available === 'LIVRE' || item.available === 'CANCELADO'));
  
      if (dayjs(dateSelect).format('YYYY-MM-DD') == dateString) {
        return 'date-select';
      } else if(isWeekend) {
        return isAvailable ? 'weekend-available' : 'weekend-unavailable';
      }
      else {
        return isAvailable ? 'available' : 'unavailable';
      }
    }
    return null;
  };

  const handleChange = (event: any) => {
    const selectedTimeId = event.target.value;
    const selectedTimeString = filteredDates.find(dates => dates.id === selectedTimeId)
    setSelectedIdCalendar(selectedTimeId);
    setSelectedTime(selectedTimeString ? selectedTimeString.time : "");
  };

  const filteredDates = listDates.filter(
    appointment =>
      appointment.date === dayjs(dateSelect).format('YYYY-MM-DD') && 
      (appointment.available === 'LIVRE' || appointment.available === 'CANCELADO')
  ).sort((a, b) => a.time.localeCompare(b.time));

  const handleScheduleClick = () => {
    setDisplayModal('block')
  };

  const handleCloseModal = () => {
    setDisplayModal('none')
  };

  const handleConfirmSchedule = async () => {
    try {
      newSchedule({
        calendarId: selectedIdCalendar,
        patientId: idUser,
        physiotherapistId: idPhysiotherapistSelect,
      }).then(() => {
        setDisplayModal('none')
        setTimeout(() => navigate('/portal'), 1000)
      });
    } catch (error) {
      console.error('Erro ao deletar o usuário', error);
    }
  };

  return (
    <Container>
      <AppointmentContainer>
        <AppointmentDetails>
          <AppointmentDetail>
            <Label>Fisioterapeuta</Label>
            <Dropdown value={idPhysiotherapistSelect} onChange={handleSelectChange}>
              <Option value="">Selecione um fisioterapeuta</Option>
              {physiotherapists.map((physio) => (
                <Option key={physio.physiotherapist.id} value={physio.physiotherapist.id}>
                  {physio.name}
                </Option>
              ))}
            </Dropdown>
        </AppointmentDetail>
        {idPhysiotherapistSelect && (
          <StyledCalendarWrapper>
            <Calendar 
              onChange={onChange} 
              value={dateSelect}
              view="month" 
              calendarType="gregory"
              tileDisabled={tileDisabled}
              tileClassName={tileClassName}
              onActiveStartDateChange={onActiveStartDateChange}
            />
          </StyledCalendarWrapper>
        )}
        </AppointmentDetails>
        <TimeContainer>
          <SelectTime>
            {statusDate && (
              filteredDates.map((appointment, index) => (
              <RadioGroup key={index}>
                <RadioButton>
                  <input
                    type="radio"
                    value={appointment.id}
                    checked={selectedIdCalendar === appointment.id}
                    onChange={handleChange}
                  />
                  {appointment.time}
                </RadioButton>
              </RadioGroup>
              ))
            )}
          </SelectTime>
          {statusDate && (
            <ButtonContainer>
              <Button onClick={() => handleScheduleClick()}>Agendar</Button>
            </ButtonContainer>
          )}
        </TimeContainer>
      </AppointmentContainer>
      <ModalOverlay style={{display: `${displayModal}`}}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <h2>Confirmar Agendamento?</h2>
          <br/>
          <p>Fisioterapeuta {physiotherapistName} - {dayjs(dateSelect).format("DD/MM/YYYY")} {selectedTime}</p>
          <br/>
          <p></p>
          <br/>
          <ModalFooter>
            <Button className="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button className="danger" onClick={handleConfirmSchedule}>Agendar</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default CreateAppointment;