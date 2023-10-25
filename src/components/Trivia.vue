<template>
    <div>       
    </div>
    <div class="question-card">        
        <div id="progressBar" v-if="!timer">
            <div :style="{'width' : (currentPercent*100) + '%'}">
                <h3 class="counter" style="font-weight: 600;font-size: 0.6em;">{{nowTime}}</h3>
            </div>
        </div>
        <div class="progress label">{{(round+1)+'/'+questions.length}}</div>
        <div class="question">
            <template >
                <QuestionImage
                :asset="question_image"
                />
                <h1
                class="title"
                :class="{
                    'title-long': decodedQuestion.split('').length > 80,
                    'title-with-image': true
                }"
                >
                {{decodedQuestion}}
                </h1>
            </template>
            <div class="container" v-if="playerClickedCard">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
            </div>

            <!-- <QuestionChoices v-if="multi_choice"
            :countDown="countDown"
            :choices="choices"
            :is-answer-submitted="isAnswerSubmitted"
            @answered="setPlayerClickedCard"
            /> -->
        </div>
    </div>
</template>

<script>
// import { htmlEntity } from '.././htmlEntityMixin';
// import QuestionImage from "./question/QuestionImage";
// import QuestionChoices from "./question/QuestionChoices";
// import {TweenMax,Power0} from 'gsap';
// import PollChoices from "./question/PollChoices";
// import emoji from "./question/emoji";
// import OpenEnded from "./question/OpenEnded";
import axios from 'axios';
import {TweenMax,Power0} from 'gsap';
import QuestionChoices from './questions/QuestionChoices.vue';
import { htmlEntity } from '../../htmlEntityMixin';
import QuestionImage from './questions/QuestionImage.vue';
export default{   
    mixins: [htmlEntity],
    components: {
        QuestionChoices, QuestionImage
    },
    data() {
        return {
        multi_choice:false,
        poll:false,
        emoji:false,
        open:false,
        isModalVisible:false,
        timer:false,
        waiting:false,
        playerClickedCard: false,
        time: 30,
        countDown:30,
        percent:0,
        message:'We have awarded you',
        color: 'red',
        startX:1,
        startY:0,
        currentPercent:1,
        tween:'',
        options: {
            answers: [
            ]
        }
        };
    },  
    mounted(){     
        window.scrollTo(0,0);
        let round = this.$store.getters.round;  
        let question = this.$store.state.questions[round];
        //  console.log(question)
        //  console.log(question.type)
        
        
        if (question.type === 'poll' ||question.type === 'Poll')
        {
            this.timer = true;
            this.poll = true;
            this.options.answers=question.choices;
        }
        if (question.type === 'emoji' ||question.type === 'Emoji')
        {
            this.timer = true;
            this.emoji = true;
        }
        if (question.type === 'Open-ended' ||question.type === 'open_ended')
        {
            this.timer = true;
            this.open = true;
        }
        if (question.type === 'Multi-choice' ||question.type === 'TRUE/FALSE')
        {
            this.multi_choice = true;
            setTimeout(()=>{
                this.start()
            },100);
            this.countDownTimer();
        }

        // this.$store.dispatch("notifyNextQuestion",this.$store.state.questions[round]);
        
    },
    computed: {
        question_id_()
        {
            return this.questions[this.round].id;
        },
        isAnswerSubmitted() {
        if (this.playerClickedCard) {
            // shortcut for a more snappy client experience
            return true;
        }
        return false;
        },
        // Decode HTML entities in question. Based on htmlEntity mixin
        decodedQuestion() {
        return this.decode(this.questions[this.round].question);
        },
        question_image()
        {
            return this.decode(this.questions[this.round].image_url);
        },
        isPaused() {
        return this.$store.state.isPaused;
        },
        mode() {
        return this.$store.getters.mode;
        },
        // Access questions from store
        questions() {
        return this.$store.state.questions;
        },
        choices() {
        return this.questions[this.round].choices;
        },
        // Access round from store
        round() {
        return this.$store.getters.round;
        },
        calc(){
        const [endX, endY] = this.getPieVal(this.$data.currentPercent);
        const largeArcFlag = this.currentPercent > .5 ? 1 : 0;
        const pathData = [
            `M ${this.$data.startX} ${this.startY}`,
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`,
        ].join(' ');
        return pathData;
        },
        nowTime(){
        var vm = this
        return Math.ceil(30*vm.currentPercent)
        }
    },
    methods: {
        addVote(obj){
            //console.log('You voted ' + obj.value + '!');
        },
        countDownTimer() {
        if(this.countDown > 0) {
            setTimeout(() => {
            this.countDown -= 1
            this.countDownTimer()
            }, 1000)
        }
        },
        setPlayerClickedCard() {
        this.playerClickedCard = true;
        this.timer = true;
        const vm = this;
        if (this.open)
        {

            setTimeout(function(){
                vm.$store.commit('playerClickedCard',false);
                vm.$store.commit('setResults',true);
            }, 1500);
        }
        if (this.poll || this.emoji)
        {

            setTimeout(function(){
                vm.$store.commit('playerClickedCard',false);
                vm.$store.commit('setResults',true);
            }, 500);
        }
            if (this.multi_choice) {
                this.tween.kill();

                setTimeout(function () {
                    vm.$store.commit('playerClickedCard', false);
                    vm.$store.commit('setResults', true);
                }, 1500);
            }
            //console.log('length: '+ this.$store.state.questions.length)
            //console.log('round: '+this.round)
            if (this.round >= (this.$store.state.questions.length-1))
            {
                setTimeout(function () {
                    //console.log("when is this firing?")
                    vm.finish();
                },2000);
            }

        },
        results() {
            //this.playerClickedCard = false;
            this.$store.commit('playerClickedCard',false);
            //this.resultsView = false;
            this.$store.commit('setResults',true);
            //console.log('here');
        },
        getPieVal(per){
        const x = Math.cos(2 * Math.PI * per);
        const y = Math.sin(2 * Math.PI * per);
        return [x, y];
        },
        start(){
        this.tween = TweenMax.to(this.$data, this.time, {
            currentPercent : this.$data.percent,
            onComplete:this.complete,
            ease: Power0.easeNone
        });
        },

        complete(){
        this.playerClickedCard = true;
        this.timer = true;
        this.$emit("answered", true);
        let mode = 'playerOne';
        // Pause game state (effects buttons)
        this.$store.commit('pauseGame', 'pause');
        this.$store.commit('styleButtons',"");
        this.$store.commit('score', {last_question:this.$store.state.round+1,milliseconds_remaining:0,time:30,milliseconds_taken:30000,false: false,points_hybrid:0,score:0,answer:"",question_id:this.questions[this.round].id});

        const vm = this;
        //console.log('length: '+ this.$store.state.questions.length)
            //console.log('round: '+this.round)
            if (this.round >= (this.$store.state.questions.length-1))
            {
                //console.log("when is this firing?")
                vm.finish();
            }
        setTimeout(function(){
            vm.$store.commit('setResults',true);
        }, 3000);
        },
        finish()
        {
            let context = this;
            const api = "https://create.tuni.ke/api/challenge/trivia/player/complete";
            const qs = require('qs')
            axios({
                method: 'post',
                url: api,
                data: qs.stringify({
                    'trivia_id': this.$store.state.matchSlug,
                    'player_id': this.$store.state.scores.playerOne.id,
                    'user_id':this.$store.state.user_id,
                    'isp':this.$store.state.isp
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(response => {
                context.$store.commit('FINISH_THE_GAME',  {
                    loading:false,
                    score : response.data.data.points,
                    team_score : response.data.data.team_average,
                    passed : response.data.passed,
                    next :  response.data.next_trivia_link,
                    failed : response.data.failed_message,
                    completed_challenge : response.data.completed_challenge,
                    belongs_to_challenge : response.data.belongs_to_challenge
                })
            })
        },
  }
}

</script>

<style lang="sass" scoped>
@import "../../src/styles/_variable.sass"
.question-card
  flex-grow: 1
  justify-content: center
  height: 100%
  display: grid
  grid-template-rows: min-content  minmax(100px, 450px) 1fr
  width: 100%
  overflow: hidden
  gap: 1rem
  @media screen and (max-height: 1024px)
    grid-template-rows: min-content  minmax(100px, 300px) 1fr
  @media screen and (max-height: 737px)
    grid-template-rows: min-content minmax(100px, 250px) 1fr
  @media screen and (max-height: 569px)
    grid-template-rows: min-content  minmax(100px, 200px) 1fr

.progress
  margin-top: 10px
.question
  display: grid
  grid-template-rows: 1fr min-content
  padding: 0 0.5rem

.title
  font-size: 2.5rem
  min-width: 375px
  font-weight: bold
  text-align: center
  margin: auto
  padding-top: 1rem

.title-long
  font-size: 1rem

.title-with-image
  font-size: 1.5rem

.question-status
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center

.title
  font-size: $font-size-large
  margin: 0
  padding: 5px
  @media screen and (min-width: 1080px)
    font-size: 2.5rem

.confirmation-squizzy
  max-height: 150px
  margin-top: -0.5rem

#label
  display: grid
  justify-items: center
  width: 90%
  margin: 10px auto
  height: 22px

#progressBar
  width: 100%
  height: 8px
  position: absolute
  background-color: $color-white

#progressBar div
  height: 100%
  text-align: right
  padding: 0 10px
  line-height: 8px /* same as #progressBar height if we want text middle aligned */
  width: 0
  background-color: $color-red
  box-sizing: border-box

.counter
  /*position: absolute*/
  color: white
  font-weight: 400
  font-size: 1em

.label
  display: flex
  align-items: center
  justify-content: center

// Colors variables
$primary: #4285F4

// blue
$success: #34A853

// green
$danger: #EA4335

// red
$warning: #FBBC05

// yellow

// Container and shapes dimentions
$containerDimentions: 30px
$shapeDimentions: 10px

//shape translate amount
$amount: 20px

html, body
  margin: 0
  width: 100%
  height: 100%
  background-color: #03002E

body
  display: flex
  justify-content: center
  align-items: center

*
  box-sizing: border-box

//colors

.container
  position: absolute
  top: 50%
  left: 50%
  z-index: 999
  width: $containerDimentions
  height: $containerDimentions
  border-radius: $containerDimentions / 2
  animation: rotation 1s infinite

  .shape
    position: absolute
    width: $shapeDimentions
    height: $shapeDimentions
    border-radius: $shapeDimentions / 2

    &.shape-1
      left: 0
      background-color: $primary

    &.shape-2
      right: 0
      background-color: $success

    &.shape-3
      bottom: 0
      background-color: $warning

    &.shape-4
      bottom: 0
      right: 0
      background-color: $danger

  @for $i from 1 through 4
    .shape-#{$i}
      animation: shape#{$i} 0.5s infinite alternate

@keyframes rotation
  from
    transform: rotate(0deg)

  to
    transform: rotate(360deg)

=shapeTranslate($index, $tx, $ty)
  @keyframes shape#{$index}
    from
      transform: translate(0, 0)

    to
      transform: translate($tx, $ty)

+shapeTranslate(1, $amount, $amount)
+shapeTranslate(2, -$amount, $amount)
+shapeTranslate(3, $amount, -$amount)
+shapeTranslate(4, -$amount, -$amount)
</style>