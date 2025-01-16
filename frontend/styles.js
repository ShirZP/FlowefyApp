import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6a1b9a', // צבע סגול
        marginBottom: 30,
      },
      roundButton: {
        backgroundColor: '#9c27b0', // צבע סגול כהה
        borderRadius: 100,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        width: 250,
      },
      rectButton: {
        backgroundColor: '#43a047', // צבע ירוק
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      image: {
        width: 250,
        height: 250,
        marginVertical: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#9c27b0',
      },
      predictionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ec407a', // צבע ורוד
        marginBottom: 20,
      },
      modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      closeButton: {
        backgroundColor: '#9c27b0',
        padding: 10,
        borderRadius: 10,
        color: '#fff',
        fontSize: 18,
        marginTop: 20,
      },
    });

export default styles;
