export const cameraService = {
  takePicture: async (imageData: string) => {
    try {
      return imageData;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw new Error('Failed to take picture');
    }
  },

  getLocation: async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude || null
      };
    } catch (error) {
      console.error('Error getting location:', error);
      throw new Error('Failed to get location');
    }
  }
};