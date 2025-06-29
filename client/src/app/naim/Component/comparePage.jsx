"use client"
import React, { useEffect, useState } from 'react'
import CompareList from './compareList'
import { Input } from '@/Components/ui/input'
import Button from '@/Components/shared/button'
import { Drop, Search } from '../icons'
import EmptyProduct from './emptyProduct'
import { useDispatch, useSelector } from 'react-redux'
import { getCompareData, searchFeatch } from '@/redux/dataSlice'

const ComparePage = () => {
    const { compareVal, filterInfo } = useSelector((state) => state.apiInfo)
    let [sugs, setsugs] = useState([]);

    const dispatch = useDispatch();

    const searchChange = (e) => {
        dispatch(searchFeatch(e.target.value));
        if (e.target.value == "") {
            setsugs([]);
            return;
        }

        let suggestion = filterInfo.filter((data) => {
            if (data.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                return data
            }
        })

        setsugs(suggestion)
    };
    // dispatch(getCompareData(el._id))
    function sumbit(e) {
        e.preventDefault()
        dispatch(getCompareData(sugs[0]?._id));
        setsugs([]);
    }

    return (
        <div className='container'>

            <div className="search lg:w-[702px] container relative mx-auto">
                <form onSubmit={sumbit} className="w-full flex relative sm:flex-row flex-col lg:justify-between justify-center lg:gap-0 gap-3 mt-[80px]">
                    <div className="relative lg:w-[520px] sm:w-[45vw] w-[80%] max-sm:mx-auto h-[48px]">
                        <Search className={"absolute top-1/2 -translate-y-1/2 left-4"} />
                        <Input onChange={searchChange} placeholder="Search Group" className="w-full h-full pl-[48px] max-sm:!py-2 rounded-[6px]" />
                        <Drop className={"absolute top-1/2 -translate-y-1/2 right-4"} />
                    </div>
                    <Button type="submit" className='font-bold max-sm:w-[25vw] h-[48px] sm:text-base text-sm max-sm:px-3 max-sm:mx-auto max-sm:py-3'>
                        Add Group
                    </Button>
                </form>

                <div className={`h-[100px] lg:w-[520px] sm:w-[45vw] w-[80%] shadow-md py-1 px-2 border overflow-auto ${sugs == false ? "hidden" : "block"}`}>
                    {
                        sugs.map((el, idx) => {
                            return (
                                <li className='text-base text-[#333] list-none font-semibold py-1 cursor-pointer hover:bg-[#c4c4c490]' onClick={() => { dispatch(getCompareData(el._id)), setsugs([]) }} key={idx}>{el.name}
                                </li>
                            )
                        })
                    }
                </div>
            </div>

            <div className="mt-[24px] mb-[180px]">
                {
                    compareVal.length > 0 ?
                        <CompareList /> :
                        <EmptyProduct />
                }
            </div>
        </div>
    )
}

export default ComparePage