import React, { useState } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import env from '../../../.env.json';

export default function Search({ onLocationSelected }) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <GooglePlacesAutocomplete
      placeholder="Para onde?"
      placeholderTextColor="#333"
      onPress={onLocationSelected}
      query={{
        key: env.GOOGLE_API_KEY,
        language: 'pt',
      }}
      textInputProps={{
        onFocus: () => setSearchFocused(true),
        onBlur: () => setSearchFocused(false),
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      listViewDisplayed={searchFocused}
      fetchDetails
      enablePoweredByContainer={false}
      styles={{
        container: {
          position: 'absolute',
          top: Platform.select({ ios: 60, android: 40 }),
          width: '100%',
        },
        textInputContainer: {
          flex: 1,
          backgroundColor: 'transparent',
          height: 64,
          marginHorizontal: 20,
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },
        textInput: {
          height: 54,
          margin: 0,
          borderRadius: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 20,
          paddingRight: 20,
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
          elevation: 5,
          borderWidth: 1,
          borderColor: '#ddd',
          fontSize: 18,
        },
        listView: {
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          marginHorizontal: 20,
          elevation: 5,
          marginTop: 10,
        },
        description: {
          fontSize: 16,
        },
        row: {
          height: 50,
        },
      }}
    />
  );
}
