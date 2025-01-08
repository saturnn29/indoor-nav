import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headingContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 10,
  },
  headingText: {
    color: '#fff',
    fontSize: 16,
  },
});