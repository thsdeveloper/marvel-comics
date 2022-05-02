import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '@src/lib/firebase'
const DOC_NAME = 'leadership'

export interface LeaderProps {
  avatar: string
  description: string
  name: string
  socialMediaUrl: string
}

export interface LeadershipsProps {
  items?: Array<LeaderProps>
  title?: string
  id?: string
}

export function setNew(leaderships: LeadershipsProps): Promise<boolean | null> {
  return new Promise((resolve, reject) => {
    const dateFormatFirebase = {
      ...leaderships,
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

export function list(): Promise<LeadershipsProps[] | null> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, DOC_NAME))
      .then((documentSnapshot) => {
        const leaderships: LeadershipsProps[] = []

        documentSnapshot.docs.map((doc) => {
          const { title, items } = doc.data() || {}

          const leadershipsData: LeadershipsProps = {
            title,
            items,
            id: doc.id,
          }
          leaderships.push(leadershipsData)
        })

        if (leaderships.length > 0) {
          resolve(leaderships)
        } else {
          resolve([])
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
