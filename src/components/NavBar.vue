<template>
    <div class="navbar">
        <div class="app-name">{{ $appName }}</div>
        <button @click.prevent="audio[0].isPlaying ? pause(audio) : play(audio)">
      <svg v-if="!audio[0].isPlaying" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
           width="25" viewBox="0 0 48.824 48.824" style="enable-background:new 0 0 48.824 48.824;"
           xml:space="preserve">
        <g>
            <g>
                <g>
                    <path style="fill:#f3f7ff;" d="M28.043,32.874c-0.238,0-0.475-0.085-0.66-0.249l-4.623-4.07h-5.051c-0.552,0-1-0.449-1-1v-7.2c0-0.552,0.448-1,1-1
                        h4.688l5.078-3.508c0.305-0.211,0.702-0.234,1.032-0.062c0.329,0.173,0.535,0.514,0.535,0.886v15.203
                        c0,0.394-0.229,0.749-0.588,0.911C28.322,32.846,28.182,32.874,28.043,32.874z M18.709,26.553h4.428
                        c0.243,0,0.479,0.09,0.66,0.25l3.246,2.857V18.577l-3.766,2.602c-0.166,0.115-0.365,0.177-0.568,0.177h-4V26.553z"/>
                </g>
            <g>
                    <path style="fill:#f3f7ff;" d="M24.412,48.824C10.951,48.824,0,37.873,0,24.412S10.951,0,24.412,0s24.412,10.951,24.412,24.412
                        S37.873,48.824,24.412,48.824z M24.412,2C12.055,2,2,12.055,2,24.412C2,36.77,12.055,46.824,24.412,46.824
                        c12.357,0,22.412-10.055,22.412-22.412C46.824,12.054,36.77,2,24.412,2z"/>
                </g>
            </g>
        </g>
        </svg>

            <svg v-else="" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                width="25" viewBox="0 0 27.962 27.962" style="enable-background:new 0 0 27.962 27.962;" xml:space="preserve">
        <g>
            <g id="c154_volume">
                <g>
                    <path style="fill:#f3f7ff;" d="M13.982,0C6.259,0,0.001,6.259,0.001,13.979c0,7.723,6.258,13.983,13.981,13.983
                        c7.722,0,13.98-6.261,13.98-13.983C27.962,6.259,21.703,0,13.982,0z M13.982,26.532c-6.934,0-12.551-5.621-12.551-12.553
                        c0-6.931,5.617-12.55,12.551-12.55c6.931,0,12.548,5.619,12.548,12.55C26.529,20.911,20.913,26.532,13.982,26.532z"/>
                </g>
            <path style="fill:#ffffff;" d="M13.823,6.858l-5.398,4.026H5.628v6.229h2.797l5.282,3.917c0,0,0.972,0.812,0.972-0.025
                    c0-0.841,0-13.367,0-14.134C14.679,6.214,13.823,6.858,13.823,6.858z"/>
            <path style="fill:#ffffff;" d="M17.685,9.673c-0.278-0.278-0.728-0.278-1.004,0c-0.278,0.277-0.278,0.728,0,1.004
                    c0.914,0.916,1.368,2.106,1.368,3.305c0,1.203-0.454,2.399-1.368,3.312c-0.278,0.277-0.278,0.729,0,1.007
                    c0.138,0.142,0.32,0.208,0.505,0.208c0.182,0,0.361-0.066,0.499-0.208c1.192-1.191,1.79-2.759,1.786-4.318
                    C19.476,12.424,18.876,10.862,17.685,9.673z"/>
            <path style="fill:#ffffff;" d="M18.605,7.432c-0.274,0.279-0.274,0.729,0,1.008c1.535,1.535,2.305,3.539,2.305,5.55
                    c0,2.021-0.764,4.032-2.305,5.574c-0.276,0.28-0.274,0.729,0,1.008c0.139,0.139,0.325,0.209,0.506,0.209
                    c0.183,0,0.363-0.07,0.503-0.209c1.813-1.817,2.722-4.203,2.72-6.582c0.002-2.372-0.911-4.748-2.72-6.558
                    C19.335,7.154,18.885,7.154,18.605,7.432z"/>
            </g>
        </g>
        </svg>
    </button>
    <button v-if="showLeaveButton || leaderBoardState"  @click="leaveMatch">
      <span class="leave-label">Leave match</span>
      <span class="leave-icon" role="img">
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M215.469 332.802l29.863 29.864L352 256 245.332 149.333l-29.863 29.865 55.469 55.469H64v42.666h205.864l-54.395 55.469zM405.334 64H106.666C83.198 64 64 83.198 64 106.666V192h42.666v-85.333h298.668v298.668H106.666V320H64v85.334C64 428.802 83.198 448 106.666 448h298.668C428.802 448 448 428.802 448 405.334V106.666C448 83.198 428.802 64 405.334 64z"
          />
        </svg>
      </span>
    </button>
    </div>
</template>

<script>
export default{
    computed: {        
        showLeaveButton() {
        return this.$store.state.isGameOver;
        
        },
        leaderBoardState() {
        return this.$store.state.leaderBoard;
    }
    },
    data(){
        return{
            audio:[
            {
                id: 'theme',
                name: 'Progression',
                file: new Audio('/triviasound.mp3'),
                isPlaying: false
            }
            ],
            // appName:"Tuni",
        }
    },
    methods: {
        play (audio) {
            audio[0].isPlaying = true;
            audio[0].file.play();           
        },

        pause (audio) {
            audio[0].isPlaying = false;
            audio[0].file.pause();
        },
    }
    
}


</script>

<style lang = "sass" scoped>
@import "../../src/styles/_variable.sass"
.navbar
  background: $color-purple
  color: $color-white
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0.5rem
  font-weight: 700
  font-size: $font-size-large
  @media screen and (max-width: 374px)
  font-size: $font-size-medium

  

  .leave-label
    font-family: $font-family
    padding-right: 0.25rem

  .leave-icon svg
    display: flex
    height: 1.5em
    fill: $color-white
</style>