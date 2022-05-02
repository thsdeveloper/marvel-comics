import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '@src/lib/firebase'
const DOC_NAME = 'agenda'

export interface AgendaProps {
  title: string
  subtitle?: string
  image: string
  date: Date | number
  longDescription?: string
  geolocation?: { latitude: string; longitude: string } | null
  shortDescription?: string
  address: string
  id?: string
}

export function setNew(agenda: AgendaProps): Promise<boolean | null> {
  return new Promise((resolve, reject) => {
    const dateFormatFirebase = {
      ...agenda,
      date: new Date(agenda.date),
    }

    addDoc(collection(db, DOC_NAME), dateFormatFirebase)
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
  })
}

export function getList(): Promise<AgendaProps[] | null> {
  //Query de consulta com ordem e limit
  const q = query(collection(db, DOC_NAME), orderBy('date', 'desc'))

  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((documentSnapshot) => {
        const agendas: AgendaProps[] = []

        documentSnapshot.docs.map((doc) => {
          const {
            title,
            subtitle,
            image,
            date,
            longDescription,
            geolocation,
            shortDescription,
            address,
          } = doc.data() || {}

          const agendaData: AgendaProps = {
            title,
            subtitle,
            image,
            longDescription,
            geolocation,
            shortDescription,
            address,
            date: date.toDate(),
            id: doc.id,
          }
          agendas.push(agendaData)
        })
        if (agendas.length > 0) {
          resolve(agendas)
        } else {
          resolve([])
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function findById(id: string): Promise<AgendaProps | null> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, DOC_NAME, id))
      .then((doc) => {
        if (doc.exists()) {
          const {
            title,
            subtitle,
            image,
            date,
            longDescription,
            geolocation,
            shortDescription,
            address,
          } = doc.data() || {}

          const agendaData: AgendaProps = {
            id: doc.id,
            date: date.toDate(),
            title,
            subtitle,
            image,
            longDescription,
            geolocation,
            shortDescription,
            address,
          }
          resolve(agendaData)
        } else {
          reject(null)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function findByIdAndUpdate(id: string, item): Promise<boolean | null> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, DOC_NAME, id))
      .then((doc) => {
        if (doc.exists()) {
          updateDoc(doc.ref, item)
            .then(() => {
              resolve(item)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject('Nenhum documento encontrado')
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function subscribeAgenda(
  id: string,
  email: string
): Promise<boolean | null> {
  return new Promise<boolean | null>((resolve, reject) => {
    addDoc(collection(db, 'agendaSubscriptions'), { [id]: email })
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        reject()
      })
  })
}

export async function findSubscription(
  id: string,
  email: string
): Promise<boolean | string | null> {
  const q = query(collection(db, 'agendaSubscriptions'), where(id, '==', email))

  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const id = doc.docs[0].id
          resolve(id)
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function deleteOne(id: string): Promise<boolean | null> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, DOC_NAME, id))
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(doc.ref)
            .then(() => {
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject('Nenhum documento encontrado')
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export function removeSubscription(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, 'agendaSubscriptions', id))
      .then((doc) => {
        if (doc.exists()) {
          deleteDoc(doc.ref)
            .then(() => {
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject('Nenhum documento encontrado')
        }
      })
      .catch((e) => {
        reject(e)
      })
  })
}
