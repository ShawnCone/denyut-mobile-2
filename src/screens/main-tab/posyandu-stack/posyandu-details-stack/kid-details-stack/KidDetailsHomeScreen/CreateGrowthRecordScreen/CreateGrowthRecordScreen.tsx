import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import DenyutMonthPicker from '@/design-system/forms/DatePickers/DenyutMonthPicker'
import DenyutYearPicker from '@/design-system/forms/DatePickers/DenyutYearPicker'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import ErrorMessageDisplay from '@/design-system/forms/ErrorMessageDisplay'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ReactNode } from 'react'
import { Controller } from 'react-hook-form'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { KidDetailsStackParamsList } from '../../kid-details-stack'
import {
  CreateGrowthRecordFormValues,
  useCreateGrowthRecordForm,
  useCreateGrowthRecordMutation,
} from './utils'

type CreateGrowthRecordScreenProps = NativeStackScreenProps<
  KidDetailsStackParamsList,
  'createGrowthRecord'
>

function CreateGrowthRecordScreen({
  navigation,
}: CreateGrowthRecordScreenProps) {
  const { kidInfo } = useKidInfoContext()
  const { control, handleSubmit } = useCreateGrowthRecordForm()

  const {
    mutate: createGrowthRecordMutate,
    isPending: createGrowthRecordIsPending,
    isError: createGrowthRecordIsError,
    error,
  } = useCreateGrowthRecordMutation({
    onSuccess: recordId => {
      // Navigate to record details
      navigation.navigate('growthRecordDetails', {
        recordId,
      })
    },
  })

  console.log({ error })

  const onSubmit = (data: CreateGrowthRecordFormValues) => {
    createGrowthRecordMutate({
      inGrowthRecord: {
        kidId: kidInfo.id,
        ...data,
        measurementDate: data.measurementDate.toISOString(),
      },
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          backgroundColor: tokens.colors.neutral.white,
          paddingHorizontal: tokens.padding.L,
          paddingTop: tokens.padding.L,
        }}
      >
        <View
          style={{
            flex: 1,
            gap: tokens.margin.L,
          }}
        >
          <DenyutTextfield
            label="Nama Anak"
            value={kidInfo.name}
            editable={false}
          />
          <SingleRowFieldContainer>
            <Controller
              control={control}
              name="weight"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Berat Badan (kg)"
                    placeholder="Berat badan anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                    required
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
            <Controller
              control={control}
              name="height"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Tinggi Badan (cm)"
                    placeholder="Tinggi badan anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                    required
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
          </SingleRowFieldContainer>
          <SingleRowFieldContainer>
            <Controller
              control={control}
              name="headCirc"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Lingkar Kepala (cm)"
                    placeholder="Lingkar kepala anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                    required
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
            <Controller
              control={control}
              name="armCirc"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Lingkar Lengan (cm)"
                    placeholder="Lingkar lengan anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
          </SingleRowFieldContainer>
          <SingleRowFieldContainer>
            <Controller
              control={control}
              name="outpostRecordMonthIdx"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutMonthPicker
                    placeholder="Pilih Bulan Pencatatan"
                    value={value}
                    setValue={onChange}
                    disabled={createGrowthRecordIsPending}
                    errorMessage={error?.message}
                    required
                    label="Bulan Pencatatan"
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
            <Controller
              control={control}
              name="outpostRecordYear"
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <SingleTextFieldContainerWithinRow>
                  <DenyutYearPicker
                    placeholder="Pilih Tahun Pencatatan"
                    value={value}
                    setValue={onChange}
                    disabled={createGrowthRecordIsPending}
                    errorMessage={error?.message}
                    required
                    label="Tahun Pencatatan"
                  />
                </SingleTextFieldContainerWithinRow>
              )}
            />
          </SingleRowFieldContainer>

          <DenyutButton
            title="Simpan Data"
            onPress={handleSubmit(onSubmit)}
            disabled={createGrowthRecordIsPending}
          />
          {/* Error text here */}
          {createGrowthRecordIsError && (
            <View
              style={{
                marginTop: tokens.margin.M,
              }}
            >
              <ErrorMessageDisplay message="Terjadi kesalahan: Tidak bisa menyimpan data pertumbuhan anak" />
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

function SingleRowFieldContainer({ children }: { children: ReactNode }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: tokens.margin.L,
      }}
    >
      {children}
    </View>
  )
}
function SingleTextFieldContainerWithinRow({
  children,
}: {
  children: ReactNode
}) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  )
}

export default CreateGrowthRecordScreen
