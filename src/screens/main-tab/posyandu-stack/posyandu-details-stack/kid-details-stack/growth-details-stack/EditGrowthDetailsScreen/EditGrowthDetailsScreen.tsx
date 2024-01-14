import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import DenyutDateTimePicker from '@/design-system/forms/DatePickers/DenyutDateTimePicker'
import DenyutMonthPicker from '@/design-system/forms/DatePickers/DenyutMonthPicker'
import DenyutYearPicker from '@/design-system/forms/DatePickers/DenyutYearPicker'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import ErrorMessageDisplay from '@/design-system/forms/ErrorMessageDisplay'
import {
  SingleFormFieldContainerWithinRow,
  SingleRowFieldContainer,
} from '@/design-system/forms/FormLayout'
import { tokens } from '@/design-system/tokens/tokens'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller } from 'react-hook-form'
import { View } from 'react-native'
import { GrowthDetailsStackParamsList } from '../growth-details-stack'
import { useGrowthDetailsContext } from '../utils'
import {
  EditGrowthDetailsFormValues,
  useEditGrowthDetailsForm,
  useEditGrowthRecordMutation,
} from './utils'

type EditGrowthDetailsScreenProps = NativeStackScreenProps<
  GrowthDetailsStackParamsList,
  'editGrowthDetails'
>

function EditGrowthDetailsScreen({ navigation }: EditGrowthDetailsScreenProps) {
  const {
    growthDetails: { recordId },
  } = useGrowthDetailsContext()

  const { kidInfo } = useKidInfoContext()

  function handleGoToDetails() {
    navigation.navigate('growthDetailsHome')
  }

  const { mutate, isError, isPending } = useEditGrowthRecordMutation({
    onSuccess: handleGoToDetails,
  })

  const { control, handleSubmit } = useEditGrowthDetailsForm()

  const onSubmit = (data: EditGrowthDetailsFormValues) => {
    mutate({
      recordId,
      inGrowthRecord: {
        ...data,
        measurementDate: data.measurementDate.toISOString(),
      },
    })
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          gap: tokens.margin.L,
          backgroundColor: tokens.colors.neutral.white,
          padding: tokens.padding.L,
        }}
      >
        <DenyutTextfield
          label="Nama Anak"
          value={kidInfo.name}
          editable={false}
        />
        <Controller
          control={control}
          name="measurementDate"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <DenyutDateTimePicker
              placeholder="Pilih Tanggal Pengukuran"
              value={value}
              setValue={onChange}
              disabled={isPending}
              errorMessage={error?.message}
              label="Tanggal Pengukuran"
            />
          )}
        />
        <SingleRowFieldContainer>
          <Controller
            control={control}
            name="weight"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutTextfield
                  label="Berat Badan (kg)"
                  placeholder="Berat badan anak"
                  errorMessage={error?.message}
                  onBlur={onBlur}
                  value={value.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  editable={!isPending}
                  required
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
          <Controller
            control={control}
            name="height"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutTextfield
                  label="Tinggi Badan (cm)"
                  placeholder="Tinggi badan anak"
                  errorMessage={error?.message}
                  onBlur={onBlur}
                  value={value.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  editable={!isPending}
                  required
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
        </SingleRowFieldContainer>
        <SingleRowFieldContainer>
          <Controller
            control={control}
            name="headCirc"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutTextfield
                  label="Lingkar Kepala (cm)"
                  placeholder="Lingkar kepala anak"
                  errorMessage={error?.message}
                  onBlur={onBlur}
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  editable={!isPending}
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
          <Controller
            control={control}
            name="armCirc"
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutTextfield
                  label="Lingkar Lengan (cm)"
                  placeholder="Lingkar lengan anak"
                  errorMessage={error?.message}
                  onBlur={onBlur}
                  value={value?.toString()}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  editable={!isPending}
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
        </SingleRowFieldContainer>
        <SingleRowFieldContainer>
          <Controller
            control={control}
            name="outpostRecordMonthIdx"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutMonthPicker
                  placeholder="Pilih Bulan Pencatatan"
                  value={value}
                  setValue={onChange}
                  disabled={isPending}
                  errorMessage={error?.message}
                  required
                  label="Bulan Pencatatan"
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
          <Controller
            control={control}
            name="outpostRecordYear"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <SingleFormFieldContainerWithinRow>
                <DenyutYearPicker
                  placeholder="Pilih Tahun Pencatatan"
                  value={value}
                  setValue={onChange}
                  disabled={isPending}
                  errorMessage={error?.message}
                  required
                  label="Tahun Pencatatan"
                />
              </SingleFormFieldContainerWithinRow>
            )}
          />
        </SingleRowFieldContainer>

        {/* Error text here */}
        {isError && (
          <View
            style={{
              marginTop: tokens.margin.M,
            }}
          >
            <ErrorMessageDisplay message="Terjadi kesalahan: Tidak bisa mengubah data pertumbuhan anak" />
          </View>
        )}
        <DenyutButton
          title="Ubah Data"
          onPress={handleSubmit(onSubmit)}
          disabled={isPending}
        />
      </View>
    </View>
  )
}

export default EditGrowthDetailsScreen
