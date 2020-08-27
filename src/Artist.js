import React, { Component } from 'react'
import filler from './filler.svg'


class Artist extends Component {

    handleUpdateClick = () => {
      var {setActiveView, setArtistUpdate, id} = this.props
      setActiveView('updateArtist')
      setArtistUpdate(id)
  }

  handleTrashClick = () => {
    var {deleteArtist,id} = this.props
    deleteArtist(id);
}

  render() {
    var { name, description, photo, type_id } = this.props
    var newClassName = 'genre ' + type_id.toString().replace(/\s+/g, '-').toLowerCase()

    return (
      <div className="artist">
        <img src={photo ? photo : filler} alt="The Artist" />
        <h1>{name}</h1>
        <hr />
        <p>{description}</p>
        <footer>
          <div className="icons">
            <i onClick={this.handleUpdateClick} className="fas fa-edit"></i>
            <i onClick={this.handleTrashClick} className="far fa-trash-alt"></i>
          </div>
          <button className={newClassName}>{type_id}</button>
        </footer>
      </div>
    )
  }
}

export default Artist