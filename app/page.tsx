"use client";

import Navbar from "@components/common/navbar";
import Footer from "@components/common/footer";

import Hero from "@components/common/hero";
import Breacrumps from "@components/common/breadcrumbs";

import Walletbar from "@components/web3/walletbar";
import EthRates from "@components/web3/ethRates";

import Card from "@components/order/card";
import List from "@components/order/list";

import { getAllCourse } from "@components/course/content/fetcher";

import React, { useEffect, useState } from "react";

import { useWeb3 } from "@components/provider/web3";

export default function Home() {
  const { data, courseMap } = getAllCourse();

  const w3 = useWeb3();

  return (
    <>
      {/*------ HERO STARTS ------*/}
      <Hero></Hero>
      {/*------ HERO ENDS ------*/}

      {/*------ ADDRESS STARTS ------*/}
      <Walletbar></Walletbar>
      {/*------ ADDRESS ENDS ------*/}

      {/*------ CURRENCY STARTS ------*/}

      {/*------ CURRENCY ENDS ------*/}

      {/*------ ORDER INFO STARTS ------*/}
      <Card></Card>
      {/*------ ORDER INFO ENDS ------*/}

      {/*------ COURSE CARD STARTS ------*/}
      <List courses={data}></List>
      {/*------ COURSE CARD ENDS ------*/}
    </>
  );
}
