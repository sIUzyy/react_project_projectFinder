import React, { useState } from 'react';
import Dropdown from '../component/Dropdown';
import { product } from '../data/Products';

const Index = () => {

  //dropdown component
  const [selectedCategory, setSelectedCategory] = useState('All');

  //search bar component
  const [productSearch, setProductSearch] = useState('')

  //for drop down
  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  //for input search bar
  const handleSearch = (event) => {
    setProductSearch(event.target.value);
  };


  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'All'? product : product.filter((pro) => pro.category === selectedCategory);

  //search the product, pass down the filteredproducts    
  const searchedProducts = filteredProducts.filter((pro) => pro.name.toLowerCase().includes(productSearch.toLowerCase()));
      
  // ascending order the products, and pass down the searchProducts
  const sortedProduct = searchedProducts.slice().sort((a, b) => a.name.localeCompare(b.name));

  // Check if any products are found
  const checkProduct = sortedProduct.length > 0;

  return (
  <div>
    <div className="max-w-7xl mx-auto">
      <div className="search-section pt-5 px-5 font-header md:flex md:justify-center">
        <input
          onChange={handleSearch}
          value={productSearch}
          type="text"
          placeholder="Search Product..."
          className="border w-full p-2 outline-none rounded-3xl border-indigo-500 placeholder:pl-2  md: lg: xl: 2xl:w-[50%]"
        />

      </div>

      <div className="result font-header text-center mt-2">
        {productSearch !== "" && (
          <h1 className=''>Result:     
             <label className={sortedProduct.length === 0 ? 'text-red-500' : sortedProduct.length >= 0 ? 'text-green-500' : 'text-default-color'}> {sortedProduct.length}</label></h1>
        )}
      </div>


      <div className="px-5 py-16">
        <div className="header-section text-center font-header">
          <h1 className="text-3xl">Product Finder</h1>
          <p className="text-base text-gray-500">
            Category: <label className="text-indigo-600">{selectedCategory}</label>
          </p>
        </div>

        <div className="dropdown-section my-5 flex justify-end">
          <Dropdown
            categories={['All','Junk Food','Biscuit','Beverages','Canned Foods','Others','Medicines','Cigarettes','Coffee & Milk']}
            onChange={handleCategory}
          />
        </div>

        <div>
        <h1 className='text-gray-400 text-sm font-header mt-2 text-center'>Note: <label className='text-red-400 '>Prices may change gradually, but we will update the website occasionally.</label></h1>
        </div>

        <div className="data-section text-center my-10 font-header">
          <div className="data-header grid grid-cols-2 text-lg text-[#8D99AE]">
            <div>
              <h1>Product Name</h1>
            </div>
            <div>
              <h1>Price</h1>
            </div>
          </div>
          
          {checkProduct ? (
            sortedProduct.map((pro, index) => (
              <div key={index} className="grid grid-cols-2 items-center text-sm border-y border-gray-200 py-2 my-4">
                <div>
                  <h1 className="capitalize ">{pro.name}</h1>
                </div>
                <div>
                  <h1 className="">₱{pro.price}</h1>
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1 className='pt-24 uppercase text-2xl text-red-500'>no item found</h1>
              <p className='text-sm text-[#A1A1AA]'>Contact the developer if you have questions.</p>

            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Index;
