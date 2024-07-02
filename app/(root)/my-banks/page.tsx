import React from "react";
import HeaderBox from "../../../components/HeaderBox";
import { getLoggedInUser } from "../../../lib/actions/user.actions";
import { getAccounts } from "../../../lib/actions/bank.actions";
import { Account } from "../../../types";
import BankCard from "../../../components/BankCard";

const MyBanks = async () => {
  const loggedInUser = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedInUser?.$id });

  return (
    <section className="flex">
      <div className="my-banks">
        <HeaderBox
          title="My Bank Accounts"
          subtext="Manage your banking activities with ease."
        />

        <div className="space-y-4">
          <h2 className="header-2">Your Cards</h2>
          <div className="flex flex-wrap gap-6">
            {accounts &&
              accounts.data.map((a: Account) => {
                return (
                  <BankCard
                    key={a.appwriteItemId}
                    account={a}
                    userName={loggedInUser?.firstName}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
