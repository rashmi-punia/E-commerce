import { createStore, applyMiddleware,combineReducers} from "redux";

import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import { filterProductReducer, productCreateReducer, productListReducer } from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";


const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    productList : productListReducer,
    productCreate : productCreateReducer,
    filterState : filterProductReducer,
    cartList : cartReducer,
    
    
    


})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


  const initialState = {
    userLogin: {
      userInfo: userInfoFromStorage,
    },
  };

  const middleware = [thunk];


  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
