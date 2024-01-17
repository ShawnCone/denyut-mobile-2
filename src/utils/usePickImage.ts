import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

type usePickImageParams = {
  onImagePicked?: (imageLocalUri: string) => void
}

export function usePickImage({ onImagePicked }: usePickImageParams) {
  const [imageLocalUri, setImageLocalUri] = useState<string | null>(null)

  // No permissions request is necessary for launching the image library
  const pickImageFunc = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
    })

    if (!result.canceled) {
      onImagePicked?.(result.assets[0].uri)
      setImageLocalUri(result.assets[0].uri)
    }
  }

  return {
    imageLocalUri,
    pickImageFunc,
  }
}
