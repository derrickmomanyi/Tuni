<template>
    <div>
        <h2>This is the trivia page</h2>
    </div>
    <div class="question-card">        
        <!-- <div id="progressBar" v-if="!timer">
            <div :style="{'width' : (currentPercent*100) + '%'}">
                <h3 class="counter" style="font-weight: 600;font-size: 0.6em;">{{nowTime}}</h3>
            </div>
        </div> -->
        <!-- <div class="progress label">{{(round+1)+'/'+questions.length}}</div> -->
        <!-- <div class="question">
            <template >
                <question-image
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
        </div> -->
    </div>
</template>

<script>
export default{   

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
        time: 30000000000000000000,
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
    let question = this.$store.state.questions;
    console.log(question);
//     if (question.type === 'Multi-choice' ||question.type === 'TRUE/FALSE')
//       {
//           this.multi_choice = true;
//          setTimeout(()=>{
//               this.start()
//           },100);
//           this.countDownTimer();
//       }
//   }
    
}
}

</script>

<style lang="scss" scoped>

</style>