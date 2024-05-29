import { createSlice } from "@reduxjs/toolkit";
import sessionStorage from "redux-persist/es/storage/session";


const initialState = { 
    token: '',
    userInfo: {
        role: "",
        firstName: "",
        email: "",
        id: "",
    },
}


export const userSlice = createSlice({
    name: "user", 
    initialState,
    reducers: {
        setUserData: (state, action) => {
        const { userInfo, token } = action.payload
            return {
                ...state,
                token,
                userInfo: {
                    email:userInfo.email,
                    firstName: userInfo.firstName,
                    role: userInfo.role
                },
            }
        },
        editUserData: (state, action) => {
            const { userInfo} = action.payload
                return {
                    ...state,
                    userInfo: {
                        ...state.userInfo,
                        firstName: userInfo.firstName,
                        lastName:userInfo.lastName,
                        phone: userInfo.phone
                    },
                }
            },
        logout: (state, action) => {
            return {
                token: "",
                userInfo: {
                    name: "",
                    email: "",
                    id: ""
                },
            }
        },
    }
})

// exportamos las acciones a las que accederemos a través del useDispatch para escribir en el almacén
export const {setUserData, logout, editUserData} = userSlice.actions

// definimos y exportamos los métodos que nos permitirán venir al almacén a leer información
export const getUserData = (state) => state.user.userInfo
export const isAuthenticated = (state) => state.user.token

// método que nos dice si el usuario logeado es admin, doctor o no, para uso en rutas privadas
export const amIAdmin =(state) => state.user.userInfo.role === "admin"

export const amIDoctor =(state) => state.user.userInfo.role === "doctor"

export const amIClient = (state) => state.user.userInfo.role === "client"

export default userSlice.reducer