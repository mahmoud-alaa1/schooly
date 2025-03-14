import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useToken() {
  const [token, setTokne] = useState<string | null>(null);
  useEffect(() => {
    async function getToken() {
      const session = getSession();
      // @ts-expect-error the token exists
      return session?.user?.token;
    }

    getToken().then((token) => setTokne(token));
  }, []);
  return token;
}
