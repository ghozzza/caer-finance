export async function fetchTransactionData() {
  try {
    const response = await fetch(
      // "https://caer-finance-sequencer.vercel.app/api/borrow"
      "http://127.0.0.1:4000/api/borrow"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch transaction data");
    }
    const data = await response.json();
    return { data: data.data, error: null };
  } catch (err: any) {
    return { data: null, error: err.message };
  }
}
