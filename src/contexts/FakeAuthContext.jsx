import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const intialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            throw new Error("Unkown action type!");
    }
}



const FAKE_USER = {
    name: "Armaan",
    email: "armaan@example.com",
    password: "qwerty",
    avatar: "https://i.ibb.co/3pzbMTm/IMG-20230520-045529-499.jpg",
};

function AuthProvider({ children }) {
    const [{ user, isAuthenticated }, dispatch] = useReducer(
        reducer,
        intialState
    );

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }

    function logout() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("AuthContext was ued outside AuthProvider!");
    }
    return context;
}

export { AuthProvider, useAuth };
