import React, { Component } from 'react'
import View from './View'
import axios from 'axios'
import Update from './UpdateArtist'
import Add from './AddArtist'
import Artist from './Artist'
import './assets/css/style.css'

var urlPrefix = 'http://localhost:4000/api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeView: 'artists',
      artists: [

      ],
      artistToUpdate: {}
    }
  }

  setActiveView = (view) => {
    this.setState({ activeView: view })
  }

  setArtistUpdate = (id) => {
    var foundArtist = this.state.artists.find((artist) => {
      return artist.id === id
    })
    this.setState({ artistToUpdate: foundArtist })
  }

  getArtists = () => {
    axios.get(urlPrefix+'/artists')
      .then(res => {
        this.setState({ artists: res.data })
      })
  }
  
  addArtist = (data) => {
    axios.post(urlPrefix+'/artists/',data)
    .then(res => {
      this.getArtists()
    })
  }
  
  updateArtist = (id, data) => {
    axios.put(urlPrefix + '/artists/'+id,data)
      .then(res => {
        this.getArtists()
      })
  }

  deleteArtist = (id) => {
    axios.delete(urlPrefix + '/artists/'+id)
      .then(res => {
        this.getArtists()
      })
  }

  componentDidMount() {
    this.getArtists()
  }

  render() {

    return (
      <div className="mainPage App">
        <View viewName="artists" activeView={this.state.activeView}>
          <header>
            <div className="logo">
              <img src="/images/logo.svg" alt="The logo" />
            </div>
            <i onClick={() => this.setActiveView('addArtist')} className="fas fa-plus-circle"></i>
          </header>
          <main>
            {
              this.state.artists.map((artist) => {
                var props = {
                  key: artist.id,
                  setActiveView: this.setActiveView,
                  deleteArtist: this.deleteArtist,
                  setArtistUpdate: this.setArtistUpdate,
                  ...artist
                }
                return (<Artist {...props} />)
              })
            }
          </main>
        </View>

        <View viewName="addArtist" activeView={this.state.activeView}>
          <div className="addArtist App">
            <header>
              <div className="logo">
                <img src="/images/logo.svg" alt="" />
              </div>
              <i onClick={() => this.setActiveView('artists')} className="fas fa-times-circle"></i>
            </header>
            {
              (() => {
                var props = {
                  setActiveView: this.setActiveView,
                  addArtist: this.addArtist
                }
                return (
                  <Add {...props}/>
                )
              })()
            }
          </div>
        </View>

        <View viewName="updateArtist" activeView={this.state.activeView}>
          <div className="updateArtist App">
            <header>
              <div className="logo">
                <img src="/images/logo.svg" alt="" />
              </div>
              <i onClick={() => this.setActiveView('artists')} className="fas fa-times-circle"></i>
            </header>
            {
              (() => {
                var props = {
                  ...this.state.artistToUpdate,
                  setActiveView: this.setActiveView,
                  updateArtist: this.updateArtist
                }
                return (
                  <Update {...props} />
                )
              })()
            }
          </div>
        </View>
      </div>
    )
  }
}

export default App
