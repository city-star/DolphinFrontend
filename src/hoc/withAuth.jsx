// hoc/withAuth.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuthToken } from "@/utils/auth";

export default function withAuth(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const user = getAuthToken();
      if (!user) router.push("/Login");
      setIsLoading(false);
    }, []);

    return isLoading ? (
      <div className="flex items-center justify-center h-screen">
        Loading ...
      </div>
    ) : (
      <Component {...props} />
    );
  };
}
