import { AccountingEntity } from "../../../../domain/entities/accounting/type.accounting.entity"

export default function (accounting: AccountingEntity ){
    const accountingGeneral = {
        idAccounting: accounting.idAccounting,
        month: accounting.month,
        appointments: accounting.appointments,
        collected: accounting.collected
    }

    return {
        accountingGeneral: accountingGeneral
    };
}