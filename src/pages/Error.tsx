import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import notFound from "../assets/lottieFiles/notFound.json";
import empty from "../assets/lottieFiles/empty.json";
import error from "../assets/lottieFiles/error.json";
import loading from "../assets/lottieFiles/loading.json";
const lottieFilesMap = {
  notFound,
  empty,
  loading,
  error,
};
type lottieProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};
function Error({ type, message }: lottieProps) {
  const lottie = lottieFilesMap[type];
  return (
    <Container
      style={{
        width: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin:"10px auto"
      }}
    >
      <Lottie animationData={lottie} style={{width:"400px"}}/>
      {message}
      <Link to="/" replace={true}>
        How about going back to safety ?
      </Link>
    </Container>
  );
}

export default Error;
