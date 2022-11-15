
import { INCREMENT, DECREMENT, FORM ,ADDTOCART} from "../Actions/ActionFunction";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'counter',
  storage: storage,
};







//switch case matching wo onclick use pata chalata hai ke konsa action perform krna hai yeh nichey hua hai


const CounterReducer = (state = { myform: {} ,myCart:[] }, action) => {

  console.log("myform ==> ", action)

  // const counter = action.payload



  switch (action.type) {
    case INCREMENT:
      return { ...state, counter:action.payload }



    case DECREMENT:


      return { ...state, counter:action.payload }


    case FORM:


      return { ...state, myform: action.payload };

    case ADDTOCART:


      return { ...state, myCart: action.payload};


      

    default:
      return { ...state };
  }


};

export default persistReducer(persistConfig, CounterReducer)
