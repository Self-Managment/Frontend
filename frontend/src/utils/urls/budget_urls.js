// const _desk_id = ':desk_id'

// export const DESKS = '/desks'
// export const DesksListRoutePath = DESKS
// export const DesksCreateRoutePath = DESKS + '/create'
// export const DesksEditRoutePath = DESKS + '/edit/' + _desk_id

// export const getDesksEditUrl = (desk_id, title) => {
// 	return DesksEditRoutePath.replace(_desk_id, desk_id) + `?title=${title}`
// }

const _budget_id = ':budget_id'
const _operation_type = ':operation_type'

export const MONEY = '/money'
export const BUDGET = '/budget'
export const BudgetGetRoutePath = MONEY + BUDGET

export const REPLENISHMENT = '/replenishment'
export const FORGIVENESS = '/forgiveness'
export const BUDGET_SETTINGS = '/budget_settings'
export const OPERATION = '/operation'
export const OPERATION_CATEGORY = '/operation_category'
export const BANK = '/bank'

export const OperationCreateRoutePath = MONEY + OPERATION + '/create/' + _operation_type
export const BudgetSettingsMainRoutePath = MONEY + BUDGET_SETTINGS + '/main'
export const OperationCategoryCreateRoutePath = MONEY + OPERATION_CATEGORY + '/create'
export const BankCreateRoutePath = MONEY + BANK + '/create'

export const getOperationCreateRoutePath = (operation_type) => {
    return OperationCreateRoutePath.replace(_operation_type, operation_type)
}
