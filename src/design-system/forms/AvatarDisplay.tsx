import {
  AvatarType,
  getAvatarStoragePathFromId,
  getAvatarUrlFromStoragePath,
} from '@/client/supabase/storage/avatar'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useState } from 'react'
import { View } from 'react-native'
import { tokens } from '../tokens/tokens'

type AvatarDisplayProps = {
  avatarType: AvatarType
  id: string
  size: number
  hidePlaceholder?: boolean
}

function AvatarDisplay({
  avatarType,
  id,
  size,
  hidePlaceholder,
}: AvatarDisplayProps) {
  const candidateAvatarUrl = `${getAvatarUrlFromStoragePath({
    avatarType,
    storagePath: getAvatarStoragePathFromId({ id }),
  })}?time=${Date.now()}`

  const [displayImageUri, setDisplayImageUri] = useState<string | undefined>(
    candidateAvatarUrl,
  )

  const onLoadInitialImgUrlError = () => {
    setDisplayImageUri(undefined)
  }

  return (
    <View
      style={{
        height: size,
        width: size,
        overflow: 'hidden',
        borderRadius: tokens.borderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {typeof displayImageUri === 'undefined' ? (
        !hidePlaceholder && (
          <AvatarPlaceholder avatarType={avatarType} size={size} />
        )
      ) : (
        <Image
          source={{
            uri: displayImageUri,
          }}
          style={{
            flex: 1,
            width: size,
            height: size,
          }}
          contentFit="contain"
          onError={onLoadInitialImgUrlError}
          placeholder={require('@/../assets/images/loader.gif')}
        />
      )}
    </View>
  )
}

type AvatarPlacehodlerProps = {
  avatarType: AvatarType
  size: number
}

function AvatarPlaceholder({ avatarType, size }: AvatarPlacehodlerProps) {
  if (avatarType === 'user') {
    return (
      <MaterialCommunityIcons
        name="account-circle"
        size={size}
        color={tokens.colors.primary.dark}
      />
    )
  }
  return (
    <View
      style={{
        paddingHorizontal: tokens.padding.M,
      }}
    >
      <FontAwesome
        name="child"
        size={tokens.iconSize.L}
        color={tokens.colors.primary.dark}
      />
    </View>
  )
}

export default AvatarDisplay
