import React, { useReducer } from "react";

export default (reducer, actions, defaultValue) => {
    const Context = React.createContext(); // This Context allows child components to access the state and actions without props.

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

        const boundActions = {};
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch);
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        );
    };

    return { Context, Provider }; // Cleaned up the return statement
};
