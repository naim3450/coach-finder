import Footer from "@/components/footer";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";


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