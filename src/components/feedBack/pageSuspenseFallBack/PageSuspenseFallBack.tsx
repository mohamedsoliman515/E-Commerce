import { Suspense } from "react";
import Error from "@pages/Error";
const PageSuspenseFallBack = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Error type="loading"/>}>{children}</Suspense>;
};

export default PageSuspenseFallBack;
