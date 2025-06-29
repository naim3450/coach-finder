import Footer from "@/Components/footer";
import Navbar from "@/Components/navbar";
import Menu from "@/Components/shared/menu";

export default function MainLayout({ children }) {

    return (
        <div>
            <Navbar />
            <Menu />
            <main>{children}</main>
            <Footer />
        </div>
    );

}