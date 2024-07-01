import React, { useState, useCallback, useEffect } from "react";
import { PlaidLinkProps } from "../types";
import { Button } from "@/components/ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "../lib/actions/user.actions";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({ publicToken: public_token, user: user });
      router.push("/");
    },
    [user, router]
  );

  const config: PlaidLinkOptions = {
    onSuccess,
    token,
  };

  const { open, ready } = usePlaidLink(config);
  return (
    <>
      {variant === "primary" ? (
        <Button
          className="plaidlink-primary"
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Banks
        </Button>
      ) : variant === "ghost" ? (
        <Button
          variant="ghost"
          onClick={() => open()}
          className="plaidlink-ghost"
        >
          <Image
            src="/icons/connect-bank.svg"
            alt="Connect Bank"
            width={24}
            height={24}
          />
          <p className="hidden text-[16px] font-semibold text-black-2 xl:block">
            Connect Banks
          </p>
        </Button>
      ) : (
        <Button onClick={() => open()} className="plaidlink-default">
          <Image
            src="/icons/connect-bank.svg"
            alt="Connect Bank"
            width={24}
            height={24}
          />
          <p className="text-[16px] font-semibold text-black-2">
            Connect Banks
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;
