import { UNABLE_TO_UPLOAD_AVATAR } from '@/design-system/toast/toast-messages'
import { decode } from 'base64-arraybuffer'
import { readAsStringAsync } from 'expo-file-system'
import { manipulateAsync } from 'expo-image-manipulator'
import { ToastAndroid } from 'react-native'
import { supabaseClient } from '../supabase'

const USER_AVATAR_BUCKET_NAME = 'user-profile-pictures'
const KID_AVATAR_BUCKET_NAME = 'kid-profile-pictures'

type AvatarType = 'user' | 'kid'

function getBucketNameFromAvatarType(avatarType: AvatarType): string {
  return avatarType === 'kid' ? KID_AVATAR_BUCKET_NAME : USER_AVATAR_BUCKET_NAME
}

type uploadAvatarParams = {
  avatarType: AvatarType
  localImageUri: string
  id: string
}

export async function uploadAvatar({
  avatarType,
  localImageUri,
  id,
}: uploadAvatarParams): Promise<string> {
  //   Compress. Figure out how to compress
  const compressedImage = await manipulateAsync(localImageUri, [], {
    compress: 0.5,
  })

  const base64File = await readAsStringAsync(compressedImage.uri, {
    encoding: 'base64',
  })

  const fileExt = localImageUri.split('.').pop()
  const storagePath = id

  const { error } = await supabaseClient.storage
    .from(getBucketNameFromAvatarType(avatarType))
    .upload(storagePath, decode(base64File), {
      contentType: `image/${fileExt}`,
      upsert: true,
    })

  if (error) {
    throw error
  }

  return storagePath
}

type useUploadAvatarParams = {
  onUploadSuccess?: (storagePath: string) => void
}
export function useUploadAvatar({ onUploadSuccess }: useUploadAvatarParams) {
  return async (params: uploadAvatarParams) => {
    try {
      const storagePath = await uploadAvatar(params)
      onUploadSuccess?.(storagePath)
    } catch (e) {
      console.error(e)
      ToastAndroid.show(UNABLE_TO_UPLOAD_AVATAR, ToastAndroid.SHORT)
    }
  }
}

// Just returns ID, but might be complicated later.
export function getStoragePathFromId({ id }: { id: string }): string {
  return id
}

export function getAvatarUrlFromStoragePath({
  avatarType,
  storagePath,
}: {
  avatarType: AvatarType
  storagePath: string
}): string {
  return supabaseClient.storage
    .from(getBucketNameFromAvatarType(avatarType))
    .getPublicUrl(storagePath).data.publicUrl
}
