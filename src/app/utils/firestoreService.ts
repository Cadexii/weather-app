import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';

type Place = {
    id?: string;
    place: string;
}

// Collection paths
const getPlacesCollection = (userId: string) => {
    if (!userId) return null;
    return `users/${userId}/places`;
};

const getFavoritePlacesCollection = (userId: string) => {
    if (!userId) return null;
    return `users/${userId}/favoritePlaces`;
};

// Functions for saved places
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

// Functions for favorite places
export const addFavoritePlace = async ({place}: Place, userId: string): Promise<string | undefined> => {
    const favoritePlacesCollection = getFavoritePlacesCollection(userId);
    if (!favoritePlacesCollection) return;

    const docRef = await addDoc(collection(db, favoritePlacesCollection), {
        place: place,
        addedAt: new Date()
    });

    return docRef.id;
};

export const removeFavoritePlace = async (placeId: string, userId: string): Promise<void> => {
    const favoritePlacesCollection = getFavoritePlacesCollection(userId);
    if (!favoritePlacesCollection || !placeId) return;

    const placeDoc = doc(db, favoritePlacesCollection, placeId);
    await deleteDoc(placeDoc);
}

export const getFavoritePlaces = async (userId: string) => {
    const favoritePlaces: Place[] = [];
    const favoritePlacesCollection = getFavoritePlacesCollection(userId);
    if (!favoritePlacesCollection) return;
    const q = query(collection(db, favoritePlacesCollection), orderBy('addedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        favoritePlaces.push({...doc.data(), id: doc.id} as Place);
    });

    return favoritePlaces;
};