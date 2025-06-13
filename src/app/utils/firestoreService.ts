import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

type Place = {
    id?: string;
    place: string;
}

const getPlacesCollection = (userId: string) => {
    if (!userId) return null;
    return `users/${userId}/places`;
};

export const addPlace = async ({place}: Place, userId: string): Promise<string | undefined> => {
    const placesCollection = getPlacesCollection(userId);
    if (!placesCollection) return;

    const docRef = await addDoc(collection(db, placesCollection), {
        place: place,
        addedAt: new Date()
    });
    
    return docRef.id;
};

export const removePlace = async (placeId: string, userId: string): Promise<void> => {
    const placesCollection = getPlacesCollection(userId);
    if (!placesCollection || !placeId) return;

    const placeDoc = doc(db, placesCollection, placeId);
    await deleteDoc(placeDoc)
}

export const getPlaces = async (userId: string) => {
    const savedPlaces: Place[] = [];
    const placesCollection = getPlacesCollection(userId);
    if (!placesCollection) return;
    const q = query(collection(db, placesCollection), orderBy('addedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        savedPlaces.push({...doc.data(), id: doc.id} as Place);
    });

    return savedPlaces;
}