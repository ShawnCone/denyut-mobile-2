import {
  AvatarType,
  getAvatarStoragePathFromId,
  getAvatarUrlFromStoragePath,
} from '@/client/supabase/storage/avatar'
import { usePickImage } from '@/utils/usePickImage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Image, Pressable, View } from 'react-native'
import Typography from '../Typography'
import { tokens } from '../tokens/tokens'

const AVATAR_SIZE = 100

type AvatarPickerProps = {
  id?: string
  avatarType: AvatarType
  onAvatarChanged?: (localImageUri?: string) => void
}

function AvatarPicker({ id, avatarType, onAvatarChanged }: AvatarPickerProps) {
  const defaultAvatar = id
    ? getAvatarUrlFromStoragePath({
        avatarType,
        storagePath: getAvatarStoragePathFromId({ id }),
      })
    : undefined

  const [displayImageUri, setDisplayImageUri] = useState<string | undefined>(
    defaultAvatar,
  )

  const { pickImageFunc } = usePickImage({
    onImagePicked: localImageUri => {
      setDisplayImageUri(localImageUri)
      onAvatarChanged?.(localImageUri)
    },
  })

  const onLoadInitialImgUrlError = () => {
    setDisplayImageUri(undefined)
  }

  const onRemoveAvatar = () => {
    setDisplayImageUri(undefined)
    onAvatarChanged?.(undefined)
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: tokens.margin.S,
      }}
    >
      <Pressable
        onPress={pickImageFunc}
        style={{
          height: AVATAR_SIZE,
          width: AVATAR_SIZE,
          overflow: 'hidden',
          borderRadius: tokens.borderRadius.full,
        }}
      >
        {typeof displayImageUri === 'undefined' ? (
          <MaterialCommunityIcons
            name="account-circle"
            size={AVATAR_SIZE}
            color={tokens.colors.primary.dark}
          />
        ) : (
          <Image
            source={{
              uri: displayImageUri,
            }}
            style={{
              flex: 1,
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              resizeMode: 'contain',
            }}
            onError={onLoadInitialImgUrlError}
          />
        )}
      </Pressable>
      {typeof displayImageUri === 'undefined' ? (
        <Typography
          variant={{
            size: 'caption',
          }}
        >
          Pilih Foto
        </Typography>
      ) : (
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: tokens.margin.S,
            marginTop: tokens.margin.S,
          }}
          onPress={onRemoveAvatar}
        >
          <Typography
            variant={{
              size: 'caption',
            }}
          >
            Hapus Foto
          </Typography>
          <MaterialCommunityIcons
            name="trash-can"
            size={tokens.iconSize.S}
            color={tokens.colors.destructive.normal}
          />
        </Pressable>
      )}
    </View>
  )
}

export default AvatarPicker
