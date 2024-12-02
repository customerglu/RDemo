import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    // Navigate to Edit Profile screen
  };

  const handleLogout = () => {
    // Implement logout functionality here
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      {/* Container for profile image and name */}
      <View style={styles.profileContainer}>
        {/* Circular Profile Image */}
        <Image
          source={{ uri: 'https://res.cloudinary.com/dlc5c1ycl/image/upload/v1710567612/qichw3wrcioebkvzudib.png' }} // Replace with user's profile image URL
          style={styles.profileImage}
        />
        {/* Name */}
        <Text style={styles.name}>John Doe</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
       
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image circular
    borderWidth: 3,
    borderColor: '#DDDDDD',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ProfileScreen;
