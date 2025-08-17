
import { signInSchema, signInType } from "@validations/SignInSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
const useLogin = () => {
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors:formErrors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });
  const formSubmit: SubmitHandler<signInType> = (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  useEffect(() => {
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return { error, register, loading, handleSubmit, formSubmit, searchParams, accessToken, formErrors }
}

export default useLogin
