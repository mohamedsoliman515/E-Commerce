import { useAppSelector } from "@store/hooks";
import { Heading } from "@components/common";

const Account = () => {
  const accountInfo= useAppSelector((state)=>state.auth.user)

  
  return (
    <>
      <Heading title="Account Info" />
      <ul>
        <li>firstName : {accountInfo?.firstName}</li>
        <li>lastName : {accountInfo?.lastName}</li>
        <li>email: {accountInfo?.email}</li>
      </ul>
    </>
  );
}

export default Account;
