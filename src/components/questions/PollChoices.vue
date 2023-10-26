
<template>
  <div class="vue-poll">
    <!--<h3 class="qst" v-html="question"></h3>-->
    <div class="ans-cnt" v-if="!visibleResults">
      <div v-for="(a,index) in calcAnswers" :key="index" :class="{ ans: true, [a.custom_class]: (a.custom_class) }">

        <template v-if="!finalResults">

          <div :class="{ 'ans-no-vote noselect': true, active: a.selected }" @click.prevent="handleVote(a)" :data-choice="index">
            <span class="txt" v-html="a.text"></span>
          </div>
        </template>
        <template v-else>
          <div class="ans-voted final">
            <span v-if="a.percent" class="percent" v-text="a.percent"></span>
            <span class="txt" v-html="a.text"></span>
          </div>
          <span :class="{ bg: true, selected: mostVotes == a.votes }" :style="{ width: a.percent }"></span>
        </template>

      </div>
    </div>
    <div class="votes" v-else>
      <h1 class="title title-with-image">Thank You!</h1>
      <div style="text-align: center;">
        <svg id="Layer_2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93 110"><defs></defs><title>thumbs-up</title><path class="cls-1" d="M32.05,18.66a1.63,1.63,0,0,0-1.32-1.1L26.79,17,25,13.41a1.62,1.62,0,0,0-2.91,0L20.34,17l-3.95.57a1.62,1.62,0,0,0-.9,2.77l2.86,2.79-.68,3.93a1.63,1.63,0,0,0,1.6,1.9,1.59,1.59,0,0,0,.76-.19l3.53-1.86,3.54,1.86a1.62,1.62,0,0,0,2.35-1.71l-.67-3.93,2.85-2.79A1.62,1.62,0,0,0,32.05,18.66Z"/><path class="cls-2" d="M30.73,17.56h-.08L26.18,22a1,1,0,0,0-.28.87L27,28.69l.15.07a1.62,1.62,0,0,0,2.35-1.71l-.67-3.93,2.86-2.79a1.62,1.62,0,0,0-.91-2.77Z"/><path class="cls-1" d="M50.32,12.3A1.62,1.62,0,0,0,49,11.19l-3.94-.57L43.29,7a1.62,1.62,0,0,0-2.91,0l-1.77,3.58-4,.57a1.63,1.63,0,0,0-.9,2.77l2.86,2.79-.68,3.93a1.64,1.64,0,0,0,.65,1.59,1.6,1.6,0,0,0,1.71.12l3.53-1.85,3.53,1.85a1.59,1.59,0,0,0,.76.19,1.62,1.62,0,0,0,1.6-1.9l-.67-3.93L49.91,14A1.62,1.62,0,0,0,50.32,12.3Z"/><path class="cls-2" d="M47.08,22.27a1.62,1.62,0,0,0,.64-1.59l-.67-3.93L49.91,14A1.62,1.62,0,0,0,49,11.19h0l-4.52,4.4a1,1,0,0,0-.28.87L45,21.21l.2,1.09.17.09a1.59,1.59,0,0,0,.76.19A1.62,1.62,0,0,0,47.08,22.27Z"/><path class="cls-1" d="M68.55,18.66a1.6,1.6,0,0,0-1.31-1.1L63.29,17l-1.76-3.58a1.63,1.63,0,0,0-2.92,0L56.85,17l-4,.57a1.62,1.62,0,0,0-.9,2.77l2.85,2.79-.67,3.93a1.6,1.6,0,0,0,.65,1.59,1.62,1.62,0,0,0,1.71.12l3.53-1.86,3.53,1.86a1.59,1.59,0,0,0,.76.19,1.66,1.66,0,0,0,1-.31A1.62,1.62,0,0,0,66,27.05l-.68-3.93,2.86-2.79A1.61,1.61,0,0,0,68.55,18.66Z"/><path class="cls-2" d="M68.55,18.66a1.6,1.6,0,0,0-1.31-1.1h-.07L62.69,22a1,1,0,0,0-.28.87l1,5.81.24.13a1.59,1.59,0,0,0,.76.19,1.66,1.66,0,0,0,1-.31A1.62,1.62,0,0,0,66,27.05l-.68-3.93,2.86-2.79A1.61,1.61,0,0,0,68.55,18.66Z"/><path class="cls-3" d="M76.82,70A35.79,35.79,0,0,1,5.57,74.89,36.18,36.18,0,0,1,5.23,70a35.8,35.8,0,0,1,71.59,0Z"/><path class="cls-4" d="M41,34.18a36.61,36.61,0,0,0-5.57.43,35.8,35.8,0,0,1,0,70.73,36.38,36.38,0,0,0,5.56.43,35.8,35.8,0,0,0,0-71.59Z"/><path class="cls-5" d="M81.29,67.33,60.85,80.86a7,7,0,0,1-4.94,1.08A7,7,0,0,0,51,83l-2.73,1.82L32.9,62.24,36.66,46a17.08,17.08,0,0,0,.43-3.82,16.91,16.91,0,0,0-2.82-9.36,4.06,4.06,0,0,1,6.2-5.15L42.91,30a26.07,26.07,0,0,1,6.28,9.63l1.32,3.56,13.6-9a4.63,4.63,0,0,1,6.49,1.42A4.7,4.7,0,0,1,69.15,42a0,0,0,0,0,0,.06,0,0,0,0,0,.06,0,4.56,4.56,0,0,1,1.66-.31,4.75,4.75,0,0,1,2.53.74,4.67,4.67,0,0,1,2,4.8,4.73,4.73,0,0,1-1.94,2.93.1.1,0,0,0,0,.14h0a.12.12,0,0,0,.14,0,4.71,4.71,0,0,1,1.12-.14,5,5,0,0,1,2.62.76,4.62,4.62,0,0,1,0,7.75.91.91,0,0,1-.16.11.07.07,0,0,0,0,.09s0,0,0,0a.06.06,0,0,0,.09,0,4.55,4.55,0,0,1,3.93.51A4.77,4.77,0,0,1,82.6,60.9,4.64,4.64,0,0,1,81.29,67.33Z"/><path class="cls-1" d="M48.41,89.1l-8.62,5.71-12.45,8.25A35.85,35.85,0,0,1,5.57,74.89L20,65.33l8.79-5.83a2.21,2.21,0,0,1,3.05.62L49,86.05A2.19,2.19,0,0,1,48.41,89.1Z"/><path class="cls-2" d="M48.41,89.1l-8.62,5.71L20,65.33l8.79-5.83a2.21,2.21,0,0,1,3.05.62L49,86.05A2.19,2.19,0,0,1,48.41,89.1Z"/><path class="cls-6" d="M73.38,42.54l-6.81,3.64a2.2,2.2,0,0,1-2.81-.63l5.37-3.47a0,0,0,0,0,.06,0,4.56,4.56,0,0,1,1.66-.31A4.75,4.75,0,0,1,73.38,42.54Z"/><path class="cls-6" d="M77.31,51.06l-6.66,3.56A2.2,2.2,0,0,1,67.84,54l5.36-3.47.24-.11a.1.1,0,0,0,.13,0,4.71,4.71,0,0,1,1.12-.14A5,5,0,0,1,77.31,51.06Z"/><path class="cls-6" d="M81.21,59.53l-5.86,3.13A2.2,2.2,0,0,1,72.54,62l4.65-3a.06.06,0,0,0,.09,0A4.55,4.55,0,0,1,81.21,59.53Z"/></svg>
      </div>
    </div>
    <!--<div class="votes" v-if="showTotalVotes && (visibleResults || finalResults)" v-text="totalVotesFormatted + ' votes'"></div>-->

    <template v-if="!finalResults && !visibleResults && multiple && totalSelections > 0">
      <a href="#" @click.prevent="handleMultiple" class="submit" v-text="submitButtonText"></a>
    </template>

  </div>
</template>


<script>
  export default{
    props: {
      answers: {
        type: Array,
        required: true
      },
      showResults: {
        type: Boolean,
        default: false
      },
      showTotalVotes: {
        type: Boolean,
        default: true
      },
      finalResults: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      submitButtonText: {
        type: String,
        default: 'Submit'
      },
      customId: {
        type: Number,
        default: 0
      }
    },
    data(){
      return{
        visibleResults: JSON.parse(this.showResults)
      }
    },
    computed: {
      totalVotes(){
        let totalVotes = 0
        this.answers.filter(a=>{
          if (!isNaN(a.votes) && a.votes > 0)
            totalVotes += parseInt(a.votes)
        })
        return totalVotes
      },
      totalVotesFormatted(){
        return this.totalVotes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      mostVotes(){
        let max = 0
        this.answers.filter(a=>{
          if (!isNaN(a.votes) && a.votes > 0 && a.votes >= max)
            max = a.votes
        })

        return max
      },
      calcAnswers(){

        if (this.totalVotes === 0)
          return this.answers.map(a=>{
            a.percent = '0%'
            return a
          })

        //Calculate percent
        return this.answers.filter(a=>{
          if (!isNaN(a.votes) && a.votes > 0)
            a.percent = ( Math.round( (parseInt(a.votes)/this.totalVotes ) * 100) ) + '%'
          else
            a.percent =  '0%'

          return a
        })
      },
      totalSelections(){
        return this.calcAnswers.filter(a => a.selected).length
      }
    },
    methods: {
      handleMultiple(){

        let arSelected = []
        this.calcAnswers.filter(a=>{
          if (a.selected){
            a.votes++
            arSelected.push({ value: a._key, votes: a.votes })
          }
        })

        this.visibleResults = true

        let obj =  { arSelected: arSelected , totalVotes: this.totalVotes }

        if (this.customId)
          obj.customId = this.customId

        this.$emit('addvote', obj)
      },
      handleVote(a){ //Callback

        //console.log('here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        if (this.multiple){

          if (a.selected === undefined)
            //console.log("Please add 'selected: false' on the answer object")

          a.selected = !a.selected
          return
        }

        a.votes++
        a.selected = true
        this.visibleResults = true

        let obj = { value: a._key, votes: a.votes, totalVotes: this.totalVotes }

        if (this.customId)
          obj.customId = this.customId

        this.$emit('answered', obj)
        this.$store.commit('pauseGame', 'pause');
        this.$store.commit('score', {last_question:this.$store.state.round+1,time:0,false: false,score:0,answer:a.text,question_id:a.id});
      }
    }
  }
</script>
<style>
  #Layer_2
  {
    width: 35%;
  }
  .cls-1{fill:#f7cb4f;}.cls-2{fill:#fbab00;}.cls-3{fill:#937de2;}.cls-4{fill:#7570d6;}.cls-5{fill:#fdd7bd;}.cls-6{fill:#fac5aa;}</style>
<style lang="css">
  .vue-poll{
    font-family: 'Asap', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 1px 20px;
  }

  .vue-poll .noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .vue-poll .qst{
    font-weight: normal;
  }
  .vue-poll .ans-cnt{
    margin: 20px 0;
  }
  .vue-poll .ans-cnt .ans{
    position: relative;
    margin-top: 10px;
  }
  .vue-poll .ans-cnt .ans:first-child{
    margin-top: 0;
  }

  .vue-poll .ans-cnt .ans-no-vote{
    text-align: center;
    /*border: 2px solid #77C7F7;*/
    box-sizing: border-box;
    border-radius: 5px;
    cursor:pointer;
    padding: 5px 0;
    transition: background .2s ease-in-out;
    -webkit-transition: background .2s ease-in-out;
    -moz-transition: background .2s ease-in-out;
  }

  .vue-poll .ans-cnt .ans-no-vote .txt{
    font-size: 1rem;
    transition: color .2s ease-in-out;
    -webkit-transition: color .2s ease-in-out;
    -moz-transition: color .2s ease-in-out;
  }

  .vue-poll .ans-cnt .ans-no-vote.active{
    background: #77C7F7;
  }

  .vue-poll .ans-cnt .ans-no-vote.active .txt{
    color: #fff;
  }

  .vue-poll .ans-cnt .ans-voted{
    padding: 5px 0;
  }

  .vue-poll .ans-cnt .ans-voted .percent,
  .vue-poll .ans-cnt .ans-voted .txt{
    font-size: 1rem;
    position: relative;
    z-index: 1;
  }
  .vue-poll .ans-cnt .ans-voted .percent{
    font-weight: bold;
    min-width: 51px;
    display: inline-block;
    margin:0 10px;
  }

  .vue-poll .ans-cnt .ans-voted.selected .txt:after{
    content:'✔';
    margin-left: 10px;
  }

  .vue-poll .ans-cnt .ans .bg{
    position: absolute;
    width: 0%;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 0;
    background-color: #E1E8ED;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
    -webkit-transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
    -moz-transition: all .3s cubic-bezier(0.5,1.2,.5,1.2);
  }

  .vue-poll .ans-cnt .ans .bg.selected{
    background-color: #77C7F7;
  }

  .vue-poll .votes{
    font-size: 14px;
    color:#8899A6
  }

  .vue-poll .submit{
    display: block;
    text-align: center;
    margin: 0 auto;
    max-width: 80px;
    text-decoration: none;
    background-color: #41b882;
    color:#fff;
    padding: 10px 25px;
    border-radius: 5px;

  }
</style>