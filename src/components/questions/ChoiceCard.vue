<template>
    <div class="choice-card choice" :class="{
          'choice-others-mine':incorrect&&disabled&&selectedChoice,
          'choice-correct-mine':correct&&disabled&&selectedChoice,
          'choice-others':incorrect&&disabled,
          'choice-correct':correct&&disabled}"
         :data-choice="index">
      <div class="card">
        <div class="inner">
          <input
            class="choice-radio"
            type="radio"
            name="choices"
            :aria-labelledby="`choice-label-${decode(text)}`"
            @change="$emit('change', $event)"
            @click='tick.play()'
            :disabled="disabled"
          />
          <div class="symbol" v-if="incorrect && disabled">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 180.607 180.607" style="enable-background:new 0 0 180.607 180.607;" xml:space="preserve">
  <path d="M180.607,10.607l-79.696,79.697l79.696,79.697L170,180.607l-79.696-79.696l-79.696,79.696L0,170.001l79.696-79.697L0,10.607
      L10.607,0.001l79.696,79.696L170,0.001L180.607,10.607z" />
  </svg>
          </div>
          <div class="symbol" v-if="correct && disabled">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 375.147 375.147" style="enable-background:new 0 0 375.147 375.147;" xml:space="preserve">
  <g>
      <g>
          <polygon points="344.96,44.48 119.147,270.293 30.187,181.333 0,211.52 119.147,330.667 375.147,74.667 " />
      </g>
  </g>
  
  </svg>
  
          </div>
          <h2 class="choice-title" :id="`choice-label-${decode(text)}`">{{ decode(text) }}</h2>
        </div>
      </div>
    </div>
  </template>

<script>
import { htmlEntity } from '../../../htmlEntityMixin';
export default{
    mixins: [htmlEntity],    
  props: {
    answerClass:{
        type: Object,
        required: true
        },
        selectedChoice: {
        type: Boolean,
        required: true
        },
        index: {
        type: Number,
        required: true
        },
        text: {
        type: String,
        required: true
        },
        disabled: {
        type: Boolean,
        default: false
        }
    },
    data()
    {
        return{
            tick: new Audio('https://dl.getdropbox.com/s/kgqqnei0yhv3r8n/219069__annabloom__click1.wav')
        }
    },
    computed: {
        correct() {
        let m = this.answerClass;
        return m.correct;
        },
        incorrect() {
        let m =  this.answerClass;
        return m.incorrect;
        },
        icon() {
        const icons = ["Circle", "Star", "Triangle", "Square"];        
        return () => import(`../symbols/${icons[this.index]}Icon.vue`)
        } 
    }
}
</script>

<style lang="sass" scoped>
@import '../../styles/_variable'
@import '../../styles/symbols.sass'
.choice-others
  .card, .column
    background: $color-white !important
    color: $color-red
    border: $color-red solid 1.5px
  .symbol
    fill: $color-red
  .symbol svg
    height: 1rem
    fill: $color-red

.choice-correct
  .card, .column
    background: $color-greens !important
    color: $color-white !important
    border: $color-greens solid 1.5px
  .symbol
    fill: $color-white !important
  .symbol svg
    height: 1rem
    fill: $color-white

.choice-others-mine
  .card, .column
    background: $color-red !important
    color: $color-white !important

  .symbol
    fill: $color-white !important
  .symbol svg
    height: 1rem
    fill: $color-white !important

.choice-card
  position: relative

.card
  border-radius: 25px 45px
  /*border-radius: $border-radius
  color: $color-white
  padding: 1rem
  opacity: 1
  transition: all 0.4s ease-in-out

.inner, .card
  display: flex
  align-items: center
  justify-content: center
  height: 100%

.choice-radio
  position: absolute
  top: 0
  bottom: 0
  right: 0
  left: 0
  height: 100%
  width: 100%
  opacity: 0

.choice-radio:disabled
  pointer-events: none

.disabled
  pointer-events: none
  opacity: 1
  //opacity: 0.4
  &:not(.selected-answer)
    transition: all 0.4s ease-in-out
    opacity: 1

.choice-title
  flex-grow: 1
  font-size: 1rem
  font-weight: normal
  text-align: center
  @media screen and (max-width: 320px)
    font-size: $font-size-medium
  @media screen and (min-width: 1080px)
    font-size: 2.5rem

// Symbol representing choice
.symbol
  position: absolute
  top: 0
  left: 0
  z-index: 999
  padding: 0.5rem
</style>