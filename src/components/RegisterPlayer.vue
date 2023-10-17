<template>
    
        <div class="register-player">
            <img :src="logo" style="max-width: 200px; max-height: 139px;  width: auto; height: auto;" alt="Tuni Logo">
            <p class="error-message" v-if="error" style="color: red;">{{ error }}</p>
            <label :for="`input-${label}-id`" class="input-text">{{ label }}</label>
            <input
            class="input"
            :id="`input-${label}-id`"
            type="text"
            v-model.trim="playerName"
            :placeholder="placeholder"
            @keydown.enter="validateInput"
            autocomplete="off"
            />          
            
            <button type="button" class="btn btn-custom"  @click.native="validateInput"      
           :is-loading="isLoading">{{ buttonTitle }}</button>

            
        </div>
   
</template>

<script>


export default {
    components: {
    
    },
    data() {
    return {
      disabled:true,
      label: "What do we call you?",
      placeholder: "Nickname",
      playerName: null,
      playerPhone:null,
      buttonTitle: "Start Game",
      error: false,
      phoneno:/^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/,
      logo: '/tuni-logo.gif'
    };
  },
  mounted()
  {
    this.playerPhone =this.playerphone;
    this.playerName = this.playername;
    if (this.playername === '')
    {
      this.disabled=false;
    }
  },
  computed: {
    isLoading() {
      return false;
    },
    playername()
    {
      return '';
    },
    playerphone()
    {
      return '';
    }
  },
  methods: {
    validateInput() {
      const name = this.playerName;
      const phone = this.playerPhone; 

      if (name !=='' && !this.isLoading) {
        localStorage.setItem('playerName', name);
        localStorage.setItem('playerPhone', phone);        
        this.registerNewPlayer();
        }
      else
      {
        this.error = 'Please provide a nickname to proceed!';
      }

    },
    registerNewPlayer(){
        const playerName = localStorage.getItem('playerName');
        const playerPhone = localStorage.getItem('playerPhone');

        if (playerName) {
    
        console.log('Player Name:', playerName);
        console.log('Player Phone:', playerPhone);

        } else {
            
            this.error = 'Player data not found. Please provide a nickname to proceed!';
        }
    }
  }
}
</script>

<style>

.btn-custom {
  background-color: #93278F;
  color: white;
  text-transform: uppercase;
  transition: background-color 0.3s; /* Add a smooth transition effect */
}

/* Hover state */
.btn-custom:hover {
  background-color: #93278F; /* Same color as normal state */
}
  ::placeholder {
    color: rgba(0, 0, 0, 0.38)!important;
    opacity: 1!important; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(0, 0, 0, 0.38)!important;
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: rgba(0, 0, 0, 0.38)!important;
  }
</style>

<style lang="sass" scoped>
@import "../../src/styles/_variable.sass"
.register-player
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  text-align: center
//   margin-top: 200px

.input
  margin: 1rem
  color: inherit
  font: inherit
  outline: 0
  background: 0
  border: 1px solid $color-gray
//   -webkit-appearance:none
  border-radius: $border-radius
  padding: 0.5rem 1rem
  text-align: center
  font-size: $font-size-large
  font-weight: 600
  max-width: 18rem
  width: 100%

.input::placeholder
  color: $color-gray--darker
  text-align: center  

.error-message
  margin-top: 0.5rem
  max-width: 250px

.input-text
    font-size: 1.6rem 

</style>
