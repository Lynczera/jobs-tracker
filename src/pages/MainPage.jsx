import { useState } from "react";


export default function MainPage() {
  const isAuth = useState(false);
  return(
    isAuth? "Auth" :
    "Not auth"
  );

}
