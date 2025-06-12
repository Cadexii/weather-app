import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

type Place = {
    id?: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
}
const getPlacesCollection = () => {
    const user = getAuth().currentUser;
    if (!user) return null;
    return `users/${user.uid}/places`;
};

export const addPlace = async ({city, country, lat, lon}: Place): Promise<void> => {
    const placesCollection = getPlacesCollection();
    if (!placesCollection) return;
    await addDoc(collection(db, placesCollection), {
        city,
        country,
        lat,    
        lon,
    });
};

export const getPlaces = async (userId: string) => {
    const savedPlaces: Place[] = [];
    const placesCollection = getPlacesCollection();
    if (!placesCollection) return;
    const q = query(collection(db, placesCollection), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        savedPlaces.push({...doc.data(), id: doc.id} as Place);
    });

    return savedPlaces;
}