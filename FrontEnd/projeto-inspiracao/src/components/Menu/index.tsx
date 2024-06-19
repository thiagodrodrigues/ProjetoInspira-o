import React, { useEffect, useState } from 'react';
import { Sidebar, ListMenu, LinkMenu, Welcome } from './Menu.style';

const MenuSidebar: React.FC = () => {
  const [name, setName] = useState('');
  const [permission, setPermission] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedPermission = localStorage.getItem('permission');

    if (savedName) {
      const firstName = savedName.split(" ")[0]
      setName(firstName);
    }
    if (savedPermission) {
      setPermission(savedPermission);
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
          <LinkMenu href="/portal">Perfil</LinkMenu>
        </ListMenu>
        <ListMenu>
          <LinkMenu href="/about">Agendamentos</LinkMenu>
        </ListMenu>
        <ListMenu>
          <LinkMenu href="/contact">Histórico de Consultas</LinkMenu>
        </ListMenu>
      </ul>
    </Sidebar>
  );
}

export default MenuSidebar;