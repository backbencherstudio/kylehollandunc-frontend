import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAuth = () => {
    const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
    return { user, token, isAuthenticated };
};

// export const useLogin = () => {
//     const [login, { isLoading }] = useLoginMutation();
//     return { login, isLoading };
// };