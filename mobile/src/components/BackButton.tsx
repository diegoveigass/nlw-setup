import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

export function BackButton() {
  const { goBack } = useNavigation()
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack} className="w-8 h-8">
      <Feather name="arrow-left" size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  )
}