import {
  AvatarType,
  getAvatarStoragePathFromId,
  getAvatarUrlFromStoragePath,
} from '@/client/supabase/storage/avatar'
import { DELETED_AVATAR_PLACEHOLDER_VALUE } from '@/screens/main-tab/profile-stack/UpdateProfile/utils'
import { usePickImage } from '@/utils/usePickImage'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useState } from 'react'
import { Pressable, View } from 'react-native'
import Typography from '../Typography'
import { tokens } from '../tokens/tokens'

const AVATAR_SIZE = 100

type AvatarPickerProps = {
  id?: string
  avatarType: AvatarType
  onAvatarChanged?: (localImageUri?: string) => void
  disabled?: boolean
}

function AvatarPicker({
  id,
  avatarType,
  onAvatarChanged,
  disabled,
}: AvatarPickerProps) {
  const defaultAvatar = id
    ? `${getAvatarUrlFromStoragePath({
        avatarType,
        storagePath: getAvatarStoragePathFromId({ id }),
      })}?time=${Date.now()}`
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
    onAvatarChanged?.(DELETED_AVATAR_PLACEHOLDER_VALUE)
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
        disabled={disabled}
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
            }}
            contentFit="contain"
            onError={onLoadInitialImgUrlError}
            placeholder={require('@/../assets/images/loader.gif')}
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
          disabled={disabled}
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
