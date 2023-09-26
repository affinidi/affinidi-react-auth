import { useState } from "react";

const useAffinidiLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function getAuthUrl() {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/affinidi-auth/init`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return {
    getAuthUrl,
    isLoading,
  };
};

export default useAffinidiLogin;
