import { useUserInfoContext } from '@/context/UserInfoContext'
import { DarkHeaderStackNavigationScreenOptions } from '@/design-system/NavigationScreenOptions'
import Typography from '@/design-system/Typography'
import AvatarDisplay from '@/design-system/forms/AvatarDisplay'
import { tokens } from '@/design-system/tokens/tokens'
import { FontAwesome } from '@expo/vector-icons'
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { Pressable, View } from 'react-native'
import { MainTabParamsList } from '../main-tab'
import MyPosyanduListCards from './MyPosyanduListCards'
import { checkUserInfoComplete, getGreetings } from './utils'

// Hacky way to get status bar color change working
const HomeStack = createNativeStackNavigator<{
  HomeStackHome: undefined
}>()

type HomeScreenProps = NativeStackScreenProps<MainTabParamsList, 'Home'>

function HomeScreen({ navigation }: HomeScreenProps) {
  const { userInfo } = useUserInfoContext()

  const userInfoIsComplete = checkUserInfoComplete(userInfo)

  function navigateToPosyanduDetail(posyanduId: string) {
    navigation.navigate('Posyandu', {
      screen: 'PosyanduDetails',
      params: {
        posyanduId,
      },
    })
  }

  function navigateToAddNewPosyandu() {
    navigation.navigate('Posyandu', {
      screen: 'NewPosyanduSearch',
    })
  }

  function navigateToPosyanduHome() {
    navigation.navigate('Posyandu', {
      screen: 'PosyanduHome',
    })
  }

  function goToUpdateProfile() {
    navigation.navigate('Profile', {
      screen: 'UpdateProfile',
    })
  }

  return (
    <HomeStack.Navigator
      initialRouteName="HomeStackHome"
      screenOptions={DarkHeaderStackNavigationScreenOptions}
    >
      <HomeStack.Screen
        name="HomeStackHome"
        options={{
          headerShown: false,
        }}
      >
        {/* Wrapped so that the status bar change works */}
        {() => (
          <View style={{ flex: 1 }}>
            {/* Dark background part */}
            <View
              style={{
                backgroundColor: tokens.colors.primary.dark,
                paddingVertical: tokens.padding.XL,
                paddingHorizontal: tokens.padding.L,
                gap: tokens.margin.L,
              }}
            >
              <View
                style={{
                  gap: tokens.margin.M,
                }}
              >
                {/* Greetings part */}
                <Typography
                  variant={{
                    size: 'caption',
                  }}
                  style={{
                    color: tokens.colors.neutral.white,
                  }}
                >
                  {getGreetings()},
                </Typography>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.margin.M,
                  }}
                >
                  <AvatarDisplay
                    avatarType="user"
                    id={userInfo.id}
                    size={tokens.iconSize.L}
                    hidePlaceholder
                  />
                  <Typography
                    variant={{
                      size: 'Heading5',
                    }}
                    style={{
                      color: tokens.colors.neutral.white,
                    }}
                  >
                    {userInfo.name}
                  </Typography>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: tokens.padding.L,
                  gap: tokens.margin.L,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    style={{
                      color: tokens.colors.neutral.white,
                    }}
                    variant={{
                      size: 'paragraph',
                      textStyling: {
                        weight: 'bold',
                      },
                    }}
                  >
                    Posyandu Saya
                  </Typography>
                  <Pressable
                    onPress={navigateToPosyanduHome}
                    style={{
                      padding: tokens.padding.S,
                    }}
                    android_ripple={{
                      color: tokens.colors.ripple,
                    }}
                  >
                    <Typography
                      variant={{
                        size: 'caption',
                      }}
                      style={{
                        color: tokens.colors.neutral.white,
                      }}
                    >
                      Lihat Semua
                    </Typography>
                  </Pressable>
                </View>
                <MyPosyanduListCards
                  onPosyanduPress={navigateToPosyanduDetail}
                  onAddNewPosyanduPress={navigateToAddNewPosyandu}
                />
              </View>
            </View>
            {/* Light background part */}
            <View
              style={{
                marginTop: -tokens.padding.M,
                borderTopLeftRadius: tokens.borderRadius.M,
                borderTopRightRadius: tokens.borderRadius.M,
                backgroundColor: tokens.colors.neutral.white,
                paddingVertical: tokens.padding.L,
                paddingHorizontal: tokens.padding.L,
                gap: tokens.margin.L,
                flex: 1,
              }}
            >
              {/* Button to update profile */}
              {!userInfoIsComplete && (
                <Pressable
                  onPress={goToUpdateProfile}
                  style={{
                    padding: tokens.padding.XL,
                    paddingVertical: tokens.padding.L,
                    backgroundColor: tokens.colors.warning.extraLight,
                    borderRadius: tokens.borderRadius.M,
                    flexDirection: 'row',
                    gap: tokens.margin.XL,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                  android_ripple={{
                    color: tokens.colors.ripple,
                  }}
                >
                  <FontAwesome
                    name="exclamation-triangle"
                    size={tokens.iconSize.M}
                    color={tokens.colors.warning.dark}
                  />

                  <View
                    style={{
                      flex: 1,
                      gap: tokens.margin.S,
                    }}
                  >
                    {/* Incomplete profile card, links to update profile page */}
                    <Typography
                      variant={{
                        size: 'paragraphS',
                        textStyling: {
                          weight: 'bold',
                        },
                      }}
                    >
                      Profil anda belum lengkap
                    </Typography>
                    <Typography
                      variant={{
                        size: 'captionS',
                      }}
                    >
                      Lengkapi data diri anda untuk kenyamanan penggunaan
                      aplikasi denyut.
                    </Typography>
                    <Typography
                      variant={{
                        size: 'captionS',
                      }}
                      style={{
                        textDecorationLine: 'underline',
                      }}
                    >
                      Klik di sini untuk melengkapi profil anda
                    </Typography>
                  </View>
                </Pressable>
              )}

              {/* Tutorial scroller part */}
              <View
                style={{
                  gap: tokens.margin.L,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    style={{
                      color: tokens.colors.neutral.dark,
                    }}
                    variant={{
                      size: 'paragraph',
                      textStyling: {
                        weight: 'bold',
                      },
                    }}
                  >
                    Tutorial
                  </Typography>
                  <Pressable
                    style={{
                      padding: tokens.padding.S,
                    }}
                    android_ripple={{
                      color: tokens.colors.ripple,
                    }}
                  >
                    <Typography
                      variant={{
                        size: 'caption',
                      }}
                      style={{
                        color: tokens.colors.neutral.normal,
                      }}
                    >
                      Lihat Semua
                    </Typography>
                  </Pressable>
                </View>
                <Typography
                  variant={{
                    size: 'caption',
                  }}
                  style={{
                    color: tokens.colors.neutral.dark,
                    textAlign: 'center',
                  }}
                >
                  Belum ada tutorial yang tersedia
                </Typography>
              </View>
            </View>
          </View>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}

export default HomeScreen
