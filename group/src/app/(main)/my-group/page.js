"use client";
import MyGroupAdvance from "@/components/myGroupAdvance";
import MyGroupEssential from "@/components/myGroupEssential";
import MyGroupFree from "@/components/myGroupFree";
import MyGroupPremium from "@/components/myGroupPremium";
import useMe from "@/hooks/get-me";

const Page = () => {
  const { data, loading, success } = useMe();

  return (
    <div>
      {data?.account_type == "basic" ? (
        <MyGroupFree />
      ) : data?.account_type == "essential" ? (
        <MyGroupEssential />
      ) : data?.account_type == "premium" ? (
        <MyGroupPremium />
      ) : data?.account_type == "advance" ? (
        <MyGroupAdvance />
      ) : (
        false
      )}
    </div>
  );
};

export default Page;
