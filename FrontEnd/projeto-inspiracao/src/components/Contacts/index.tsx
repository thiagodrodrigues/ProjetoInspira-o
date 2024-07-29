import React, { useEffect, useState } from 'react';
import { Container, ScheduleList, Button, SectionTitle, ScheduleCard, ScheduleCardContent, ScheduleRow, ScheduleItemLabel, ScheduleItemValue, DetailsButtonFuture, DetailsButtonPast, CloseButton, ModalContent, ModalFooter, ModalOverlay } from './Contact.styles';
import Pagination from '../Pagination';
import { deleteContact, getContactDontRead, getContactId, getContactRead } from '../../api/Contact';
import dayjs from 'dayjs';

interface ContactEntity {
  id: string,
  name: string,
  email: string,
  message: string,
  read: string,
  created_at: string,
}

const GetContact: React.FC = () => {
  const [allMessages, setAllMessages] = useState<ContactEntity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [displayModal, setDisplayModal] = useState('none');
  const [displayModalRead, setDisplayModalRead] = useState('none');
  const [messageContact, setMessageContact] = useState<ContactEntity | undefined>(undefined);
  const [contactID, setContactID] = useState('');
  const [atualPageMessages, setAtualPageMessages] = useState<ContactEntity[]>([]);

  const itemsPerPage = 10;

  useEffect(() => {
    const messages: any[] = []
    const fetchContacts = async () => {
    const [dontReadRes, readRes] = await Promise.all([getContactDontRead(), getContactRead()]);
    
    if(dontReadRes.data.patientsFiltered.length>0){
      for(let i=0; i<dontReadRes.data.patientsFiltered.length; i++){
        messages.push({
          id: dontReadRes.data.patientsFiltered[i].id,
          name: dontReadRes.data.patientsFiltered[i].name,
          email: dontReadRes.data.patientsFiltered[i].email,
          read: `${dontReadRes.data.patientsFiltered[i].read}`,
          created_at: dayjs(dontReadRes.data.patientsFiltered[i].created_at).format("DD/MM/YYYY")
        });
      }
    }
    if(readRes.data.patientsFiltered.length>0){
      for(let i=0; i<readRes.data.patientsFiltered.length; i++){
      messages.push({
        id: readRes.data.patientsFiltered[i].id,
        name: readRes.data.patientsFiltered[i].name,
        email: readRes.data.patientsFiltered[i].email,
        read: `${readRes.data.patientsFiltered[i].read}`,
        created_at: dayjs(readRes.data.patientsFiltered[i].created_at).format("DD/MM/YYYY")
      });
    }
    }
    setAllMessages(messages);
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const indexOfLastSchedule = currentPage * itemsPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - itemsPerPage;
    setAtualPageMessages(allMessages.slice(indexOfFirstSchedule, indexOfLastSchedule));
    setTotalPages(Math.ceil(allMessages.length / itemsPerPage));
  }, [allMessages, currentPage, itemsPerPage]);

  const handleScheduleClick = (contactId: string) => {
    setDisplayModalRead('none');
    setContactID(contactId)
    setDisplayModal('block')
  };

  const handleCloseModal = () => {
    setContactID('')
    setDisplayModal('none')
  };

  const handleConfirmSchedule = async () => {
    try {
      deleteContact(contactID).then(() => {
        setDisplayModal('none')
        setTimeout(() => {window.location.reload();}, 1000)
      });
    } catch (error) {
      console.error('Erro ao cancelar a consulta', error);
    }
  };

/*   const handleContactClick = (contactId: string) => {
    setContactID(contactId)
    setDisplayModalRead('block')
  };

  const handleCloseModalContact = () => {
    setContactID('')
    setDisplayModalRead('none')
  };

  const handleConfirmContact = async () => {
    try {
      getContactId(contactID).then((res) => {
        setMessageContact(res.data)
        setDisplayModal('none')
      });
    } catch (error) {
      console.error('Erro ao cancelar a consulta', error);
    }
  }; */

  const handleContactClick = async (contactId: string) => {
    setContactID(contactId);
    try {
      const res = await getContactId(contactId);
      setMessageContact(res.data);
      setDisplayModalRead('block');
    } catch (error) {
      console.error('Erro ao buscar a mensagem de contato', error);
    }
  };
  
  const handleCloseModalContact = () => {
    setContactID('');
    setMessageContact(undefined);
    setDisplayModalRead('none');
    setTimeout(() => {window.location.reload();}, 1000)
  };

  return (
    <Container>
    <SectionTitle>Contatos</SectionTitle>
      <ScheduleList>
      {atualPageMessages.map((message, index) => (
        <ScheduleCard key={index}>
          <ScheduleCardContent>
            <ScheduleRow>
              <ScheduleItemLabel>Nome:</ScheduleItemLabel>
              <ScheduleItemValue>{message.name}</ScheduleItemValue>
            </ScheduleRow>
            <ScheduleRow>
              <ScheduleItemLabel>Data:</ScheduleItemLabel>
              <ScheduleItemValue>{message.created_at}</ScheduleItemValue>
            </ScheduleRow>
            {message.read.includes('true') ? (
              <ScheduleRow>
                <ScheduleItemValue>Lida</ScheduleItemValue>
              </ScheduleRow>
            ) : (
              <ScheduleRow>
                <ScheduleItemValue>Não lida</ScheduleItemValue>
              </ScheduleRow>
            )}
            <DetailsButtonPast onClick={() => handleContactClick(message.id)}>Ler</DetailsButtonPast>
            <DetailsButtonFuture onClick={() => handleScheduleClick(message.id)}>Apagar</DetailsButtonFuture>
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
          <h2>Apagar Contato?</h2>
          <br/>
          <p>Tem certeza que deseja apagar esta mensagem?</p>
          <br/>
          <ModalFooter>
            <Button className="secondary" onClick={handleCloseModal}>Não</Button>
            <Button className="danger" onClick={handleConfirmSchedule}>Sim</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
      <ModalOverlay style={{display: `${displayModalRead}`}}>
        <ModalContent>
          <CloseButton onClick={handleCloseModalContact}>&times;</CloseButton>
          <h2>{messageContact?.name} - {dayjs(messageContact?.created_at).format("DD/MM/YYYY")}</h2>
          <br/>
          <p><b>Email: </b>{messageContact?.email}</p>
          <br/>
          <p>{messageContact?.message}</p>
          <br/>
          <p></p>
          <ModalFooter>
            <Button className="danger" onClick={() => handleScheduleClick(messageContact!.id)}>Apagar</Button>
            <Button className="secondary" onClick={handleCloseModalContact}>Sair</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default GetContact;