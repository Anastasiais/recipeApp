import React, {useEffect, useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App = () => {

  const APP_ID = "022c4001"
  const APP_KEY = "895297ab7bed778d51ea1a5831b838f9"

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const getRecipes = async ()=> {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      const data = await response.json()
      setRecipes(data.hits)


   }
   getRecipes()
  }, [query])


const updateSearch = e => {
   setSearch(e.target.value)

}

const getSearch = e => {
  e.preventDefault()
  setQuery(search)
  setSearch('')
}

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"  value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">search</button>
      </form>
        <div  className="recipes">
      {recipes.map((recipe, index)=> (
      <Recipe
        key={index}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
      />
      ))}
      </div>
    </div>
  );
}

export default App;
