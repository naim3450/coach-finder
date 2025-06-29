import Error from "@/app/error/page";
import UserTabs from "@/app/naim/Component/userTabs";

export default async function Layout({ children, params }) {
    const { profile } = await params;
    if (
        profile == "profile" ||
        profile == "saved-group" ||
        profile == "review" ||
        profile == "change-password" ||
        profile == "log-out" ||
        profile == "remove-account"
    ) {
        return (
            <div>
                <main className="container pt-[80px] pb-[100px] flex gap-[56px]">
                    <div>
                        <UserTabs profile={profile} />
                    </div>
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        )
    }
    else {
        return <Error />
    }
}