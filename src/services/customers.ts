import { collection, getDocs } from 'firebase/firestore'
import { db } from '@src/lib/firebase'
const DOC_NAME = 'customers'

export interface CustomersProps {
  name?: string
  email?: string
  birthDate?: string
  phone?: string
  parentName?: string
  parentCPF?: string
  sector?: string
  photo?: string
  id?: string
}

export function list(): Promise<CustomersProps[] | null> {
  return new Promise((resolve, reject) => {
    getDocs(collection(db, DOC_NAME))
      .then((documentSnapshot) => {
        const customers: CustomersProps[] = []

        documentSnapshot.docs.map((doc) => {
          const { name, email, sector } = doc.data() || {}

          const customersData: CustomersProps = {
            name,
            email,
            sector,
            id: doc.id,
          }
          customers.push(customersData)
        })
        if (customers.length > 0) {
          resolve(customers)
        } else {
          resolve([])
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
