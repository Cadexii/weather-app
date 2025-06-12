import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

type Place = {
    id?: string;
    userId: string;
    city: string;
    country: string;
    lat: number;
    lon: number;
}

const placesCollection = "places";

export const addPlace = async ({userId, city, country, lat, lon}: Place): Promise<void> => {
    await addDoc(collection(db, placesCollection), {
        userId,
        city,
        country,
        lat,    
        lon,
    });
};

export const getPlaces = async (userId: string) => {
    const savedPlaces: Place[] = [];
    const q = query(collection(db, placesCollection), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        savedPlaces.push({...doc.data(), id: doc.id} as Place);
    });

    return savedPlaces;
}