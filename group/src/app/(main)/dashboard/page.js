"use client"
import AdvancedUserProliel from "@/components/advancedUserProliel"
import EssentialUserProfile from "@/components/essentialUserProfile"
import FreeUserProfile from "@/components/freeUserProfile"
import PremiumUserProfile from "@/components/premiumUserProfile"
import useMe from "@/hooks/get-me"

const Page = () => {
  const { data, error, loading, success } = useMe();

  return (
    <div>
      {data?.account_type == "basic" ? <FreeUserProfile />
        : data?.account_type == "essential" ? <EssentialUserProfile />
          : data?.account_type == "premium" ? <PremiumUserProfile />
            : data?.account_type == "advance" ? <AdvancedUserProliel />
              : false
      }
    </div >
  )
}

export default Page