<template lang="html">
    <div  v-if="show">
      <i
      v-for="star in quantity"
      :key="star"
      class="material-icons star">star</i>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        quantity: 10,
      }
    },
    computed: {
      show() {
        return this.$store.state.starPower;
      }
    }
  }
  </script>
  
  <style lang="css" scoped>
  @import url( 'https://fonts.googleapis.com/icon?family=Material+Icons');
  
  .star {
    color: #FDD835;
    position: absolute;
  }
  .star:nth-child(1) {
    animation: shoot 1.1s ease-in-out forwards;
    font-size: 8em;
    position: absolute;
    top: 1vh;
    right: 8vw;
    bottom: 1vh;
    left: 6vw;
    z-index: 1000;
  }
  .star:nth-child(2) {
    animation: shoot 1.3s ease-in-out forwards;
    font-size: 2em;
    position: absolute;
    top: 5vh;
    right: 4vw;
    bottom: 4vh;
    left: 4vw;
    z-index: 1000;
  }
  .star:nth-child(3) {
    animation: shoot 1.2s ease-in-out forwards;
    font-size: 6em;
    position: absolute;
    top: 6vh;
    right: 10vw;
    bottom: 1vh;
    left: 3vw;
    z-index: 1000;
  }
  .star:nth-child(4) {
    animation: shoot 1.1s ease-in-out forwards;
    font-size: 3em;
    position: absolute;
    top: 9vh;
    right: 2vw;
    bottom: 6vh;
    left: 2vw;
    z-index: 1000;
  }
  .star:nth-child(5) {
    animation: shoot 1s ease-in-out forwards;
    font-size: 1em;
    position: absolute;
    top: 2vh;
    right: 9vw;
    bottom: 9vh;
    left: 3vw;
    z-index: 1000;
  }
  .star:nth-child(6) {
    animation: shoot 1.1s ease-in-out forwards;
    font-size: 5em;
    position: absolute;
    top: 5vh;
    right: 10vw;
    bottom: 8vh;
    left: 6vw;
    z-index: 1000;
  }
  .star:nth-child(7) {
    animation: shoot 1.2s ease-in-out forwards;
    font-size: 2em;
    position: absolute;
    top: 5vh;
    right: 6vw;
    bottom: 5vh;
    left: 1vw;
    z-index: 1000;
  }
  .star:nth-child(8) {
    animation: shoot 1.3s ease-in-out forwards;
    font-size: 3em;
    position: absolute;
    top: 8vh;
    right: 3vw;
    bottom: 5vh;
    left: 8vw;
    z-index: 1000;
  }
  .star:nth-child(9) {
    animation: shoot 1.4s ease-in-out forwards;
    font-size: 7em;
    position: absolute;
    top: 1vh;
    right: 6vw;
    bottom: 1vh;
    left: 10vw;
    z-index: 1000;
  }
  .star:nth-child(10) {
    animation: shoot 1.5s ease-in-out forwards;
    font-size: 4em;
    position: absolute;
    top: 2vh;
    right: 6vw;
    bottom: 4vh;
    left: 3vw;
    z-index: 1000;
  }
  
  @keyframes shoot {
    0% {
      transform: rotate(0) translate3d(-90vw, 100vh, 0);
    }
    25% {
      transform: rotate(90deg) translate3d(10vw, 70vh, 0);
    }
    40% {
      transform: rotate(0deg) translate3d(10vw, 70vh, 0);
    }
    100% {
      transform: rotate(-10deg) translate3d(120vw, 0, 0);
    }
  }
  </style>
  