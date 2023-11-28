import { AccountingEntity } from "../../../../domain/entities/accounting/type.accounting.entity"

export default function (accounting:any): AccountingEntity | undefined {
    if(!accounting)
    return
    let examGeneral: AccountingEntity = {
        idAccounting: accounting.idAccounting,
        month: accounting.month,
        appointments: accounting.appointments,
        collected: accounting.collected
    }

    return (examGeneral as AccountingEntity);
}