import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heading } from "@components/common";
import { Input } from "@components/Form";
import { signInSchema, signInType } from "@validations/SignInSchema";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import { Alert, Button, Col, Form, Row,Spinner } from "react-bootstrap";

const Login = () => {
  const { loading, error,accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
  if (accessToken) {
    return <Navigate to="/"/>
  }
  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              Your need to login to view this page 
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created ,please login
            </Alert>
          )}
          <Form className=" my-5" onSubmit={handleSubmit(formSubmit)}>
            <Input
              name="email"
              label="Email Address"
              type="text"
              error={errors.email?.message}
              register={register}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              error={errors.password?.message}
              register={register}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
