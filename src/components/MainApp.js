import React, { Component } from 'react';

export default class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: [],
      score: 0
    };
  }

  componentWillMount() {
    const rowCount = 4;
    const columnCount = 4;
    let tiles = [];
    const property = ['red', 'black', 'green', 'blue'];
    const propertyCount = [0, 0, 0, 0];
    for (let i = 0; i < rowCount; i++) {
      tiles = [
          ...tiles,
          {
            id: i,
            columns: []
          }
        ];
        for (let j = 0; j < columnCount; j++) {

          let rand = Math.floor(Math.random() * (property.length));

          while (propertyCount[rand] >= property.length) {
            rand = Math.floor(Math.random() * (property.length));
          }
          propertyCount[rand]++;
          tiles[i].columns = [
            ...tiles[i].columns,
            {
              id: j,
              rowId: i,
              is_clicked: false,
              property: property[rand],
              is_disabled: false
            }
          ];
        }
    }
    this.setState({ tiles });
    console.log(this.state);
  }
  renderColumnTile(tiles) {
    return tiles.map((tileRow) => {
      return (
        <div className="container">
          <div className="row">
            { this.renderRowTile(tileRow) }
          </div>
        </div>
        );
      });
  }
  handleClick(tileRow, tile) {
    let count = 0;
    let { tiles, score } = this.state;
    tiles.map(eachTile => {
      eachTile.columns.map((k => {
        if (k.is_clicked) {
          count++;
        }
      }));
    });
    if (count < 2) {
      tiles[tileRow.id].columns[tile.id].is_clicked = true;
      this.setState({ tiles });
      if (count === 1) {
        setTimeout(() => {
          const dataMatched = [];
          tiles.map(eachTile => {
            eachTile.columns.map((k => {
              if (k.is_clicked) {
                dataMatched.push(k);
              }
              tiles[eachTile.id].columns[k.id].is_clicked = false;
            }));
          });
          if (dataMatched[0].property === dataMatched[1].property) {
            tiles[dataMatched[0].rowId].columns[dataMatched[0].id].is_disabled = true;
            tiles[dataMatched[1].rowId].columns[dataMatched[1].id].is_disabled = true;
            score = score + 20;
          }
          this.setState({ tiles, score });
        }, 1000);
      }
    }
  }
  renderRowTile(tileRow) {
    return tileRow.columns.map((tile) => {
        return (
            <div 
              className={`info-card ${tile.is_disabled ? 'clicked' : tile.is_clicked ? 'clicked' : ''}`}
              key={tile.id}
              onClick={() => this.handleClick(tileRow, tile)}
            >
                <div 
                  className='front'
                >
                 <p>click</p>
                </div>
                <div className={`back ${tile.property}`}>
                  <p>
                    { tile.is_disabled ? 'selected' : tile.property }
                  </p>
                  
                </div>
            </div>
        
        );
    });
  }
  setScore() {
    return (
      <div>{`Score: ${this.state.score}`}</div>
      );
  }
  render() {
    return (
        <div>
          {this.renderColumnTile(this.state.tiles)}
          {this.setScore()}
        </div>

      );
    }
}
