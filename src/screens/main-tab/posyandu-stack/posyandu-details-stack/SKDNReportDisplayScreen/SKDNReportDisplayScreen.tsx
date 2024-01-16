import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PosyanduDetailsStackParamsList } from '../posyandu-details-stack'
import ReportViewer from './ReportViewer'

type SKDNReportDisplayScreenProps = NativeStackScreenProps<
  PosyanduDetailsStackParamsList,
  'SKDNReportDisplayScreen'
>

function SKDNReportDisplayScreen({ route }: SKDNReportDisplayScreenProps) {
  const { reportLocalUri } = route.params

  return <ReportViewer reportLocalUri={reportLocalUri} />
}

export default SKDNReportDisplayScreen
