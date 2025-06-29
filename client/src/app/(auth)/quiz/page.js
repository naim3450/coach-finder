"use client"
import React, { useEffect } from 'react'
import QuizePage from '../../naim/Component/quizePage'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

const Quiz = () => {
    const { hitQuiz } = useSelector((state) => state.apiInfo)

    const router = useRouter()
    useEffect(() => {
        if (hitQuiz == false) {
            router.push('/signup')
        }
    }, [hitQuiz])

    if (hitQuiz) {
        return (
            <div className='bg-[#F5F5F5] overflow-hidden h-full pt-[42px] pb-[70px]'>
                <QuizePage />
            </div>
        )
    }

}

export default Quiz
