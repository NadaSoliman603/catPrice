import { Alert } from 'react-native';
export  const API_URL  = "http://localhost:3000"

export async function fetchPublishableKey(
  paymentMethod?: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `${API_URL}/stripe-key?paymentMethod=${paymentMethod}`
    );

    const { publishableKey } = await response.json();

    return publishableKey;
  } catch (e) {
    console.warn('Unable to fetch publishable key. Is your server running?');
    Alert.alert(
      'Error',
      'Unable to fetch publishable key. Is your server running?'
    );
    return null;
  }
}