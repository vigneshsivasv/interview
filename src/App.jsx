/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import './App.css'
import ProductCard from './product';
import styled from 'styled-components';
import Header from './header';
import Modal from './modal';
import CurrenyConverter from './currency-converter';

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  justify-content: center;
  margin: 80px 0px 0px;
`
function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const datas = await fetch('https://dummyjson.com/products');
      const response = await datas.json();
      setData(response.products);

    }
    fetchData();
  }, [])
  console.log("search", search)
  const openModal = () => {
    setIsModalOpen(true);
  }
  return (
    <>
      {/* <Header search={search} setSearch={setSearch} />
        <button onClick={openModal}>Open Modal</button>
      <Flex>
        {data.filter((product) => 
        product.title.toLowerCase().includes(search.toLowerCase())).map((data) => {
          return(
          <ProductCard key={data.id} product={data} />
        )
        })}
      </Flex>
      {isModalOpen && <Modal open={isModalOpen} close={() => {setIsModalOpen(false); console.log(isModalOpen)}} />} */}
      <CurrenyConverter />
    </>
  )
}

export default App
