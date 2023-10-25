<template>
    <div class="question-choices" :data-grid="choices.length">
       <ChoiceCard 
       v-for="(choice, index) in choices"
      :key="choice._key"
      :text="choice.text"
      :index="index"
      :selectedChoice="selectedChoice === choice._key"
      @change="selectAnswer(choice)"
      :class="{
        disabled: isAnswerSubmitted,
        'selected-answer':
          selectedChoice === choice._key || choiceIsSelected(choice._key)
      }"
      :answerClass="choice.classes"
      :disabled="isAnswerSubmitted"
       /> 
       <StarPower/>
    </div>
</template>

<script>
import ChoiceCard from './ChoiceCard.vue';
import StarPower from '../StarPower.vue'

export default{

    components: {
        ChoiceCard, StarPower
    },
    props: {
        countDown:{
        type: Number,
        default: 1
        },
        isAnswerSubmitted: {
        type: Boolean,
        default: false
        },
        choices: {
        type: Array,
        required: true
        }
    },
    data() {
        return {
        selectedChoice: null,
        s:10,
        ms:30000,
        i: 1,
        milliseconds_remaining_at_answer:0,
        milliseconds_to_answer:0,
        seconds_at_answer:0
        };
    },
    mounted()
    {
        this.setDate();
    },
    computed:{
    points()
    {
      return Math.round((this.ms/30));
    },
    },
    methods: {
    finalScores(correct)
    {
        // this.milliseconds_to_answer =(30000-msta);
        // this.milliseconds_remaining_at_answer = msta;
        // this.seconds_at_answer=sta;
        let points;
        let points_hybrid;
        let _msremaining;
        let _mstaken;
        let _timeTaken;
        if (correct)
        {
        points = 1000+Math.round((this.milliseconds_remaining_at_answer/30));
        points_hybrid = Math.round(1000+(1-(this.milliseconds_to_answer/30000/2))*1000);//[1-(r/q/2)]p
        _msremaining =this.milliseconds_remaining_at_answer;
        _mstaken = this.milliseconds_to_answer;
        _timeTaken = this.milliseconds_to_answer/1000

        }else
        {
        points = 0;
        points_hybrid = 0;
        _msremaining =this.milliseconds_remaining_at_answer;
        _mstaken = this.milliseconds_to_answer;
        _timeTaken = this.milliseconds_to_answer/1000

        }

        return {'points':points,'points_hybrid':points_hybrid,'msremaining':_msremaining,'mstaken':_mstaken,'_timeTaken':_timeTaken};
    },
    setDate(){
        this.isZero(this.ms);
        setTimeout(()=>{
            this.setDate()
        },10);
        },
        is_int(value){
        if((parseFloat(value/100) === parseInt(value/100)) && !isNaN(value)){
            i++;
            this.s-= 1;
        } else {
            i++;
        }
        },
        isZero(value){
        if(value === 0){
            this.ms = 0;
        }
        else{
            this.ms -= 10;
        }
        },
        // Resolve answer
        selectAnswer(choice) {
        let msta = this.ms;
        let sta = this.countDown;

        this.milliseconds_to_answer =(30000-msta);
        this.milliseconds_remaining_at_answer = msta;
        this.seconds_at_answer=sta;

        // Apply button styles for correct / incorrect
        this.$store.commit('styleButtons',choice.text);
        this.selectedChoice = choice._key;
        this.$emit("answered", true);
        // Pause game state (effects buttons)
        this.$store.commit('pauseGame', 'pause');
        // Close About menu if open
        if (this.aboutShow) {
            this.$store.commit('aboutToggle');
        }
        // Check mode for payload
        let mode = 'playerOne';
        // Check for correct answer and score

        if (choice.answer) {
            let scoreF = this.finalScores(true);
            // Score correctly
            this.$store.commit('score', {last_question:this.$store.state.round+1,milliseconds_remaining:scoreF.msremaining,time:scoreF._timeTaken,milliseconds_taken:scoreF.mstaken,true: true,points_hybrid:scoreF.points_hybrid,score:scoreF.points,answer:choice.text,question_id:choice.id});
            // Call down the stars!
            this.$store.dispatch('starPower');

            if (this.$store.getters.round == 63)
            {
            this.$notify({
                group: 'foo',
                duration:4000,
                type: 'success',
                title: 'Congratulations!',
                text: "We've awarded you ksh. 5 airtime!"
            });
            }
        } else {
            // Score incorrectly
            let scoreF = this.finalScores(false);
            this.$store.commit('score', {last_question:this.$store.state.round+1,milliseconds_remaining:scoreF.msremaining,time:scoreF._timeTaken,milliseconds_taken:scoreF.mstaken,false: false,points_hybrid:0,score:0,answer:choice.text,question_id:choice.id});
        }
        /* if (this.$store.getters.round == 'mary')
            {
                const api = "https://client.gig.co.ke/api/send/sms";
                const axios = require('axios')
                const str = this.$store.state.player.phone;
                var bodyFormData = new FormData();
                bodyFormData.set('client_id', '1');
                bodyFormData.set('message', 'Bonga points message goes here');
                bodyFormData.set('tonumbers', '254'+str.substring(1));
                bodyFormData.set('smsname', 'GIG');
                axios({
                    method: 'post',
                    url: api,
                    data: bodyFormData,
                    headers: {'Content-Type': 'multipart/form-data' }
                })

                this.$notify({
                    group: 'foo',
                    duration:4000,
                    type: 'success',
                    title: 'Notification',
                    text: "Hi! We've sent you a message with more information on Bonga points!"
                });
            }
        if (this.$store.getters.round === 'mary')
        {
            const api = "https://create.tuni.ke/api/challenge/trivia/phonenumber/reward/airtime";
            const qs = require('qs')
            const axios = require('axios')
            axios({
            method: 'post',
            url: api,
            data: qs.stringify({
                'phonenumber': this.$store.state.player.phone,
                'trivia_id': this.$store.state.matchSlug,
                'amount': 5,
                'name': this.$store.state.player.name
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
            })
        }*/

        // Check if game is over
        this.$store.commit('isGameOver');

        },
        choiceIsSelected(choiceKey) {
        if (this.selectedChoice) {
            // shortcut for a more snappy client experience
            return this.selectedChoice === choiceKey;
        }
        }
    }
}
</script>

<style lang="sass" scoped>
.question-choices
  display: grid
  grid-template-columns: 1fr 1fr
  grid-template-rows: 1fr 1fr
  gap: 0.5rem
  padding: 1rem
  overflow: scroll
  height: 60%
  //height: 235px

.question-choices[data-grid="2"] .choice-card
  grid-row: 1 / -1

.question-choices[data-grid="3"] .choice-card:last-child
  grid-column: 1 / -1
</style>