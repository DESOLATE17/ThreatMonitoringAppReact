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

    return {
        is_authenticated,
        is_moderator,
        user_id,
        user_login,
        auth,
        setUser,
        resetUser
    }
}