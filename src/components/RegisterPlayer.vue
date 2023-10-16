<template>
    
        <div class="register-player">
            <label :for="`input-${label}-id`">{{ label }}</label>
            <input
            class="input"
            :id="`input-${label}-id`"
            type="text"
            v-model.trim="playerName"
            :placeholder="placeholder"
            @keydown.enter="validateInput"
            autocomplete="off"
            />          
            <!-- <Button
            @click.native="validateInput"
            :title="buttonTitle"
            :is-loading="isLoading"
            /> -->
            <button type="button" class="btn btn-custom">Primary</button>

            <p class="error-message" v-if="error">{{ error }}</p>
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
      phoneno:/^0(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/
    };
  },
}
</script>

<style>
/* In a CSS file */
.btn-custom {
  background-color: #93278F;
  color: white;
  text-transform: uppercase;
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

.error-message
  margin-top: 0.5rem
  max-width: 250px
</style>
