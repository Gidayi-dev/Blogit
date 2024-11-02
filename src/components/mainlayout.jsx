import { Children } from "react";
import Header from "./header";

const MainLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default MainLayout;