'use strict';

let config = {
  'Ponto de Taxi Praça': {
    model: 'taxi',
    engine: false,
    fuel: 100,
    dirtyLevel: 0,
    plate: "TAXI",
    color: [[0,0,0],[255,255,0]],
    heading: 70,
    positions: [
      new mp.Vector3(219.4935302734375, -852.3583984375, 29.86185646057129),
      new mp.Vector3(211.6914825439453, -849.3311767578125, 30.329797744750977),
      new mp.Vector3(202.1416778564453, -845.71435546875, 30.571487426757812)

    ]
  },
  'Ponto de Taxi Grand Senora': {
    model: 'taxi',
    engine: false,
    fuel: 100,
    dirtyLevel: 0,
    plate: "TAXI",
    color: [[0,0,0],[255,255,0]],
    heading: 95,
    positions: [
      new mp.Vector3(1112.3214111328125, 2657.67822265625, 37.99519729614258)
    ]
  },
  'Ponto de Taxi Paleto Bay': {
    model: 'taxi',
    engine: false,
    fuel: 100,
    dirtyLevel: 0,
    plate: "TAXI",
    color: [[0,0,0],[255,255,0]],
    heading: 135,
    positions: [
      new mp.Vector3(-50.921024322509766, 6474.09912109375, 31.259021759033203)
    ]
  }

}

module.exports = config;
