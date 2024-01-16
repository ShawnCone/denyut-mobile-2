import { tokens } from '@/design-system/tokens/tokens'
import { Image, View } from 'react-native'
import SaveReportButton from './SaveReportButton'

type ReportViewerProps = {
  reportLocalUri: string
}
function ReportViewer({ reportLocalUri }: ReportViewerProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        gap: tokens.margin.L,
      }}
    >
      {/* Image goes here */}
      <View>
        <Image
          source={{
            uri: reportLocalUri,
          }}
          style={{
            aspectRatio: 16 / 8,
            width: '100%',
          }}
        />
      </View>
      {/* Save button here */}
      <View
        style={{
          paddingHorizontal: tokens.padding.L,
        }}
      >
        <SaveReportButton tempReportLocalUri={reportLocalUri} />
      </View>
    </View>
  )
}

export default ReportViewer
