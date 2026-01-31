import Navbar from "@components/common/navbar";
import Footer from "@components/common/footer";

import Hero from "@components/common/hero";
import Breacrumps from "@components/common/breadcrumbs";

import Walletbar from "@components/web3/walletbar";
import EthRates from "@components/web3/ethRates";

import Card from "@components/order/card";
import List from "@components/order/list";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          {/*------ NAVBAR STARTS ------*/}
          <Navbar></Navbar>
          {/*------ NAVBAR ENDS ------*/}
          <div>
            {/*------ HERO STARTS ------*/}
            <Hero></Hero>
            {/*------ HERO ENDS ------*/}

            {/*------ BREADCRUMBS STARTS ------*/}
            <Breacrumps></Breacrumps>
            {/*------ BREADCRUMBS ENDS ------*/}

            {/*------ ADDRESS STARTS ------*/}
            <Walletbar></Walletbar>
            {/*------ ADDRESS ENDS ------*/}

            {/*------ CURRENCY STARTS ------*/}

            {/*------ CURRENCY ENDS ------*/}

            {/*------ ORDER INFO STARTS ------*/}
            <Card></Card>
            {/*------ ORDER INFO ENDS ------*/}

            {/*------ COURSE CARD STARTS ------*/}
            <List></List>
            {/*------ COURSE CARD ENDS ------*/}
          </div>
        </div>
        {/*------ FOOTER STARTS ------*/}
        <Footer></Footer>
        {/*------ FOOTER ENDS ------*/}
      </div>
    </div>
  );
}
