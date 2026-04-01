export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const [goldRes, fxRes] = await Promise.all([
      fetch('https://www.doviz.com/api/v1/currencies/gram-altin/latest'),
      fetch('https://open.er-api.com/v6/latest/USD')
    ]);

    const goldData = await goldRes.json();
    const fxData = await fxRes.json();

    const usdTry = fxData.rates.TRY;
    const eurTry = usdTry / fxData.rates.EUR;
    const gbpTry = usdTry / fxData.rates.GBP;
    const cadTry = usdTry / fxData.rates.CAD;

    res.json({
      gramGold: goldData?.selling,
      usdTry,
      eurTry,
      gbpTry,
      cadTry
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
