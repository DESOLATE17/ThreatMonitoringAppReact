import { useDispatch, useSelector } from 'react-redux';
import { updateUser, cleanUser } from "../store/authSlice";
import {api} from "../api"

export function useAuth() {
    //@ts-ignore
    const { is_authenticated, is_moderator, user_id, user_login } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const setUser = (value: any) => {
        dispatch(updateUser(value))
    }

    const resetUser = () => {
        dispatch(cleanUser())
    }

    // const logout = async () => {
    //     try {
    //         const response = await axios(`http://localhost:8080/accounts/logout/`, {
    //             method: "POST",
    //             headers: {
    //                 'authorization': session_id
    //             }
    //         })

    //         if (response.status == 200) {
    //             resetSsid()
    //             resetUser()
    //         }
    //     } catch (error) {
    //         console.log("Что-то пошло не так")
    //     }
    // }

    // const login = async (formData: any) => {






    //     const response = await axios(`http://127.0.0.1:8080/accounts/login/`, {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         },
    //         data: formData as FormData
    //     })

    //     if (response.status == 201) {
    //         setSsid(response.data['session_id'])

    //         const data = {
    //             is_authenticated: true,
    //             is_moderator: response.data["is_moderator"],
    //             user_id: response.data["pk"],
    //             username: response.data["username"],
    //         }

    //         setUser(data)
    //         return true
    //     }
    //     return false
    // }


    const auth = async () => {
        const response = await api.api.checkAuthList()

        if (response.status == 200) {
            const data = {
                is_authenticated: true,
                is_moderator: response.data["isAdmin"],
                user_id: response.data["userId"],
                login: response.data["login"],
            }

            setUser(data)
            return true;
        }
        return false
    }

    const register = async (formData: any) => {
        return {status : 200}
    }

    return {
        is_authenticated,
        is_moderator,
        user_id,
        user_login,
        register,
        auth,
        setUser,
        resetUser
    }
}