import React, { Component } from 'react'
import { Pet } from './components/Pet'

class App extends Component {
  state = {
    pets: [],
    filterText: '',
  }

  // This is run ONCE when the component first
  // is put on the page. Perfect spot to fetch some pets
  // componentDidMount() {
  //   fetch('https://sdg-tamagotchi.herokuapp.com/Pets')
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(petsFromTheApi => {
  //       this.setState({ pets: petsFromTheApi })
  //     })
  // }

  // This is run ONCE when the component first
  // is put on the page. Perfect spot to fetch some pets
  async componentDidMount() {
    const response = await fetch('https://sdg-tamagotchi.herokuapp.com/Pets')

    const petsFromTheApi = await response.json()

    this.setState({ pets: petsFromTheApi })
  }

  handleFilterTextChange = event => {
    const value = event.target.value

    this.setState({ filterText: value })
  }

  render() {
    // Destructure state to a few local variables
    const { pets, filterText } = this.state

    const filteredListOfPetsToRender = pets.filter(pet =>
      pet.name.includes(filterText)
    )

    const petsToRender = filteredListOfPetsToRender.map(pet => (
      <Pet
        key={pet.id}
        name={pet.name}
        hungerLevel={pet.hungerLevel}
        happinessLevel={pet.happinessLevel}
      />
    ))

    return (
      <main className="container p-4">
        <div className="jumbotron bg-info text-white-50">
          <h1 className="display-4">Tamagotchi</h1>
          <p className="lead">These are all my pets</p>
        </div>
        <ul className="list-group">
          <li className="list-group-item">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={filterText}
              onChange={this.handleFilterTextChange}
            />
          </li>
          {petsToRender}
        </ul>
      </main>
    )
  }
}

export default App
