// state = {genres: {Action: 0, Adventure: 0, Animation: 1}, rerelease: {0:0, 1:0}}

// GenreStateSum = Object.values(state.genres).reduce((acc, current) => (acc + current), 0)

var brushingFilter = {}

const state = {
  genres: {
    Action: 0,
    Adventure: 0,
    Animation: 0,
    Biography: 0,
    Comedy: 0,
    Crime: 0,
    Drama: 0,
    Family: 0,
    Fantasy: 0,
    History: 0,
    Horror: 0,
    Mystery: 0,
    Romance: 0,
    "Sci-Fi": 0,
    Sport: 0,
    Thriller: 0,
    "Music/Musical": 0,
  },
  genres2: {
    Action2: 0,
    Adventure2: 0,
    Animation2: 0,
    Biography2: 0,
    Comedy2: 0,
    Crime2: 0,
    Drama2: 0,
    Family2: 0,
    Fantasy2: 0,
    History2: 0,
    Horror2: 0,
    Mystery2: 0,
    Romance2: 0,
    "Sci-Fi2": 0,
    Sport2: 0,
    Thriller2: 0,
    "Music/Musical2": 0,
  },
  rereleased: 0,
}

function handleClick(e) {
  if (e.target.id === "rereleased") {
    if (state.rereleased === 0) {
      state.rereleased = 1
    } else {
      state.rereleased = 0
    }
  } else if (!e.target.id.includes("2")) {
    if (state.genres[e.target.id] === 0) {
      state.genres[e.target.id] = 1
    } else {
      state.genres[e.target.id] = 0
    }
  } else {
    if (state.genres2[e.target.id] === 0) {
      state.genres2[e.target.id] = 1
    } else {
      state.genres2[e.target.id] = 0
    }
  }
  localStorage.setItem("state", JSON.stringify(state))
  brushingFilter = {}
  updateData1()
  updateData2()
  updateData3()
}

function updateTwoData() {
  updateData2()
  updateData3()
}

// const clock = document.querySelector(".clock");
// const date = new Date()

// function clo() {
//   clock.innerHTML = `${date.getUTCFullYear()}년 ${date.getUTCMonth()}월 ${date.getUTCDay()}일`
// }

// setInterval(clo, 1000)
