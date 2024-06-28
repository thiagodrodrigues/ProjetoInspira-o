import React, { useEffect, useState } from 'react';
import { Sidebar, ListMenu, LinkMenu, Welcome } from './Menu.style';
import { getContactDontRead } from '../../api/Contact';

const MenuSidebar: React.FC = () => {
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');
  const [owner, setOwner] = useState('');
  const [messages, setMessages] = useState(0);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedPermission = localStorage.getItem('permission');
    const savedOwner = localStorage.getItem('owner');

    if (savedName) {
      const firstName = savedName.split(" ")[0]
      setName(firstName);
    }
    if (savedPermission) {
      setPermission(savedPermission);
    }
    if (savedOwner) {
      getContactDontRead()
      .then((res) => {
        if(res.data.total != 0){
          setMessages(res.data.total)
        }})
      setOwner(savedOwner);
    }
  }, []);
  return (
    <Sidebar>
      <ul>
        <ListMenu>
          <Welcome>
          Bem Vindo {name}
          </Welcome>
        </ListMenu>
        <ListMenu>
          <LinkMenu href="/users">Perfil</LinkMenu>
        </ListMenu>
        {permission.includes('Usuário') && (
          <ListMenu>
            <LinkMenu href="/schedules/new">Nova Consulta</LinkMenu>
          </ListMenu>
        )}
        {permission.includes('Usuário') && (
          <ListMenu>
            <LinkMenu href="/patient/schedules">Histórico de Consultas</LinkMenu>
          </ListMenu>
        )}
        {permission.includes('Fisioterapeuta') && (
          <ListMenu>
            <LinkMenu href="/schedules/new">Nova Consulta</LinkMenu>
          </ListMenu>
        )}
        {permission.includes('Fisioterapeuta') && (
          <ListMenu>
            <LinkMenu href="/physioterapist/schedules">Agendamentos</LinkMenu>
          </ListMenu>
        )}
        {permission.includes('Fisioterapeuta') && (
          <ListMenu>
            <LinkMenu href="/physioterapist/patients">Pacientes</LinkMenu>
          </ListMenu>
        )}
        {owner.includes('true') && (
          <ListMenu>
            <LinkMenu href="/physioterapist/patients">Blog</LinkMenu>
          </ListMenu>
        )}
        {owner.includes('true') && (
          <ListMenu>
            <LinkMenu href="/physioterapist/patients">Finanças</LinkMenu>
          </ListMenu>
        )}
        {owner.includes('true') && (
          <ListMenu>
            <LinkMenu href="/physioterapist/patients">Contatos ({messages})</LinkMenu>
          </ListMenu>
        )}
      </ul>
    </Sidebar>
  );
}

export default MenuSidebar;