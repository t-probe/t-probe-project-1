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
