import React from "react";
import HeaderBox from "../../components/HeaderBox";
import TotalBalanceBox from "../../components/TotalBalanceBox";
import RightSidebar from "../../components/RightSidebar";
import { getLoggedInUser } from "../../lib/actions/user.actions";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect("/sign-in");
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Here you can find all the information you need to get started."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.66}
          />
        </header>
        recent transactions
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 1234.5 }, { currentBalance: 465.99 }]}
      />
    </section>
  );
};

export default Dashboard;
