import React, { useState, useEffect } from 'react';
import { createCash, createFinance, deleteFinance, getFields, getFinances, updateFinance, getCash } from '../../api/Finances';
import { CashContainer, SpanModal, RadioModal, CashDetails, Container, Dropdown, Label, Option, CashDetail, Button, CloseButton, ModalContent, ModalFooter, ModalOverlay, ButtonTransaction, DateInput, FiltersContainer, Input, PageContainer, ResultsContainer, InputModal, LabelModal, SelectModal, PageDetail, ErrorMessage, ActionButton, Table, TableData, TableHeader, TableRow, } from './Finances.Styles';
import dayjs from 'dayjs';
import trash from '../../assets/img/trash.svg';
import pencil from '../../assets/img/pencil.svg';

interface Cash {
  id?: string;
  wallet: string;
  balance: string;
  owner: string;
  id_owner?: string;
}

interface Finance {
  id?: string;
  financeType: string;
  financeCategory: string;
  financeCategoryValue?: string;
  financeDescription: string;
  value: string;
  transaction: string;
  transactionValue?: string;
  financeDate: string;
  status: string;
  statusValue?: string;
  cash: Cash;
}

const FinanceComponent: React.FC = () => {
  const [accounts, setAccounts] = useState<Cash[]>([]);
  const [expensesField, setExpensesField] = useState<any[]>([]);
  const [revenueField, setRevenueField] = useState<any[]>([]);
  const [statusField, setStatusField] = useState<any[]>([]);
  const [transactionField, setTransactionField] = useState<any[]>([]);
  const [finances, setFinances] = useState<Finance[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<Cash>({id: "", wallet: "", balance: "", owner: "", id_owner: ""});
  const [cashEntity, setCashEntity] = useState<Cash>({id: "", wallet: "", balance: "", owner: "", id_owner: ""});
  const [financeEntity, setFinanceEntity] = useState<Finance>({id: "", cash: {id: "", wallet: "", balance: "", owner: "", id_owner: ""}, financeType: "", financeCategory: "", financeDate: "", financeDescription: "", status: "", transaction: "", value: "", financeCategoryValue: "", statusValue: "", transactionValue: ""});
  const [startDate, setStartDate] = useState(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [filter, setFilter] = useState("");
  const [searchTransactionField, setSearchTransactionField] = useState("");
  const [searchStatusField, setSearchStatusField] = useState("");
  const [searchTypeField, setSearchTypeField] = useState("");
  const [displayModal, setDisplayModal] = useState('none');
  const [displayModalCash, setDisplayModalCash] = useState('none');
  const [displayModalUpdateFinance, setDisplayModalUpdateFinance] = useState('none');
  const [messageErrorValue, setMessageErrorValue] = useState('');
  const [messageErrorBalance, setMessageErrorBalance] = useState('');
  const [messageErrorWallet, setMessageErrorWallet] = useState('');
  const [messageErrorOwner, setMessageErrorOwner] = useState('');
  const [owner, setOwner] = useState('');
  const [idOwner, setIdOwner] = useState('');
  const [filters, setFilters] = useState({
    typeField: '',
    statusField: '',
    transactionField: '',
    filter: '',
    dateFrom: dayjs().startOf('month').format('YYYY-MM-DD'),
    dateTo: dayjs().endOf('month').format('YYYY-MM-DD')
  });

  useEffect(() => {
    getCash().then((res) => {
      setAccounts(res.data)
    });
    getFields("Receita").then((res) => {
      setRevenueField(res.data)
    });
    getFields("Despesa").then((res) => {
      setExpensesField(res.data)
    });
    getFields("Status").then((res) => {
      setStatusField(res.data)
    });
    getFields("Transação").then((res) => {
      setTransactionField(res.data)
    });
    const savedOwner = localStorage.getItem('owner');
    if (savedOwner == 'true') {
      const savedIdOwner = localStorage.getItem('id');
      setOwner("Proprietário");
      setIdOwner(savedIdOwner!)
    }
  }, []);

  const handleSelectChange = (event: any) => {
    const selectId = event.target.value;
    const selectedAccountValue = accounts.find(account => account.id == selectId)
    if(selectedAccountValue){
      setSelectedAccount(selectedAccountValue)
    }
  }

  useEffect(() => {
    if (selectedAccount.id !== "") {
      getFinances({
        idCash: selectedAccount.id,
        startDate: startDate,
        endDate: endDate,
        filter: filter,
        financeTransaction: searchTransactionField,
        financeType: searchTypeField,
        status: searchStatusField
      }).then((res) => {
        setFinances(res.data.finances || []);
      }).catch((e) => {
        console.log(e);
      });
    }
  }, [selectedAccount, startDate, endDate, filter, searchTypeField, searchTransactionField, searchStatusField]);

  const handleCloseModal = () => {
    setDisplayModal('none')
  };

  const handleOpenModal = () => {
    setDisplayModal('block')
  };

  const handleCloseModalUpdateFinance = () => {
    setDisplayModalUpdateFinance('none')
  };

  const handleOpenModalUpdateFinance = (finance: Finance) => {
    finance.cash = selectedAccount;
    finance.financeDate = dayjs(finance.financeDate).format("YYYY-MM-DD");
    setFinanceEntity(finance);
    setDisplayModalUpdateFinance('block');
  };

  const handleCloseModalCash = () => {
    setDisplayModalCash('none')
  };

  const handleOpenModalCash = () => {
    setDisplayModalCash('block')
  };

  const handleConfirmNewFinance = async () => {
    try {
      if(!/^\d+(\.\d{1,2})?$/.test(financeEntity.value)){
        setMessageErrorValue("O valor da transação deve conter 2 casas decimais separados por ponto '.'")
      } else {
        setMessageErrorValue("")
        financeEntity.id = undefined
        createFinance(financeEntity).then(() => {
          setDisplayModal('none')
          setTimeout(() => {window.location.reload();}, 1000)
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar nova função', error);
    }
  };

  const handleConfirmUpdateFinance = async () => {
    try {
      if(!/^\d+(\.\d{1,2})?$/.test(financeEntity.value)){
        setMessageErrorValue("O valor da transação deve conter 2 casas decimais separados por ponto '.'")
      } else {
        setMessageErrorValue("")
        updateFinance(financeEntity).then(() => {
          setDisplayModal('none')
          setTimeout(() => {window.location.reload();}, 1000)
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar nova transação', error);
    }
  };

  const handleConfirmDeleteFinance = async (finance: Finance) => {
    try {
      console.log(finance.id)
      deleteFinance(finance.id!).then(() => {
        setDisplayModal('none')
        setTimeout(() => {window.location.reload();}, 1000)
      });
    } catch (error) {
      console.error('Erro ao atualizar nova transação', error);
    }
  };

  const handleConfirmNewCash = async () => {
    try {
      if(!/^\d+(\.\d{1,2})?$/.test(cashEntity.balance)){
        setMessageErrorBalance("O valor da transação deve conter 2 casas decimais separados por ponto '.'")
      } else if(cashEntity.wallet == ""){
        setMessageErrorWallet("Dê um nome para esta conta.")
      } else if(cashEntity.owner == ""){
        setMessageErrorOwner("Este campo deve ser assinalado")
      } else {
        setMessageErrorBalance("")
        setMessageErrorWallet("")
        setMessageErrorOwner("")
        cashEntity.id_owner = idOwner
        cashEntity.id = undefined
        createCash(cashEntity).then(() => {
          setDisplayModalCash('none')
          setTimeout(() => {window.location.reload();}, 1000)
        });
      }
    } catch (error) {
      console.error('Erro ao cadastrar nova função', error);
    }
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    
    setFilters(newFilters);
    setFilter(filters.filter)
    
    if (name === "dateFrom") {
      setStartDate(newFilters.dateFrom);
    } else if (name === "dateTo") {
      setEndDate(newFilters.dateTo);
    } else if (name === "transactionField") {
      setSearchTransactionField(newFilters.transactionField);
    } else if (name === "statusField") {
      setSearchStatusField(newFilters.statusField);
    } else if (name === "typeField") {
      setSearchTypeField(newFilters.typeField);
    } else if (name === "filter") {
      setFilter(newFilters.filter);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFinanceEntity({ ...financeEntity, [name]: value });
  };

  const handleChangeCash = (e: any) => {
    const { name, value } = e.target;
    setCashEntity({ ...cashEntity, [name]: value });
  };

  return (
    <Container>
    <CashContainer>
      <CashDetails>
        <CashDetail>
          <div style={{width: '100%'}}>
          <Label>Conta: </Label>
          <Dropdown value={selectedAccount.id} onChange={handleSelectChange} style={{width: '40%'}}>
            <Option value="">Selecione uma conta</Option>
            {accounts.map((account) => (
              <Option key={account.id} value={account.id}>
                {account.wallet}
              </Option>
            ))}
          </Dropdown>
          </div>
        <div style={{display: 'flex', width: '100%', justifyContent: 'flex-end'}}>
          <ButtonTransaction onClick={handleOpenModalCash}>Nova Conta</ButtonTransaction>
        </div>
      </CashDetail>
      {selectedAccount.id !== "" && (
      <PageContainer>
      <PageDetail>
        <div>
          <ButtonTransaction onClick={handleOpenModal}>Nova Transação</ButtonTransaction>
        </div>
        <div style={{display: 'flex'}}>
        <Label>Saldo: </Label>
        <p style={{paddingLeft: '5px'}}>R$ {selectedAccount.balance}</p>
        </div>
      </PageDetail>
        <FiltersContainer>
          <Dropdown name="typeField" value={filters.typeField} onChange={handleFilterChange}>
            <option value="">Tipo</option>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </Dropdown>
          <Dropdown name="statusField" value={filters.statusField} onChange={handleFilterChange}>
            <option value="">Status</option>
            {statusField.map((status) => (
              <Option key={status.value} value={status.value}>
                {status.value}
              </Option>
            ))}
          </Dropdown>
          <Dropdown name="transactionField" value={filters.transactionField} onChange={handleFilterChange}>
            <option value="">Transação</option>
            {transactionField.map((transaction) => (
              <Option key={transaction.value} value={transaction.value}>
                {transaction.value}
              </Option>
            ))}
          </Dropdown>
          <Input name="filter" value={filters.filter} onChange={handleFilterChange} placeholder="Descrição" />
        </FiltersContainer>
        <FiltersContainer>
          <Label>Data Início: </Label>
          <DateInput name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} />
          <Label>Data Fim: </Label>
          <DateInput name="dateTo" value={filters.dateTo} onChange={handleFilterChange} />
        </FiltersContainer>
        <ResultsContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Tipo</TableHeader>
            <TableHeader>Categoria</TableHeader>
            <TableHeader>Descrição</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Transação</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {finances.map((result, index) => (
            <TableRow key={index}>
              <TableData>{index + 1}</TableData>
              <TableData>{result.financeType}</TableData>
              <TableData>{result.financeCategory}</TableData>
              <TableData>{result.financeDescription}</TableData>
              <TableData>{result.status}</TableData>
              <TableData>{result.transaction}</TableData>
              <TableData>{dayjs(result.financeDate).format("DD/MM/YYYY")}</TableData>
              <TableData>R$ {result.value}</TableData>
              <TableData>
                <ActionButton src={pencil} alt="Editar" onClick={() => handleOpenModalUpdateFinance(result)}/>
                <ActionButton src={trash} alt="Excluir" onClick={() => handleConfirmDeleteFinance(result)}/>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </ResultsContainer>
      </PageContainer>
      )}
      </CashDetails>
    </CashContainer>

    <ModalOverlay style={{ display: `${displayModal}` }}>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <h2>Nova transação</h2>
        <br />
        <LabelModal htmlFor="financeType">Tipo</LabelModal>
        <SelectModal name="financeType" value={financeEntity.financeType} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </SelectModal>
        
        <LabelModal htmlFor="financeCategory">Categoria</LabelModal>
        <SelectModal name="financeCategory" value={financeEntity.financeCategory} onChange={handleChange}>
          <option value="">Selecione</option>
          {financeEntity.financeType === 'Receita' && (
            revenueField.map((revenue) => (
              <option key={revenue.id} value={revenue.value}>
                {revenue.value}
              </option>
            ))
          )}
          {financeEntity.financeType === 'Despesa' && (
            expensesField.map((expenses) => (
              <option key={expenses.id} value={expenses.value}>
                {expenses.value}
              </option>
            ))
          )}
        </SelectModal>
        {financeEntity.financeCategory === 'Outros' && (
          <>
            <LabelModal htmlFor="financeCategoryValue">Nova Categoria</LabelModal>
            <InputModal
              type="text"
              name="financeCategoryValue"
              value={financeEntity.financeCategoryValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="financeDescription">Descrição</LabelModal>
        <InputModal
          type="text"
          name="financeDescription"
          value={financeEntity.financeDescription}
          onChange={handleChange}
        />

        <LabelModal htmlFor="value">Valor</LabelModal>
        <InputModal
          type="text"
          name="value"
          value={financeEntity.value}
          onChange={handleChange}
        />
        {messageErrorValue !== "" && (
          <ErrorMessage>{messageErrorValue}</ErrorMessage>
        )}

        <LabelModal htmlFor="transaction">Transação</LabelModal>
        <SelectModal name="transaction" value={financeEntity.transaction} onChange={handleChange}>
          <option value="">Selecione</option>
          {transactionField.map((transaction) => (
            <option key={transaction.id} value={transaction.value}>
              {transaction.value}
            </option>
          ))}
        </SelectModal>
        {financeEntity.transaction === 'Outros' && (
          <>
            <LabelModal htmlFor="transactionValue">Nova Transação</LabelModal>
            <InputModal
              type="text"
              name="transactionValue"
              value={financeEntity.transactionValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="financeDate">Data</LabelModal>
        <InputModal
          type="date"
          name="financeDate"
          value={financeEntity.financeDate}
          onChange={handleChange}
        />

        <LabelModal htmlFor="status">Status</LabelModal>
        <SelectModal name="status" value={financeEntity.status} onChange={handleChange}>
          <option value="">Selecione</option>
          {statusField.map((status_value) => (
            <option key={status_value.id} value={status_value.value}>
              {status_value.value}
            </option>
          ))}
        </SelectModal>
        {financeEntity.status === 'Outros' && (
          <>
            <LabelModal htmlFor="statusValue">Novo Status</LabelModal>
            <InputModal
              type="text"
              name="statusValue"
              value={financeEntity.statusValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="cash">Carteira</LabelModal>
        <SelectModal name="cash" value={financeEntity.cash.id} onChange={handleChange}>
          <option value="">Selecione</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.wallet}
            </option>
          ))}
        </SelectModal>

        <br />
        <ModalFooter>
          <Button className="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button className="danger" onClick={handleConfirmNewFinance}>Cadastrar</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
    

    <ModalOverlay style={{ display: `${displayModalUpdateFinance}` }}>
      <ModalContent>
        <CloseButton onClick={handleCloseModalUpdateFinance}>&times;</CloseButton>
        <h2>Atualizar transação</h2>
        <br />
        <LabelModal htmlFor="financeType">Tipo</LabelModal>
        <SelectModal name="financeType" value={financeEntity.financeType} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="Receita">Receita</option>
          <option value="Despesa">Despesa</option>
        </SelectModal>
        
        <LabelModal htmlFor="financeCategory">Categoria</LabelModal>
        <SelectModal name="financeCategory" value={financeEntity.financeCategory} onChange={handleChange}>
          <option value="">Selecione</option>
          {financeEntity.financeType === 'Receita' && (
            revenueField.map((revenue) => (
              <option key={revenue.id} value={revenue.value}>
                {revenue.value}
              </option>
            ))
          )}
          {financeEntity.financeType === 'Despesa' && (
            expensesField.map((expenses) => (
              <option key={expenses.id} value={expenses.value}>
                {expenses.value}
              </option>
            ))
          )}
        </SelectModal>
        {financeEntity.financeCategory === 'Outros' && (
          <>
            <LabelModal htmlFor="financeCategoryValue">Nova Categoria</LabelModal>
            <InputModal
              type="text"
              name="financeCategoryValue"
              value={financeEntity.financeCategoryValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="financeDescription">Descrição</LabelModal>
        <InputModal
          type="text"
          name="financeDescription"
          value={financeEntity.financeDescription}
          onChange={handleChange}
        />

        <LabelModal htmlFor="value">Valor</LabelModal>
        <InputModal
          type="text"
          name="value"
          value={financeEntity.value}
          onChange={handleChange}
        />
        {messageErrorValue !== "" && (
          <ErrorMessage>{messageErrorValue}</ErrorMessage>
        )}

        <LabelModal htmlFor="transaction">Transação</LabelModal>
        <SelectModal name="transaction" value={financeEntity.transaction} onChange={handleChange}>
          <option value="">Selecione</option>
          {transactionField.map((transaction) => (
            <option key={transaction.id} value={transaction.value}>
              {transaction.value}
            </option>
          ))}
        </SelectModal>
        {financeEntity.transaction === 'Outros' && (
          <>
            <LabelModal htmlFor="transactionValue">Nova Transação</LabelModal>
            <InputModal
              type="text"
              name="transactionValue"
              value={financeEntity.transactionValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="financeDate">Data</LabelModal>
        <InputModal
          type="date"
          name="financeDate"
          value={financeEntity.financeDate}
          onChange={handleChange}
        />

        <LabelModal htmlFor="status">Status</LabelModal>
        <SelectModal name="status" value={financeEntity.status} onChange={handleChange}>
          <option value="">Selecione</option>
          {statusField.map((status_value) => (
            <option key={status_value.id} value={status_value.value}>
              {status_value.value}
            </option>
          ))}
        </SelectModal>
        {financeEntity.status === 'Outros' && (
          <>
            <LabelModal htmlFor="statusValue">Novo Status</LabelModal>
            <InputModal
              type="text"
              name="statusValue"
              value={financeEntity.statusValue}
              onChange={handleChange}
            />
          </>
        )}

        <LabelModal htmlFor="cash">Carteira</LabelModal>
        <SelectModal name="cash" value={selectedAccount.wallet} onChange={handleChange}>
          <option value="">Selecione</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.wallet}>
              {account.wallet}
            </option>
          ))}
        </SelectModal>

        <br />
        <ModalFooter>
          <Button className="secondary" onClick={handleCloseModalUpdateFinance}>Cancelar</Button>
          <Button className="danger" onClick={handleConfirmUpdateFinance}>Cadastrar</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
    <ModalOverlay style={{ display: `${displayModalCash}` }}>
      <ModalContent>
        <CloseButton onClick={handleCloseModalCash}>&times;</CloseButton>
        <h2>Nova conta</h2>
        <br />
        <LabelModal htmlFor="financeDescription">Nome</LabelModal>
        <InputModal
          type="text"
          name="wallet"
          value={cashEntity.wallet}
          onChange={handleChangeCash}
        />
        {messageErrorWallet !== "" && (
          <ErrorMessage>{messageErrorValue}</ErrorMessage>
        )}
        <LabelModal htmlFor="value">Saldo Inicial</LabelModal>
        <InputModal
          type="text"
          name="balance"
          value={cashEntity.balance}
          onChange={handleChangeCash}
        />
        {messageErrorBalance !== "" && (
          <ErrorMessage>{messageErrorBalance}</ErrorMessage>
        )}
        <LabelModal htmlFor="value">Tipo de conta</LabelModal>
        <RadioModal>
          {owner == "Proprietário" && (
            <SpanModal>
              <InputModal
                type="radio"
                name="owner"
                value="Proprietário"
                onChange={handleChangeCash}
              />
              Proprietário
            </SpanModal>
          )}
          <SpanModal>
            <InputModal
              type="radio"
              name="owner"
              value="Fisioterapeuta"
              onChange={handleChangeCash}
            />
            Fisioterapeuta
          </SpanModal>
        </RadioModal>
        {messageErrorOwner !== "" && (
          <ErrorMessage>{messageErrorOwner}</ErrorMessage>
        )}
        <br />
        <ModalFooter>
          <Button className="secondary" onClick={handleCloseModalCash}>Cancelar</Button>
          <Button className="danger" onClick={handleConfirmNewCash}>Cadastrar</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  </Container>
  )
}

export default FinanceComponent;