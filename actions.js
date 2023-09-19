import { CHANGE_SEARCH_FIELD } from "./src/constants"

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
})