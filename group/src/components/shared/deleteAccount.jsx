import React, { useState } from 'react'
import Button from './botton'
import useMe from '@/hooks/get-me'
import axiosInstance from '@/lib/axios.config'
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup, pageShowFunc4 } from '@/redux/groupSlice';
import { useRouter } from 'next/navigation';

const DeleteAccount = () => {

  const { userGroup } = useSelector((state) => state.groupInfo)
  const notify = (message) => toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });;

  const [loading, setloading] = useState(false);
  const [checked, setchecked] = useState(false);

  const dispatch = useDispatch()
  const router = useRouter()

  const handleDelet = async () => {
    if (checked) {
      setloading(true);
      try {
        console.log([userGroup?._id]);

        const rsl = await axiosInstance.delete(`/groups`, { data: { ids: [userGroup?._id] } });
        console.log(rsl);

        if (rsl.success) {
          notify(message)
          dispatch(pageShowFunc4(true));
          dispatch(deleteGroup({}));
          router.push('/create-router')
        }
      } catch (error) {

      }
      finally {
        setloading(false)
      }
    }
  }


  return (
    <div className="py-10 container w-full rounded-[8px] bg-white drop-shadow-sm mt-4">
      <div>
        <ToastContainer />
      </div>
      <h2 className="text-[20px] font-semibold text-primaryColor mb-2">Delete account</h2>
      <p className="text-base font-normal  text-[#9397AD] mb-4">
        At the point when you erase your record, your public profile will be deactivated right away. In the event that you alter your perspective before the 14 days are up, sign in with your email and secret key, and we'll send you a connection to reactivate your record.
      </p>

      <div className="flex items-center mb-4">
        <input
          onClick={() => setchecked(!checked)}
          id="confirmDelete"
          type="checkbox"
          checked={checked}
          className="w-5 h-5 border-gray-300 rounded "
        />
        <label htmlFor="confirmDelete" className="ml-2 text-base font-normal  text-primaryColor">
          Yes, I want to delete my account.
        </label>
      </div>

      <Button onClick={handleDelet} className="!py-3">
        Delete
      </Button>
    </div>
  )
}

export default DeleteAccount