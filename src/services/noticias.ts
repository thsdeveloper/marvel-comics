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
} from 'firebase/firestore'
import { db } from '@src/lib/firebase'
import moment from 'moment'
moment.locale('pt-br')

const DOC_NAME = 'news'

export interface NewsProps {
  id?: string
  title: string
  subtitle?: string
  short_description?: string
  long_description?: string
  date: Date | number
  image?: string
}

export function setNew(news: NewsProps): Promise<boolean | null> {
  return new Promise((resolve, reject) => {
    //26/09/1990
    // const tempDate = moment('26/09/1990').format()

    const dateFormatFirebase = {
      ...news,
      date: new Date(news.date),
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

export function getList(): Promise<NewsProps[] | null> {
  //Query de consulta com ordem e limit
  const q = query(collection(db, DOC_NAME), orderBy('date', 'desc'))

  return new Promise((resolve, reject) => {
    getDocs(q)
      .then((documentSnapshot) => {
        const news: NewsProps[] = []

        documentSnapshot.docs.map((doc) => {
          const {
            title,
            subtitle,
            short_description,
            long_description,
            image,
            date,
          } = doc.data() || {}

          const newsData: NewsProps = {
            title,
            subtitle,
            short_description,
            long_description,
            image,
            date: date.toDate(),
            id: doc.id,
          }
          news.push(newsData)
        })
        if (news.length > 0) {
          resolve(news)
        } else {
          resolve([])
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function findById(id: string): Promise<NewsProps | null> {
  return new Promise((resolve, reject) => {
    getDoc(doc(db, DOC_NAME, id))
      .then((doc) => {
        if (doc.exists()) {
          const {
            title,
            subtitle,
            short_description,
            long_description,
            date,
            image,
          } = doc.data() || {}

          const newsData: NewsProps = {
            title,
            subtitle,
            short_description,
            long_description,
            image,
            date: date.toDate(),
            id: doc.id,
          }
          resolve(newsData)
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
