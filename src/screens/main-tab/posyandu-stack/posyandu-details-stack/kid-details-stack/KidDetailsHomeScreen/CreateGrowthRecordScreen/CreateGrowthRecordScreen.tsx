import { useKidInfoContext } from '@/context/KidInfoContext'
import DenyutButton from '@/design-system/DenyutButton'
import DenyutMonthPicker from '@/design-system/forms/DatePickers/DenyutMonthPicker'
import DenyutYearPicker from '@/design-system/forms/DatePickers/DenyutYearPicker'
import DenyutTextfield from '@/design-system/forms/DenyutTextfield'
import ErrorMessageDisplay from '@/design-system/forms/ErrorMessageDisplay'
import {
  SingleFormFieldContainerWithinRow,
  SingleRowFieldContainer,
} from '@/design-system/forms/FormLayout'
import { tokens } from '@/design-system/tokens/tokens'
import { getDisplayGrowthRecordDate } from '@/utils/dateFormatter'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Controller } from 'react-hook-form'
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { KidDetailsStackParamsList } from '../../kid-details-stack'
import LatestGrowthRecordCard from './LatestGrowthRecordCard'
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
  const { control, handleSubmit, watch } = useCreateGrowthRecordForm()
  const { outpostRecordMonthIdx, outpostRecordYear } = watch()

  const {
    mutate: createGrowthRecordMutate,
    isPending: createGrowthRecordIsPending,
    error: createGrowthRecordError,
  } = useCreateGrowthRecordMutation({
    onSuccess: recordId => {
      // Navigate to record details
      navigation.navigate('growthRecordDetails', {
        recordId,
      })
    },
  })

  const createGrowthRecordIsError = createGrowthRecordError !== null
  const errorIsDuplicate =
    createGrowthRecordIsError &&
    createGrowthRecordError.message.includes('duplicate') // Change logic if be error message changes

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
      <ScrollView
        style={{
          flex: 1,
          gap: tokens.margin.L,
        }}
        contentContainerStyle={{
          paddingVertical: tokens.padding.L,
        }}
      >
        <View
          style={{
            backgroundColor: tokens.colors.neutral.white,
            padding: tokens.padding.L,
          }}
        >
          <LatestGrowthRecordCard />
        </View>
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
          <SingleRowFieldContainer>
            <Controller
              control={control}
              name="weight"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleFormFieldContainerWithinRow>
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
                </SingleFormFieldContainerWithinRow>
              )}
            />
            <Controller
              control={control}
              name="height"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleFormFieldContainerWithinRow>
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
                </SingleFormFieldContainerWithinRow>
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
                <SingleFormFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Lingkar Kepala (cm)"
                    placeholder="Lingkar kepala anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                  />
                </SingleFormFieldContainerWithinRow>
              )}
            />
            <Controller
              control={control}
              name="armCirc"
              render={({
                field: { onChange, onBlur },
                fieldState: { error },
              }) => (
                <SingleFormFieldContainerWithinRow>
                  <DenyutTextfield
                    label="Lingkar Lengan (cm)"
                    placeholder="Lingkar lengan anak"
                    errorMessage={error?.message}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    editable={!createGrowthRecordIsPending}
                  />
                </SingleFormFieldContainerWithinRow>
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
                <SingleFormFieldContainerWithinRow>
                  <DenyutMonthPicker
                    placeholder="Pilih Bulan Pencatatan"
                    value={value}
                    setValue={onChange}
                    disabled={createGrowthRecordIsPending}
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
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <SingleFormFieldContainerWithinRow>
                  <DenyutYearPicker
                    placeholder="Pilih Tahun Pencatatan"
                    value={value}
                    setValue={onChange}
                    disabled={createGrowthRecordIsPending}
                    errorMessage={error?.message}
                    required
                    label="Tahun Pencatatan"
                  />
                </SingleFormFieldContainerWithinRow>
              )}
            />
          </SingleRowFieldContainer>

          {/* Error text here */}
          {createGrowthRecordIsError && (
            <View
              style={{
                marginTop: tokens.margin.M,
              }}
            >
              <ErrorMessageDisplay
                message={`Terjadi kesalahan: ${
                  errorIsDuplicate
                    ? `Sudah ada data pertumbuhan untuk bulan pencatatan ${getDisplayGrowthRecordDate(
                        {
                          recordYear: outpostRecordYear,
                          recordMonthIdx: outpostRecordMonthIdx,
                        },
                      )}`
                    : 'Tidak bisa menyimpan data pertumbuhan anak'
                }`}
              />
            </View>
          )}
          <DenyutButton
            title="Simpan Data"
            onPress={handleSubmit(onSubmit)}
            disabled={createGrowthRecordIsPending}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default CreateGrowthRecordScreen
