<template>
    <div class="app">
      <VueFeedbackReaction :labels="['Bad','Poor','Average','Good','Excellent']" emojiWidth="50" emojiHeight="50" v-model="feedback" />
      <div class="view-tracker" style="text-align:center;margin-top:45px;">
        <button
            style="background-color: rgb(251, 176, 59);
    border-radius: 50px;
    color: #F9FAFF;
    padding: 0;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    flex-direction: column;
    max-width: 10rem;
    width: 100%;
    padding: 0.5rem 1rem;
    border: 0;
    font: inherit;
    font-weight: 600;
    text-transform: uppercase;
    transition: transform 100ms linear;
    border: 1px solid transparent;max-width: 10rem;margin:auto;background-color: #fbb03b;"
            title="Submit Answer"
            @click.prevent="submitAnswer"
        >Continue</button>
      </div>
    </div>
  </template>



<script>
import { VueFeedbackReaction } from 'vue-feedback-reaction';

export default {
  name: 'demo',
  components: {
    VueFeedbackReaction
  },
  props:{
    question_id:{
      type: Number,
      required: true
    }
  },
  data: () => ({
    feedback: ''
  }),
  methods:{
    submitAnswer(){
      this.$emit('answered',true);
      this.$store.commit('pauseGame', 'pause');
      this.$store.commit('score', {last_question:this.$store.state.round+1,time:0,false: false,score:0,answer:this.feedback,question_id:this.question_id});
    }
  }
};
</script>