"use client";

import Hero from "@components/common/hero";

import Walletbar from "@components/web3/walletbar";

import Card from "@components/order/card";
import List from "@components/order/list";

import { getAllCourse } from "@components/course/content/fetcher";

import { useWeb3 } from "@components/provider/web3";

export default function Home() {
  const { data } = getAllCourse();

  return (
    <>
      <Hero></Hero>

      <Walletbar></Walletbar>

      <Card></Card>

      <List courses={data}></List>
    </>
  );
}
