// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { LocationState } from '../Type';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState>({
    latitude: 21.043869,
    longitude: 105.91725,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
    heading: 100,
  });

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    getLocation();
  };

  const getLocation = async () => {
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(prevLocation => ({
        ...prevLocation,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      }));
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    const subscription = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
      },
      loc => {
        setLocation(prevLocation => ({
          ...prevLocation,
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        }));
      },
    );

    return () => {
      subscription.then(sub => sub.remove()).catch(console.log);
    };
  }, []);

  return location;
};
