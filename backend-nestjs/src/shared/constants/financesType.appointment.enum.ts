export enum TYPE_FINCANCES {
  REVENUE = 'Receita',
  EXPENSES = 'Despesa',
  OTHER = 'Outros',
  TRANSACTION = 'Transação',
  STATUS = 'Status',
}

export enum STATUS_TRANSACTION {
  PAY = 'Paga',
  PENDING = 'A vencer',
  LATE = 'Atrasada',
}

export enum TYPE_PAYMENT {
  MONEY = 'Dinheiro',
  CREDIT = 'Cartão de Crédito',
  PIX = 'Pix',
  TRANSFER = 'Transferência',
  DEBIT = 'Cartão de Débito',
  OTHER = 'Outros',
}

export enum TYPE_REVENUE {
  PAYMENT_PILATES = 'Pagamento Pilates',
  PAYMENT_PHYSIOTHERAPY = 'Pagamento Fisioterapia',
  LOAN = 'Empréstimo',
  GIFT = 'Doações',
  INSURANCE = 'Convênios ou Planos de Saúde',
  WORKSHOPS = 'Aulas e Workshops',
  OTHER = 'Outros',
  RENTAL = 'Aluguel de espaço',
}

export enum TYPE_EXPENSES {
  TAXES = 'Outros Impostos',
  FEES = 'Juros',
  WATER_BILL = 'Água',
  ELECTRICITY_BILL = 'Luz',
  INTERNET_BILL = 'Internet',
  IPTU = 'IPTU',
  PAYMENT_EMPLOYEES = 'Pagamento de funcionário',
  PURCHASE_EQUIPMENT = 'Compra de equipamentos',
  MAINTENANCE = 'Manutenção e reparos',
  SUPPLIES = 'Suprimentos mensais',
  SAFE = 'Seguros',
  TRAININGS = 'Treinamentos e Desenvolvimento pessoal',
  OTHER = 'Outras despesas',
  CLEANER = 'Serviço de limpeza',
}