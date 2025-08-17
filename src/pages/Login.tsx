import { Heading } from "@components/common";
import { Input } from "@components/Form";
import { Navigate } from "react-router-dom";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import useLogin from "@hooks/useLogin";
const Login = () => {
  const {
    error,
    register,
    loading,
    handleSubmit,
    formSubmit,
    accessToken,
    searchParams,
    formErrors,
  } = useLogin();
  if (accessToken) {
    return <Navigate to="/" />;
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
              error={formErrors.email?.message}
              register={register}
            />
            <Input
              name="password"
              label="Password"
              type="password"
              error={formErrors.password?.message}
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
