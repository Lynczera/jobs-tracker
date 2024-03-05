import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import User from "../api/user";
import { useLocation } from "react-router-dom";

export default function MainPage() {
  async function testCookie() {
    console.log("testing cookie");
    const data = await User.auth_user();
    const { sID } = data.data;
    const { auth } = data.data;
    setAuth(auth);
  }
  const location = useLocation();
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    testCookie();
  }, [location]);

  return <div>{isAuth ? "auth" : "not auth"}</div>;
}
