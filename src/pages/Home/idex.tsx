import QuocHuy from "../../assets/quochuy.png";
const Home = () => {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', lineHeight:'100vh'}}>
        <img src={QuocHuy} alt="" height={100} width={100} />.
      </div>
    </div>
  );
};

export default Home;
