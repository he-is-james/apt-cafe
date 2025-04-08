'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const getRandomInt = (min: number, max: number) => {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  const redirectLink = (total: number) => {
    return `https://account.venmo.com/?txn=pay&audience=private&recipients=he_is_james&amount=${total}&note=Apartment%20Cafe`
  }

  useEffect(() => {
    const total = getRandomInt(10, 15);
    const paymentLink = redirectLink(total);
    router.push(paymentLink);
  })

  return (
    <div>
      Test
    </div>
  );
}
