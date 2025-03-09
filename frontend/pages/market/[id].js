// pages/market/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout'; // Adjust path if needed
import { ethers } from 'ethers'; // Import ethers.js

export default function Market() {
  const router = useRouter();
  const { id } = router.query; // Get the market ID from the URL
  const [marketDetails, setMarketDetails] = useState(null); // State to store market details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!id) return; // If no id is present, do nothing

    const fetchMarketDetails = async () => {
      try {
        // Connect to the Ethereum network using ethers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Get the contract address and ABI
        const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // Replace with your deployed contract address
        const abi = [
          // Add your contract's ABI here
          // Example: to get a market's details
          'function markets(uint256 id) public view returns (string memory question, uint256 endTime, uint256 yesShares, uint256 noShares)',
        ];

        const contract = new ethers.Contract(contractAddress, abi, signer);
        
        // Call the contract to fetch market details
        const market = await contract.markets(id);
        setMarketDetails(market);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching market details:', error);
        setLoading(false);
      }
    };

    fetchMarketDetails(); // Fetch the market details when the page loads
  }, [id]); // Re-run this effect when the `id` changes

  if (loading) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold mb-4">Loading Market Details...</h2>
      </Layout>
    );
  }

  if (!marketDetails) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold mb-4">Market Not Found</h2>
        <p>The requested market details could not be found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Market Details</h2>
      <p>Market ID: {id}</p>
      <p>Question: {marketDetails[0]}</p> {/* Market question */}
      <p>End Time: {new Date(marketDetails[1] * 1000).toLocaleString()}</p> {/* Convert timestamp to human-readable date */}
      <p>Yes Shares: {ethers.utils.formatEther(marketDetails[2])}</p> {/* Format yesShares */}
      <p>No Shares: {ethers.utils.formatEther(marketDetails[3])}</p> {/* Format noShares */}
    </Layout>
  );
}
