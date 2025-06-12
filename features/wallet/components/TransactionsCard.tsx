import { Stack, Text, TransactionLoader, XStack, YStack } from "@/ui"
import { NoTransactions } from "@/ui/components/icons"
import { useEffect, useState } from "react"


export const TransactionsCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])
  return (
    <YStack bg="$surface1" width="100%" px="$md" py={isLoading ? "$2xs" : "$md"} mt="$3xl" rounded="$lg">
      {isLoading ? <TransactionLoader opacity={1} withAmounts/> : <XStack  items="center" gap="$sm">
        <Stack bg="$neutral3" height={48}  rounded="$full" width={48} items="center" justify="center" >
          <NoTransactions size={32} color="$surface1"/>
        </Stack>
        <Text variant="subHeading1" color="$neutral2"> No transactions yet</Text>
      </XStack>}
    </YStack>
  )
}