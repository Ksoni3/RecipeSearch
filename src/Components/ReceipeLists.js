import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { fetchData } from '../service'
import Loader from './Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function RecipeLists() {
  const [query, setQuery] = useState('pizza')
  const [searchedTerm, setSearchTerm] = useState(query)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchData(searchedTerm).then((res) => {
      setLoader(true)
      setData(res.hits)
      setLoader(false)
    })
  }, [searchedTerm])

  const handleChange = (e) => {
    const { value } = e.target
    setQuery(value)
  }

  const changeSearchedTerm = () => {
    setSearchTerm(query)
  }

  return (
    <div className="container">
      <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
          <button
            onClick={() => {
              changeSearchedTerm()
              setLoader(true)
            }}
            disabled={query.length === 0}
          >
            <BsSearch />
          </button>
        </div>
      </div>
      {data?.length === 0 && (
        <div className="notFound">
          <h1>Search couldn't be found !!!</h1>
        </div>
      )}
      {loader ? (
        <Loader />
      ) : (
        <div className="flexbox">
          {data &&
            data?.length > 0 &&
            data.map((item, index) => {
              return (
                <div key={index} className="flexItem">
                  <div className="img-wrapper">
                    <img src={item.recipe.image} alt="item.recipe.label" />
                  </div>
                  <p>{item.recipe.label}</p>
                </div>
              )
            })}
        </div>
      )}
      <ToastContainer />
    </div>
  )
}

export default RecipeLists
