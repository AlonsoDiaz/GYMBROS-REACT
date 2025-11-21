import { useEffect, useState } from "react";
import { getAuthUser, subscribeToAuthChanges } from "../utils/authStorage";

function useAuthUser() {
  const [user, setUser] = useState(() => getAuthUser());

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(setUser);
    return unsubscribe;
  }, []);

  return user;
}

export default useAuthUser;
