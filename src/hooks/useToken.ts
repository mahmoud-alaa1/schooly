import { attachToken } from "@/services/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useToken() {
  // @ts-expect-error the token exists
  const token = useSession().data?.user?.token;
  useEffect(() => {
    if (token) attachToken(token);
  }, [token]);
  return null;
}
