import BinanceW3WProvider from '@binance/w3w-ethereum-provider';
import { useEffect, useState } from 'react'

export default function App() {
  const [provider,setProvider] = useState<BinanceW3WProvider | null>(null)
  useEffect(()=>{
    async function initProvider() {
      const BinanceProvider = (await import('@binance/w3w-ethereum-provider')).default;
      const walletProvider = new BinanceProvider({
        chainId: 204,
      })
      setProvider(walletProvider)
    }
    initProvider().catch(console.error)
  },[])


  return (
    <main>
       <button onClick={async ()=>{
        if(!provider) return;
        if(provider.connected) {
          await provider.disconnect();
        }
        const accounts = await provider.request({method: 'eth_requestAccounts',params:[]});
        const address = accounts[0];
        const hexMsg = `0x${stringToHex("Hello world")}`;
        const signMessageRes =await provider.request({method:"personal_sign",params:[hexMsg,address]})
        console.log('res',address,signMessageRes,provider)
       }}>Login And Sign</button>
    </main>
  )
}

function stringToHex(str:string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, "0")) // 转换为两位的十六进制
    .join("");
}