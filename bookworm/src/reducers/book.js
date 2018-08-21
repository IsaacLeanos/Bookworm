import{createSelector}from'reselect'

const bookReducer=(state={},action={})=>{
    switch(action.type){
        default:
        return state
    }
}

export const booksSelector=(state)=>{
    return state.bookReducer
}

export const allBooksSelector=createSelector(
    booksSelector,
    booksHash=>Object.values(booksHash)
)

export default bookReducer