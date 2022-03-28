import React, { useEffect, useState } from "react";
import { createFabric, addCWM } from "./utils/createCanvas";
import { getAllNftData, getNftTokenData } from "./utils/solana";

const App = (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fabric, setFabric] = useState(null);

  async function connectWallet() {
    const res = await getAllNftData();
    const data = await getNftTokenData(res, setNftData);
    setNftData(data);
    setLoading(true);
  }

  useEffect(() => {
    setFabric(createFabric());
  }, []);

  useEffect(() => {
    if (!nftData.length) return;
    addCWM(nftData, fabric);
  }, [nftData, fabric]);
  return (
    <>
      <button onClick={connectWallet}>Connect</button>

      <canvas id="canvas"></canvas>
      <section className="nft mt-2 my-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h4 className="title">NFT</h4>
            </div>
          </div>
          <div className="row  d-flex justify-content-center">
            {loading ? (
              <>
                {nftData &&
                  nftData.length > 0 &&
                  nftData.map((val, i) => {
                    return (
                      <div className="col-4 mt-3" key={i}>
                        <div className="cart text-center">
                          <div className="img mt-4 pt-3">
                            <img
                              className="cwm"
                              src={val.data.image}
                              alt="loading..."
                              style={{ width: 100 }}
                            />
                            <p className="mt-1">{val.data.name}</p>
                            <h6 className=" mt-2">{val.data.description}</h6>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              <>
                <p className="text-center">loading...</p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
