import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    opacity: 0.6, // הופך את הרקע לכהה
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    //backgroundColor: '#f9f9f9',
  },

  // Header
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6a1b9a', // סגול
    textAlign: 'center',
    marginBottom: 40,
  },

  // Buttons
  // Round Button - עיגול מושלם
  roundButton: {
    backgroundColor: '#B990E4', // סגול כהה
    borderRadius: 125, // חצי מהרוחב והגובה
    height: 250, // גובה הכפתור
    width: 250, // רוחב הכפתור
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // צל
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // אפקט הצל
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginHorizontal: '10%',
    marginTop: 30,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Image
  image: {
    width: 300,
    height: 450,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 6,
    borderColor: '#B990E4',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  iconButtonText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  // Modal (Popup)
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // רקע כהה למעבר שקוף
  },
  pickerContent: {
    backgroundColor: '#ece4e4',
    width: 300,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // אפקט צל
  },
  pickerHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a1b9a', // סגול
    marginBottom: 15,
  },
  pickerButtonsContainer: {
    flexDirection: 'row',  
    justifyContent: 'space-around', 
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10, 
  },
  pickerButton: {
    alignItems: 'center',
  },
  iconPicker: {
    width: 50, 
    height: 50,
  },
  pickerButtonText: {
    color: '#000',
    fontSize: 12,
    marginTop: 5,
  },
  // close icon X
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  closeIconText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pickerOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '90%',
  },
  predictionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#6a1b9a', // סגול
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#B990E4',
    marginBottom: 20,
  },
  predictionInfo: {
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 24,
  },
});

export default styles;
