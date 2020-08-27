import React, { Component } from 'react'


class UpdateArtistForm extends Component {

  handleFormSubmit = (e) => {
    e.preventDefault()
    var formData = new FormData(this.updateForm);
    var data = {
      name: formData.get('name-input'),
      description: formData.get('description-input'),
      type_id: formData.get('genre-input')
    }
    var { updateArtist, id, setActiveView } = this.props
    updateArtist(id, data)
    setActiveView('artists')
  }

  render() {
    var { name, description, type_id } = this.props

    return (
      <div className="addArtist App">
        <main>
          <h1>Update Artist</h1>
          <form action="" onSubmit={this.handleFormSubmit} ref={(el) => { this.updateForm = el }}>
            <label htmlFor="name-input">Name:</label>
            <input type="text" id="name-input" name="name-input" placeholder="Enter your artist name" defaultValue={name} />

            <label htmlFor="description-input">Description:</label>
            <input type="text" id="description-input" name="description-input" placeholder="Enter your description" defaultValue={description} />

            <label htmlFor="photo">Photo:</label>
            <input type="text" id="photo" name="photo" placeholder="Enter your cover photo" />

            <label htmlFor="genre-input">Genres:</label>

            <select name="genre-input" id="genre-input" defaultValue={type_id}>
              <option >Rock</option>
              <option >Metal</option>
              <option >Acid Jazz</option>
              <option >New Age</option>
              <option >EDM</option>
            </select>

            <button type="submit">Update</button>
          </form>
        </main>
      </div>
    )
  }
}

export default UpdateArtistForm