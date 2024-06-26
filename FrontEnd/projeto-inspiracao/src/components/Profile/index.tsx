import React, { useEffect, useState } from 'react';
import { Label, ProfileContainer, ProfileDetail, ProfileDetails, ProfileHeader, Value, Container, Button, ButtonContainer, CloseButton, ModalContent, ModalFooter, ModalOverlay } from './Profile.styles';
import { deleteUser, profile } from '../../api/Users';
import trash from '../../assets/img/trash.svg';
import pencil from '../../assets/img/pencil.svg';
import profileImg from '../../assets/img/id-proof-black-icon.svg';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [sex, setSex] = useState('');
  const [profession, setProfession] = useState('');
  const [medical, setMedical] = useState('');
  const [lifeStyle, setLifeStyle] = useState('');
  const [condition, setCondition] = useState('');
  const [comments, setComments] = useState('');
  const [crefito, setCrefito] = useState('');
  const [admins, setAdmins] = useState('');
  const [permission, setPermission] = useState('');
  const [displayModal, setDisplayModal] = useState('none');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        profile()
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
          setPermission(res.data.user_type)
          if(res.data.patient){
            setPhone(res.data.patient.phone)
            setBirth(`${res.data.patient.birth.split('-')[2]}/${res.data.patient.birth.split('-')[1]}/${res.data.patient.birth.split('-')[0]}`)
            setSex(res.data.patient.sex)
            setProfession(res.data.patient.profession)
            setMedical(res.data.patient.medical)
            setLifeStyle(res.data.patient.lifestyle)
            setCondition(res.data.patient.condition)
            setComments(res.data.patient.comments)
          }
          if(res.data.physioterapist){
            setCrefito(res.data.physioterapist.crefito)
          }
          if(res.data.admin){
            setAdmins(res.data.admin.permission)
          }
        });
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDeleteClick = () => {
    setDisplayModal('block')
  };

  const handleCloseModal = () => {
    setDisplayModal('none')
  };

  const handleConfirmDelete = async () => {
    try {
      deleteUser().then(() => {
        setDisplayModal('none')
      });
      // Aqui você pode adicionar lógica para atualizar a lista de usuários ou redirecionar
    } catch (error) {
      console.error('Erro ao deletar o usuário', error);
      // Adicionar lógica de tratamento de erros, como exibir uma mensagem ao usuário
    }
  };

  if (!name || name == '') {
    return <ProfileContainer>Carregando...</ProfileContainer>;
  }

  return (
    <Container>
      <ProfileContainer>
        <ProfileHeader><img src={profileImg} width={"35px"}/>{permission.includes('Usuário')? `Informações do Usuário` : permission}</ProfileHeader>
        <ProfileDetails>
          <ProfileDetail>
            <Label>Nome:</Label>
            <Value>{name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email:</Label>
            <Value>{email}</Value>
          </ProfileDetail>
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Telefone:</Label>
            <Value>{phone}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Data de Nascimento:</Label>
            <Value>{birth}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Sexo:</Label>
            <Value>{sex}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Profissão:</Label>
            <Value>{profession}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Histórico Médico:</Label>
            <Value>{medical}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Estilo de Vida:</Label>
            <Value>{lifeStyle}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Tratamento atual:</Label>
            <Value>{condition}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Usuário') && (
          <ProfileDetail>
            <Label>Observações:</Label>
            <Value>{comments}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Fisioterapeuta') && (
          <ProfileDetail>
            <Label>Crefito:</Label>
            <Value>{crefito}</Value>
          </ProfileDetail>
          )}
          {permission.includes('Administrador') && (
          <ProfileDetail>
            <Label>Permissão:</Label>
            <Value>{admins}</Value>
          </ProfileDetail>
          )}
        </ProfileDetails>
        <ButtonContainer>
          <Button href="/users/update"><img src={pencil} />Editar</Button>
          <Button onClick={() => handleDeleteClick()}><img src={trash} />Excluir</Button>
        </ButtonContainer>
      </ProfileContainer>
      <ModalOverlay style={{display: `${displayModal}`}}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          <h2>Tem certeza que deseja excluir seu perfil?</h2>
          <br/>
          <p>Ao confirmar, todos os seus dados pessoais serão permanentemente anonimizados e essa ação não poderá ser desfeita.</p>
          <br/>
          <p> As informações das suas consultas serão mantidas apenas para fins administrativos, com total anonimato.</p>
          <br/>
          <ModalFooter>
            <Button className="secondary" onClick={handleCloseModal}>Cancelar</Button>
            <Button className="danger" onClick={handleConfirmDelete}>Excluir</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Container>
    
  );
};

export default Profile;