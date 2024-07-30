import React, { useEffect, useState } from 'react';
import { Label, ProfileContainer, ProfileDetail, ProfileDetails, ErrorMessage, InputModal, LabelModal, RadioModal, SpanModal, ProfileHeader, Value, Container, Button, ButtonContainer, CloseButton, ModalContent, ModalFooter, ModalOverlay } from './Profile.styles';
import { deleteUser, profile, updateUser} from '../../api/Users';
import trash from '../../assets/img/trash.svg';
import pencil from '../../assets/img/pencil.svg';
import profileImg from '../../assets/img/id-proof-black-icon.svg';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [owner, setOwner] = useState(false);
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
  const [displayModalUpdate, setDisplayModalUpdate] = useState('none');
  const [messageErrorName, setMessageErrorName] = useState('');
  const [messageErrorEmail, setMessageErrorEmail] = useState('');
  const [messageErrorPassword, setMessageErrorPassword] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        profile()
        .then((res) => {
          setName(res.data.name)
          setEmail(res.data.email)
          setPermission(res.data.user_type)
          setOwner(res.data.owner)
          if(res.data.patient){
            setPhone(res.data.patient.phone)
            setBirth(`${res.data.patient.birth.split('-')[2]}/${res.data.patient.birth.split('-')[1]}/${res.data.patient.birth.split('-')[0]}`)
            setBirthDate(`${res.data.patient.birth}`)
            setSex(res.data.patient.sex)
            setProfession(res.data.patient.profession)
            setMedical(res.data.patient.medical)
            setLifeStyle(res.data.patient.lifestyle)
            setCondition(res.data.patient.condition)
            setComments(res.data.patient.comments)
          }
          if(res.data.physiotherapist){
            setCrefito(res.data.physiotherapist.crefito)
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

  const handleUpdateClick = () => {
    setDisplayModalUpdate('block')
  };

  const handleCloseModalUpdate = () => {
    setDisplayModalUpdate('none')
  };

  const handleChangeProfile = (e: any) => {
    const { name, value } = e.target;
    if(name == "name"){
      setName(value)
    }
    if(name == "email"){
      setEmail(value)
    }
    if(name == "password"){
      setPassword(value)
    }
    if(name == "confirmPassword"){
      setConfirmPassword(value)
    }
    if(name == "phone"){
      setPhone(value)
    }
    if(name == "birth"){
      setBirth(value)
    }
    if(name == "sex"){
      setSex(value)
    }
    if(name == "profession"){
      setProfession(value)
    }
    if(name == "medical"){
      setMedical(value)
    }
    if(name == "lifestyle"){
      setLifeStyle(value)
    }
    if(name == "condition"){
      setCondition(value)
    }
    if(name == "comments"){
      setComments(value)
    }
    if(name == "crefito"){
      setCrefito(value)
    }
    if(name == "permission"){
      setPermission(value)
    }
  };

  const handleConfirmDelete = async () => {
    try {
      deleteUser().then(() => {
        localStorage.clear();
        setDisplayModal('none')
        navigate('/');
      });
    } catch (error) {
      console.error('Erro ao deletar o usuário', error);
    }
  };

  const handleConfirmUpdate = async () => {
    try {
      if(name == ""){
        setMessageErrorName("O campo 'Nome' deve ser preenchido.")
      } else if(email == ""){
        setMessageErrorEmail("O campo 'Email' deve ser preenchido.")
      } else if(password !== confirmPassword){
        setMessageErrorPassword("As senhas devem ser iguais.")
      } else {
        let sendPassword = undefined
        if(password !== ""){
          sendPassword = password
        }
        if(permission == "Usuário"){
          updateUser({
            email: email,
            name: name,
            password: sendPassword,
            owner: owner,
            patient: {
              birth: birthDate,
              comments: comments,
              condition: condition,
              lifestyle: lifeStyle,
              medical: medical,
              phone: phone,
              profession: profession,
              sex: sex
            }
          }).then(() => {
            setDisplayModalUpdate('none')
            setTimeout(() => {window.location.reload();}, 1000)
          });
        }
        if(permission == "Fisioterapeuta"){
          console.log("!!!!!!!!")
          updateUser({
            email: email,
            name: name,
            password: sendPassword,
            owner: owner,
            physiotherapist: {
              crefito: crefito
            }
          }).then(() => {
            setDisplayModalUpdate('none')
          });
        }
        if(permission == "Administrador"){
          updateUser({
            email: email,
            name: name,
            password: sendPassword,
            owner: owner,
            admin: {
              permission: permission
            }
          }).then(() => {
            setDisplayModalUpdate('none')
          });
        }
      }
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
          <Button onClick={() => handleUpdateClick()}><img src={pencil} />Editar</Button>
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
      <ModalOverlay style={{ display: `${displayModalUpdate}` }}>
      <ModalContent>
        <CloseButton onClick={handleCloseModalUpdate}>&times;</CloseButton>
        <h2>Atualizar Perfil</h2>
        <br />
        <LabelModal htmlFor="financeDescription">Nome</LabelModal>
        <InputModal
          type="text"
          name="name"
          value={name}
          onChange={handleChangeProfile}
        />
        {messageErrorName !== "" && (
          <ErrorMessage>{messageErrorName}</ErrorMessage>
        )}
        <LabelModal htmlFor="value">Email</LabelModal>
        <InputModal
          type="text"
          name="email"
          value={email}
          onChange={handleChangeProfile}
        />
        {messageErrorEmail !== "" && (
          <ErrorMessage>{messageErrorEmail}</ErrorMessage>
        )}
        <LabelModal htmlFor="value">Senha</LabelModal>
        <InputModal
          type="password"
          name="password"
          value={password}
          onChange={handleChangeProfile}
        />
        <LabelModal htmlFor="value">Confirmar Senha</LabelModal>
        <InputModal
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeProfile}
        />
        {messageErrorPassword !== "" && (
          <ErrorMessage>{messageErrorPassword}</ErrorMessage>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Telefone</LabelModal>
        <InputModal
          type="text"
          name="phone"
          value={phone}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
          <>
            <LabelModal htmlFor="value">Sexo</LabelModal>
            <RadioModal>
            <SpanModal>
              <InputModal
                type="radio"
                name="sex"
                value="MASCULINO"
                checked={sex == "MASCULINO"? true: false}
                onChange={handleChangeProfile}
              />
              Masculino
            </SpanModal>
            <SpanModal>
              <InputModal
                type="radio"
                name="sex"
                value="FEMININO"
                checked={sex == "FEMININO"? true: false}
                onChange={handleChangeProfile}
              />
              Feminino
            </SpanModal>
            <SpanModal>
              <InputModal
                type="radio"
                name="sex"
                value="NÃO INFORMADO"
                checked={sex == "NÃO INFORMADO"? true: false}
                onChange={handleChangeProfile}
              />
              Outros / Não Informar
            </SpanModal>
            </RadioModal>
          </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Data de Nascimento</LabelModal>
        <InputModal
          type="date"
          name="birth"
          value={birthDate}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Profissão</LabelModal>
        <InputModal
          type="text"
          name="profession"
          value={profession}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Histórico Médico</LabelModal>
        <InputModal
          type="text"
          name="medical"
          value={medical}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Estilo de vida</LabelModal>
        <InputModal
          type="text"
          name="lifestyle"
          value={lifeStyle}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Tratamento atual</LabelModal>
        <InputModal
          type="text"
          name="condition"
          value={condition}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Usuário') && (
        <>
        <LabelModal htmlFor="value">Observações</LabelModal>
        <InputModal
          type="text"
          name="comments"
          value={comments}
          onChange={handleChangeProfile}
        />
        </>
        )}
        {permission.includes('Fisioterapeuta') && (
        <>
        <LabelModal htmlFor="value">Crefito</LabelModal>
        <InputModal
          type="text"
          name="crefito"
          value={crefito}
          onChange={handleChangeProfile}
        />
        </>
        )}
        <br />
        <ModalFooter>
          <Button className="secondary" onClick={handleCloseModalUpdate}>Cancelar</Button>
          <Button className="danger" onClick={handleConfirmUpdate}>Atualizar</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
    </Container>
    
  );
};

export default Profile;