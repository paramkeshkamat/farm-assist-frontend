/** @format */

import { useState, useEffect, createContext } from "react";

// state = {
//   user: {},
//   cart: [],
// };
const AppContext = createContext();

function AppProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    cart: [],
  });

  // console.log(state);

  useEffect(() => {
    const appstate = localStorage.getItem("appstate");
    // console.log(state);
    if (appstate) {
      setState(JSON.parse(appstate));
    } else {
      setState({
        user: null,
        cart: [],
      });
    }
  }, []);

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
