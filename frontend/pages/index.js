// pages/index.js
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Active Prediction Markets</h2>
      <ul>
        {/* We'll list the active markets here once we connect to the smart contract */}
        <li>No active markets yet!</li>
      </ul>
    </Layout>
  );
}

import Link from "next/link";

export default function Home() {
  // Dummy data for active markets (you'll replace this with real contract data later)
  const markets = [
    { id: 1, question: "Will the price of ETH go up by the end of the year?" },
    { id: 2, question: "Will Tesla release a new model this year?" },
    { id: 3, question: "Will the next Apple product have a foldable screen?" },
  ];

  return (
    <div>
      <h1>Prediction Markets</h1>
      <h2>Active Markets</h2>
      <ul>
        {markets.map((market) => (
          <li key={market.id}>
            <Link href={`/market/${market.id}`}>
              <a>{market.question}</a>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/create-market">
        <a>Create a New Market</a>
      </Link>
    </div>
  );
}
