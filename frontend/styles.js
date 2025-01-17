import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },

  // Header
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6a1b9a', // סגול
    marginBottom: 30,
  },

  // Buttons
  roundButton: {
    backgroundColor: '#9c27b0', // סגול כהה
    borderRadius: 100,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    width: 250,
  },
  rectButton: {
    backgroundColor: '#43a047', // ירוק
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#ec407a', // ורוד
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Image
  image: {
    width: 250,
    height: 250,
    marginVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9c27b0', // סגול כהה
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
    backgroundColor: '#fff',
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
    flexDirection: 'row',  // הצגת כפתורים בשורה
    justifyContent: 'space-around',  // פיזור שווה של הכפתורים
    width: '100%',  // מתיחה לרוחב המיכל
    paddingHorizontal: 20,  // רווח צדדי
    marginTop: 10,  // רווח מהאלמנט הקודם
  },
  pickerButton: {
    alignItems: 'center',
  },
  icon: {
    width: 50,  // התאמת גודל האייקון
    height: 50, // התאמת גודל האייקון
  },
  pickerButtonText: {
    color: '#000', // צבע טקסט שחור
    fontSize: 12,  // גודל טקסט קטן
    marginTop: 5,
  },

  // Prediction Text
  predictionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ec407a', // ורוד
    marginBottom: 20,
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
});

export default styles;
