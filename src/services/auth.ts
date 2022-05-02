import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { auth, db, provider } from '@src/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

export interface User {
  id?: string
  name: string
  givenName: string
  email: string
  photo?: string
  birthDate?: string
  sector?: string
  phone?: string
  parentCPF?: string
  parentName?: string
  userType?: 'google' | 'firebase'
  authProvider?: 'google' | 'local'
}

interface Response {
  user: User
  idToken?: string
}

export interface CustomerProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  parentName?: string
  parentCPF?: string
  sector?: string
  userType?: 'google' | 'firebase'
  photo?: string
  id?: string
}

export function signIn(): Promise<
  Response | { error?: string; warning?: string }
> {
  provider.setCustomParameters({ prompt: 'select_account' })

  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        // Isso lhe dá um token de acesso do Google. Você pode usá-lo para acessar a API do Google.
        const credential =
          GoogleAuthProvider.credentialFromResult(userCredentials)

        const user = userCredentials.user
        // const token = credential.accessToken

        // const userInfo = {
        //   user: user,
        //   idToken: token,
        // }

        if (credential) {
          // const authInfo = userInfo as Response

          resolve({
            user: {
              name: user?.displayName,
              email: user?.email,
              givenName: user?.displayName,
              photo: user?.photoURL,
              userType: 'google',
              id: user?.uid,
            },
          })
        } else {
          reject({
            error:
              'Falha ao realizar login, verifique seus dados e tente novamente',
          })
        }
      })
      .catch((error) => {
        console.error(error)
        reject({ warning: 'Login cancelado' })
      })
  })
}

export function getUserInfo(email: string): Promise<Response | null> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'customers', email))
      .then((customersSnapshot) => {
        if (customersSnapshot.exists()) {
          const data = customersSnapshot.data()
          const {
            name,
            email,
            birthDate,
            parentCPF,
            parentName,
            phone,
            photo,
            sector,
            userType,
          } = customersSnapshot.data() || {}

          resolve({
            user: {
              name,
              email,
              photo,
              givenName: name.split(' ')[0],
              birthDate,
              parentCPF,
              parentName,
              phone,
              sector,
              userType,
            },
          })
        } else {
          resolve(null)
        }
      })
      .catch(() => {
        reject(null)
      })
  })
}

export function addCustomer(customer: CustomerProps): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!customer?.userType) {
      customer.userType = 'firebase'
    }
    setDoc(doc(db, 'customers', customer.email), customer)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject()
      })
  })
}

export function signInForm(
  email: string,
  password: string
): Promise<boolean | { error: string }> {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        resolve(true)
      })
      .catch((e) => {
        if (e.code === 'auth/wrong-password') {
          resolve({ error: 'Senha incorreta' })
        }
        if (e.code === 'auth/user-not-found') {
          resolve({ error: 'Email não cadastrado' })
        }
        reject({
          error:
            'Desculpe-nos, estamos com problemas. Tente novamente mais tarde.',
        })
      })
  })
}

export function updatePassword(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const customersRef = doc(db, 'customers', email)

    updateDoc(customersRef, {
      description: 'New description',
    })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject()
      })
  })
}

export const sair = async () => {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject()
      })
  })
}
