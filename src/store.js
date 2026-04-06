export const initialStore=()=>{
  return{
    message: null,
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "update_contacts":
      return {
        ...store,
        contacts: action.payload
      }

    default:
      throw Error('Unknown action.');
  }    
}
