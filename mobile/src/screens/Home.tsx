import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { View, Text, ScrollView, Alert } from 'react-native'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { api } from '../lib/axios'

import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function Home() {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<Summary>([])
  const { navigate } = useNavigation()

  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('summary')
      setSummary(response.data)
    } catch (err) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2" style={{}}>
        {weekDays.map((weekDay, index) => {
          return (
            <Text
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              key={`${weekDay}-${index}`}
              style={{ width: DAY_SIZE, height: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          )
        })}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {datesFromYearStart.map(date => {
            const dayWithHabits = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })

            return (
              <HabitDay
                key={date.toString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
                date={date}
                amount={dayWithHabits?.amount}
                completed={dayWithHabits?.completed}
              />
            )
          })}
          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => {
              return (
                <View
                  key={index}
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 h-10 w-10 opacity-40 "
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}
