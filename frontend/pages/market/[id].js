// pages/market/[id].js
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

export default function Market() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Market Details</h2>
      <p>Market ID: {id}</p>
      <p>Details of the market will go here.</p>
      {/* We will add functionality to view and place bets here in the next steps */}
    </Layout>
  );
}
