import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DashboardContainer from "@/src/Components/DashBoardContainer";
import jwt from "jsonwebtoken";

const Dashboard = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = jwt.decode(token);
            if (!user) {
                localStorage.removeItem("token");
                router.replace("/");
            } else {
                setShowDashboard(true);
            }
        } else {
            router.replace("/");
        }
    }, []);
    return <>{showDashboard && <DashboardContainer />}</>;
};

export default Dashboard;
