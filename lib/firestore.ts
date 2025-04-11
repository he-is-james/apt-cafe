import { addDoc, collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function createDocument(collectionName: string, document: unknown) {
    try {
        const docRef = await addDoc(
            collection(db, collectionName),
            document
        );
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getDocuments(collectionName: string) {
    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const documents = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return documents;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}

export async function getLastDocument(collectionName: string, field: string) {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, orderBy(field, "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        const doc = querySnapshot.docs[0];
        return doc.data()
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}