import MyReview from "@/Components/myReview";
import ChangePass from "../../naim/Component/changePass";
import Profile from "../../naim/Component/profile";
import RemoveAccount from "../../naim/Component/removeAccount";
import SaveGroup from "@/Components/SaveGroup";

const page = async ({ params }) => {
  const { profile } = await params;
  return (
    <div className="w-full">
      {profile === "profile" && <Profile />}
      {profile === "saved-group" && <SaveGroup />}
      {profile === "review" && <MyReview />}
      {profile === "change-password" && <ChangePass />}
      {profile === "remove-account" && <RemoveAccount />}
    </div>
  );
};

export default page;
