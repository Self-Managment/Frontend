const _desk_id = ':desk_id'

export const DESKS = '/desks'
export const DesksListRoutePath = DESKS
export const DesksCreateRoutePath = DESKS + '/create'
export const DesksEditRoutePath = DESKS + '/edit/' + _desk_id

export const getDesksEditUrl = (desk_id, title) => {
	return DesksEditRoutePath.replace(_desk_id, desk_id) + `?title=${title}`
}
