import { createStore } from 'vuex'
import axios from 'axios';
import {nanoid} from "nanoid";
import { cryptoHelpers } from '../../cryptoHelpers';
import { slowAES } from '../../aes';

const store = createStore({
    state: {
        player: false, // object
        players:[],
        question_id:0,
        network_error:false,
        team_mode:0,
        challenge_id:0,
        njugush_video:false,
        isLoading: false, // boolean
        aboutShow: false, // Show or hide About menu
        results: false,
        isOnBreak:false,
        mystery:false,
        checkout:false,
        user_id:'',
        trivia:[],
        playerClickedCard:false,
        categories: [], // trivia categories
        currentCategory: { // chosen category
          name: 'Random',
          id: 9,
        },
        currentGameView: 'game-play',
        currentView: 'app-intro',
        questions: [], // current list of questions in game
        isGameOver: false, // game state
        leaderBoard: false,
        isPaused: false,
        round: 0, // round counter, starts at 0, ends at 9. Linked to display of current question
        scores: {
          playerOne: {
            history: [],
            total: 0,
            id:'',
            team_id:'',
            team_name:'',
            name:'',
            phone:'',
            results:[]
          }
        },
        solo: true, // Game mode, solo or multiplayer?
        starPower: false, // show starPower animation
        username: '',
        matchName:'',
        matchSlug:'',
        isp:false,
        has_game:false,
        has_spin:false,
        has_video:false,
        mystery_boxes:{
          'has_mystery_boxes':false,
          'boxes':''
        },
        playersCount:'',
        flushMessages:false,
        finish_loading:true,
        finish_score:0,
        finish_team_score:0,
        finish_passed:false,
        finish_next:'',
        finish_failed:'',
        finish_completed_challenge:false,
        finish_belongs_to_challenge:'not'
      },
      // ========== GETTERS ============
  getters: {
    playerCount(state) {
      return state.players.length;
    },
    // Get solo or multiplayer
    mode: state => {
      return state.solo;
    },
    round: state => {
      return state.round;
    },
    // Determine player turn
    turn: state => {
      let check = state.round % 2;
      if (check === 0 || state.round === 0) {
        return 'playerOne';
      } else {
        return 'playerTwo';
      }
    },
  },
  // ============ MUTATIONS ===============
  mutations: {
    FINISH_THE_GAME(state,data)
    {
      state.finish_loading=data.loading;
      state.finish_score=data.score;
      state.finish_team_score=data.team_score;
      state.finish_passed=data.passed;
      state.finish_next=data.next;
      state.finish_failed=data.failed;
      state.finish_completed_challenge=data.completed_challenge;
      state.finish_belongs_to_challenge=data.belongs_to_challenge;
    },
    REGISTER_PLAYER(state, player) {
      if (player) {
        state.player = {
          name: player.playerName,
          phone: player.playerPhone,
          round: player.last_question,
          id: player.playerId
        };
      } else {
        state.player = player;
      }
    },
    SET_IS_LOADING(state, status) {
      state.isLoading = status;
    },
    SET_IS_GAME_OVER(state, status) {
      state.isGameOver = !status;
      state.leaderBoard = status;
      state.currentView = 'leader-board';
    },
    // Toggle display of about menu
    setCurrentView:(state, payload) => {
      state.currentView = payload;
    },
    setResults: (state, payload) => {
      state.results = payload;
    },
    setUserId: (state, payload) => {
      state.user_id = payload;
    },
    setCheckout: (state, payload) => {
      state.checkout = payload;
      state.leaderBoard = false;
    },
    setPlayers: (state, payload) => {
      state.players = payload;
    },
    setCurrentPlayer: (state, payload) => {
      state.scores.playerOne.id = payload.id;
      state.scores.playerOne.team_id = payload.team_id;
      state.scores.playerOne.team_name = payload.team_name;
      state.scores.playerOne.name =payload.name;
      state.scores.playerOne.phone =payload.phone;
    },
    addScore: (state,payload) =>{
      state.scores['playerOne'].total += payload;
    },
    matchSlug: (state, payload) => {
      state.matchSlug = payload;
    },
    isp: (state, payload) => {
      state.isp = payload;
    },
    set_trivia: (state, payload) => {
      state.trivia = payload;
    },
    has_game: (state, payload) => {
      state.has_game = payload;
    },
    has_spin: (state, payload) => {
      state.has_spin = payload;
    },
    has_video: (state, payload) => {
      state.has_video = payload;
    },
    has_mystery_boxes: (state, payload) => {
      state.mystery_boxes.has_mystery_boxes = payload.has_mystery_boxes;
      state.mystery_boxes.boxes=payload.mystery_boxes
    },
    matchName: (state, payload) => {
      state.matchName = payload;
    },
    challenge_id: (state, payload) => {
      state.challenge_id = payload;
    },
    njugush_video: (state, payload) => {
      state.njugush_video = payload;
    },
    questions: (state, payload) => {
      state.questions = payload;
    },
    playerCount: (state, payload) =>
    {
      state.playersCount = payload
    },
    playerClickedCard:(state, payload) => {
      state.playerClickedCard = payload;
    },
    // Toggle display of about menu
    aboutToggle: state => {
      state.aboutShow = !state.aboutShow;
    },
    // Set game over and show modal after all questions rounds
    isGameOver: state => {
      if (state.round === (state.questions.length-1)) {
        setTimeout(function(){
          if (state.challenge_id==37)
          {
            state.isGameOver = true;
          }else
          {
            state.isGameOver = false;
          }

          if (state.challenge_id==46)
          {
            state.isGameOver = true;
          }else
          {
            state.isGameOver = false;
          }

          state.leaderBoard = true;
          state.currentView = 'leader-board';

        }, 1500);
      }
    },
    setIsOnBreak: (state, payload=false) => {
      state.isOnBreak = payload;
    },
    setMystery:(state, payload=false) => {
      state.mystery = payload;
    },
    // Next round
    incrementRound: state => {
      state.round += 1;
    },
    // Restart game with default state
    newGame: state => {
      state.leaderBoard = false;
      state.currentCategory.name = 'Random';
      state.currentCategory.id = 9;
      state.playerClickedCard = false;
      state.currentView = 'app-intro';
      state.currentGameView = 'game-play';
      state.solo = true;
      state.flushMessages=false;
    },
    // Pause game state and disable answer buttons after submtting answer
    pauseGame: (state, payload) => {
      if (payload === 'pause') {
        state.isPaused = true;
      } else {
        state.isPaused = false;
      }
    },
    // Reset common default game parameters
    resetGame: (state,payload) => {
      state.leaderBoard = false;
      state.isGameOver = false;
      state.isPaused = false;
      state.questions = [];
      state.round = 0;
      state.isLoading=payload;
      state.player = false;
      state.playerClickedCard = false;
      state.scores.playerOne.total = 0;
      state.scores.playerOne.history = [];
      state.scores.playerOne.results = [];
      state.flushMessages=false;
    },
    // Score after answering question
    score: (state, payload) => {
      //console.log('-------------------------------------start-----------------------------------');
      //console.log(payload);
      //console.log('-------------------------------------end-----------------------------------');
      let context = this;
      let data;
      state.question_id = payload.question_id;
      //let player = payload.mode;
      if (payload.true) {
        state.scores['playerOne'].history.push({
          correct: true,
          incorrect: false,
        });
        //points_hybrid:0,score:0,
        state.scores['playerOne'].total = payload.score;
        data =  {
          'question_id': payload.question_id,
          'trivia_id': state.matchSlug,
          'player_id': state.scores['playerOne'].id,
          'answer': payload.answer,
          'isp':state.isp,
          'current_points':payload.score,
          'points':payload.score,
          'milliseconds_remaining':payload.milliseconds_remaining,
          'milliseconds_taken':payload.milliseconds_taken,
          'points_hybrid':payload.points_hybrid,
          'answer_time': payload.time,
          'last_question':payload.last_question,
          'channel': 'web'
        };
        state.scores['playerOne'].results.push({ _key: nanoid(),_id:state.player.id,score:payload.score ,name:state.player.name, isCorrect: true });
      } else {
        state.scores['playerOne'].history.push({
          correct: false,
          incorrect: true,
        });
        data =  {
          'question_id': payload.question_id,
          'trivia_id': state.matchSlug,
          'player_id': state.scores['playerOne'].id,
          'user_id': state.user_id,
          'answer': payload.answer,
          'isp':state.isp,
          'current_points':payload.score,
          'points':payload.score,
          'milliseconds_remaining':payload.milliseconds_remaining,
          'milliseconds_taken':payload.milliseconds_taken,
          'points_hybrid':payload.points_hybrid,
          'answer_time': payload.time,
          'last_question':payload.last_question,
          'channel': 'web'
        };
        //console.log('-------------------------------------level one start-----------------------------------');
        //console.log(state.scores['playerOne'].total);
        //console.log('-------------------------------------level one end-----------------------------------');
        state.scores['playerOne'].results.push({ _key: nanoid(),_id:state.player.id,score:payload.score ,name:state.player.name, isCorrect: false });

        //console.log('-------------------------------------level two start-----------------------------------');
        //console.log(state.scores['playerOne'].total);
        //console.log('-------------------------------------level two end-----------------------------------');

      }

      const api = "https://create.tuni.ke/api/challenge/trivia/question/answer/create";
      const qs = require('qs')
      axios({
        method: 'post',
        url: api,
        data: qs.stringify(data),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }).then(response => {
        const sortBy = (sortField, direction = "asc") => {
          return (a, b) => {
            if (a[sortField] < b[sortField]) {
              return direction === "asc" ? -1 : 1;
            }
            if (a[sortField] > b[sortField]) {
              return direction === "asc" ? 1 : -1;
            }
            return 0;
          };
        };
        //store.dispatch("viewGame", {'trivia_id':state.matchSlug,'isp':state.isp});
        store.commit("setPlayers",Object.values(response.data.data).sort(sortBy("points", "desc")));
        return response.data.data;
      })
          .catch(function(error) {
            if (!error.response) {
              // network error
              Vue.$confirm({
                title: 'No Internet Connection',
                message: 'Check your network settings and try again.',
                button: {
                  yes: 'OK'
                },
                callback: confirm => {
                  location.reload()
                }
              });
            }  else {
              //console.log(error)
            }
          });
    },
    // Set game mode from Starter.vue
    selectMode: (state, payload) => {
      payload === true ? state.solo = true : state.solo = false;
    },
    // Set current category from Starter.vue
    setCurrentCategory: (state, payload) => {
      state.currentCategory.name = payload.name;
      state.currentCategory.id = payload.id;
    },
    // Set current category from Starter.vue
    setUsername: (state, payload) => {
      state.username = payload;
    },
    // Call starPower
    starPower: (state) => {
      state.starPower = true;
    },
    //call flushMessages
    flushMessages:(state,payload)=>{
      state.flushMessages = payload;
      state.currentView = 'app-intro';
    },
    team_mode:(state,payload)=>{
      state.team_mode = payload;
    },
    startGame: (state) => {
      // Set questions to payload from http request in startGame action
      state.isGameOver = true;
      // Create list of incorrect choices

      ////console.log(state.questions);
      state.questions.forEach(el => {
        el.choices = el.incorrect_answers.reduce((acc, item, index) => {
          ////console.log(item);
          if (el.type == "poll")
          {
            acc.push({
              _key:index,
              id:el.id,
              text: item,
              votes:Math.floor(Math.random() * 100),
              answer: false,
              classes: {
                incorrect: true
              }
            });

          }
          else {
            acc.push({
              _key: index,
              id: el.id,
              text: item,
              answer: false,
              classes: {
                incorrect: true
              }
            });
          }
          return acc;
        }, []);
        // Add correct answer
        if (el.type == "poll")
        {
          el.choices.push({
            _key:4,
            id:el.id,
            text: el.correct_answer,
            answer: false,
            votes:Math.floor(Math.random() * 100),
            classes: {
              incorrect: true,
            }
          });
        }else
        {
          el.choices.push({
            _key:4,
            id:el.id,
            text: el.correct_answer,
            answer: true,
            classes: {
              correct: true,
            }
          });
        }

        // Shuffle choices
        let i = el.choices.length, temp, rand;
        while (0 !== i) {
          rand = Math.floor(Math.random() * i);
          i -= 1;
          temp = el.choices[i];
          el.choices[i] = el.choices[rand];
          el.choices[rand] = temp;
        }
      });
      // Set view to game board
      state.playerClickedCard = false;
      state.currentView = 'app-game-board';
      state.currentGameView = 'game-play';
    },
    // Apply classes, which indicate correct or incorrect, to buttons after
    // submtting answer
    styleButtons: (state,payload) => {
      state.questions[state.round].choices.forEach(el => {
        if (el.answer) {
          if (el.text === payload)
          {
            el.classes = { correct: true,incorrect: false, selected:true}
          }else
          {
            el.classes = { correct: true,incorrect: false, selected:false}
          }
        } else {
          if (el.text === payload)
          {
            el.classes = { incorrect: true,correct: false, selected:true}
          }else
          {
            el.classes = { incorrect: true,correct: false, selected:false}
          }
        }
      });
    }
  }      
      // =============== ACTIONS ===============
      // actions: {
      //   viewGame(context,payload)
      //   {
      //     const api = "https://create.tuni.ke/api/challenge/trivia/view/hidden";
      //     const qs = require('qs');
      //     axios({
      //       method: 'post',
      //       url: api,
      //       data: qs.stringify({
      //         'trivia_id': payload.trivia_id,
      //         'isp':payload.isp,
      //         'player_id':context.state.scores['playerOne'].id
      //       }),
      //       headers: {
      //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      //       }
      //     }).then(response => {
      //       // console.log("response found here");
      //       // console.log(response.data);
      //       return response.data;
      //     })
      //         .then(data => {
      //               if (Object.keys(data.data).length >0){
      //                 if (Object.keys(data.data.quiz).length >0) {
      //                   const sortBy = (sortField, direction = "asc") => {
      //                     return (a, b) => {
      //                       if (a[sortField] < b[sortField]) {
      //                         return direction === "asc" ? -1 : 1;
      //                       }
      //                       if (a[sortField] > b[sortField]) {
      //                         return direction === "asc" ? 1 : -1;
      //                       }
      //                       return 0;
      //                     };
      //                   };
      //                   //slowAES
      //                   let input = data.data.quiz;
      //                   let encKey = "2fVwX6oZVM75fl5BKUtrgJMPOXM";
      //                   let inputSplit = input.split(" ");
      //                   let originalSize = parseInt(inputSplit[0]);
      //                   let iv = cryptoHelpers.toNumbers(inputSplit[1]);
      //                   let cipherIn = cryptoHelpers.toNumbers(inputSplit[2]);
    
      //                   // Set up encryption parameters
      //                   let keyAsNumbers = cryptoHelpers.toNumbers( cryptoHelpers.bin2hex( encKey ) );
    
      //                   let decrypted = slowAES.decrypt(
      //                       cipherIn,
      //                       slowAES.modeOfOperation.CBC,
      //                       keyAsNumbers,
      //                       iv
      //                   );
    
      //                   // Byte-array to text
      //                   let retVal = cryptoHelpers.hex2bin(cryptoHelpers.toHex(decrypted));
      //                   retVal = cryptoHelpers.decode_utf8(retVal);
      //                   retVal = JSON.parse(retVal);
      //                   //
    
      //                   let i = 0;
      //                   let imageArray = new Array();
      //                   imageArray = data.data.images;
      //                   let imageObj = new Image();
      //                   for(i=0; i<=imageArray.length-1; i++) {
      //                     //document.write('<img src="' + imageArray[i] + '" />');// Write to page (uncomment to check images)
      //                     imageObj.src=imageArray[i];
      //                   }
      //                   context.commit("setPlayers",Object.values(data.top_players).sort(sortBy("points", "desc")));
      //                   context.commit('flushMessages', false);
      //                   context.commit('team_mode', data.data.team_mode);
      //                   context.commit('has_game',data.data.has_game);
      //                   context.commit('has_spin',data.data.has_spin);
      //                   context.commit('has_video',data.data.has_slide);
      //                   context.commit('has_mystery_boxes',{'has_mystery_boxes':data.data.has_mystery_boxes,'mystery_boxes':data.data.mystery_boxes});
      //                   context.commit('matchName', data.data.title);
      //                   context.commit('challenge_id', data.data.challenge_id);
      //                   context.commit('playerCount', data.data.players_count);
      //                   context.commit('questions', retVal);
      //                   context.commit('set_trivia', data.data);
      //                   return true;
      //                 }else
      //                 {
      //                   //console.log('no questions');
      //                   context.commit("resetGame",true);
      //                   context.commit('flushMessages', "The match has no questions!");
      //                   return false;
      //                 }
      //               }else
      //               {
      //                 context.commit("resetGame",true);
      //                 context.commit('flushMessages', "The match was not found!");
      //                 return false;
      //               }
    
      //             },error => { // Failed
      //               //go back flushMessages
      //               //console.log(error);
      //               context.commit("resetGame",true);
      //               context.commit('flushMessages', "There was an error fetching the trivia!");
      //               return false;
      //             }
      //         );
      //   },
      //   notifyNextQuestion(context,payload)
      //   {
      //     console.log('random_pay',payload);
      //     const api = "https://create.tuni.ke/api/challenge/trivia/question/next";
      //     const qs = require('qs')
      //     axios({
      //       method: 'post',
      //       url: api,
      //       data: qs.stringify({
      //         'questions': payload,
      //         'team_id':context.state.scores['playerOne'].id,
      //         // 'trivia_id':context.state.scores['playerOne'].paytrivia_id
      //         'trivia_id':payload.trivia_id
      //       }),
      //       headers: {
      //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      //       }
      //     }).then(response => {
      //       //console.log(response);
    
      //     });
      //   },
      //   registerNewPlayer(context,payload) {
      //     context.commit("SET_IS_LOADING", true);
      //     // The registered player
      //     //const ranId = nanoid();
    
      //     /*
      //          insert axios function to register player
      //       */
      //     const api = "https://create.tuni.ke/api/challenge/trivia/player/view";
      //     const qs = require('qs')
      //     axios({
      //       method: 'post',
      //       url: api,
      //       data: qs.stringify({
      //         'player_id': context.state.scores.playerOne.id,
      //         'nickname':payload.name,
      //         'isp':context.state.isp,
      //       }),
      //       headers: {
      //         'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      //       }
      //     }).then(response => {
    
      //       if (response.data.result_code ===1)
      //       {
      //         context.commit('flushMessages', 'Oops! The nickname you provided has already been taken, try another one!');
      //         context.commit("SET_IS_LOADING", false);
      //       }else {
      //         //context.commit('setUserId',response.data.data.creator_id);
      //         if (response.data.belongs_to_challenge === true) {
      //           if (response.data.data.completed === 1) {
      //             context.commit('flushMessages', 'You have completed the challenge, Redirecting you to the results page..!');
      //             context.commit("SET_IS_LOADING", false);
      //             setTimeout(function () {
      //               window.location.href = "https://tuni.fun/challenge/51/results"
      //             }, 3000);
      //           } else {
      //             if (response.data.data.completed === 1) {
      //               context.commit('flushMessages', 'You had completed the trivia, Redirecting you to the next trivia..!');
      //               context.commit("SET_IS_LOADING", false);
      //               setTimeout(function () {
      //                 window.location.href =  "https://tuni.fun/challenge/51/results"
      //               }, 3000);
      //             } else {
      //               context.commit('flushMessages', false);
    
      //               //context.state.scores.playerOne.id = payload.id;
      //               //context.state.scores.playerOne.name =payload.name;
      //               //context.state.scores.playerOne.phone =payload.phone;
      //               context.state.scores.playerOne.total = 0;
      //               context.state.scores.playerOne.history = [];
      //               context.state.scores.playerOne.results = [];
      //               context.state.round = response.data.data.last_question;
      //               context.dispatch('startGame');
      //               const body = {
      //                 playerId: context.state.scores.playerOne.id,
      //                 playerName: payload.name,
      //                 playerPhone: payload.phone,
      //                 last_question: response.data.data.last_question,
      //                 matchSlug: context.state.matchSlug
      //               };
      //               context.commit("REGISTER_PLAYER", body);
      //               context.commit("SET_IS_LOADING", false);
      //             }
      //           }
      //         } else {
      //           if (response.data.data.completed === 1) {
      //             context.commit('flushMessages', 'You had completed the trivia, Redirecting you to the results page..!');
      //             context.commit("SET_IS_LOADING", false);
      //             setTimeout(function () {
      //               if (context.state.team_mode ==1)
      //               {
      //                 window.location.href = "https://tuni.fun/trivia/" + context.state.matchSlug + "/results/team"
    
      //               }else
      //               {
      //                 window.location.href = "https://tuni.fun/trivia/" + context.state.matchSlug + "/results"
    
      //               }
      //             }, 3000);
      //           } else {
      //             context.commit('flushMessages', false);
    
      //             //context.state.scores.playerOne.id = payload.id;
      //             //context.state.scores.playerOne.name =payload.name;
      //             //context.state.scores.playerOne.phone =payload.phone;
      //             context.state.scores.playerOne.total = 0;
      //             context.state.scores.playerOne.history = [];
      //             context.state.scores.playerOne.results = [];
      //             context.state.round = response.data.data.last_question;
      //             context.dispatch('startGame');
      //             const body = {
      //               playerId: context.state.scores.playerOne.id,
      //               playerName: payload.name,
      //               playerPhone: payload.phone,
      //               last_question: response.data.data.last_question,
      //               matchSlug: context.state.matchSlug
      //             };
      //             context.commit("REGISTER_PLAYER", body);
      //             context.commit("SET_IS_LOADING", false);
      //           }
      //         }
      //       }
    
      //       return response.data.data;
      //     })
      //     /*end*/
    
    
      //   },
    
      //   // Call starPower mutation and set delay toggle
      //   starPower(context) {
      //     context.commit('starPower');
      //     let vm = context;
      //     setTimeout(() => {
      //       vm.state.starPower = false;
      //     }, 1600);
      //   },
      //   // Called by Starter.vue.
      //   startGame(context) {
      //     context.state.currentView = 'app-loader';
      //     context.commit('startGame');
    
      //     /*
      //     [{"category":"Current Affairs","type":"multiple","difficulty":"medium","question":"Which among these famous phrases is has not yet been used as a lyrical line in Kenyan music?","correct_answer":"Yaliyo Ndwele sipite","incorrect_answers":["Kaa na mama yako","Hiyo ni krimino","Nimeanza tu saa hii"]},
      //        {"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"Who among the following is NOT a Kenyan artiste?","correct_answer":"Brian Nhira","incorrect_answers":["Ether Akoth","Delvin Mudigi","Mohammed Ali Said"]},
      //        {"category":"Politics","type":"multiple","difficulty":"easy","question":"Who among these leaders is not known for a popular phrase?","correct_answer":"Rachel Omamo","incorrect_answers":["Rachel Shebesh","Uhuru Kenyatta","John Lonyangapuo"]},
      //        {"category":"Politics","type":"multiple","difficulty":"hard","question":"Which of these phrases became popular recently due to a Kenyan?","correct_answer":"No human is limited","incorrect_answers":["It is what it is","Love is blind","The Sky is the limit"]},
      //        {"category":"Politics","type":"multiple","difficulty":"medium","question":"Tialala is a popular chant that can be substitute with:","correct_answer":"Tibbim","incorrect_answers":["Tiddim","Ule Ule","Hapo Sawa"]},
      //        {"category":"Politics","type":"multiple","difficulty":"easy","question":"Which Kenyan politician is famously known for starting of advice with the Phrase “ kitendawili.....”","correct_answer":"Raila Odinga","incorrect_answers":["Francis Atwoli","Otiende Amollo","Babu Owino"]},
      //        {"category":"Entertainment: Music","type":"multiple","difficulty":"medium","question":"The famous song by Lenny, Mr Googs and Vinnie Banton had the phrase “Na wasee tumetoka........ “","correct_answer":"Githurai","incorrect_answers":["Githurai 45","Kayole","Doni"]},
      //        {"category":"Brand: Safaricom","type":"multiple","difficulty":"hard","question":"The correct process for making with bonga points begins by dialing...","correct_answer":"*126#","incorrect_answers":["*144#","*544#","*555#"]},
      //        {"category":"Brand: Safaricom","type":"multiple","difficulty":"hard","question":"Who is the current CEO of Safaricom?","correct_answer":"Peter Kamau","incorrect_answers":["Paul Kasimu","Michael Joseph","Sitoyo Lopokoiyit"]},
      //        {"category":"Brand: Safaricom","type":"multiple","difficulty":"easy","question":"Which phrase is not in the new Safaricom slogan?","correct_answer":"Safaricom is Proud","incorrect_answers":["Safaricom is Transparent","Safaricom is Honest","Safaricom is Simple"]}]
      //      */
      //   },
      // },     
      
  })

  
  export default store;
