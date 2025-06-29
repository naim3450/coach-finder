"use client";
import React, { useEffect, useState } from "react";
import Button from "./shared/button";
import GroupCard from "./shared/groupCard";
import { Label } from "./ui/label";
import PeerGroupLeft from "./shared/peerGroupLeft";
import { useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axiosInstance from "@/lib/axios.config";
import LoadingSkeleton from "./shared/loading-skeleton";

const PeerGroupPage = () => {
  let { filterInfo } = useSelector((state) => state.apiInfo);
  const [dataInfo, setDataInfo] = useState([]);
  const [meta, setMeta] = useState([]);
  const [Filter, setFilter] = useState(false);
  const [groups, setGroups] = useState(dataInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const industryArr = filterInfo
    .flatMap((el) => el.industry)
    .filter((el, idx, arr) => {
      return arr.indexOf(el) === idx;
    });
  const countryArr = filterInfo
    .map((el) => el.country)
    .filter((el, idx, arr) => {
      return arr.indexOf(el) === idx;
    });
  const meeting_formatArr = filterInfo
    .flatMap((el) => el.meeting_format)
    .filter((el, idx, arr) => {
      return arr.indexOf(el) === idx;
    });

  // shorting logic
  function handleSortGroups(e) {
    const value = e.target.value;
    setCurrentPage(1);

    switch (value) {
      case "free":
        const freeGroups = dataInfo.filter(
          (group) => group.user.account_type === "basic"
        );
        setGroups(freeGroups);
        break;

      case "popular":
        const popularGroups = [...dataInfo].sort(
          (a, b) => b.visitors.length - a.visitors.length
        );

        setGroups(popularGroups);
        break;

      case "newest":
        setGroups([...dataInfo]);
        break;

      default:
        setGroups([...dataInfo]);
    }
  }

  function handleTopFiltering(indx, dependence) {
    setactive(indx);
    setCurrentPage(1);
    switch (dependence) {
      case "all":
        setGroups(dataInfo);
        break;

      case "popular":
        const popularGroups = [...dataInfo].sort(
          (a, b) => b.visitors.length - a.visitors.length
        );

        setGroups(popularGroups);
        break;

      case "recent":
        setGroups([...dataInfo]);
        break;

      case "oldest":
        setGroups([...dataInfo].reverse());
        break;
    }
  }

  const menuList = ["All", "Popular", "Recent", "Oldest"];

  const [active, setactive] = useState(0);

  function handleNextPage() {
    if (currentPage < meta.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      const res = await axiosInstance.get(
        `/groups?limit=8&page=${currentPage}`
      );

      if (res.success) {
        setDataInfo(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  useEffect(() => {
    setactive(0);
  }, []);

  useEffect(() => {
    setGroups(dataInfo);
  }, [dataInfo]);

  return (
    <section className="py-20">
      {/* list type responsive part  start*/}
      <div className="container lg:flex justify-between hidden">
        <div className="flex gap-5">
          {menuList?.map((el, idx) => {
            return (
              <div
                onClick={() => handleTopFiltering(idx, el.toLowerCase())}
                key={idx}
              >
                <Button
                  className={` ${active === idx
                    ? "!bg-BtnColor !text-white"
                    : "!bg-transparent !text-black"
                    } border xl:text-base text-sm`}
                >
                  {el}
                </Button>
              </div>
            );
          })}
        </div>

        <div className="">
          <form
            action="/action_page.php"
            className="border w-[278px] !py-2 rounded-[6px]"
          >
            <Label
              htmlFor="name"
              className="pl-5 font-normal text-[18px] text-[#9DA6BA]"
            >
              Sort by
            </Label>
            <select
              onChange={handleSortGroups}
              name="sort"
              className="outline-none pl-5 pr-14"
            >
              <option value="free">Free</option>
              <option value="popular">Popular</option>
              <option value="highestRated">Highest Rated</option>
              <option value="newest">Newest</option>
            </select>
          </form>
        </div>
      </div>

      <div className="container sm:block hidden lg:hidden justify-between">
        <div className="flex gap-5">
          <div onClick={() => handleTopFiltering("reset")}>
            <Button className=" text-white bg-BtnColor !py-1 border xl:text-base text-sm">
              All
            </Button>
          </div>
          <div onClick={() => handleTopFiltering("popular")}>
            <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
              Popular
            </Button>
          </div>
          <div onClick={() => handleTopFiltering("resent")}>
            <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
              Recent
            </Button>
          </div>
          <div onClick={() => handleTopFiltering("oldest")}>
            <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
              Oldest
            </Button>
          </div>
        </div>

        <div className="mt-3">
          <form
            action="/action_page.php"
            className="border w-[276px] py-3 rounded-[6px]"
          >
            <Label
              htmlFor="name"
              className="pl-5 font-normal text-[18px] text-[#9DA6BA]"
            >
              Sort by
            </Label>
            <select
              name="cars"
              id="cars"
              className="outline-none pl-5 pr-14 !bg-transparen"
            >
              <option>Free</option>
              <option>Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </form>
        </div>
      </div>

      <div className="container block sm:hidden">
        <Splide
          className=""
          options={{
            perPage: 3,
            perMove: 1,
            arrows: false,
            pagination: false,
            gap: 2,
          }}
          aria-label="My Favorite Images"
        >
          <SplideSlide>
            <div onClick={() => handleTopFiltering("reset")}>
              <Button className=" text-white bg-BtnColor !py-1 border xl:text-base text-sm">
                All
              </Button>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div onClick={() => handleTopFiltering("popular")}>
              <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
                Popular
              </Button>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div onClick={() => handleTopFiltering("resent")}>
              <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
                Recent
              </Button>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div onClick={() => handleTopFiltering("oldest")}>
              <Button className="!text-primaryColor hover:text-white bg-transparent hover:bg-BtnColor border duration-300 xl:text-base text-sm">
                Oldest
              </Button>
            </div>
          </SplideSlide>
        </Splide>

        <div className="mt-3">
          <form
            action="/action_page.php"
            className="border w-[276px] py-3 rounded-[6px]"
          >
            <Label
              htmlFor="name"
              className="pl-5 font-normal text-[18px] text-[#9DA6BA]t"
            >
              Sort by
            </Label>
            <select className="outline-none bg-transparent pl-5 pr-14">
              <option>Free</option>
              <option>Popular</option>
              <option>Highest Rated</option>
              <option>Newest</option>
            </select>
          </form>
        </div>
      </div>
      {/* list type responsive part end */}

      <Button
        onClick={() => setFilter(!Filter)}
        className="lg:hidden block mx-auto mt-6"
      >
        Filter
      </Button>

      <div className="container mt-10 flex justify-center gap-5 relative">
        <div className={`lg:w-[22%] lg:block hidden h-full`}>
          <PeerGroupLeft
            industry={industryArr}
            location={countryArr}
            meeting_format={meeting_formatArr}
          />
        </div>

        <div
          className={`w-[50%] lg:hidden block h-full z-[999] lg:pl-0 fixed top-0 p-5 duration-500 bg-white ${Filter ? "left-0" : "-left-[100%]"
            }`}
        >
          <PeerGroupLeft
            industry={industryArr}
            location={countryArr}
            meeting_format={meeting_formatArr}
          />
        </div>

        {/* card */}
        <div className="lg:w-[78%] h-full w-full grid grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-2 gap-7">
          {isLoading
            ? Array(8)
              .fill(0)
              .map((_, indx) => <LoadingSkeleton key={indx} />)
            : groups?.map((el, idx) => (
              <GroupCard
                className={"lg:w-full w-full"}
                imgCls={"sm:!w-[40px] sm:!h-[40px] lg:!w-[90px] lg:!h-[90px]"}
                reviewCls={"md:flex hidden max-sm:flex"}
                meetingCls={`md:flex hidden max-sm:flex`}
                insListCls={`md:flex  hidden max-sm:flex max-sm:flex-col max-sm:gap-2`}
                veiwCls={`md:px-6 px-3 md:text-base text-sm`}
                key={idx}
                item={el}
              />
            ))}
        </div>
        {Array(groups) && groups.length === 0 && !isLoading && (
          <div className="text-xl text-center mt-40 w-full"> No Data Found</div>
        )}
      </div>

      <div className="container flex justify-center mt-5">
        <div onClick={handleNextPage}>
          <Button
            className={`!px-10 !py-4 !bg-transparent ${currentPage === meta.totalPages && "opacity-30 cursor-not-allowed"
              } !text-BtnColor border`}
          >
            Load more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PeerGroupPage;
