import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from "../config/firebase";
const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export function AuthContextProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  console.log(user)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        })
      } else{setUser(null)}
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  async function logout(){
    setUser(null)
    await signOut(auth)
  }
  return(
    <AuthContext.Provider value={{user, signup, login, logout}}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}