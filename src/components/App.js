import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (e) => {
    e.persist()
    this.setState((prevState) => {
      return {
        ...prevState,
        filters: {
          type: e.target.value
        }
      }
    })
  }

  onFindPetsClick = () => {
    fetch(this.state.filters.type === 'all' ? '/api/pets' : `/api/pets?type=${this.state.filters.type}`)
    .then(resp => resp.json())
    .then(json => {
      this.setState((prevState) => {
        return {
          ...prevState,
          pets: json
        }
      })
    })
  }

  onAdoptPet = (id) => {
    this.setState((prevState) => {
      return {
        pets: prevState.pets.map(pet => pet.id === id ? {...pet, isAdopted: true}: pet)
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.filters.type === 'all' ? this.state.pets : this.state.pets.filter(pet => pet.type === this.state.filters.type)} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
