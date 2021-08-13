import {useState, useEffect,createContext, ReactNode} from 'react';
import { auth, firebase } from '../service/firebase';

type User = {
    id: String,
    name: String,
    avatar: String
  }
  
type authContextType = {
user: User | undefined,
signinWithGoogle: () => Promise<void>;
}

type authContextProviderProps = {
  children: ReactNode
}

export const authContext = createContext({} as authContextType);


export function AuthContextProvider (props: authContextProviderProps) {
    
    const [user, setUser] = useState<User>();

    useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged(user => {
        if (user) {
          const {displayName, photoURL, uid} = user;
  
          if (!displayName || !photoURL) {
            throw new Error('Missing information from google account')
          }
    
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      })
  
      return () => {
        unsubscribe();
      }
    }, [])
  
    async function signinWithGoogle() {
      const provider = await new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
  
      if (result.user) {
        const {displayName, photoURL, uid} = result.user;
  
        if (!displayName || !photoURL) {
          throw new Error('Missing information from google account')
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  
    };

    return (
      <authContext.Provider value = {{ user,  signinWithGoogle }}>
          {props.children}
      </authContext.Provider>
        
    );
};